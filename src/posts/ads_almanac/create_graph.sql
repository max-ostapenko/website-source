-- ====================================================================
-- Ads Ecosystem Graph — BigQuery Property Graph (GQL)
-- ====================================================================
-- Source:   httparchive.crawl.pages
-- Date:     2026-02-01 | Client: mobile | is_root_page = TRUE
-- Dataset:  scratchspace
--
-- Development mode: rank <= 10000 to limit scanning the ~10 TiB table.
-- For the full monthly crawl run, remove the `rank <= 10000` filter.
--
-- NODE TYPES (2):
--   Publisher       — web page domains with ads.txt or sellers.json
--   AdTechPlatform  — DSPs, SSPs, and intermediary platforms
--
-- EDGE TYPES (4):
--   DirectBid           — ads.txt DIRECT:      Platform → Publisher
--                         Publisher explicitly trusts platform to sell directly.
--   ResellerBid         — ads.txt RESELLER:    Platform → Publisher
--                         Platform has indirect access; lower trust than direct.
--   RepresentsPublisher — sellers.json publisher/both: Platform → Publisher
--                         The SSP declares it represents this publisher's inventory.
--   SellsThrough        — sellers.json intermediary/both: Platform → Platform
--                         SSP sells through another SSP (supply chain hop).
--                         The original recursive CTE was tracing these chains.
--
-- NUANCES FROM ORIGINAL ANALYSIS:
--   - 'both' seller type: partner acts as both publisher AND intermediary;
--     inserted into both RepresentsPublisher and SellsThrough edges.
--   - chunkbase.com redirects to cafemedia.com (SSP domain); page corrected.
--   - app-ads.txt (mobile/CTV, ads_accounts_distribution.sql) is not included yet.
--   - ads.txt VARIABLES (OWNERDOMAIN, SUBDOMAIN, MANAGERDOMAIN, tracked in
--     common_ads_variables.sql) represent ownership delegation — a future extension.
--   - Publisher reach metric from top_direct_ads_demand.sql → Query 1 below.
--   - Cycle prevention via STRPOS in the recursive CTE → replaced by {1,N} in GQL.
-- ====================================================================

-- ====================================================================
-- STEP 1: BASE TABLES
-- ====================================================================

-- 1a. ads.txt relationships
--     Each row = a platform a publisher has authorised (direct or reseller).
CREATE OR REPLACE TABLE scratchspace.ads_txt_relationships AS
WITH pages AS (
  SELECT
    NET.REG_DOMAIN(page) AS page,
    custom_metrics.other.ads AS metrics
  FROM `httparchive.crawl.pages`
  WHERE date = '2026-02-01'
    AND client = 'mobile'
    AND is_root_page = TRUE
    AND rank <= 10000  -- remove for full crawl run
)
SELECT
  NET.REG_DOMAIN(REGEXP_EXTRACT(NORMALIZE_AND_CASEFOLD(domain), r'\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b')) AS platform_domain,
  page AS publisher_domain,
  'direct' AS relationship
FROM pages,
  UNNEST(JSON_VALUE_ARRAY(metrics.ads.account_types.direct.domains)) AS domain
WHERE SAFE.INT64(metrics.ads.account_count) > 0

UNION ALL

SELECT
  NET.REG_DOMAIN(REGEXP_EXTRACT(NORMALIZE_AND_CASEFOLD(domain), r'\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b')) AS platform_domain,
  page AS publisher_domain,
  'reseller' AS relationship
FROM pages,
  UNNEST(JSON_VALUE_ARRAY(metrics.ads.account_types.reseller.domains)) AS domain
WHERE SAFE.INT64(metrics.ads.account_count) > 0;


