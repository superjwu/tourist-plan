#!/usr/bin/env python3

import concurrent.futures
import io
import json
import os
import ssl
import sys
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image, ImageFile, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SHARED = ROOT / "shared"
IMAGES = SHARED / "images"
MAX_DIMENSION = 1600
JPEG_QUALITY = 76
TIMEOUT = 45
WORKERS = 8

ImageFile.LOAD_TRUNCATED_IMAGES = True


def load_catalog():
    import re

    files = [
        SHARED / "data.js",
        SHARED / "data_page5.js",
        SHARED / "data_page6.js",
        SHARED / "data_page7.js",
        SHARED / "data_page8.js",
        SHARED / "data_catalog.js",
    ]

    source_parts = []
    for file_path in files:
      source_parts.append(file_path.read_text())
    source_parts.append(
        """
const __out = { catalog: globalThis.ATTRACTIONS_CATALOG };
console.log(JSON.stringify(__out));
"""
    )
    payload = "\n".join(source_parts)

    import subprocess

    result = subprocess.run(
        ["node"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        input=payload,
    )
    data = json.loads(result.stdout)
    return data["catalog"]


def download_and_convert(item):
    slug = item["slug"]
    url = item["image"]
    destination = IMAGES / f"{slug}.jpg"
    if destination.exists() and destination.stat().st_size > 50_000:
        return ("skipped", slug, destination.stat().st_size, url)

    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "tourist-plan-localizer/1.0",
            "Accept": "image/*,*/*;q=0.8",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT, context=ssl.create_default_context()) as response:
            content = response.read()
    except urllib.error.URLError as exc:
        return ("failed", slug, str(exc), url)

    try:
        with Image.open(io.BytesIO(content)) as image:
            image = ImageOps.exif_transpose(image)
            if image.mode not in ("RGB", "L"):
                image = image.convert("RGB")
            elif image.mode == "L":
                image = image.convert("RGB")

            image.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
            destination_tmp = destination.with_suffix(".tmp.jpg")
            image.save(
                destination_tmp,
                format="JPEG",
                quality=JPEG_QUALITY,
                optimize=True,
                progressive=True,
            )
            destination_tmp.replace(destination)
    except Exception as exc:
        return ("failed", slug, str(exc), url)

    return ("downloaded", slug, destination.stat().st_size, url)


def main():
    catalog = load_catalog()
    remote = [item for item in catalog if str(item.get("image", "")).startswith("http")]
    if not remote:
        print("No remote images found.")
        return

    IMAGES.mkdir(parents=True, exist_ok=True)
    print(f"Localizing {len(remote)} remote images...")

    results = {"downloaded": 0, "skipped": 0, "failed": 0}
    failures = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as executor:
        future_map = {executor.submit(download_and_convert, item): item for item in remote}
        for future in concurrent.futures.as_completed(future_map):
            status, slug, info, url = future.result()
            results[status] += 1
            if status == "failed":
                failures.append((slug, info, url))
                print(f"FAIL {slug}: {info}", file=sys.stderr)
            elif status == "downloaded":
                print(f"OK   {slug}: {round(info / 1024)}KB")

    total_size = sum(path.stat().st_size for path in IMAGES.glob("*.jpg"))
    print(json.dumps({
        "downloaded": results["downloaded"],
        "skipped": results["skipped"],
        "failed": results["failed"],
        "images_dir_bytes": total_size,
    }, indent=2))

    if failures:
        print("Failed downloads:", file=sys.stderr)
        for slug, reason, url in failures:
            print(f"- {slug}: {reason} ({url})", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
