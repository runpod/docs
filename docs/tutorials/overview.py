import os
import frontmatter


def get_markdown_files(directory):
    """
    Recursively get all markdown files in the directory.
    """
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                markdown_files.append(os.path.join(root, file))
    return markdown_files


def extract_metadata(file_path):
    """
    Extract frontmatter metadata from a markdown file.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)
        return {
            "title": post.get("title", "No Title"),
            "description": post.get("description", "No Description"),
            "path": file_path,
        }


def create_overview_page(markdown_files):
    """
    Create the overview page content with sections based on the folder name.
    """
    overview_content = """
---
title: Overview
sidebar_position: 1
---

Below is the list of all tutorials:
"""

    sections = {}

    for file in markdown_files:
        metadata = extract_metadata(file)
        section = os.path.basename(os.path.dirname(file))
        if section not in sections:
            sections[section] = []
        sections[section].append(metadata)

    for section, tutorials in sections.items():
        overview_content += f"\n## {section.capitalize()}\n\n"
        for tutorial in tutorials:
            relative_path = os.path.relpath(tutorial["path"], start=os.getcwd())
            overview_content += f"- [{tutorial['title']}](/tutorials/{relative_path}): {tutorial['description']}\n"

    return overview_content


def save_overview_page(content, output_path):
    """
    Save the overview page content to a file.
    """
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)


def main():
    base_directory = "."  # Adjust this if your script is not in the root directory
    output_file = "overview_1.md"  # Name of the overview file

    markdown_files = get_markdown_files(base_directory)
    overview_content = create_overview_page(markdown_files)
    save_overview_page(overview_content, output_file)
    print(f"Overview page created and saved as {output_file}")


if __name__ == "__main__":
    main()
