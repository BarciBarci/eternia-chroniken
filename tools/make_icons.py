#!/usr/bin/env python3
"""Erzeugt die Raster-Icons für Eternia Chroniken.

Nur für die Asset-Pflege gedacht – die Website selbst benötigt Python oder
Pillow nicht. Aufruf:

    python3 tools/make_icons.py

Benötigt Pillow. Die SVG-Version (assets/img/favicon.svg) ist die eigentliche
Quelle des Designs; dieses Skript zeichnet dieselbe Bildidee gerastert.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "img"
SIZE = 2048


def mix(start, end, amount):
    return tuple(round(start[i] + (end[i] - start[i]) * amount) for i in range(3))


def vertical_gradient(size, top, bottom):
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    for y in range(size):
        color = mix(top, bottom, y / max(1, size - 1))
        draw.line([(0, y), (size, y)], fill=color + (255,))
    return image


def build_icon():
    size = SIZE
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    background = vertical_gradient(size, (43, 23, 78), (7, 5, 16))

    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse(
        (size * 0.24, size * 0.04, size * 0.76, size * 0.58),
        fill=(246, 196, 83, 46),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(size * 0.07))
    background = Image.alpha_composite(background, glow)

    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=int(size * 0.22), fill=255
    )
    background.putalpha(mask)
    canvas = Image.alpha_composite(canvas, background)

    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    center = size / 2
    gold = (246, 196, 83, 255)
    dark = (42, 23, 64, 255)
    teal = (94, 234, 212, 255)
    ring_radius = size * 0.355

    draw.ellipse(
        (
            center - ring_radius,
            center - ring_radius,
            center + ring_radius,
            center + ring_radius,
        ),
        outline=(246, 196, 83, 74),
        width=max(2, int(size * 0.0035)),
    )
    dash_box = (
        center - size * 0.42,
        center - size * 0.42,
        center + size * 0.42,
        center + size * 0.42,
    )
    for angle in range(0, 360, 12):
        draw.arc(
            dash_box,
            start=angle,
            end=angle + 5,
            fill=(246, 196, 83, 120),
            width=max(2, int(size * 0.004)),
        )

    blade = [
        (center, size * 0.14),
        (center + size * 0.095, size * 0.30),
        (center + size * 0.095, size * 0.63),
        (center - size * 0.095, size * 0.63),
        (center - size * 0.095, size * 0.30),
    ]
    draw.polygon(blade, fill=gold)
    draw.line(
        [(center, size * 0.19), (center, size * 0.61)],
        fill=(109, 71, 11, 150),
        width=max(2, int(size * 0.007)),
    )
    draw.polygon(
        [
            (center, size * 0.50),
            (center + size * 0.033, size * 0.55),
            (center, size * 0.60),
            (center - size * 0.033, size * 0.55),
        ],
        fill=teal,
    )

    draw.rounded_rectangle(
        (size * 0.285, size * 0.625, size * 0.715, size * 0.695),
        radius=int(size * 0.025),
        fill=gold,
    )
    draw.ellipse(
        (
            size * 0.275,
            size * 0.635,
            size * 0.315,
            size * 0.675,
        ),
        fill=(11, 7, 24, 255),
        outline=gold,
        width=max(2, int(size * 0.006)),
    )
    draw.ellipse(
        (
            size * 0.685,
            size * 0.635,
            size * 0.725,
            size * 0.675,
        ),
        fill=(11, 7, 24, 255),
        outline=gold,
        width=max(2, int(size * 0.006)),
    )

    draw.rounded_rectangle(
        (center - size * 0.047, size * 0.695, center + size * 0.047, size * 0.845),
        radius=int(size * 0.02),
        fill=dark,
        outline=gold,
        width=max(2, int(size * 0.008)),
    )
    for y in (0.715, 0.742, 0.769, 0.796, 0.823):
        draw.line(
            [(center - size * 0.033, size * y), (center + size * 0.033, size * y)],
            fill=(246, 196, 83, 125),
            width=max(1, int(size * 0.004)),
        )

    draw.ellipse(
        (
            center - size * 0.058,
            size * 0.845,
            center + size * 0.058,
            size * 0.961,
        ),
        fill=dark,
        outline=gold,
        width=max(2, int(size * 0.008)),
    )
    draw.ellipse(
        (
            center - size * 0.020,
            size * 0.882,
            center + size * 0.020,
            size * 0.924,
        ),
        fill=teal,
    )

    sparkles = [
        (0.19, 0.24, 0.009),
        (0.81, 0.18, 0.007),
        (0.87, 0.64, 0.010),
        (0.14, 0.70, 0.006),
        (0.72, 0.86, 0.005),
    ]
    for x, y, radius in sparkles:
        r = size * radius
        draw.ellipse(
            (size * x - r, size * y - r, size * x + r, size * y + r),
            fill=(255, 246, 213, 210),
        )

    canvas = Image.alpha_composite(canvas, layer)
    return canvas.resize((512, 512), Image.Resampling.LANCZOS)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    icon = build_icon()
    icon.save(OUT / "icon-512.png", optimize=True)
    icon.resize((192, 192), Image.Resampling.LANCZOS).save(
        OUT / "icon-192.png", optimize=True
    )

    apple = Image.new("RGBA", (180, 180), (7, 5, 16, 255))
    apple.alpha_composite(icon.resize((180, 180), Image.Resampling.LANCZOS))
    apple.convert("RGB").save(OUT / "apple-touch-icon.png", optimize=True)
    print("Icons geschrieben nach", OUT)


if __name__ == "__main__":
    main()
