#!/usr/bin/env python3
"""Generate the favicon and apple touch icon from the site mark.

The mark is two road edges converging toward a vanishing point with the centre
line dashing away between them — the same geometry as `components/Mark.tsx`
and `app/icon.svg`. It is drawn here rather than rasterised from the SVG so the
build needs no cairo/rsvg toolchain; the trade-off is that the coordinates live
in three places and must be changed together.

Run from the repo root:

    python3 scripts/build-icons.py
"""

from __future__ import annotations

import pathlib

from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
APP = ROOT / "app"

BACKGROUND = (8, 8, 10, 255)
FOREGROUND = (255, 255, 255, 255)

#: Supersampling factor. Pillow has no antialiased line primitive, so the mark
#: is drawn large and downsampled with LANCZOS.
SCALE = 16

#: Mark geometry in the same 24x24 space the SVG uses:
#: (x0, y0, x1, y1, stroke_width)
STROKES = [
    (2.6, 21.0, 10.4, 5.4, 2.0),
    (21.4, 21.0, 13.6, 5.4, 2.0),
    (12.0, 20.6, 12.0, 17.4, 2.0),
    (12.0, 14.3, 12.0, 12.7, 1.7),
]

VIEWBOX = 24.0


def render(size: int, *, background: bool = True, radius_ratio: float = 0.22) -> Image.Image:
    big = size * SCALE
    image = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    if background:
        radius = big * radius_ratio
        draw.rounded_rectangle([0, 0, big - 1, big - 1], radius=radius, fill=BACKGROUND)

    unit = big / VIEWBOX
    for x0, y0, x1, y1, width in STROKES:
        draw.line(
            [(x0 * unit, y0 * unit), (x1 * unit, y1 * unit)],
            fill=FOREGROUND,
            width=max(1, round(width * unit)),
        )
        # Pillow's line() has butt caps; the SVG uses round. Cap both ends by
        # hand so the small sizes keep the same weight as the vector mark.
        r = width * unit / 2
        for cx, cy in ((x0 * unit, y0 * unit), (x1 * unit, y1 * unit)):
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=FOREGROUND)

    return image.resize((size, size), Image.LANCZOS)


def main() -> None:
    APP.mkdir(exist_ok=True)

    sizes = [16, 32, 48, 64, 128, 256]
    # Pillow's ICO writer derives every entry by downsampling the image it is
    # given, so it has to be the largest one. Passing the 16px render as the
    # base silently produces a single-entry 16x16 file.
    render(max(sizes)).save(
        APP / "favicon.ico",
        format="ICO",
        sizes=[(s, s) for s in sizes],
    )
    with Image.open(APP / "favicon.ico") as written:
        produced = sorted(written.info.get("sizes", []))
    if produced != sorted((s, s) for s in sizes):
        raise SystemExit(f"favicon.ico came out with {produced}, expected {sizes}")
    print(f"wrote {APP / 'favicon.ico'} ({', '.join(f'{s}x{s}' for s in sizes)})")

    apple = render(180, radius_ratio=0.0)
    apple.convert("RGB").save(APP / "apple-icon.png", format="PNG")
    print(f"wrote {APP / 'apple-icon.png'} (180x180)")

    preview = render(512)
    preview.save(ROOT / "scripts" / "mark-preview.png", format="PNG")
    print(f"wrote {ROOT / 'scripts' / 'mark-preview.png'} (512x512)")


if __name__ == "__main__":
    main()
