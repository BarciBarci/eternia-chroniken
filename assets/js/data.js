/*
 * Eternia Chroniken – Datenbasis
 * ---------------------------------
 * Alle Inhalte sind fan-gemachte Zusammenfassungen der Masters-of-the-Universe-
 * Überlieferung. Details unterscheiden sich je nach Serie und Continuity.
 * Figuren und Marken gehören Mattel; dieses Projekt ist inoffiziell.
 *
 * Neue Figur hinzufügen? Siehe CONTRIBUTING.md.
 */
window.ETERNIA = {
  site: {
    name: 'Eternia Chroniken',
    tagline: 'Die Geschichte von He-Man, seinen Freunden und Feinden',
    // TODO: Ersetze diesen Link durch dein GitHub-Repository.
    repo: 'https://github.com/BarciBarci/eternia-chroniken',
    license: 'MIT',
    year: 2026,
  },

  factions: {
    helden: {
      label: 'Helden',
      title: 'Helden von Grayskull',
      icon: 'sword',
      description:
        'Jene, die für Eternia einstehen – ob mit Schwert, Verstand oder Herz. Ihre Treue zu Grayskull ist stärker als jede Rüstung.',
    },
    verbuendete: {
      label: 'Verbündete',
      title: 'Hof, Himmel & ferne Mächte',
      icon: 'crown',
      description:
        'Verbündete müssen nicht jeden Tag an der Front stehen. Manche halten die Krone zusammen, andere kommen aus den Sternen oder aus uralten Bergreichen.',
    },
    schurken: {
      label: 'Schurken',
      title: 'Schatten über Eternia',
      icon: 'skull',
      description:
        'Von Snake Mountain bis in die Tiefsee: Skeletors Schergen verfolgen eigene Pläne, doch sie eint der Hunger nach Macht.',
    },
  },

  story: [
    {
      numeral: 'I',
      icon: 'comet',
      title: 'Das Erbe der Zwillinge',
      text:
        'Königin Marlena kam als Astronautin von der Erde nach Eternia und blieb. Mit König Randor bekam sie Zwillinge: Adam und Adora. Als Baby wurde Adora von der Bösen Horde entführt und auf Etheria großgezogen. Zwei Kinder, zwei Welten – und ein Schicksal, das beide an die Macht von Grayskull bindet.',
    },
    {
      numeral: 'II',
      icon: 'sword',
      title: 'Die Verwandlung',
      text:
        'Prinz Adam wirkt wie ein unbeschwerter junger Mann. Doch das Machtschwert macht ihn zum mächtigsten Mann des Universums. Nur wenige Eingeweihte kennen sein Geheimnis; für alle anderen bleibt He-Man ein Fremder, der in der Stunde der Not erscheint.',
    },
    {
      numeral: 'III',
      icon: 'skull',
      title: 'Der ewige Krieg',
      text:
        'Von Snake Mountain aus sinnt Skeletor auf die Macht von Grayskull. Seine Pläne wechseln, seine Schergen kommen und gehen – nur seine Niederlagen wiederholen sich. Was ihn gefährlich hält, ist nicht rohe Kraft, sondern Geduld und ein unerschütterlicher Glaube an seine eigene Größe.',
    },
    {
      numeral: 'IV',
      icon: 'star',
      title: 'Die andere Hälfte',
      text:
        'Auf Etheria kämpft Adora als She-Ra an der Spitze der Großen Rebellion gegen Hordak. Erst spät erfährt sie, woher sie stammt. Als sich die Zwillinge schließlich gegenüberstehen, wird aus zwei Kriegen eine gemeinsame Geschichte – verbunden durch Grayskull und das Blut derselben Eltern.',
    },
  ],

  companions: [
    {
      id: 'teela',
      bond: 'Die Wächterin',
      note:
        'Teela ist keine Begleiterin, die wartet. Sie geht voran, hinterfragt Befehle und erinnert He-Man daran, dass Mut ohne Verstand nur Lärm ist. Dass die Frau, die ihr das Leben gab, tief in Grayskull wacht, gehört zu den Geheimnissen, die diese Freundschaft noch komplizierter machen.',
    },
    {
      id: 'man-at-arms',
      bond: 'Der Mentor',
      note:
        'Duncan war es, der Adams Weg zur Macht mit vorbereitete. Er kennt das Geheimnis des Prinzen und hält es, wie er seine Rüstung hält: fest verschlossen. Zwischen Schlachtfeld und Werkstatt ist er der ruhige Pol, an dem sich He-Mans Stärke messen lassen muss.',
    },
    {
      id: 'sorceress',
      bond: 'Die Hüterin',
      note:
        'Sie ruft, wenn Eternia sie braucht – und manchmal schweigt sie, um die Menschen ihren eigenen Weg finden zu lassen. Die Sorceress ist keine Freundin im gewöhnlichen Sinn, sondern das Gewissen eines Ortes, der älter ist als jedes Königreich.',
    },
    {
      id: 'orko',
      bond: 'Der Zauberer',
      note:
        'Orkos Sprüche scheitern oft spektakulär. Doch wenn alles verloren scheint, ist er da – mit einem schiefen Hut, dem falschen Zauber und dem richtigen Herz. Er erinnert daran, dass Stärke nicht nur in Muskeln steckt.',
    },
    {
      id: 'battle-cat',
      bond: 'Der Gefährte',
      note:
        'Cringer würde sich lieber verstecken. Doch die Macht verwandelt ihn in Battle Cat, und mit ihm bekommt He-Man etwas, das keine Rüstung liefern kann: jemanden, der ohne Worte versteht, wann es losgeht. Gemeinsam sind sie schneller, lauter und furchtloser.',
    },
  ],

  timeline: [
    {
      era: 'Urzeit',
      tag: 'Das erste Zeitalter',
      title: 'Der erste Wächter',
      text:
        'König Grayskull verteidigt Eternia gegen die Böse Horde und die Schlangenmenschen. Aus seinem Erbe entsteht das Schloss, das später seinen Namen trägt – Festung, Gefängnis und Quelle einer Macht, die ganze Zeitalter überdauert.',
      note: 'Klassische Motive, vertieft in der 2002er-Serie.',
    },
    {
      era: 'Urzeit',
      tag: 'Die Schlangenkriege',
      title: 'König Hiss und die Schlangenmenschen',
      text:
        'Unter der Führung von King Hiss bedrohen die Schlangenmenschen den Kontinent. Sie werden besiegt und tief unter Snake Mountain versiegelt. Ihre Rückkehr bleibt eine der dunkelsten Möglichkeiten Eternias.',
      note: 'Die Schlangenmenschen kehren in der 2002er-Serie zurück.',
    },
    {
      era: 'Vor Adams Zeit',
      tag: 'Der Fall von Keldor',
      title: 'Aus einem Prinzen wird ein Schatten',
      text:
        'In der 2002er-Erzählung fordert Keldor, Halbbruder von König Randor, den Thron. Eine Schlacht entstellt ihn schwer; Hordak rettet ihn – und formt ihn zu Skeletor. Das Gesicht verschwindet, der Ehrgeiz bleibt.',
      note: 'Continuity-Variante: In klassischen Erzählungen bleibt Skeletors Herkunft offener.',
    },
    {
      era: 'Klassische Ära',
      tag: 'Der neue Beschützer',
      title: 'Adam erhebt das Schwert',
      text:
        'Prinz Adam erhält das Machtschwert und die Fähigkeit, sich in He-Man zu verwandeln. Mit Cringer an seiner Seite und der Sorceress im Rücken wird er zum Beschützer Eternias.',
    },
    {
      era: 'Klassische Ära',
      tag: 'Das Doppelleben',
      title: 'Ein Geheimnis, das schützt',
      text:
        'Nur wenige kennen Adams wahre Identität. Das Doppelleben schützt seine Familie und macht Skeletor verwundbar – denn wer He-Man jagt, sucht an der falschen Stelle. Doch die Lüge hat einen Preis: Der Prinz kann nie ganz der sein, der er ist.',
    },
    {
      era: 'Klassische Ära',
      tag: 'Der ewige Krieg',
      title: 'Snake Mountain schlägt zurück',
      text:
        'Skeletor greift immer wieder nach Grayskull, mal mit Magie, mal mit Maschinen, mal mit einem Doppelgänger namens Faker. He-Man und seine Freunde verteidigen das Schloss – und lernen, dass eine Niederlage Skeletors nur der Anfang des nächsten Plans ist.',
    },
    {
      era: 'Etheria',
      tag: 'Die andere Welt',
      title: 'She-Ra und die Große Rebellion',
      text:
        'Adora, Adams Zwillingsschwester, wächst in den Reihen der Bösen Horde auf. Als sie das Schwert des Schutzes findet, wendet sie sich gegen ihre Ausbilder und wird She-Ra. Auf Etheria beginnt ein eigener Krieg gegen Hordak.',
    },
    {
      era: 'Vermächtnis',
      tag: 'Jenseits der Serien',
      title: 'Die Legende bleibt',
      text:
        'Ob Kinofilm, Neuinterpretation oder Zeichentrickserie: Eternia wird immer wieder neu erzählt. Manche Details ändern sich, die Grundfrage bleibt dieselbe – was bedeutet es, Macht zu besitzen und sie nicht zu missbrauchen?',
      note: 'Diese Chronik mischt klassische Motive mit späteren Varianten und markiert Unterschiede.',
    },
  ],

  facts: [
    {
      icon: 'falcon',
      tag: 'Familiengeheimnis',
      title: 'Teelas wahre Mutter',
      text:
        'Teela wächst bei Man-At-Arms auf und glaubt lange, ihre Mutter sei tot. Tatsächlich ist die Sorceress von Grayskull ihre leibliche Mutter – ein Geheimnis, das Teela erst nach und nach begreift.',
    },
    {
      icon: 'skull',
      tag: 'Continuity',
      title: 'Skeletor war einmal Keldor',
      text:
        'In der 2002er-Serie hat Skeletor eine Vergangenheit als Keldor, Randors Halbbruder. Nach einer verheerenden Schlacht rettet Hordak ihn – und macht aus einem verletzten Prinzen einen Schädel ohne Gesicht.',
    },
    {
      icon: 'cat',
      tag: 'Ein Tier, zwei Leben',
      title: 'Cringer ist Battle Cat',
      text:
        'Der ängstliche grüne Tiger und das gepanzerte Streitross sind dieselbe Figur. Die Macht von Grayskull verwandelt Cringer – aber nur, solange Adam das Schwert erhoben hat.',
    },
    {
      icon: 'castle',
      tag: 'Ort der Macht',
      title: 'Grayskull ist mehr als eine Burg',
      text:
        'Schloss Grayskull ist Festung, Quelle der Macht und Gefängnis zugleich. Wer es kontrolliert, könnte Eternia verändern. Genau deshalb ist es das Ziel fast jeder dunklen Macht.',
    },
    {
      icon: 'orb',
      tag: 'Trolla',
      title: 'Orkos Magie gehorcht nicht',
      text:
        'Auf Trolla ist Magie selbstverständlich. Auf Eternia wirken Orkos Sprüche oft anders als geplant – manchmal gar nicht, manchmal zu gut. Seine Freunde haben gelernt, lieber hinter ihm zu stehen.',
    },
    {
      icon: 'book',
      tag: 'Erzählweise',
      title: 'Viele Wege nach Eternia',
      text:
        'Die Minicomics, die Filmation-Serie, der Kinofilm, die 2002er-Serie und neuere Neuinterpretationen erzählen teils sehr unterschiedliche Versionen. Diese Seite verbindet sie zu einer lesbaren Chronik – ohne zu behaupten, es gäbe nur eine Wahrheit.',
    },
  ],

  characters: [
    {
      id: 'he-man',
      name: 'He-Man',
      alias: 'Prinz Adam',
      title: 'Beschützer von Eternia',
      faction: 'helden',
      group: 'Schloss Grayskull',
      home: 'Eternos & Schloss Grayskull',
      species: 'Eternianer',
      era: 'Klassische Ära',
      icon: 'sword',
      colors: ['#f6c453', '#b45309'],
      short:
        'Der mächtigste Mann des Universums – und der Prinz, der sein Geheimnis hüten muss.',
      story:
        'Prinz Adam, Sohn von König Randor und Königin Marlena, wirkt wie ein unbeschwerter junger Mann. Doch wenn Eternia in Gefahr ist, hebt er das Machtschwert und ruft die Kraft von Grayskull an. Als He-Man stellt er sich Skeletor entgegen und trägt dabei die Verantwortung für ein ganzes Königreich.',
      motto: 'Bei der Macht von Grayskull!',
      allies: ['teela', 'man-at-arms', 'sorceress', 'orko', 'battle-cat', 'she-ra'],
      enemies: ['skeletor', 'beast-man', 'evil-lyn'],
      stats: { power: 10, wisdom: 7, courage: 10, magic: 9 },
      facts: [
        'Ohne sein Machtschwert kann sich Adam nicht in He-Man verwandeln.',
        'In der klassischen Serie spricht John Erwin sowohl Prinz Adam als auch He-Man.',
      ],
    },
    {
      id: 'teela',
      name: 'Teela',
      alias: 'Anführerin der Garde',
      title: 'Kapitänin der königlichen Garde',
      faction: 'helden',
      group: 'Eternos',
      home: 'Eternos',
      species: 'Eternianerin',
      era: 'Klassische Ära',
      icon: 'shield',
      colors: ['#f43f5e', '#7f1d1d'],
      short:
        'Disziplin, Kampfkunst und ein Kopf, der sich ungern etwas sagen lässt.',
      story:
        'Teela wächst als Ziehtochter von Man-At-Arms am Hof von Eternos auf und steigt zur Anführerin der königlichen Garde auf. Ihren Mut und ihre Kampfkunst stellt sie immer wieder gegen die Schergen von Snake Mountain unter Beweis. Dass ihr Erbe mit dem Schloss Grayskull verbunden ist, ahnt sie lange nicht.',
      motto: 'Ich brauche keinen Prinzen, der mich rettet.',
      allies: ['he-man', 'man-at-arms', 'sorceress', 'orko'],
      enemies: ['skeletor', 'evil-lyn', 'beast-man'],
      stats: { power: 7, wisdom: 8, courage: 9, magic: 4 },
      facts: [
        'Sie ist die leibliche Tochter der Sorceress und wurde von Man-At-Arms großgezogen.',
        'In neueren Erzählungen übernimmt sie selbst das Amt der Sorceress.',
      ],
    },
    {
      id: 'man-at-arms',
      name: 'Man-At-Arms',
      alias: 'Duncan',
      title: 'Waffenmeister von Eternos',
      faction: 'helden',
      group: 'Eternos',
      home: 'Eternos',
      species: 'Eternianer',
      era: 'Klassische Ära',
      icon: 'gear',
      colors: ['#38bdf8', '#f59e0b'],
      short:
        'Der Mann, der Rüstungen baut, Pläne schmiedet und Geheimnisse bewahrt.',
      story:
        'Duncan, genannt Man-At-Arms, ist der Waffenmeister des Königshauses und ein begnadeter Erfinder. Er kennt Adams Geheimnis und steht ihm als Mentor, Stratege und Freund zur Seite. Seine Werkstatt in Eternos hat schon manche Schlacht entschieden, bevor sie begann.',
      motto: 'Erst denken, dann schmieden.',
      allies: ['he-man', 'teela', 'orko', 'king-randor', 'fisto'],
      enemies: ['skeletor', 'trap-jaw'],
      stats: { power: 8, wisdom: 9, courage: 8, magic: 2 },
      facts: [
        'Er ist Teelas Ziehvater und lehrte sie alles über Disziplin und Kampf.',
        'Seine Rüstung ist zugleich Werkzeugkasten: Fast jeder Sieg beginnt in seiner Werkstatt.',
      ],
    },
    {
      id: 'sorceress',
      name: 'Die Sorceress',
      alias: 'Hüterin von Grayskull / Zoar',
      title: 'Wächterin des Schlosses Grayskull',
      faction: 'helden',
      group: 'Schloss Grayskull',
      home: 'Schloss Grayskull',
      species: 'Magisches Erbe',
      era: 'Alle Zeitalter',
      icon: 'falcon',
      colors: ['#22d3ee', '#a855f7'],
      short:
        'Sie wacht über die Macht, die Eternia zusammenhält – und über die Wahrheit hinter Teelas Herkunft.',
      story:
        'Tief im Inneren von Schloss Grayskull wacht die Sorceress über die Kräfte, die das Gleichgewicht von Eternia sichern. In der Gestalt des Falken Zoar beobachtet sie das Land, und nur wenigen Sterblichen gewährt sie Einblick in die Geheimnisse des Schlosses. Ihr Schicksal ist untrennbar mit He-Man und Teela verbunden.',
      motto: 'Grayskull ruft jene, die zuhören.',
      allies: ['he-man', 'teela', 'king-grayskull', 'orko'],
      enemies: ['skeletor', 'hordak', 'king-hiss'],
      stats: { power: 6, wisdom: 10, courage: 9, magic: 10 },
      facts: [
        'Sie ist Teelas leibliche Mutter.',
        'Als Zoar kann sie in Falkengestalt durch Eternia reisen.',
      ],
    },
    {
      id: 'orko',
      name: 'Orko',
      alias: 'Der Hofmagier',
      title: 'Zauberer von Trolla',
      faction: 'helden',
      group: 'Eternos',
      home: 'Trolla',
      species: 'Trollaner',
      era: 'Klassische Ära',
      icon: 'orb',
      colors: ['#a855f7', '#06b6d4'],
      short:
        'Ein Zauberer, dessen Sprüche selten halten, was sie versprechen – und ein Freund, der immer bleibt.',
      story:
        'Orko stammt vom Planeten Trolla, wo Magie alltäglich ist. Auf Eternia jedoch gehorchen seine Sprüche nur selten – sehr zum Leidwesen seiner Freunde. Hinter dem tollpatschigen Zauberer steckt ein herzlicher Gefährte, der in den dunkelsten Stunden Mut beweist.',
      motto: 'Diesmal klappt der Spruch bestimmt!',
      allies: ['he-man', 'battle-cat', 'teela', 'man-at-arms'],
      enemies: ['skeletor', 'evil-lyn'],
      stats: { power: 2, wisdom: 6, courage: 7, magic: 6 },
      facts: [
        'Auf Eternia wirkt seine Magie oft unvorhersehbar.',
        'Unter seinem Hut verbirgt sich mehr, als man denkt.',
      ],
    },
    {
      id: 'battle-cat',
      name: 'Battle Cat',
      alias: 'Cringer',
      title: 'Adams treuester Gefährte',
      faction: 'helden',
      group: 'Eternos',
      home: 'Eternos',
      species: 'Tiger',
      era: 'Klassische Ära',
      icon: 'cat',
      colors: ['#84cc16', '#dc2626'],
      short:
        'Ein ängstlicher Tiger, der zum gepanzerten Streitross wird, wenn die Macht erwacht.',
      story:
        'Als Cringer ist der grüne Tiger ein eher vorsichtiger Gefährte, der laute Geräusche lieber meidet. Doch die Macht von Grayskull verwandelt ihn in Battle Cat: einen gepanzerten, furchtlosen Verbündeten mit Zähnen. Gemeinsam mit He-Man reitet er in jede Schlacht.',
      motto: 'Kein Ritt für Feiglinge – zum Glück bin ich keiner.',
      allies: ['he-man', 'orko', 'teela'],
      enemies: ['beast-man', 'skeletor'],
      stats: { power: 8, wisdom: 4, courage: 8, magic: 1 },
      facts: [
        'Cringer und Battle Cat sind dieselbe Person – nur mutiger.',
        'Battle Cat trägt eine rote Rüstung und einen Sattel, der zu He-Mans Streitross wird.',
      ],
    },
    {
      id: 'she-ra',
      name: 'She-Ra',
      alias: 'Prinzessin Adora',
      title: 'Prinzessin der Macht',
      faction: 'helden',
      group: 'Etheria',
      home: 'Etheria / Crystal Castle',
      species: 'Eternianerin',
      era: 'Etheria',
      icon: 'star',
      colors: ['#f472b6', '#facc15'],
      short:
        'He-Mans Zwillingsschwester, die auf Etheria zur Anführerin der Großen Rebellion wird.',
      story:
        'Adora, Adams Zwillingsschwester, wurde als Kind von der Bösen Horde verschleppt und auf Etheria großgezogen. Erst als sie das Schwert des Schutzes findet, erkennt sie ihre Herkunft und wird zu She-Ra, der Prinzessin der Macht. An der Spitze der Großen Rebellion kämpft sie gegen Hordak – auf einer Welt, die ihrer eigenen so fremd ist.',
      motto: 'Für die Ehre von Grayskull!',
      allies: ['he-man', 'sorceress', 'queen-marlena'],
      enemies: ['hordak'],
      stats: { power: 9, wisdom: 8, courage: 10, magic: 9 },
      facts: [
        'Sie ist He-Mans Zwillingsschwester.',
        'Ihr Schwert des Schutzes verwandelt sie in She-Ra und ihr Pferd Spirit in Swift Wind.',
      ],
    },
    {
      id: 'king-grayskull',
      name: 'König Grayskull',
      alias: 'Der erste Beschützer',
      title: 'Legendärer Herrscher von Eternia',
      faction: 'helden',
      group: 'Schloss Grayskull',
      home: 'Schloss Grayskull',
      species: 'Antiker Eternianer',
      era: 'Urzeit',
      icon: 'castle',
      colors: ['#fbbf24', '#0e7490'],
      short:
        'Der Held der Urzeit, dessen Vermächtnis Schloss und Macht erst möglich machte.',
      story:
        'Lange vor Adams Zeit verteidigte König Grayskull Eternia gegen die Horde und die Schlangenmenschen. Seine Kraft und sein Vermächtnis wurden zum Fundament des Schlosses, das heute seinen Namen trägt. Sein Geist wacht noch immer über die Mauern – und über die, die würdig sind, seine Macht zu tragen.',
      motto: 'Macht ist nichts ohne den Willen, sie zu schützen.',
      allies: ['sorceress', 'he-man'],
      enemies: ['hordak', 'king-hiss'],
      stats: { power: 10, wisdom: 9, courage: 10, magic: 9 },
      facts: [
        'In der 2002er-Serie ist er ein Vorfahre von Adam und Adora.',
        'Sein Geist erscheint He-Man in den Hallen von Grayskull.',
      ],
    },
    {
      id: 'man-e-faces',
      name: 'Man-E-Faces',
      alias: 'Der Mann mit den drei Gesichtern',
      title: 'Wandelbarer Kämpfer',
      faction: 'helden',
      group: 'Grayskull',
      home: 'Eternia',
      species: 'Eternianer',
      era: 'Klassische Ära',
      icon: 'mask',
      colors: ['#f97316', '#6366f1'],
      short:
        'Mensch, Monster oder Maschine – seine Gesichter machen ihn unberechenbar.',
      story:
        'Man-E-Faces kann sein Gesicht wechseln: vom Menschen zum Monster und weiter zum Roboter. Diese Gabe macht ihn zu einem unberechenbaren Kämpfer und zu einem schwierigen Verbündeten. Doch unter allen Masken steckt ein loyaler Verteidiger von Eternia.',
      motto: 'Du weißt nie, wen du bekommst.',
      allies: ['he-man', 'ram-man', 'fisto'],
      enemies: ['skeletor', 'beast-man'],
      stats: { power: 7, wisdom: 6, courage: 7, magic: 3 },
      facts: [
        'Seine drei Gesichter stehen für Mensch, Monster und Maschine.',
        'Er kann zwischen ihnen wechseln – ein Vorteil in fast jeder Lage.',
      ],
    },
    {
      id: 'ram-man',
      name: 'Ram-Man',
      alias: 'Der menschliche Rammbock',
      title: 'Durchbrecher der feindlichen Reihen',
      faction: 'helden',
      group: 'Grayskull',
      home: 'Eternia',
      species: 'Eternianer',
      era: 'Klassische Ära',
      icon: 'ram',
      colors: ['#b45309', '#dc2626'],
      short:
        'Wo eine Wand steht, ist Ram-Man schon fast durch – mit dem Kopf voran.',
      story:
        'Ram-Man ist ein wandelnder Rammbock: Mit seinen gepanzerten Helmhörnern durchbricht er Mauern, Tore und die Reihen der Feinde. Hinter der rauen Schale steckt ein gutmütiger Kämpfer, der für seine Freunde alles gibt – auch wenn er manchmal erst nachdenkt, nachdem er losgestürmt ist.',
      motto: 'Kopf hoch – und dann geradeaus!',
      allies: ['he-man', 'man-e-faces', 'fisto'],
      enemies: ['skeletor', 'trap-jaw'],
      stats: { power: 9, wisdom: 3, courage: 8, magic: 0 },
      facts: [
        'Sein Markenzeichen ist der Sprung mit dem Kopf voran.',
        'Er gehört zu den treuesten Mitgliedern der Helden von Grayskull.',
      ],
    },
    {
      id: 'fisto',
      name: 'Fisto',
      alias: 'Die eiserne Faust',
      title: 'Kämpfer mit der Metallfaust',
      faction: 'helden',
      group: 'Grayskull',
      home: 'Eternia',
      species: 'Eternianer',
      era: 'Klassische Ära',
      icon: 'fist',
      colors: ['#f59e0b', '#78716c'],
      short:
        'Eine Faust aus Metall, ein trockener Spruch und ein Fels, der besser in Deckung geht.',
      story:
        'Fisto verdankt seinen Namen seiner gewaltigen Metallfaust, die Fels und Rüstung gleichermaßen zerschmettert. Als erfahrener Kämpfer und Freund von Man-At-Arms verteidigt er Eternia mit einer Mischung aus Kraft und trockenem Humor.',
      motto: 'Manchmal hilft nur eine eiserne Faust.',
      allies: ['man-at-arms', 'he-man', 'ram-man'],
      enemies: ['skeletor', 'clawful'],
      stats: { power: 9, wisdom: 6, courage: 8, magic: 1 },
      facts: [
        'In späteren Continuities gilt er als Bruder von Man-At-Arms.',
        'Seine Faust ist zugleich Werkzeug und Waffe.',
      ],
    },
    {
      id: 'moss-man',
      name: 'Moss Man',
      alias: 'Wächter des Waldes',
      title: 'Hüter der grünen Wildnis',
      faction: 'helden',
      group: 'Grayskull',
      home: 'Wälder von Eternia',
      species: 'Naturwächter',
      era: 'Klassische Ära',
      icon: 'leaf',
      colors: ['#4d7c0f', '#166534'],
      short:
        'Ein Mooswesen, das im Wald verschwindet und für ihn kämpft, wenn es sein muss.',
      story:
        'Moss Man ist eins mit den Wäldern Eternias. Sein Moosmantel tarnt ihn, seine Kraft speist sich aus der Natur selbst. Wo andere nur Bäume sehen, hört er das Flüstern des Waldes – und er verteidigt es gegen jede Bedrohung.',
      motto: 'Der Wald vergisst nichts.',
      allies: ['he-man', 'buzz-off', 'stratos'],
      enemies: ['beast-man', 'skeletor'],
      stats: { power: 7, wisdom: 6, courage: 7, magic: 4 },
      facts: [
        'Sein Moos kann ihn nahezu unsichtbar machen.',
        'Er ist einer der wenigen Helden, die sich vollständig der Natur Eternias verschrieben haben.',
      ],
    },
    {
      id: 'buzz-off',
      name: 'Buzz-Off',
      alias: 'Späher der Andreeniden',
      title: 'Fliegender Kundschafter',
      faction: 'helden',
      group: 'Grayskull',
      home: 'Andreeniden-Königreich',
      species: 'Andreenide',
      era: 'Klassische Ära',
      icon: 'wings',
      colors: ['#eab308', '#1f2937'],
      short:
        'Ein insektoider Späher, der von oben sieht, was am Boden zur Falle wird.',
      story:
        'Buzz-Off entstammt dem Bienenvolk der Andreeniden und dient als fliegender Späher und Kundschafter. Seine Flügel machen ihn schnell, seine Facettenaugen unbestechlich. Auch wenn er manchmal stichelt, steht er in der Schlacht fest an He-Mans Seite.',
      motto: 'Von oben sieht man jede Falle.',
      allies: ['he-man', 'moss-man', 'stratos'],
      enemies: ['skeletor', 'webstor'],
      stats: { power: 6, wisdom: 7, courage: 8, magic: 2 },
      facts: [
        'Andreeniden sind ein insektenartiges Volk mit eigenen Königen.',
        'Seine Flügel ermöglichen schnelle Aufklärung aus der Luft.',
      ],
    },
    {
      id: 'king-randor',
      name: 'König Randor',
      alias: 'Herrscher von Eternos',
      title: 'König von Eternos',
      faction: 'verbuendete',
      group: 'Eternos',
      home: 'Eternos',
      species: 'Eternianer',
      era: 'Klassische Ära',
      icon: 'crown',
      colors: ['#f59e0b', '#7c3aed'],
      short:
        'Ein König, der sein Volk schützt – und nicht ahnt, welches Doppelleben sein Sohn führt.',
      story:
        'Randor regiert Eternos mit dem Anspruch, sein Volk zu schützen – notfalls mit dem Schwert. Als Vater von Adam und Adora trägt er eine schwere Last, denn in der klassischen Erzählung ahnt er lange nicht, welches Doppelleben sein Sohn führt. In der 2002er-Neuinterpretation ist er zudem mit dem Schicksal seines Halbbruders Keldor verbunden.',
      motto: 'Ein König dient zuerst seinem Volk.',
      allies: ['queen-marlena', 'he-man', 'man-at-arms', 'teela'],
      enemies: ['skeletor', 'hordak'],
      stats: { power: 7, wisdom: 8, courage: 8, magic: 1 },
      facts: [
        'Er ist der Vater von Prinz Adam und Prinzessin Adora.',
        'In der 2002er-Serie ist Keldor – der spätere Skeletor – sein Halbbruder.',
      ],
    },
    {
      id: 'queen-marlena',
      name: 'Königin Marlena',
      alias: 'Die Frau von den Sternen',
      title: 'Königin von Eternos',
      faction: 'verbuendete',
      group: 'Eternos',
      home: 'Eternos',
      species: 'Erdenmensch',
      era: 'Klassische Ära',
      icon: 'comet',
      colors: ['#38bdf8', '#fbbf24'],
      short:
        'Eine Astronautin von der Erde, die auf Eternia eine Heimat und eine Familie fand.',
      story:
        'Marlena kam als Astronautin von der Erde nach Eternia – und blieb. Als Königin an Randors Seite bringt sie diplomatisches Geschick und einen Blick von außen in den Hof von Eternos. Ihre Zwillinge Adam und Adora verbinden zwei Welten, deren Schicksale tief miteinander verwoben sind.',
      motto: 'Heimat ist kein Ort. Sie ist eine Entscheidung.',
      allies: ['king-randor', 'he-man', 'she-ra'],
      enemies: ['skeletor', 'hordak'],
      stats: { power: 5, wisdom: 9, courage: 9, magic: 1 },
      facts: [
        'Sie stammt von der Erde und war Teil einer Raumfahrtmission.',
        'Ihre Tochter Adora wuchs auf Etheria auf.',
      ],
    },
    {
      id: 'stratos',
      name: 'Stratos',
      alias: 'Herr der Lüfte',
      title: 'Hüter des Luftraums',
      faction: 'verbuendete',
      group: 'Avion',
      home: 'Avion',
      species: 'Avionier',
      era: 'Klassische Ära',
      icon: 'wind',
      colors: ['#38bdf8', '#e2e8f0'],
      short:
        'Ein geflügelter Avionier, der den Himmel über Eternia besser kennt als jeder andere.',
      story:
        'Stratos ist ein Avionier aus den schwebenden Bergen und der Hüter des Luftraums. Mit seinen Flügeln und seinem Jetpack kontrolliert er den Himmel über Eternia. Er misstraut Bodenkämpfen, doch wenn es darauf ankommt, landet er mitten im Getümmel.',
      motto: 'Der Himmel gehört jenen, die ihn achten.',
      allies: ['he-man', 'buzz-off', 'moss-man'],
      enemies: ['skeletor', 'webstor'],
      stats: { power: 7, wisdom: 7, courage: 8, magic: 2 },
      facts: [
        'Avionier leben in den Bergen und beherrschen die Lüfte.',
        'Sein Jetpack macht ihn zu einem der schnellsten Helden Eternias.',
      ],
    },
    {
      id: 'zodac',
      name: 'Zodac',
      alias: 'Der kosmische Wächter',
      title: 'Hüter des Gleichgewichts',
      faction: 'verbuendete',
      group: 'Kosmischer Rat',
      home: 'Unbekannt',
      species: 'Kosmisches Wesen',
      era: 'Alle Zeitalter',
      icon: 'scales',
      colors: ['#94a3b8', '#8b5cf6'],
      short:
        'Er kämpft nicht für eine Seite, sondern für ein Gleichgewicht, das nur er versteht.',
      story:
        'Zodac steht außerhalb der Schlachtordnung. Als kosmischer Wächter beobachtet er das Gleichgewicht der Mächte und greift nur ein, wenn es zu kippen droht. Für He-Man ist er mal Verbündeter, mal Rätsel – niemals jedoch ein einfacher Mitstreiter.',
      motto: 'Das Gleichgewicht kennt keine Freunde.',
      allies: ['sorceress'],
      enemies: [],
      stats: { power: 7, wisdom: 10, courage: 7, magic: 9 },
      facts: [
        'Als kosmischer Wächter greift er nur ein, wenn das Gleichgewicht der Mächte zu kippen droht.',
        'In der klassischen Serie bleibt seine Rolle zwischen Beobachter und Verbündetem bewusst unklar.',
      ],
    },
    {
      id: 'granamyr',
      name: 'Granamyr',
      alias: 'Der älteste Drache',
      title: 'Weisester der Drachen',
      faction: 'verbuendete',
      group: 'Drachenberge',
      home: 'Drachenberge',
      species: 'Drache',
      era: 'Urzeit',
      icon: 'flame',
      colors: ['#dc2626', '#f59e0b'],
      short:
        'Ein uralter Drache, der Menschen misstraut – und He-Man respektiert.',
      story:
        'Granamyr ist ein uralter Drache und einer der wenigen, die sich an das Zeitalter vor den Menschen erinnern. Er begegnet He-Man mit Misstrauen, doch Respekt und Mut beeindrucken ihn. Wenn er eingreift, verändert sein Feuer das Schlachtfeld.',
      motto: 'Menschen kommen und gehen. Drachen bleiben.',
      allies: ['he-man'],
      enemies: ['skeletor'],
      stats: { power: 10, wisdom: 9, courage: 8, magic: 9 },
      facts: [
        'Er ist der älteste und weiseste Drache Eternias.',
        'In der klassischen Serie begegnet er He-Man mit Misstrauen und stellt ihn auf die Probe.',
      ],
    },
    {
      id: 'skeletor',
      name: 'Skeletor',
      alias: 'Keldor (in späteren Erzählungen)',
      title: 'Herr von Snake Mountain',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Eternianer (entstellt)',
      era: 'Alle Zeitalter',
      icon: 'skull',
      colors: ['#8b5cf6', '#22d3ee'],
      short:
        'Der Schädel ohne Gesicht und der Ehrgeiz ohne Grenzen – Eternias größte Bedrohung.',
      story:
        'Skeletor ist die wohl größte Bedrohung Eternias: ein blauhäutiger Zauberer mit Totenkopfgesicht und brennendem Ehrgeiz. Von Snake Mountain aus schmiedet er immer neue Pläne, um die Macht von Grayskull zu erlangen. Seine Schergen fürchten ihn, seine Feinde unterschätzen ihn nie.',
      motto: 'Grayskull wird mir gehören!',
      allies: ['evil-lyn', 'beast-man', 'trap-jaw', 'tri-klops', 'mer-man'],
      enemies: ['he-man', 'sorceress', 'teela'],
      stats: { power: 9, wisdom: 9, courage: 7, magic: 10 },
      facts: [
        'In der 2002er-Serie hat er als Keldor noch ein Gesicht – erst Hordaks Rettung macht daraus den Schädel.',
        'Sein Ziel ist die Macht von Schloss Grayskull – seit Jahrzehnten.',
      ],
    },
    {
      id: 'evil-lyn',
      name: 'Evil-Lyn',
      alias: 'Die Hexe von Snake Mountain',
      title: 'Mächtigste Zauberin des Bösen',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Eternianerin (Hexe)',
      era: 'Klassische Ära',
      icon: 'eye',
      colors: ['#a855f7', '#facc15'],
      short:
        'Skeletors mächtigste Verbündete – und die Einzige, die eigene Pläne verfolgt.',
      story:
        'Evil-Lyn ist die mächtigste Zauberin unter Skeletors Gefolgsleuten – und die einzige, die ihm gefährlich werden könnte. Sie beherrscht Illusionen, Blitze und dunkle Rituale und verfolgt eigene Pläne, die oft über Skeletors Ziele hinausgehen. Ihre Kälte täuscht: Hinter ihr steht eine komplizierte Geschichte.',
      motto: 'Macht teilt man nicht.',
      allies: ['skeletor', 'beast-man'],
      enemies: ['sorceress', 'teela', 'he-man'],
      stats: { power: 6, wisdom: 9, courage: 8, magic: 10 },
      facts: [
        'In der 2002er-Serie ist sie die Tochter des Faceless One.',
        'Sie ist Skeletors mächtigste und eigenständigste Verbündete.',
      ],
    },
    {
      id: 'beast-man',
      name: 'Beast Man',
      alias: 'Herr der Bestien',
      title: 'Tierbändiger von Snake Mountain',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Bestienmensch',
      era: 'Klassische Ära',
      icon: 'paw',
      colors: ['#ea580c', '#7c2d12'],
      short:
        'Rohe Kraft, scharfe Sinne und eine Geduld, die ungefähr drei Sekunden hält.',
      story:
        'Beast Man ist Skeletors Tierbändiger und Prügelknabe zugleich. Seine rohe Kraft und seine Fähigkeit, wilde Kreaturen zu befehligen, machen ihn gefährlich – seine Ungeduld macht ihn angreifbar. Wer ihm eine Falle stellt, muss nur warten, bis er hineinstürmt.',
      motto: 'Die Bestien gehorchen mir!',
      allies: ['skeletor', 'mer-man', 'trap-jaw'],
      enemies: ['battle-cat', 'teela', 'he-man'],
      stats: { power: 8, wisdom: 3, courage: 6, magic: 2 },
      facts: [
        'Er kann Tiere mit seiner Stimme beeinflussen.',
        'Battle Cat ist sein erklärter Lieblingsfeind.',
      ],
    },
    {
      id: 'mer-man',
      name: 'Mer-Man',
      alias: 'Herrscher der Tiefe',
      title: 'Kriegsherr der Ozeane',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Die Tiefsee',
      species: 'Meereswesen',
      era: 'Klassische Ära',
      icon: 'trident',
      colors: ['#0ea5e9', '#065f46'],
      short:
        'Im Wasser kaum zu besiegen, an Land ständig fehl am Platz – und immer auf der Suche nach Vorteilen.',
      story:
        'Mer-Man herrscht über die Meere Eternias und die Kreaturen der Tiefe. An Land ist er fehl am Platz, im Wasser jedoch kaum zu besiegen. Er dient Skeletor, solange es ihm Vorteile bringt – und träumt von einem Ozean, der ihm allein gehört.',
      motto: 'Die Tiefe vergisst keinen Verrat.',
      allies: ['skeletor', 'beast-man', 'whiplash'],
      enemies: ['he-man', 'stratos'],
      stats: { power: 7, wisdom: 6, courage: 7, magic: 6 },
      facts: [
        'Er kann Unterwasserwesen rufen und befehligen.',
        'Sein Reich liegt in den Ozeanen rund um Eternia.',
      ],
    },
    {
      id: 'trap-jaw',
      name: 'Trap Jaw',
      alias: 'Die lebende Waffe',
      title: 'Cyborg-Scherge Skeletors',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Cyborg',
      era: 'Klassische Ära',
      icon: 'jaw',
      colors: ['#9333ea', '#65a30d'],
      short:
        'Ein Cyborg mit austauschbaren Waffen – und einer Schwäche für die falsche Klinge.',
      story:
        'Trap Jaw ist ein Cyborg aus Eisen und Bosheit. Sein mechanischer Arm lässt sich in Klaue, Kanone oder Säge verwandeln, sein Kiefer aus Metall beißt durch fast alles. Wo andere planen, schlägt er zu – meistens mit dem falschen Werkzeug.',
      motto: 'Ich habe für jedes Problem das richtige Werkzeug.',
      allies: ['skeletor', 'tri-klops', 'beast-man'],
      enemies: ['he-man', 'man-at-arms'],
      stats: { power: 8, wisdom: 5, courage: 7, magic: 2 },
      facts: [
        'Sein Arm kann verschiedene Waffen tragen.',
        'Er gilt als cyborgischer Schwerverbrecher aus einer dunklen Vergangenheit.',
      ],
    },
    {
      id: 'tri-klops',
      name: 'Tri-Klops',
      alias: 'Der dreiäugige Späher',
      title: 'Jäger und Kundschafter',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Eternianer',
      era: 'Klassische Ära',
      icon: 'three-eyes',
      colors: ['#22c55e', '#7c3aed'],
      short:
        'Drei Augen, drei Blickwinkel – und die Geduld, den richtigen Moment abzuwarten.',
      story:
        'Tri-Klops sieht, was anderen verborgen bleibt: Wärme, Bewegung, magische Spuren. Mit seinen drei Augen ist er Skeletors oberster Späher und Jäger. Sein Blick kann blenden, seine Geduld ist legendär – zumindest, wenn er nicht gerade überlistet wird.',
      motto: 'Ich sehe dich, bevor du mich siehst.',
      allies: ['skeletor', 'trap-jaw'],
      enemies: ['he-man', 'teela'],
      stats: { power: 7, wisdom: 8, courage: 6, magic: 4 },
      facts: [
        'Seine drei Augen können unterschiedliche Spektren wahrnehmen.',
        'Sein Blick kann Gegner blenden.',
      ],
    },
    {
      id: 'whiplash',
      name: 'Whiplash',
      alias: 'Die Peitsche von Snake Mountain',
      title: 'Reptilienkrieger',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Reptilienmensch',
      era: 'Klassische Ära',
      icon: 'tail',
      colors: ['#16a34a', '#0f766e'],
      short:
        'Ein Schwanz wie ein Rammbock und ein Temperament, das keine Strategie braucht.',
      story:
        'Whiplash ist ein Reptilienkrieger mit einem gewaltigen, peitschenden Schwanz. Er kämpft roh, direkt und ohne große Strategie – was ihn gefährlich macht, wenn man ihn unterschätzt. Im Wasser und an Land fühlt er sich gleichermaßen zu Hause.',
      motto: 'Mein Schwanz trifft immer.',
      allies: ['skeletor', 'mer-man', 'kobra-khan'],
      enemies: ['he-man', 'fisto'],
      stats: { power: 8, wisdom: 4, courage: 6, magic: 3 },
      facts: [
        'Sein Schwanz kann Panzerplatten durchschlagen.',
        'Er teilt sich den Lebensraum mit den Schlangenmenschen.',
      ],
    },
    {
      id: 'clawful',
      name: 'Clawful',
      alias: 'Die Schere des Verderbens',
      title: 'Krebskrieger Skeletors',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Krebsmensch',
      era: 'Klassische Ära',
      icon: 'claw',
      colors: ['#f97316', '#7f1d1d'],
      short:
        'Stark, stachelig und mit einer Schere ausgestattet, die Stahl wie Papier zerschneidet.',
      story:
        'Clawful ist ein muskulöser Krebskrieger mit einer Schere, die Stahl wie Papier zerschneidet. Er ist nicht der klügste Kopf in Skeletors Reihen, aber einer der stärksten Kämpfer. Wer ihm zu nahe kommt, verliert schnell mehr als nur seine Deckung.',
      motto: 'Komm näher. Ich beiße nicht – ich schneide.',
      allies: ['skeletor', 'whiplash'],
      enemies: ['he-man', 'fisto', 'ram-man'],
      stats: { power: 8, wisdom: 3, courage: 7, magic: 1 },
      facts: [
        'Seine Schere kann Metall durchtrennen.',
        'Er ist einer der stärksten Handlanger Skeletors.',
      ],
    },
    {
      id: 'webstor',
      name: 'Webstor',
      alias: 'Die Spinne im Schatten',
      title: 'Kletterer und Dieb',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Spinnenwesen',
      era: 'Klassische Ära',
      icon: 'spider',
      colors: ['#6b7280', '#7c3aed'],
      short:
        'Er lauert an Decken und in Felsspalten – und ist weg, bevor du dich umdrehst.',
      story:
        'Webstor lauert dort, wo niemand hinsieht: an Decken, in Felsspalten, hinter Mauern. Mit seinen Spinnengliedern klettert er jede Wand hinauf und verschwindet ebenso schnell wieder. Er ist Skeletors Dieb und Kundschafter – und ein Meister darin, anderen die Flucht zu verwehren.',
      motto: 'Jedes Netz hat einen Ausgang. Meines nicht.',
      allies: ['skeletor', 'beast-man'],
      enemies: ['buzz-off', 'stratos', 'he-man'],
      stats: { power: 6, wisdom: 7, courage: 7, magic: 2 },
      facts: [
        'Seine langen Gliedmaßen machen ihn zu einem meisterhaften Kletterer.',
        'Er ist Skeletors bevorzugter Dieb für heikle Aufträge.',
      ],
    },
    {
      id: 'two-bad',
      name: 'Two-Bad',
      alias: 'Zwei Köpfe, ein Problem',
      title: 'Der streitende Krieger',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Verschmolzene Krieger',
      era: 'Klassische Ära',
      icon: 'two-heads',
      colors: ['#0ea5e9', '#a855f7'],
      short:
        'Ein Körper, zwei Köpfe – und ein Streit, der nie endet.',
      story:
        'Two-Bad ist ein Körper mit zwei Köpfen, die selten einer Meinung sind. Der eine will kämpfen, der andere fliehen; beide beschuldigen sich gegenseitig. Für Skeletor ist das ein ständiges Ärgernis – für seine Gegner eine unberechenbare Bedrohung.',
      motto: 'Ich bin dafür! Ich bin dagegen!',
      allies: ['skeletor', 'spikor'],
      enemies: ['he-man', 'ram-man'],
      stats: { power: 8, wisdom: 4, courage: 5, magic: 2 },
      facts: [
        'Seine beiden Köpfe – Tuvar und Baddrah – streiten fast ständig.',
        'In späteren Erzählungen wurden sie durch Skeletors Magie verschmolzen.',
      ],
    },
    {
      id: 'spikor',
      name: 'Spikor',
      alias: 'Der Stachelpanzer',
      title: 'Lebender Morgenstern',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Mutant',
      era: 'Klassische Ära',
      icon: 'spikes',
      colors: ['#65a30d', '#dc2626'],
      short:
        'Von Kopf bis Fuß mit Stacheln besetzt – Umarmungen sind keine gute Idee.',
      story:
        'Spikor ist von Kopf bis Fuß mit Stacheln bedeckt – ein lebender Morgenstern. Wer ihn umarmen will, bereut es sofort; wer ihn unterschätzt, ebenfalls. Seine Keule und sein Stachelpanzer machen ihn zum Rammbock unter Skeletors Kriegern.',
      motto: 'Näher. Nur ein bisschen näher.',
      allies: ['skeletor', 'two-bad'],
      enemies: ['he-man', 'ram-man'],
      stats: { power: 8, wisdom: 3, courage: 7, magic: 1 },
      facts: [
        'Sein gesamter Körper ist mit Stacheln besetzt.',
        'Seine Waffe ist eine stachelige Keule.',
      ],
    },
    {
      id: 'stinkor',
      name: 'Stinkor',
      alias: 'Die wandelnde Gestankwolke',
      title: 'Skunk-Mutant',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Skunk-Mutant',
      era: 'Klassische Ära',
      icon: 'stink',
      colors: ['#a3e635', '#78350f'],
      short:
        'Man riecht ihn, bevor man ihn sieht – und wünscht sich oft, man hätte es nicht getan.',
      story:
        'Stinkor ist ein Skunk-Mutant, dessen Geruch selbst hartgesottene Helden in die Flucht treibt. Skeletor setzt ihn ein, wo Einschüchterung mehr zählt als Präzision. Hinter der üblen Duftwolke steckt ein überraschend zäher Kämpfer.',
      motto: 'Man riecht mich, bevor man mich sieht.',
      allies: ['skeletor', 'beast-man'],
      enemies: ['he-man', 'moss-man'],
      stats: { power: 6, wisdom: 4, courage: 6, magic: 2 },
      facts: [
        'Sein Gestank kann Gegner kampfunfähig machen.',
        'Er ist einer der ungewöhnlichsten Schergen von Snake Mountain.',
      ],
    },
    {
      id: 'faker',
      name: 'Faker',
      alias: 'Die falsche Macht',
      title: 'Roboterkopie von He-Man',
      faction: 'schurken',
      group: 'Snake Mountain',
      home: 'Snake Mountain',
      species: 'Roboter',
      era: 'Klassische Ära',
      icon: 'robot',
      colors: ['#06b6d4', '#dc2626'],
      short:
        'Eine blaue Kopie He-Mans, gebaut für Verwirrung, Verrat und einen Moment der Unsicherheit.',
      story:
        'Faker ist eine Roboterkopie von He-Man, geschaffen, um Verwirrung zu säen und Grayskull von innen zu bedrohen. Mit blauer Haut und roten Augen ist er auf den ersten Blick zu erkennen – wenn man genau hinsieht. Sein größter Vorteil ist nicht Stärke, sondern Täuschung.',
      motto: 'Ich bin He-Man. Wirklich.',
      allies: ['skeletor', 'evil-lyn'],
      enemies: ['he-man', 'teela', 'orko'],
      stats: { power: 8, wisdom: 3, courage: 4, magic: 2 },
      facts: [
        'Er wurde von Skeletor als Doppelgänger He-Mans erschaffen.',
        'Seine roten Augen verraten die Maschine.',
      ],
    },
    {
      id: 'hordak',
      name: 'Hordak',
      alias: 'Anführer der Bösen Horde',
      title: 'Eroberer aus Etheria',
      faction: 'schurken',
      group: 'Die Böse Horde',
      home: 'Fright Zone, Etheria',
      species: 'Hordenlord',
      era: 'Etheria',
      icon: 'bat',
      colors: ['#dc2626', '#1e1b4b'],
      short:
        'Ein uralter Eroberer, der Keldor rettete – und damit Skeletor erst möglich machte.',
      story:
        'Hordak ist ein uralter Eroberer und Meister der Dunklen Magie. Er führte die Böse Horde gegen Eternia, bevor er sich nach Etheria zurückzog – und er war es, der den jungen Keldor rettete und zu Skeletor formte. Wo er auftaucht, wird aus einem Krieg ein Albtraum.',
      motto: 'Die Horde kennt keine Gnade.',
      allies: ['skeletor'],
      enemies: ['he-man', 'she-ra', 'king-grayskull'],
      stats: { power: 9, wisdom: 9, courage: 7, magic: 10 },
      facts: [
        'In der 2002er-Serie ist er Skeletors Mentor.',
        'Er ist der große Gegenspieler von She-Ra auf Etheria.',
      ],
    },
    {
      id: 'king-hiss',
      name: 'King Hiss',
      alias: 'König der Schlangenmenschen',
      title: 'Uralter Herrscher der Tiefe',
      faction: 'schurken',
      group: 'Schlangenmenschen',
      home: 'Unter Snake Mountain',
      species: 'Schlangenmensch',
      era: 'Urzeit',
      icon: 'serpent',
      colors: ['#16a34a', '#facc15'],
      short:
        'Ein versiegelter König, der auf seine Rückkehr wartet – geduldig wie eine Schlange.',
      story:
        'King Hiss ist der uralte Herrscher der Schlangenmenschen, der einst Eternia bedrohte. Unter Snake Mountain versiegelt, wartet er auf den Moment seiner Rückkehr. Seine hypnotische Kraft und seine List machen ihn zu einem Feind, der nicht mit roher Gewalt zu besiegen ist.',
      motto: 'Die Schlangen waren hier, bevor die Menschen kamen.',
      allies: ['kobra-khan'],
      enemies: ['he-man', 'king-grayskull', 'sorceress'],
      stats: { power: 8, wisdom: 9, courage: 6, magic: 8 },
      facts: [
        'Er wurde unter Snake Mountain eingesperrt.',
        'In der 2002er-Serie kehren die Schlangenmenschen zurück.',
      ],
    },
    {
      id: 'kobra-khan',
      name: 'Kobra Khan',
      alias: 'Der Schlangenspäher',
      title: 'Wendiger Diener der Schlangen',
      faction: 'schurken',
      group: 'Schlangenmenschen',
      home: 'Snake Mountain',
      species: 'Schlangenmensch',
      era: 'Klassische Ära',
      icon: 'cobra',
      colors: ['#22c55e', '#f97316'],
      short:
        'Ein Schlangenmensch, der die Seiten wechselt, sobald seine eigene Haut in Gefahr ist.',
      story:
        'Kobra Khan ist ein Schlangenmensch, der zwischen den Fronten wechselt und seine eigene Haut rettet. Sein betäubender Nebel und seine Kontrolle über Reptilien machen ihn zum gefährlichen Spion. Loyal ist er nur, solange der Vorteil auf seiner Seite liegt.',
      motto: 'Die Schlange wartet. Immer.',
      allies: ['king-hiss', 'skeletor'],
      enemies: ['he-man', 'teela'],
      stats: { power: 6, wisdom: 7, courage: 6, magic: 4 },
      facts: [
        'Er kann einen betäubenden Nebel versprühen.',
        'In der 2002er-Serie verbündet er sich mit den Schlangenmenschen.',
      ],
    },
  ],
};
