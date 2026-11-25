#!/usr/bin/env python3
"""Statische Prüfung für Eternia Chroniken.

Prüft ohne externe Abhängigkeiten:
- doppelte HTML-IDs,
- lokale href/src-Referenzen,
- Anchor-Ziele,
- CSS-url()-Referenzen,
- Manifest-Icons,
- verwendete Icons im SVG-Sprite,
- doppelte Charakter-IDs,
- Allies/Enemies-Referenzen in data.js.

Aufruf:

    python3 tools/check_site.py
"""

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
CSS = ROOT / "assets" / "css" / "styles.css"
DATA = ROOT / "assets" / "js" / "data.js"
APP = ROOT / "assets" / "js" / "app.js"
MANIFEST = ROOT / "site.webmanifest"
SPRITE_IDS = re.compile(r'<symbol\s+id="i-([^"]+)"')
ICON_USE = re.compile(r"icon:\s*'([^']+)'")
APP_ICON_USE = re.compile(r"icon\('([^']+)'")
CHARACTER_ID = re.compile(r"\bid:\s*'([^']+)'")
RELATION = re.compile(r"(?:allies|enemies):\s*\[([^\]]*)\]")
CSS_URL = re.compile(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)")

errors = []
warnings = []


def error(message):
    errors.append(message)


def warn(message):
    warnings.append(message)


class Collector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.refs = []
        self.meta = {}

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if attributes.get("id"):
            self.ids.append(attributes["id"])
        for key in ("href", "src"):
            if attributes.get(key):
                self.refs.append((tag, key, attributes[key]))
        if tag == "meta":
            key = attributes.get("property") or attributes.get("name")
            content = attributes.get("content")
            if key and content:
                self.meta[key] = content


def is_external(value):
    value = value.strip().lower()
    return (
        not value
        or value.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:"))
    )


def local_path(value):
    clean = value.split("?")[0].split("#")[0]
    return unquote(clean)


def main():
    if not INDEX.exists():
        print("index.html fehlt.", file=sys.stderr)
        return 1

    html = INDEX.read_text(encoding="utf-8")
    parser = Collector()
    parser.feed(html)
    parser.close()

    id_counts = Counter(parser.ids)
    for item_id, count in id_counts.items():
        if count > 1:
            error(f"Doppelte HTML-ID: #{item_id} ({count}×)")

    ids = set(parser.ids)

    for tag, attr, value in parser.refs:
        if is_external(value):
            continue
        if value.startswith("#"):
            if value in ("#", "#charakter=") or value.startswith("#charakter="):
                continue
            target = value[1:]
            if target not in ids:
                error(f"{tag}[{attr}] verweist auf fehlendes Anchor-Ziel #{target}")
            continue
        path = local_path(value)
        if path and not (ROOT / path).exists():
            error(f"{tag}[{attr}] verweist auf fehlende Datei: {path}")

    for meta_key in ("og:image", "twitter:image", "og:image:alt"):
        value = parser.meta.get(meta_key)
        if value and meta_key != "og:image:alt":
            path = local_path(value)
            if path and path.startswith("assets/") and not (ROOT / path).exists():
                error(f"Meta {meta_key} verweist auf fehlende Datei: {path}")

    if CSS.exists():
        css = CSS.read_text(encoding="utf-8")
        for match in CSS_URL.finditer(css):
            value = match.group(2).strip()
            if is_external(value) or value.startswith("data:"):
                continue
            path = local_path(value)
            if path and not (CSS.parent / path).exists():
                error(f"CSS url() verweist auf fehlende Datei: {path}")
    else:
        error("assets/css/styles.css fehlt.")

    if MANIFEST.exists():
        try:
            manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
            for icon in manifest.get("icons", []):
                src = local_path(icon.get("src", ""))
                if src and not (ROOT / src).exists():
                    error(f"Manifest-Icon fehlt: {src}")
        except json.JSONDecodeError as exc:
            error(f"site.webmanifest ist kein gültiges JSON: {exc}")
    else:
        error("site.webmanifest fehlt.")

    if not DATA.exists():
        error("assets/js/data.js fehlt.")
        data = ""
    else:
        data = DATA.read_text(encoding="utf-8")

    sprite_ids = set(SPRITE_IDS.findall(html))
    used_icons = set(ICON_USE.findall(data))
    if APP.exists():
        used_icons.update(APP_ICON_USE.findall(APP.read_text(encoding="utf-8")))
    else:
        error("assets/js/app.js fehlt.")
    missing_icons = sorted(used_icons - sprite_ids)
    for icon_name in missing_icons:
        error(f"Icon '{icon_name}' wird in data.js verwendet, fehlt aber im Sprite.")

    characters_section = data.split("characters: [", 1)[1] if "characters: [" in data else ""
    character_ids = CHARACTER_ID.findall(characters_section)
    duplicates = sorted({cid for cid in character_ids if character_ids.count(cid) > 1})
    for character_id in duplicates:
        error(f"Doppelte Charakter-ID: {character_id}")

    relation_targets = set()
    for relation in RELATION.finditer(characters_section):
        relation_targets.update(re.findall(r"'([^']+)'", relation.group(1)))
    missing_relations = sorted(relation_targets - set(character_ids))
    for relation in missing_relations:
        error(f"Unbekannte Allies/Enemies-Referenz: {relation}")

    for marker in ("your-name", "DEIN-NAME"):
        if marker in html or marker in data or marker in (ROOT / "README.md").read_text(encoding="utf-8"):
            warn(f"Platzhalter '{marker}' ist noch vorhanden – vor dem Deployment ersetzen.")

    print("Eternia Chroniken – statische Prüfung")
    print(f"  HTML-IDs: {len(parser.ids)} | lokale Referenzen: {len(parser.refs)}")
    print(f"  Icons im Sprite: {len(sprite_ids)} | verwendete Icons: {len(used_icons)}")
    print(f"  Charakter-IDs: {len(set(character_ids))} | Allies/Enemies-Verweise: {len(relation_targets)}")

    if warnings:
        print("\nHinweise:")
        for message in warnings:
            print("  ! " + message)

    if errors:
        print("\nFehler:", file=sys.stderr)
        for message in errors:
            print("  ✗ " + message, file=sys.stderr)
        return 1

    print("\n✓ Keine Probleme gefunden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
