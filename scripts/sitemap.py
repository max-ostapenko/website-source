import sys
from lxml import etree


def clean_sitemap_urls(xml_file):
    # Parse the XML file
    tree = etree.parse(xml_file)
    root = tree.getroot()

    # Define namespace
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    # Iterate over <loc> elements and clean the URLs
    for loc in root.xpath("//ns:loc", namespaces=ns):
        loc.text = (
            loc.text.rsplit("/index.html")[0]
            if loc.text.endswith("/index.html")
            else loc.text.rsplit(".html")[0]
        )

    # Save the modified XML back to the file
    tree.write(xml_file, encoding="utf-8", xml_declaration=True)


if __name__ == "__main__":
    # Check if a file path is provided as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <sitemap_file_path>")
        sys.exit(1)

    # Get the file path from command-line argument
    sitemap_file = sys.argv[1]

    # Clean the sitemap URLs
    clean_sitemap_urls(sitemap_file)
    print(f"Sitemap URLs cleaned and saved to {sitemap_file}.")
