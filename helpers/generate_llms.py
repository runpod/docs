import os
import frontmatter


def get_markdown_files(directory):
    """
    Recursively get all markdown files in the directory.
    """
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".md", ".mdx")):
                markdown_files.append(os.path.join(root, file))
    return markdown_files


def extract_content(file_path):
    """
    Extract content from a markdown file, including frontmatter metadata.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        post = frontmatter.load(f)
        title = post.get("title", os.path.basename(file_path))
        content = post.content

        # Remove MDX-specific content
        content_lines = content.split("\n")
        filtered_lines = []
        skip_block = False
        in_html_block = False
        in_code_block = False
        code_block_type = ""
        html_tags_stack = []

        for line in content_lines:
            line_stripped = line.strip()

            # Handle code blocks to prevent JSX interpretation
            if line_stripped.startswith("```"):
                if in_code_block:
                    in_code_block = False
                    code_block_type = ""
                else:
                    in_code_block = True
                    code_block_type = line_stripped[3:].lower()
                filtered_lines.append(line)
                continue

            # Skip MDX imports
            if not in_code_block and line_stripped.startswith("import"):
                continue

            # Skip image references
            if not in_code_block and line_stripped.startswith("!["):
                continue

            # Handle HTML/JSX blocks
            if not in_code_block and (
                "<html" in line
                or "<body" in line
                or "<head" in line
                or "<script" in line
                or "<style" in line
            ):
                in_html_block = True
                continue

            if (
                not in_code_block
                and in_html_block
                and ("</html>" in line or "</body>" in line or "</head>" in line)
            ):
                in_html_block = False
                continue

            if in_html_block:
                continue

            # Skip MDX component blocks
            if not in_code_block and (
                "<" in line and " " in line and not line.startswith("<div")
            ):
                if any(
                    component in line
                    for component in ["<ApiDocMdx", "<Tabs", "<TabItem", "<CodeBlock"]
                ):
                    skip_block = True
                    continue

            if not in_code_block and skip_block and ">" in line:
                if "/>" in line:
                    skip_block = False
                continue

            if not in_code_block and skip_block and "</" in line:
                skip_block = False
                continue

            if not skip_block:
                filtered_lines.append(line)
        content = "\n".join(filtered_lines)

        return content


def generate_llms_file():
    """
    Generate a single raw text file containing all documentation content.
    No static site generation needed.
    """
    docs_dir = os.path.join(os.path.dirname(__file__), "../docs")

    # Get all markdown files
    markdown_files = get_markdown_files(docs_dir)

    # Sort files by path for a more organized output
    markdown_files.sort()

    # Create the header for the text file
    header = """# RunPod Complete Documentation

This file contains the entire RunPod documentation in a single text document for easy reference and LLM processing.

## Table of Contents

"""

    # Generate a table of contents
    toc = ""
    for file_path in markdown_files:
        relative_path = os.path.relpath(
            file_path, start=os.path.join(os.path.dirname(__file__), "../docs")
        )
        with open(file_path, "r", encoding="utf-8") as f:
            try:
                post = frontmatter.load(f)
                title = post.get("title", os.path.basename(file_path))
                toc += f"- {title} ({relative_path})\n"
            except Exception as e:
                print(f"Error processing {file_path} for TOC: {e}")
                continue

    # Combine all content
    combined_content = header + toc + "\n\n"

    for file_path in markdown_files:
        try:
            relative_path = os.path.relpath(
                file_path, start=os.path.join(os.path.dirname(__file__), "../docs")
            )
            with open(file_path, "r", encoding="utf-8") as f:
                post = frontmatter.load(f)
                title = post.get("title", os.path.basename(file_path))
            section_header = f"# {title}\n\nFile: {relative_path}\n\n"
            content = extract_content(file_path)
            combined_content += section_header + content + "\n\n---\n\n"
        except Exception as e:
            print(f"Error processing {file_path} for content: {e}")
            continue

    # Save to static directory first (this is the most important location)
    static_dir = os.path.join(os.path.dirname(__file__), "../static")
    static_txt_file = os.path.join(static_dir, "llms.txt")
    
    try:
        with open(static_txt_file, "w", encoding="utf-8") as f:
            f.write(combined_content)
        print(f"Raw text file has been generated and saved to static directory: {static_txt_file}")
    except Exception as e:
        print(f"Error writing to static directory: {e}")
    
    # Also save a copy in the build directory if it exists
    build_dir = os.path.join(os.path.dirname(__file__), "../build")
    if os.path.exists(build_dir):
        build_txt_file = os.path.join(build_dir, "llms.txt")
        try:
            with open(build_txt_file, "w", encoding="utf-8") as f:
                f.write(combined_content)
            print(f"Raw text file has been copied to build directory: {build_txt_file}")
        except Exception as e:
            print(f"Error writing to build directory: {e}")


if __name__ == "__main__":
    generate_llms_file()
