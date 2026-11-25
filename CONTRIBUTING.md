# Mitwirken an Eternia Chroniken

Danke, dass du Eternia weitererzählen willst. Dieses Projekt lebt von guten
Texten, sauberen Icons und neugierigen Menschen, die Freude an der Legende
haben.

## Inhalt

- [Verhaltenskodex](#verhaltenskodex)
- [Was du beitragen kannst](#was-du-beitragen-kannst)
- [Entwicklungsumgebung](#entwicklungsumgebung)
- [Eine Figur hinzufügen](#eine-figur-hinzufügen)
- [Ein Icon hinzufügen](#ein-icon-hinzufügen)
- [Schreibrichtlinien](#schreibrichtlinien)
- [Technische Richtlinien](#technische-richtlinien)
- [Testen](#testen)
- [Pull Request](#pull-request)
- [Lizenz](#lizenz)

## Verhaltenskodex

Sei freundlich, geduldig und respektvoll. Kritik ist willkommen, wenn sie sich
auf Inhalt oder Code bezieht – nicht auf Menschen. Diskriminierende,
belästigende oder herabwürdigende Beiträge werden nicht akzeptiert.

Dieses Projekt ist ein inoffizielles Fanprojekt. Bitte beachte die
Markenhinweise in [NOTICE.md](NOTICE.md).

## Was du beitragen kannst

- Neue Figuren aus Eternia, Etheria oder den angrenzenden Welten.
- Texte zu bestehenden Figuren verbessern oder präzisieren.
- Kontinuitäts-Varianten ergänzen und sauber kennzeichnen.
- Neue Icons im SVG-Sprite.
- Accessibility-, Performance- oder Responsive-Verbesserungen.
- Tippfehler, bessere Formulierungen, konsistentere deutsche Typografie.
- Neue Ideen für Kapitel, Zitate oder Interaktionen – gern erst als Issue.

Nicht willkommen sind:

- Kopierte Texte aus Wikis, Comics, Serien oder anderen Fan-Seiten.
- Offizielles Artwork, Logos oder nachgezeichnete geschützte Figuren.
- Werbung, Tracking, externe CDNs oder unnötige Abhängigkeiten.
- Politische Inhalte, Spam oder Beiträge, die Rechte Dritter verletzen.

## Entwicklungsumgebung

Das Projekt braucht **keinen Build-Schritt** und **keine Abhängigkeiten**.
Empfohlen ist lediglich ein lokaler Webserver:

```bash
git clone https://github.com/BarciBarci/eternia-chroniken.git
cd eternia-chroniken
python3 -m http.server 8000
```

Dann <http://localhost:8000> öffnen.

Wenn du Änderungen an den Icons oder am Social-Preview-Bild machst:

```bash
python3 tools/make_icons.py
```

Das Skript benötigt Pillow und ist nur für die Asset-Pflege gedacht – die
Website selbst hat keine Python-Abhängigkeit.

Das Social-Preview-Bild `assets/img/og-image.png` wird aus
`tools/og-card.html` gerendert. Wenn du die Zahlen oder das Design dort
änderst, rendere die Vorlage bei 1200 × 630 Pixeln neu.

Vor dem Pull Request außerdem ausführen:

```bash
python3 tools/check_site.py
```

Der Check validiert lokale Pfade, Anker, HTML-IDs, Sprite-Icons und
Figuren-Referenzen. Dieselbe Prüfung läuft in der GitHub-Action `Static
checks`.

## Eine Figur hinzufügen

Öffne `assets/js/data.js` und ergänze einen Eintrag im Array `characters`:

```js
{
  id: 'meine-figur',
  name: 'Meine Figur',
  alias: 'Der Beiname',
  title: 'Rolle oder Titel',
  faction: 'helden',              // helden | verbuendete | schurken
  group: 'Grayskull',             // freier Text, erscheint auf der Karte
  home: 'Eternia',
  species: 'Eternianer',
  era: 'Klassische Ära',
  icon: 'shield',                 // muss als Sprite-Symbol existieren
  colors: ['#f6c453', '#7c3aed'],
  short: 'Ein prägnanter Satz für die Karte.',
  story: 'Zwei bis vier eigenständige Sätze für das Profil.',
  motto: 'Ein kurzes, eigenes Motto.',
  allies: ['he-man', 'teela'],
  enemies: ['skeletor'],
  stats: { power: 7, wisdom: 8, courage: 9, magic: 2 },
  facts: [
    'Ein interessantes Detail.',
    'Ein zweites Detail, gern mit Continuity-Hinweis.',
  ],
}
```

### Regeln für Daten

- `id` ist eindeutig, kleingeschrieben und mit Bindestrichen.
- `faction` muss `helden`, `verbuendete` oder `schurken` sein.
- Figuren in `allies` und `enemies` müssen existieren.
- `stats`-Werte liegen zwischen `0` und `10`.
- `colors` sind zwei Hex-Farben, die zusammen ein lesbares Medaillon ergeben.
- `icon` muss ein vorhandenes Symbol sein, z. B. `sword`, `skull`, `shield`,
  `eye`, `cat`, `castle`, `flame`, `serpent`. Die vollständige Liste steht im
  Sprite in `index.html` (`<symbol id="i-…">`).
- Neue Figuren erscheinen in der Reihenfolge des Arrays. Ordne sie sinnvoll
  ein und platziere die Kernfiguren nicht ans Ende.

Beim Laden prüft `app.js` die Daten und schreibt Hinweise in die
Browser-Konsole, wenn IDs fehlen, Referenzen ins Leere zeigen oder Icons nicht
existieren. Bitte öffne die Konsole, bevor du einen Pull Request stellst.

## Ein Icon hinzufügen

Das Icon-Sprite liegt oben in `index.html`. Ergänze ein `<symbol>`:

```html
<symbol id="i-mein-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="…"/>
</symbol>
```

Richtlinien:

- `viewBox="0 0 24 24"`.
- Strichbasiert, `stroke="currentColor"`, `fill="none"`, außer bei bewusst
  gefüllten Details.
- Keine eingebetteten Rasterbilder, keine externen Referenzen.
- Das Icon sollte auch bei 16 px erkennbar bleiben.
- Verwende `aria-hidden="true"` über den Helfer in `app.js`; Icons sind
  dekorativ, die Bedeutung steht im Text.

## Schreibrichtlinien

- **Deutsch**, du-Form, klar und atmosphärisch – aber nicht kitschig.
- **Eigene Wörter.** Keine langen Zitate oder kopierten Absätze.
- **Kontinuität kennzeichnen.** Wenn eine Aussage vor allem aus der
  2002er-Serie, aus neueren Neuinterpretationen oder aus einer bestimmten
  Variante stammt, schreibe es dazu („In der 2002er-Serie …“).
- **Keine erfundenen Fakten als Kanon verkaufen.** Fan-Interpretationen sind
  willkommen, sollten aber als solche erkennbar sein.
- **Keine Spoilermanie.** Die Seite ist eine Einführung und eine Chronik, kein
  Wiki-Ersatz; kurze, prägnante Texte sind besser als vollständige Handlungen.
- **Figuren respektvoll behandeln.** Auch Schurken dürfen Ecken und Kanten
  haben; sie sind keine reinen Punchingbälle.
- **Typografie:** deutsche Anführungszeichen („…“), Gedankenstrich (–),
  korrekte Umlaute. Keine gemischten Englisch-/Deutsch-Floskeln ohne Grund.

## Technische Richtlinien

- **Keine Abhängigkeiten.** Kein npm, kein Framework, kein CDN.
- **Keine externen Requests.** Fonts, Icons und Bilder bleiben lokal.
- **Progressive Verbesserung:** Inhalte sollen auch ohne aufwendige Effekte
  lesbar bleiben.
- **Vanilla JS:** Klassische Skripte, keine Module mit Imports, damit die Seite
  auch ohne Server geöffnet werden kann.
- **CSS:** Design-Tokens in `:root` bzw. `[data-theme]`, sprechende
  Klassennamen, Mobile-First-Breakpoints.
- **Barrierefreiheit:** Semantisches HTML, sichtbare Fokus-Zustände, `aria`-
  Attribute nur wo nötig, Tastaturbedienung testen.
- **Reduced Motion:** Neue Animationen müssen unter
  `prefers-reduced-motion: reduce` reduziert oder abgeschaltet werden.
- **Datenschutz:** Keine Cookies, kein Tracking, kein `localStorage` außer für
  das Theme.

## Testen

Bitte prüfe vor dem Pull Request:

- [ ] Seite lädt ohne Konsolenfehler.
- [ ] Alle Figuren erscheinen; Zähler in Hero, Chips und Fraktionskarten stimmen.
- [ ] Suche und Fraktionsfilter funktionieren, inklusive leerem Zustand.
- [ ] Der Zufalls-Button öffnet ein gültiges Profil.
- [ ] Der Dialog öffnet und schließt per Maus, `Escape` und Backdrop.
- [ ] `Tab` bleibt im Dialog, `←`/`→` blättert, Fokus kehrt nach dem Schließen zurück.
- [ ] Deep-Link `#charakter=he-man` öffnet das richtige Profil.
- [ ] „Link kopieren“ zeigt eine Rückmeldung.
- [ ] Theme-Wechsel funktioniert und bleibt nach dem Neuladen erhalten.
- [ ] Mobile Ansicht (ca. 360–430 px) ist ohne horizontales Scrollen nutzbar.
- [ ] Neue Allies/Enemies verlinken auf existierende IDs.
- [ ] Neue Icons erscheinen in Karte und Dialog.

Wenn du für eine Figur neue Verweise oder ein neues Icon ergänzt, teste
mindestens eine Karte, das Profil und die Verbindungs-Chips.

## Pull Request

1. Forke das Repository.
2. Erstelle einen Branch: `git checkout -b feature/meine-idee`.
3. Committe kleine, nachvollziehbare Änderungen.
4. Beschreibe im PR, **was** du geändert hast und **warum**.
5. Verlinke ggf. ein Issue.
6. Sei offen für Feedback.

Für reine Textkorrekturen reicht auch ein Issue mit Fundstelle und
Verbesserungsvorschlag.

## Lizenz

Mit deinem Beitrag stimmst du zu, dass dein Code unter der
[MIT-Lizenz](LICENSE) veröffentlicht wird. Deine Texte und Grafiken werden als
Teil dieses inoffiziellen Fanprojekts geteilt. Bitte stelle sicher, dass du die
nötigen Rechte an deinen Beiträgen hast und keine geschützten Inhalte Dritter
einreichst.

Danke – und möge Grayskull dich leiten.