-- 1b. sellers.json relationships
--     Each row = an SSP declaring a publisher it represents or an intermediary it sells through.
--     $.both type: partner is both a publisher AND an intermediary;
--                  inserted in both groups so both edge types are populated.
CREATE OR REPLACE TABLE scratchspace.sellers_json_relationships AS
WITH pages AS (
  SELECT
    NET.REG_DOMAIN(page) AS page,
    custom_metrics.other.ads AS metrics
  FROM `httparchive.crawl.pages`
  WHERE date = '2026-02-01'
    AND client = 'mobile'
    AND is_root_page = TRUE
    AND rank <= 10000  -- remove for full crawl run
)
-- SSP represents a publisher ($.publisher)
SELECT
  page AS ssp_domain,
  NET.REG_DOMAIN(REGEXP_EXTRACT(NORMALIZE_AND_CASEFOLD(domain), r'\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b')) AS target_domain,
  'represents_publisher' AS seller_type
FROM pages,
  UNNEST(JSON_VALUE_ARRAY(metrics.ads.sellers.seller_types.publisher.domains)) AS domain
WHERE SAFE.INT64(metrics.ads.sellers.seller_count) > 0

UNION ALL

-- $.both → represents_publisher direction
SELECT
  page AS ssp_domain,
  NET.REG_DOMAIN(REGEXP_EXTRACT(NORMALIZE_AND_CASEFOLD(domain), r'\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b')) AS target_domain,
  'represents_publisher' AS seller_type
FROM pages,
  UNNEST(JSON_VALUE_ARRAY(metrics.ads.sellers.seller_types.both.domains)) AS domain
WHERE SAFE.INT64(metrics.ads.sellers.seller_count) > 0

UNION ALL

-- SSP sells through another SSP ($.intermediary)
SELECT
  page AS ssp_domain,
  NET.REG_DOMAIN(REGEXP_EXTRACT(NORMALIZE_AND_CASEFOLD(domain), r'\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b')) AS target_domain,
  'intermediary' AS seller_type
FROM pages,
  UNNEST(JSON_VALUE_ARRAY(metrics.ads.sellers.seller_types.intermediary.domains)) AS domain
WHERE SAFE.INT64(metrics.ads.sellers.seller_count) > 0

UNION ALL

-- $.both → intermediary direction
SELECT
  page AS ssp_domain,
  NET.REG_DOMAIN(REGEXP_EXTRACT(NORMALIZE_AND_CASEFOLD(domain), r'\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b')) AS target_domain,
  'intermediary' AS seller_type
FROM pages,
  UNNEST(JSON_VALUE_ARRAY(metrics.ads.sellers.seller_types.both.domains)) AS domain
WHERE SAFE.INT64(metrics.ads.sellers.seller_count) > 0;


-- ====================================================================
-- STEP 2: NODE TABLES
-- ====================================================================

-- Node Type 1: Publisher
--   Web page domains that declare ads.txt or are referenced as publishers
--   in sellers.json. These are the inventory sources in the ecosystem.
CREATE OR REPLACE TABLE scratchspace.Publisher AS
SELECT DISTINCT domain
FROM (
  SELECT publisher_domain AS domain FROM scratchspace.ads_txt_relationships
  UNION DISTINCT
  -- SSPs declare these as publishers they represent; include as Publisher nodes too.
  SELECT target_domain AS domain FROM scratchspace.sellers_json_relationships
  WHERE seller_type = 'represents_publisher'
)
WHERE domain IS NOT NULL;

ALTER TABLE scratchspace.Publisher ADD PRIMARY KEY (domain) NOT ENFORCED;


-- Node Type 2: AdTechPlatform
--   All demand platforms (DSPs from ads.txt) and supply platforms
--   (SSPs/intermediaries from sellers.json). A domain can appear here
--   even if it also appears in Publisher — many SSPs run publisher sites.
CREATE OR REPLACE TABLE scratchspace.AdTechPlatform AS
SELECT DISTINCT domain
FROM (
  -- DSPs / SSPs listed in ads.txt direct or reseller entries
  SELECT platform_domain AS domain FROM scratchspace.ads_txt_relationships
  UNION DISTINCT
  -- SSPs that publish sellers.json (the page domain is the platform)
  SELECT ssp_domain AS domain FROM scratchspace.sellers_json_relationships
  UNION DISTINCT
  -- Intermediary SSPs declared in sellers.json chains
  SELECT target_domain AS domain FROM scratchspace.sellers_json_relationships
  WHERE seller_type = 'intermediary'
)
WHERE domain IS NOT NULL;

