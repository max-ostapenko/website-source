"""
Functions:
    clean_sitemap_urls(xml_file):
        Cleans the URLs in the sitemap.xml file by removing 'index.html' from the end of URLs.

Usage:
    The script can be run as a standalone module to clean the sitemap URLs and move the blog
    feed to the website root.

Attributes:
    RENDER_LOCATION (str): The location where the rendered site files are stored.
    BLOG_PATH (str): The path to the blog posts.
    SITEMAP_FILE (str): The name of the sitemap file.
    FEED_FILE (str): The name of the feed file.
"""

import os
import xml.etree.ElementTree as ET

RENDER_LOCATION = "../_site"
BLOG_PATH = "posts"
SITEMAP_FILE = "sitemap.xml"
FEED_FILE = "index.xml"


def clean_sitemap_urls(xml_file):
    """
    Cleans the URLs in the sitemap.xml file by removing 'index.html' from the end of URLs.

    Args:
        xml_file (str): The path to the sitemap.xml file.
    """
    # Parse the XML file
    tree = ET.parse(xml_file)
    root = tree.getroot()

    print(root.tag)

    ns = {"ns0": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    # Iterate over <loc> elements and clean the URLs
    for url in root.findall("ns0:url", ns):
        loc = url.find("ns0:loc", ns)
        if loc is not None and loc.text.endswith("/index.html"):
            loc.text = loc.text.rsplit("index.html")[0]

    # Save the modified XML back to the file
    tree.write(xml_file, encoding="utf-8", xml_declaration=True)


if __name__ == "__main__":
    # Clean the sitemap URLs
    sitemap_file = f"{RENDER_LOCATION}/{SITEMAP_FILE}"
    clean_sitemap_urls(sitemap_file)
    print("Sitemap URLs cleaned.")

    # Move blog feed to a website root
    feed_file = f"{RENDER_LOCATION}/{BLOG_PATH}/{FEED_FILE}"
    with open(feed_file, "r", encoding="utf-8") as file:
        data = file.read()
    with open(f"{RENDER_LOCATION}/{FEED_FILE}", "w", encoding="utf-8") as file:
        file.write(data)
    os.remove(feed_file)
    print("Feed file moved to root location.")
