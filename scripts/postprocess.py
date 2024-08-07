"""
This script is used to clean the URLs in the sitemap.xml and index.xml files
generated by the Quarto.
"""

import os
import sys
from lxml import etree

RENDER_LOCATION = "_site"
BLOG_PATH = "posts"
SITEMAP_FILE = "sitemap.xml"
FEED_FILE = "index.xml"

def clean_sitemap_urls(xml_file):
    # Parse the XML file
    tree = etree.parse(xml_file)
    root = tree.getroot()

    # Define namespace
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    # Iterate over <loc> elements and clean the URLs
    for loc in root.xpath("//ns:loc", namespaces=ns):
        loc.text = (
            loc.text.rsplit("index.html")[0]
            if loc.text.endswith("/index.html")
            else loc.text
        )

    # Save the modified XML back to the file
    tree.write(xml_file, encoding="utf-8", xml_declaration=True)


if __name__ == "__main__":

    # Clean the sitemap URLs
    sitemap_file = f"{RENDER_LOCATION}/{SITEMAP_FILE}"
    clean_sitemap_urls(sitemap_file)
    print("Sitemap URLs cleaned.")

    # Move blog feed to a website root
    feed_file = f"{RENDER_LOCATION}/{BLOG_PATH}/{FEED_FILE}"
    with open(feed_file, "r") as file:
        data = file.read()
    with open(f"{RENDER_LOCATION}/{FEED_FILE}", "w") as file:
        file.write(data)
    os.remove(feed_file)
    print("Feed file moved to root location.")