ALTER TABLE scratchspace.AdTechPlatform ADD PRIMARY KEY (domain) NOT ENFORCED;


-- ====================================================================
-- STEP 3: EDGE TABLES
-- ====================================================================

-- Edge 1: DirectBid (AdTechPlatform → Publisher)
--   Source: ads.txt DIRECT entries
--   Publisher explicitly authorises platform to sell inventory directly.
--   Direct relationships are higher-trust and typically command higher CPMs.
CREATE OR REPLACE TABLE scratchspace.DirectBid AS
SELECT
  GENERATE_UUID() AS edge_id,
  platform_domain,
  publisher_domain
FROM scratchspace.ads_txt_relationships
WHERE relationship = 'direct'
  AND platform_domain IS NOT NULL
  AND publisher_domain IS NOT NULL;

ALTER TABLE scratchspace.DirectBid ADD PRIMARY KEY (edge_id) NOT ENFORCED;


-- Edge 2: ResellerBid (AdTechPlatform → Publisher)
--   Source: ads.txt RESELLER entries
--   Publisher allows this platform to resell inventory indirectly.
--   Reseller entries without a corresponding sellers.json claim are a compliance red flag.
CREATE OR REPLACE TABLE scratchspace.ResellerBid AS
SELECT
  GENERATE_UUID() AS edge_id,
  platform_domain,
  publisher_domain
FROM scratchspace.ads_txt_relationships
WHERE relationship = 'reseller'
  AND platform_domain IS NOT NULL
  AND publisher_domain IS NOT NULL;

ALTER TABLE scratchspace.ResellerBid ADD PRIMARY KEY (edge_id) NOT ENFORCED;


-- Edge 3: RepresentsPublisher (AdTechPlatform → Publisher)
--   Source: sellers.json $.publisher and $.both entries
--   The SSP claims it represents this publisher's inventory.
--   Cross-checking with DirectBid/ResellerBid surfaces one-sided declarations.
CREATE OR REPLACE TABLE scratchspace.RepresentsPublisher AS
SELECT
  GENERATE_UUID() AS edge_id,
  ssp_domain,
  target_domain AS publisher_domain
FROM scratchspace.sellers_json_relationships
WHERE seller_type = 'represents_publisher'
  AND ssp_domain IS NOT NULL
  AND target_domain IS NOT NULL;

ALTER TABLE scratchspace.RepresentsPublisher ADD PRIMARY KEY (edge_id) NOT ENFORCED;


-- Edge 4: SellsThrough (AdTechPlatform → AdTechPlatform)
--   Source: sellers.json $.intermediary and $.both entries
--   SSP sells inventory through another SSP (supply chain hop).
--   This is what the original recursive CTE was tracing depth-first.
--   BQ GQL's {1,N} quantifier replaces the STRPOS(path, domain) = 0 cycle guard.
CREATE OR REPLACE TABLE scratchspace.SellsThrough AS
SELECT
  GENERATE_UUID() AS edge_id,
  ssp_domain AS source_platform,
  target_domain AS dest_platform
FROM scratchspace.sellers_json_relationships
WHERE seller_type = 'intermediary'
  AND ssp_domain IS NOT NULL
  AND target_domain IS NOT NULL;

ALTER TABLE scratchspace.SellsThrough ADD PRIMARY KEY (edge_id) NOT ENFORCED;


-- ====================================================================
-- STEP 4: PROPERTY GRAPH
-- ====================================================================

