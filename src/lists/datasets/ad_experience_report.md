---
title: Ad Experience Report Dataset
layout: layouts/dataset.njk
provider: Google
type: dataset
date: 2021-07-01
---

## Overview

The Ad Experience Report provides information on the combination of site layout
and behaviour, content, and ads that users are exposed to. It lists ad
experiences that violate the Better Ads Standards, which have been determined to
be highly annoying to users by the Coalition for Better Ads. The report includes
a brief definition, the URL of the page where the ad experience was found, and
images or videos if available. By fixing these ad experiences, website owners
can increase visitors' enjoyment and the likelihood of their return, and improve
the overall health of the online ecosystem.

## Schema

<table style="font-family: monospace;">
  <tr>
    <th>Field</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>reviewedSite</td>
    <td>The name of the reviewed site, e.g. google.com.</td>
  </tr>
  <tr>
    <td>lastChangeTime</td>
    <td>The time at which the site's status last changed.</td>
  </tr>
  <!-- Add more schema fields as needed -->
</table>

- reviewedSite - the name of the reviewed site, e.g. google.com.
- lastChangeTime - the time at which the site's status last changed.
- abusiveStatus - the site's Abusive Experience Report status.
- underReview - whether the site is currently under review.
- enforcementTime - the time at which
  [enforcement](https://support.google.com/webtools/answer/7538608) against the
  site began or will begin.
- filterStatus - the site's
  [enforcement status](https://support.google.com/webtools/answer/7538608).

Available at: BigQuery table at
[Google Analytics Hub](https://console.cloud.google.com/bigquery/analytics-hub/exchanges/projects/390347019852/locations/us/dataExchanges/data_hub_186a1c3eafa/listings/ad_experience_report_186a1de7b19)
JSON at [Google API](https://developers.google.com/ad-experience-report)

## Preview

<iframe width="80%" height=800px src="https://lookerstudio.google.com/embed/reporting/6909fab3-b9d3-4f92-b355-b17ab4f07c3e/page/fZGHD" frameborder="0" style="border:0" allowfullscreen></iframe>
