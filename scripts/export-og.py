"""Xuất ảnh Open Graph (hiện khi chia sẻ link) từ scripts/og-image.html ra public/og-image.png.

    python scripts/export-og.py

Khung 1200x630, chụp ở độ phân giải gấp đôi (2400x1260) cho nét. Nếu đổi kích thước,
sửa theo thẻ og:image:width / og:image:height trong .vitepress/config.mts.

Cần: pip install playwright && python -m playwright install chromium
"""

import pathlib

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "og-image.html"
OUT = ROOT / "public" / "og-image.png"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=2)
    page.goto(SRC.as_uri())
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    OUT.parent.mkdir(exist_ok=True)
    page.screenshot(path=str(OUT), clip={"x": 0, "y": 0, "width": 1200, "height": 630})
    browser.close()
print(f"✓ {OUT}")