CREATE OR REPLACE PROPERTY GRAPH scratchspace.AdsGraph
  NODE TABLES (
    scratchspace.Publisher
      KEY (domain)
      LABEL Publisher,
    scratchspace.AdTechPlatform
      KEY (domain)
      LABEL AdTechPlatform
  )
  EDGE TABLES (
    scratchspace.DirectBid
      KEY (edge_id)
      SOURCE KEY (platform_domain) REFERENCES AdTechPlatform (domain)
      DESTINATION KEY (publisher_domain) REFERENCES Publisher (domain)
      LABEL DirectBid,
    scratchspace.ResellerBid
      KEY (edge_id)
      SOURCE KEY (platform_domain) REFERENCES AdTechPlatform (domain)
      DESTINATION KEY (publisher_domain) REFERENCES Publisher (domain)
      LABEL ResellerBid,
    scratchspace.RepresentsPublisher
      KEY (edge_id)
      SOURCE KEY (ssp_domain) REFERENCES AdTechPlatform (domain)
      DESTINATION KEY (publisher_domain) REFERENCES Publisher (domain)
      LABEL RepresentsPublisher,
    scratchspace.SellsThrough
      KEY (edge_id)
      SOURCE KEY (source_platform) REFERENCES AdTechPlatform (domain)
      DESTINATION KEY (dest_platform) REFERENCES AdTechPlatform (domain)
      LABEL SellsThrough
  );


-- ====================================================================
-- STEP 5: ANALYSIS QUERIES
-- ====================================================================

-- Query 1: Top demand platforms by direct publisher reach
--   Equivalent to top_direct_ads_demand.sql but via GQL.
--   Answers: which DSPs/SSPs appear in the most publishers' ads.txt DIRECT entries?
GRAPH scratchspace.AdsGraph
MATCH (platform:AdTechPlatform)-[:DirectBid]->(publisher:Publisher)
RETURN
  platform.domain AS platform,
  COUNT(DISTINCT publisher.domain) AS direct_reach
ORDER BY direct_reach DESC
LIMIT 50;


-- Query 2: Top platforms by reseller reach
--   High reseller counts without matching sellers.json entries = compliance gap.
GRAPH scratchspace.AdsGraph
MATCH (platform:AdTechPlatform)-[:ResellerBid]->(publisher:Publisher)
RETURN
  platform.domain AS platform,
  COUNT(DISTINCT publisher.domain) AS reseller_reach
ORDER BY reseller_reach DESC
LIMIT 50;


-- Query 3: Multi-hop supply chain — publisher inventory reachable via SSP chains
--   Replaces the original WITH RECURSIVE nodes CTE.
--   {1,3} quantifier natively prevents cycles (no STRPOS hack needed).
--   Answers: for each entry SSP, which publishers are reachable through
--            up to 3 intermediary SellsThrough hops?
GRAPH scratchspace.AdsGraph
MATCH
  (entry:AdTechPlatform)-[:ResellerBid]->(publisher:Publisher),
  (entry)-[:SellsThrough]->{1,3}(downstream:AdTechPlatform)
RETURN
  entry.domain AS entry_ssp,
  downstream.domain AS downstream_ssp,
  COUNT(DISTINCT publisher.domain) AS reachable_publishers
ORDER BY reachable_publishers DESC
LIMIT 100;


-- Query 4: Cross-declaration consistency (ads.txt vs sellers.json)
--   Answers: which SSPs are listed as RESELLERS in ads.txt, but also
--            declare those same publishers via RepresentsPublisher in sellers.json?
--   SSPs with high reseller_reach but low confirmed_in_sellers_json are suspicious
--   (they claim reseller rights but the SSP's own sellers.json doesn't back it up).
--   Note: SSP platform domains (pubmatic.com, openx.com, etc.) need to be present
--         as crawled pages *with* sellers.json at their root to generate
--         RepresentsPublisher edges. In the rank <= 10000 dev run this is near-zero,
--         so confirmed_in_sellers_json will be 0. Run with full crawl to see divergence.
GRAPH scratchspace.AdsGraph
MATCH (platform:AdTechPlatform)-[:ResellerBid]->(publisher:Publisher)
OPTIONAL MATCH (platform)-[confirms:RepresentsPublisher]->(publisher)
RETURN
  platform.domain,
  COUNT(DISTINCT publisher.domain) AS reseller_reach,
  COUNTIF(confirms IS NOT NULL) AS confirmed_in_sellers_json
ORDER BY reseller_reach DESC
LIMIT 50;
