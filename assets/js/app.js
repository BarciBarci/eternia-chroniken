(function () {
  'use strict';

  const DATA = window.ETERNIA;

  if (!DATA || !Array.isArray(DATA.characters)) {
    document.documentElement.classList.remove('js');
    console.error('Eternia Chroniken: Datenbasis (assets/js/data.js) nicht gefunden.');
    return;
  }

  const characters = DATA.characters;
  const charById = new Map(characters.map((character) => [character.id, character]));
  const factions = DATA.factions || {};
  const companions = (DATA.companions || [])
    .map((entry) => ({ ...entry, character: charById.get(entry.id) }))
    .filter((entry) => entry.character);

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionBehavior = () => (reduceMotion.matches ? 'auto' : 'smooth');

  const state = {
    filter: 'alle',
    query: '',
  };

  const filterLabels = {
    alle: 'allen Fraktionen',
    helden: 'den Helden',
    verbuendete: 'den Verbündeten',
    schurken: 'den Schurken',
  };

  const dom = {
    header: $('#site-header'),
    menuToggle: $('#menu-toggle'),
    mobileNav: $('#mobile-nav'),
    themeToggle: $('#theme-toggle'),
    progress: $('#scroll-progress-bar'),
    toTop: $('#to-top'),
    starfield: $('#starfield'),
    storyGrid: $('#story-grid'),
    companionTabs: $('#companion-tabs'),
    companionPanel: $('#companion-panel'),
    characterGrid: $('#character-grid'),
    searchInput: $('#search-input'),
    searchClear: $('#search-clear'),
    filterChips: $('#filter-chips'),
    rosterCount: $('#roster-count'),
    rosterFilterLabel: $('#roster-filter-label'),
    emptyState: $('#empty-state'),
    resetFilters: $('#reset-filters'),
    randomBtn: $('#random-btn'),
    timeline: $('#timeline'),
    factGrid: $('#fact-grid'),
    dialog: $('#character-dialog'),
    dialogPanel: $('#dialog-panel'),
    dialogArt: $('#dialog-art'),
    dialogBody: $('#dialog-body'),
    dialogClose: $('#dialog-close'),
    powerBtn: $('#power-btn'),
    powerFlash: $('#power-flash'),
    sparkLayer: $('#spark-layer'),
    toast: $('#toast'),
    announcer: $('#sr-announcer'),
    year: $('#year'),
  };

  let dialogOpen = false;
  let currentCharacterId = null;
  let lastFocusedElement = null;
  let previousHash = '';
  let menuOpen = false;
  let identityBuffer = '';
  let toastTimer = 0;
  let powerTimer = 0;
  let starfield = null;

  /* -----------------------------------------------------------------------
     Helfer
     ----------------------------------------------------------------------- */

  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => htmlEscapes[character]);
  }

  function icon(name, className = '') {
    return `<svg class="icon${className ? ' ' + className : ''}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  }

  function normalize(value) {
    return String(value ?? '')
      .toLocaleLowerCase('de')
      .replace(/ß/g, 'ss')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function factionLabel(key) {
    return (factions[key] && factions[key].label) || key;
  }

  function factionTitle(key) {
    return (factions[key] && factions[key].title) || factionLabel(key);
  }

  function announcement(message) {
    if (!dom.announcer) return;
    dom.announcer.textContent = '';
    window.setTimeout(() => {
      dom.announcer.textContent = message;
    }, 40);
  }

  function showToast(message) {
    if (!dom.toast) return;
    window.clearTimeout(toastTimer);
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => {
      dom.toast.classList.remove('is-visible');
    }, 2800);
  }

  function isTypingTarget(target) {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
  }

  function initialsFor(character) {
    const match = String(character.name || 'E').match(/[A-Za-zÄÖÜäöü]/);
    return match ? match[0].toUpperCase() : 'E';
  }

  function portraitMarkup(character, extraClass = '') {
    const colors = Array.isArray(character.colors) ? character.colors : ['#f6c453', '#7c3aed'];
    return `<span class="portrait${extraClass ? ' ' + extraClass : ''}" style="--c1:${escapeHtml(colors[0])};--c2:${escapeHtml(colors[1])}">
      <span class="portrait__letter" aria-hidden="true">${escapeHtml(initialsFor(character))}</span>
      <span class="portrait__ring" aria-hidden="true"></span>
      <span class="portrait__ring portrait__ring--dash" aria-hidden="true"></span>
      ${icon(character.icon, 'portrait__icon')}
      <span class="portrait__spark" aria-hidden="true"></span>
    </span>`;
  }

  function buildSearchIndex() {
    characters.forEach((character) => {
      character._search = normalize(
        [
          character.name,
          character.alias,
          character.title,
          character.group,
          character.species,
          character.home,
          character.short,
          factionLabel(character.faction),
        ].join(' ')
      );
    });
  }

  function validateContent() {
    const issues = [];
    const ids = new Set();
    const requiredFields = [
      'id',
      'name',
      'alias',
      'title',
      'faction',
      'group',
      'home',
      'species',
      'era',
      'icon',
      'short',
      'story',
      'motto',
    ];
    const statKeys = ['power', 'wisdom', 'courage', 'magic'];

    characters.forEach((character, index) => {
      const label = character.id || `Figur #${index + 1}`;

      requiredFields.forEach((field) => {
        if (typeof character[field] !== 'string' || !character[field].trim()) {
          issues.push(`${label}: Feld „${field}“ fehlt.`);
        }
      });

      if (character.id) {
        if (ids.has(character.id)) issues.push(`Doppelte ID: „${character.id}“.`);
        ids.add(character.id);
      }

      if (character.faction && !factions[character.faction]) {
        issues.push(`${label}: unbekannte Fraktion „${character.faction}“.`);
      }

      if (character.icon && !document.getElementById('i-' + character.icon)) {
        issues.push(`${label}: Icon „${character.icon}“ fehlt im Sprite.`);
      }

      if (
        !Array.isArray(character.colors) ||
        character.colors.length !== 2 ||
        !character.colors.every((color) => /^#[0-9a-f]{6}$/i.test(color))
      ) {
        issues.push(`${label}: colors müssen aus zwei Hex-Farben bestehen.`);
      }

      if (!character.stats) {
        issues.push(`${label}: stats fehlen.`);
      } else {
        statKeys.forEach((key) => {
          const value = character.stats[key];
          if (!Number.isFinite(value) || value < 0 || value > 10) {
            issues.push(`${label}: stats.${key} muss eine Zahl zwischen 0 und 10 sein.`);
          }
        });
      }

      ['allies', 'enemies'].forEach((key) => {
        (Array.isArray(character[key]) ? character[key] : []).forEach((reference) => {
          if (!charById.has(reference)) {
            issues.push(`${label}: ${key}-Referenz „${reference}“ existiert nicht.`);
          }
        });
      });
    });

    (DATA.companions || []).forEach((entry) => {
      if (!entry.id || !charById.has(entry.id)) {
        issues.push(`Gefährte „${entry.id || 'ohne ID'}“ existiert nicht.`);
      }
    });

    if (issues.length) {
      console.warn(
        `[Eternia Chroniken] ${issues.length} Datenhinweis(e):\n` +
          issues.map((issue) => ' • ' + issue).join('\n')
      );
    } else {
      console.info(`[Eternia Chroniken] ${characters.length} Figuren validiert – keine Probleme gefunden.`);
    }
  }

  function matchesFilters(character, query = state.query) {
    const factionOk = state.filter === 'alle' || character.faction === state.filter;
    const normalizedQuery = normalize(query.trim());
    const searchOk = !normalizedQuery || (character._search || '').includes(normalizedQuery);
    return factionOk && searchOk;
  }

  function visibleCharacters() {
    return characters.filter((character) => matchesFilters(character));
  }

  function updateRepoLinks() {
    const repo = (DATA.site && DATA.site.repo) || '#';
    $$('.repo-link').forEach((link) => {
      if (link instanceof HTMLAnchorElement) {
        link.href = repo;
        if (repo.startsWith('http')) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      }
    });
  }

  function updateCounts() {
    const counts = { alle: characters.length, helden: 0, verbuendete: 0, schurken: 0 };
    characters.forEach((character) => {
      if (Object.prototype.hasOwnProperty.call(counts, character.faction)) {
        counts[character.faction] += 1;
      }
    });

    $$('[data-count="characters"]').forEach((element) => {
      element.textContent = String(characters.length);
    });

    $$('[data-count="timeline"]').forEach((element) => {
      element.textContent = String((DATA.timeline || []).length);
    });

    $$('[data-count-for]').forEach((element) => {
      const key = element.getAttribute('data-count-for');
      if (key && Object.prototype.hasOwnProperty.call(counts, key)) {
        element.textContent = String(counts[key]);
      }
    });

    if (dom.year) {
      const year = (DATA.site && DATA.site.year) || new Date().getFullYear();
      dom.year.textContent = String(year);
    }
  }

  /* -----------------------------------------------------------------------
     Rendering
     ----------------------------------------------------------------------- */

  function renderStory() {
    if (!dom.storyGrid || !Array.isArray(DATA.story)) return;
    dom.storyGrid.innerHTML = DATA.story
      .map(
        (chapter, index) => `<article class="story-card" data-numeral="${escapeHtml(chapter.numeral)}" data-reveal data-delay="${index % 3}">
          <div class="story-card__top">
            <span class="story-card__icon" aria-hidden="true">${icon(chapter.icon)}</span>
            <span class="story-card__numeral">Kapitel ${escapeHtml(chapter.numeral)}</span>
          </div>
          <h3>${escapeHtml(chapter.title)}</h3>
          <p>${escapeHtml(chapter.text)}</p>
        </article>`
      )
      .join('');
  }

  function renderCompanionPanel(entry) {
    if (!dom.companionPanel) return;
    const character = entry.character;
    const allyCount = (character.allies || []).filter((id) => charById.has(id)).length;
    dom.companionPanel.setAttribute('aria-labelledby', 'companion-tab-' + character.id);
    dom.companionPanel.innerHTML = `<div class="companion-panel__left">
        ${portraitMarkup(character)}
        <span class="companion-panel__bond">${escapeHtml(entry.bond)}</span>
        <p class="companion-panel__name">${escapeHtml(character.name)}</p>
        <p class="companion-panel__alias">${escapeHtml(character.alias)}</p>
      </div>
      <div class="companion-panel__right">
        <h3>${escapeHtml(character.title)}</h3>
        <p>${escapeHtml(character.story)}</p>
        <p>${escapeHtml(entry.note)}</p>
        <blockquote class="companion-quote">„${escapeHtml(character.motto)}“</blockquote>
        <div class="companion-meta">
          <span>Herkunft: <strong>${escapeHtml(character.home)}</strong></span>
          <span>Spezies: <strong>${escapeHtml(character.species)}</strong></span>
          <span>Verbündete: <strong>${allyCount}</strong></span>
        </div>
        <button class="btn btn--ghost" type="button" data-character="${escapeHtml(character.id)}">
          <span>Ganzes Profil</span>
          ${icon('arrow-right')}
        </button>
      </div>`;
  }

  function selectCompanion(index, options = {}) {
    if (!companions.length || !dom.companionTabs) return;
    const safeIndex = ((index % companions.length) + companions.length) % companions.length;
    const tabs = $$('.companion-tab', dom.companionTabs);
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === safeIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    renderCompanionPanel(companions[safeIndex]);
    if (options.focus && tabs[safeIndex]) {
      tabs[safeIndex].focus();
    }
  }

  function renderCompanions() {
    if (!dom.companionTabs || !companions.length) return;
    dom.companionTabs.innerHTML = companions
      .map(
        (entry, index) => `<button class="companion-tab" type="button" role="tab" id="companion-tab-${escapeHtml(entry.character.id)}" aria-controls="companion-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-companion-index="${index}">
          ${portraitMarkup(entry.character)}
          <span class="companion-tab__name">${escapeHtml(entry.character.name)}</span>
          <span class="companion-tab__bond">${escapeHtml(entry.bond)}</span>
        </button>`
      )
      .join('');
    selectCompanion(0);
  }

  function renderRoster() {
    if (!dom.characterGrid) return;
    dom.characterGrid.innerHTML = characters
      .map((character, index) => {
        const colors = Array.isArray(character.colors) ? character.colors : ['#f6c453', '#7c3aed'];
        const label = `${character.name} – ${character.title}. Profil öffnen.`;
        return `<button class="character-card" type="button" data-character-id="${escapeHtml(character.id)}" data-faction="${escapeHtml(character.faction)}" style="--c1:${escapeHtml(colors[0])};--c2:${escapeHtml(colors[1])};--i:${Math.min(index, 11)}" aria-label="${escapeHtml(label)}">
          <span class="character-card__art">
            <span class="pill pill--${escapeHtml(character.faction)}">${escapeHtml(factionLabel(character.faction))}</span>
            ${portraitMarkup(character)}
            <span class="character-card__group">${escapeHtml(character.group)}</span>
          </span>
          <span class="character-card__body">
            <span class="character-card__name">${escapeHtml(character.name)}</span>
            <span class="character-card__alias">${escapeHtml(character.alias)}</span>
            <span class="character-card__title">${escapeHtml(character.title)}</span>
            <span class="character-card__short">${escapeHtml(character.short)}</span>
            <span class="character-card__foot">
              <span>${escapeHtml(character.species)}</span>
              <span class="character-card__details">Profil ${icon('arrow-right')}</span>
            </span>
          </span>
        </button>`;
      })
      .join('');
  }

  function renderTimeline() {
    if (!dom.timeline || !Array.isArray(DATA.timeline)) return;
    dom.timeline.innerHTML = DATA.timeline
      .map(
        (chapter, index) => `<article class="timeline__item" data-reveal data-delay="${index % 3}">
          <div class="timeline__content">
            <span class="timeline__era">${escapeHtml(chapter.era)} · ${escapeHtml(chapter.tag)}</span>
            <h3>${escapeHtml(chapter.title)}</h3>
            <p>${escapeHtml(chapter.text)}</p>
            ${
              chapter.note
                ? `<p class="timeline__note">${icon('info')}<span>${escapeHtml(chapter.note)}</span></p>`
                : ''
            }
          </div>
          <span class="timeline__node" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        </article>`
      )
      .join('');
  }

  function renderFacts() {
    if (!dom.factGrid || !Array.isArray(DATA.facts)) return;
    dom.factGrid.innerHTML = DATA.facts
      .map(
        (fact, index) => `<article class="fact-card" data-reveal data-delay="${index % 3}">
          <span class="fact-card__icon" aria-hidden="true">${icon(fact.icon)}</span>
          <span class="fact-card__tag">${escapeHtml(fact.tag)}</span>
          <h3>${escapeHtml(fact.title)}</h3>
          <p>${escapeHtml(fact.text)}</p>
        </article>`
      )
      .join('');
  }

  /* -----------------------------------------------------------------------
     Filter & Suche
     ----------------------------------------------------------------------- */

  function syncFilterChips() {
    if (!dom.filterChips) return;
    $$('.chip', dom.filterChips).forEach((chip) => {
      const active = chip.getAttribute('data-filter') === state.filter;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  }

  function applyFilters() {
    const query = state.query.trim();
    let visibleCount = 0;

    $$('.character-card', dom.characterGrid || document).forEach((card) => {
      const id = card.getAttribute('data-character-id');
      const character = id ? charById.get(id) : null;
      const visible = character ? matchesFilters(character, query) : false;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (dom.rosterCount) {
      dom.rosterCount.textContent =
        visibleCount === characters.length
          ? `${characters.length} Charaktere`
          : `${visibleCount} von ${characters.length} Charakteren`;
    }

    if (dom.rosterFilterLabel) {
      const scope = filterLabels[state.filter] || filterLabels.alle;
      dom.rosterFilterLabel.textContent = query ? `Suche in ${scope}: „${query}“` : `aus ${scope}`;
    }

    if (dom.emptyState) {
      dom.emptyState.hidden = visibleCount !== 0;
    }

    if (dom.searchClear) {
      dom.searchClear.hidden = !state.query;
    }
  }

  function setFilter(filter, options = {}) {
    state.filter = Object.prototype.hasOwnProperty.call(filterLabels, filter) ? filter : 'alle';
    if (options.resetQuery) {
      state.query = '';
      if (dom.searchInput) dom.searchInput.value = '';
    }
    syncFilterChips();
    applyFilters();

    if (options.scroll) {
      const section = document.getElementById('charaktere');
      if (section) {
        window.requestAnimationFrame(() => {
          section.scrollIntoView({ behavior: motionBehavior(), block: 'start' });
        });
      }
    }
  }

  function scrollToRoster() {
    const section = document.getElementById('charaktere');
    if (section) {
      section.scrollIntoView({ behavior: motionBehavior(), block: 'start' });
    }
  }

  /* -----------------------------------------------------------------------
     Dialog
     ----------------------------------------------------------------------- */

  function connectionMarkup(ids, enemy = false) {
    const entries = (Array.isArray(ids) ? ids : [])
      .map((id) => charById.get(id))
      .filter(Boolean);
    if (!entries.length) {
      return `<span class="dialog-empty">Keine bekannten ${enemy ? 'Feinde' : 'Verbündeten'}.</span>`;
    }
    return entries
      .map(
        (character) => `<button class="link-chip${enemy ? ' link-chip--enemy' : ''}" type="button" data-character="${escapeHtml(character.id)}">
          <span class="link-chip__dot" aria-hidden="true"></span>${escapeHtml(character.name)}
        </button>`
      )
      .join('');
  }

  function renderDialog(character) {
    if (!dom.dialogArt || !dom.dialogBody) return;
    const colors = Array.isArray(character.colors) ? character.colors : ['#f6c453', '#7c3aed'];
    const statFields = [
      ['Macht', 'power'],
      ['Weisheit', 'wisdom'],
      ['Mut', 'courage'],
      ['Magie', 'magic'],
    ];

    dom.dialogPanel.style.setProperty('--c1', colors[0]);
    dom.dialogPanel.style.setProperty('--c2', colors[1]);
    dom.dialogArt.style.setProperty('--c1', colors[0]);
    dom.dialogArt.style.setProperty('--c2', colors[1]);

    dom.dialogArt.innerHTML = `<div class="dialog-art__portrait">${portraitMarkup(character)}</div>
      <span class="pill pill--${escapeHtml(character.faction)} dialog-art__faction">${escapeHtml(factionLabel(character.faction))}</span>
      <p class="dialog-art__name">${escapeHtml(character.name)}</p>
      <p class="dialog-art__alias">${escapeHtml(character.alias)}</p>
      <p class="dialog-art__home">${icon('castle')} ${escapeHtml(character.home)}</p>`;

    const stats = statFields
      .map(([label, key]) => {
        const raw = character.stats && Number(character.stats[key]);
        const value = Number.isFinite(raw) ? Math.max(0, Math.min(10, raw)) : 0;
        return `<div class="stat">
          <span class="stat__label">${label}</span>
          <span class="stat__track" role="meter" aria-label="${label}" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${value}">
            <span class="stat__fill" style="--v:${value / 10}"></span>
          </span>
          <span class="stat__value">${value}/10</span>
        </div>`;
      })
      .join('');

    const facts = (Array.isArray(character.facts) ? character.facts : [])
      .map((fact) => `<li>${icon('spark')}<span>${escapeHtml(fact)}</span></li>`)
      .join('');

    dom.dialogBody.innerHTML = `<span class="pill pill--${escapeHtml(character.faction)}">${escapeHtml(factionLabel(character.faction))}</span>
      <h2 class="dialog__title" id="dialog-title">${escapeHtml(character.name)}</h2>
      <p class="dialog__alias">${escapeHtml(character.alias)}</p>
      <p class="dialog__subtitle">${escapeHtml(character.title)} · ${escapeHtml(character.era)}</p>
      <p class="dialog__story">${escapeHtml(character.story)}</p>
      <blockquote class="dialog__motto">„${escapeHtml(character.motto)}“</blockquote>

      <section class="dialog-section" aria-labelledby="dialog-stats-heading">
        <h3 id="dialog-stats-heading">${icon('spark')} Werte</h3>
        <div class="stats">${stats}</div>
      </section>

      <section class="dialog-section" aria-labelledby="dialog-allies-heading">
        <h3 id="dialog-allies-heading">${icon('shield')} Verbündete</h3>
        <div class="connection-list">${connectionMarkup(character.allies, false)}</div>
      </section>

      <section class="dialog-section" aria-labelledby="dialog-enemies-heading">
        <h3 id="dialog-enemies-heading">${icon('skull')} Gegner</h3>
        <div class="connection-list">${connectionMarkup(character.enemies, true)}</div>
      </section>

      <section class="dialog-section" aria-labelledby="dialog-facts-heading">
        <h3 id="dialog-facts-heading">${icon('book')} Wusstest du?</h3>
        <ul class="dialog__facts">${facts || '<li>Noch keine Notizen in der Chronik.</li>'}</ul>
      </section>

      <dl class="dialog-meta">
        <div><dt>Herkunft</dt><dd>${escapeHtml(character.home)}</dd></div>
        <div><dt>Spezies</dt><dd>${escapeHtml(character.species)}</dd></div>
        <div><dt>Fraktion</dt><dd>${escapeHtml(factionTitle(character.faction))}</dd></div>
        <div><dt>Zeitalter</dt><dd>${escapeHtml(character.era)}</dd></div>
      </dl>

      <div class="dialog-footer">
        <button class="dialog-footer__share" type="button" id="dialog-share">
          ${icon('copy')} Link kopieren
        </button>
        <div class="dialog-nav">
          <button type="button" data-dialog-nav="prev">${icon('arrow-left')} Zurück</button>
          <button type="button" data-dialog-nav="next">Weiter ${icon('arrow-right')}</button>
        </div>
      </div>`;

    dom.dialogPanel.scrollTop = 0;
  }

  function dialogList() {
    const visible = visibleCharacters();
    if (!visible.length) return characters;
    if (currentCharacterId && !visible.some((character) => character.id === currentCharacterId)) {
      return characters;
    }
    return visible;
  }

  function openCharacter(id, options = {}) {
    const character = charById.get(id);
    if (!character) return;

    const wasOpen = dialogOpen;
    if (!wasOpen) {
      lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      previousHash = location.hash.startsWith('#charakter=') ? '' : location.hash;
    }

    dialogOpen = true;
    currentCharacterId = id;
    renderDialog(character);
    dom.dialog.hidden = false;
    document.body.classList.add('is-locked');

    if (!wasOpen) {
      window.requestAnimationFrame(() => {
        dom.dialogPanel.focus({ preventScroll: true });
      });
    } else {
      window.requestAnimationFrame(() => {
        if (!dom.dialogPanel.contains(document.activeElement)) {
          dom.dialogPanel.focus({ preventScroll: true });
        }
      });
    }

    if (options.updateUrl !== false) {
      try {
        history.replaceState(null, '', '#charakter=' + encodeURIComponent(id));
      } catch (error) {
        /* Einige Browser erlauben history unter file:// nicht. */
      }
    }

    announcement(`${character.name} geöffnet.`);
  }

  function closeDialog(options = {}) {
    if (!dialogOpen) return;
    const closingId = currentCharacterId;
    dialogOpen = false;
    currentCharacterId = null;
    dom.dialog.hidden = true;
    document.body.classList.remove('is-locked');

    if (options.updateUrl !== false) {
      const suffix = previousHash && !previousHash.startsWith('#charakter=') ? previousHash : '';
      try {
        history.replaceState(null, '', location.pathname + location.search + suffix);
      } catch (error) {
        /* Einige Browser erlauben history unter file:// nicht. */
      }
    }

    if (options.restoreFocus !== false) {
      let target = lastFocusedElement && document.contains(lastFocusedElement) ? lastFocusedElement : null;
      if (!target && closingId) {
        target = document.querySelector(`[data-character-id="${closingId}"]`);
      }
      if (target) target.focus({ preventScroll: true });
    }

    lastFocusedElement = null;
    announcement('Profil geschlossen.');
  }

  function navigateDialog(direction) {
    const list = dialogList();
    if (!list.length) return;
    let index = list.findIndex((character) => character.id === currentCharacterId);
    if (index < 0) index = 0;
    const offset = direction === 'prev' ? -1 : 1;
    const next = list[(index + offset + list.length) % list.length];
    openCharacter(next.id, { updateUrl: 'replace' });
  }

  function trapDialogFocus(event) {
    if (event.key !== 'Tab') return;
    const focusable = $$(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      dom.dialogPanel
    ).filter((element) => element.offsetParent !== null || element === dom.dialogPanel);

    if (!focusable.length) {
      event.preventDefault();
      dom.dialogPanel.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === first || document.activeElement === dom.dialogPanel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      area.setSelectionRange(0, area.value.length);
      let copied = false;
      try {
        copied = document.execCommand('copy');
      } finally {
        area.remove();
      }
      if (copied) resolve();
      else reject(new Error('copy-failed'));
    });
  }

  function shareCurrentCharacter() {
    copyText(location.href)
      .then(() => showToast('Link kopiert. Teile das Erbe von Grayskull.'))
      .catch(() => showToast('Kopieren nicht möglich – der Link steht in der Adresszeile.'));
  }

  /* -----------------------------------------------------------------------
     Routing
     ----------------------------------------------------------------------- */

  function handleRoute() {
    const match = location.hash.match(/^#charakter=([^&]+)$/);
    if (match) {
      let id = match[1];
      try {
        id = decodeURIComponent(id);
      } catch (error) {
        /* Ungültige URL-Kodierung ignorieren. */
      }
      if (charById.has(id)) {
        if (id !== currentCharacterId) openCharacter(id, { updateUrl: false });
        return;
      }
    }
    if (dialogOpen) closeDialog({ updateUrl: false, restoreFocus: false });
  }

  /* -----------------------------------------------------------------------
     Theme
     ----------------------------------------------------------------------- */

  function readStoredTheme() {
    try {
      return window.localStorage.getItem('eternia-theme');
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem('eternia-theme', theme);
    } catch (error) {
      /* Privater Modus oder blockierter Speicher: kein Problem. */
    }
  }

  function setTheme(theme, persist) {
    const next = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    const isLight = next === 'light';

    if (dom.themeToggle) {
      dom.themeToggle.setAttribute('aria-pressed', String(isLight));
      dom.themeToggle.setAttribute('aria-label', isLight ? 'Dunkles Design aktivieren' : 'Helles Design aktivieren');
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isLight ? '#f3eddf' : '#070510');

    if (persist) storeTheme(next);
    if (starfield) starfield.refreshColor();
  }

  function initTheme() {
    const stored = readStoredTheme();
    setTheme(stored === 'light' ? 'light' : 'dark', false);
    if (dom.themeToggle) {
      dom.themeToggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        setTheme(next, true);
      });
    }
  }

  /* -----------------------------------------------------------------------
     Sternenfeld
     ----------------------------------------------------------------------- */

  function parseColor(value) {
    const color = String(value || '').trim();
    if (!color) return null;
    if (color.charAt(0) === '#') {
      let hex = color.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split('')
          .map((part) => part + part)
          .join('');
      }
      if (hex.length !== 6) return null;
      const number = Number.parseInt(hex, 16);
      if (Number.isNaN(number)) return null;
      return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
    }
    const rgb = color.match(/rgba?\(([^)]+)\)/);
    if (rgb) {
      const parts = rgb[1].split(',').map((part) => Number.parseFloat(part));
      if (parts.length >= 3) return parts.slice(0, 3);
    }
    return null;
  }

  function initStarfield() {
    const canvas = dom.starfield;
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const TAU = Math.PI * 2;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let colors = { star: [248, 231, 185], gold: [255, 207, 92] };
    let shooting = null;
    let nextShot = 0;
    let raf = 0;
    let lastFrame = 0;
    let resizeTimer = 0;

    function refreshColor() {
      const styles = window.getComputedStyle(document.documentElement);
      colors.star = parseColor(styles.getPropertyValue('--star-color')) || [248, 231, 185];
      colors.gold = parseColor(styles.getPropertyValue('--gold-strong')) || [255, 207, 92];
    }

    function makeStars() {
      const count = Math.max(70, Math.min(230, Math.round((width * height) / 10500)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.25 + Math.random() * 1.35,
        alpha: 0.18 + Math.random() * 0.6,
        phase: Math.random() * TAU,
        speed: 0.0006 + Math.random() * 0.0018,
        big: Math.random() < 0.055,
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
      nextShot = 0;
      if (reduceMotion.matches) drawOnce();
    }

    function drawScene(time, animate) {
      context.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const dim = isLight ? 0.62 : 1;
      const starColor = colors.star.join(',');

      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index];
        const twinkle = animate ? 0.7 + Math.sin(time * star.speed + star.phase) * 0.3 : 1;
        context.globalAlpha = star.alpha * twinkle * dim;
        if (star.big) {
          context.fillStyle = `rgb(${colors.gold.join(',')})`;
          context.shadowBlur = 7;
          context.shadowColor = `rgba(${colors.gold.join(',')},0.55)`;
        } else {
          context.fillStyle = `rgb(${starColor})`;
          context.shadowBlur = 0;
        }
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, TAU);
        context.fill();
      }
      context.shadowBlur = 0;
      context.globalAlpha = 1;

      if (!animate) return;

      const dt = Math.min(2.5, (time - lastFrame) / 16.667) || 1;
      lastFrame = time;

      if (!shooting && time > nextShot) {
        shooting = {
          x: width * (0.15 + Math.random() * 0.7),
          y: height * (0.04 + Math.random() * 0.24),
          vx: -(5 + Math.random() * 4),
          vy: 2 + Math.random() * 2,
          life: 0,
          max: 60 + Math.random() * 40,
        };
      }

      if (shooting) {
        const progress = shooting.life / shooting.max;
        const alpha = Math.sin(Math.PI * progress) * 0.85;
        const tailX = shooting.x - shooting.vx * 9;
        const tailY = shooting.y - shooting.vy * 9;
        const gradient = context.createLinearGradient(shooting.x, shooting.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(${colors.gold.join(',')},${alpha})`);
        gradient.addColorStop(1, `rgba(${colors.gold.join(',')},0)`);
        context.strokeStyle = gradient;
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(shooting.x, shooting.y);
        context.lineTo(tailX, tailY);
        context.stroke();

        shooting.x += shooting.vx * dt;
        shooting.y += shooting.vy * dt;
        shooting.life += dt;

        if (shooting.life >= shooting.max) {
          shooting = null;
          nextShot = time + 6500 + Math.random() * 8000;
        }
      }
    }

    function loop(time) {
      if (!lastFrame) lastFrame = time;
      drawScene(time, true);
      raf = window.requestAnimationFrame(loop);
    }

    function drawOnce() {
      drawScene(0, false);
    }

    function start() {
      if (reduceMotion.matches) {
        drawOnce();
        return;
      }
      if (!raf) {
        lastFrame = 0;
        raf = window.requestAnimationFrame(loop);
      }
    }

    function stop() {
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    refreshColor();
    resize();
    start();

    window.addEventListener(
      'resize',
      () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          resize();
          if (reduceMotion.matches) drawOnce();
        }, 160);
      },
      { passive: true }
    );

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });

    if (typeof reduceMotion.addEventListener === 'function') {
      reduceMotion.addEventListener('change', () => {
        stop();
        if (reduceMotion.matches) drawOnce();
        else start();
      });
    }

    starfield = {
      refreshColor() {
        refreshColor();
        if (reduceMotion.matches) drawOnce();
      },
    };
  }

  /* -----------------------------------------------------------------------
     Power-Effekt
     ----------------------------------------------------------------------- */

  function triggerPower() {
    const flashlight = dom.powerFlash;
    if (flashlight) {
      flashlight.classList.remove('is-active');
      void flashlight.offsetWidth;
      flashlight.classList.add('is-active');
    }

    document.body.classList.add('power-on');
    window.clearTimeout(powerTimer);
    powerTimer = window.setTimeout(() => {
      document.body.classList.remove('power-on');
    }, 1500);

    if (flashlight) {
      window.setTimeout(() => flashlight.classList.remove('is-active'), 1700);
    }

    announcement('Die Macht von Grayskull ist entfesselt.');

    if (reduceMotion.matches || !dom.sparkLayer) return;

    const emblem = $('.emblem');
    const rect = emblem ? emblem.getBoundingClientRect() : null;
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const palette = ['#f6c453', '#fff6d5', '#5eead4', '#a78bfa'];

    for (let index = 0; index < 44; index += 1) {
      const spark = document.createElement('span');
      spark.className = 'spark';
      const angle = Math.random() * Math.PI * 2;
      const distance = 70 + Math.random() * 320;
      spark.style.left = originX + 'px';
      spark.style.top = originY + 'px';
      spark.style.setProperty('--spark-dx', Math.cos(angle) * distance + 'px');
      spark.style.setProperty('--spark-dy', Math.sin(angle) * distance + 'px');
      spark.style.setProperty('--spark-size', 3 + Math.random() * 5 + 'px');
      spark.style.setProperty('--spark-duration', 0.9 + Math.random() * 0.9 + 's');
      spark.style.setProperty('--spark-delay', Math.random() * 0.12 + 's');
      spark.style.setProperty('--spark-color', palette[Math.floor(Math.random() * palette.length)]);
      dom.sparkLayer.appendChild(spark);
      window.setTimeout(() => spark.remove(), 2300);
    }
  }

  /* -----------------------------------------------------------------------
     Scroll, Menü, Reveal
     ----------------------------------------------------------------------- */

  function updateScrollUi() {
    const y = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (y / docHeight) * 100)) : 0;

    if (dom.header) dom.header.classList.toggle('is-scrolled', y > 18);
    if (dom.progress) dom.progress.style.width = progress + '%';
    if (dom.toTop) dom.toTop.classList.toggle('is-visible', y > 720);

    const links = $$('.nav a[href^="#"]');
    let current = '';
    if (y > 220) {
      links.forEach((link) => {
        const id = link.getAttribute('href').slice(1);
        const section = id ? document.getElementById(id) : null;
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.38) {
          current = id;
        }
      });
    }
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
  }

  function initScrollEffects() {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateScrollUi();
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollUi();

    if (dom.toTop) {
      dom.toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: motionBehavior() });
      });
    }
  }

  function setMenu(open) {
    menuOpen = open;
    if (dom.mobileNav) dom.mobileNav.hidden = !open;
    if (dom.header) dom.header.classList.toggle('is-open', open);
    if (dom.menuToggle) {
      dom.menuToggle.setAttribute('aria-expanded', String(open));
      dom.menuToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    }
  }

  function initMenu() {
    if (dom.menuToggle) {
      dom.menuToggle.addEventListener('click', () => setMenu(!menuOpen));
    }
    if (dom.mobileNav) {
      dom.mobileNav.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('a')) setMenu(false);
      });
    }
    const desktopQuery = window.matchMedia('(min-width: 1181px)');
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', (event) => {
        if (event.matches) setMenu(false);
      });
    }
  }

  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      items.forEach((item) => {
        item.classList.add('is-visible');
        item.removeAttribute('data-reveal');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            window.setTimeout(() => entry.target.removeAttribute('data-reveal'), 1100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((item) => observer.observe(item));

    if (typeof reduceMotion.addEventListener === 'function') {
      reduceMotion.addEventListener('change', () => {
        if (reduceMotion.matches) {
          items.forEach((item) => {
            item.classList.add('is-visible');
            item.removeAttribute('data-reveal');
          });
          observer.disconnect();
        }
      });
    }
  }

  /* -----------------------------------------------------------------------
     Events
     ----------------------------------------------------------------------- */

  function initCompanionEvents() {
    if (!dom.companionTabs) return;

    dom.companionTabs.addEventListener('click', (event) => {
      const tab = event.target instanceof Element ? event.target.closest('.companion-tab') : null;
      if (!tab) return;
      const index = Number(tab.getAttribute('data-companion-index'));
      if (Number.isInteger(index)) selectCompanion(index);
    });

    dom.companionTabs.addEventListener('keydown', (event) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const tabs = $$('.companion-tab', dom.companionTabs);
      const currentIndex = tabs.indexOf(document.activeElement);
      let next = currentIndex < 0 ? 0 : currentIndex;
      if (event.key === 'ArrowLeft') next = currentIndex - 1;
      if (event.key === 'ArrowRight') next = currentIndex + 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      selectCompanion(next, { focus: true });
    });
  }

  function initFilterEvents() {
    if (dom.filterChips) {
      dom.filterChips.addEventListener('click', (event) => {
        const chip = event.target instanceof Element ? event.target.closest('.chip') : null;
        if (!chip) return;
        setFilter(chip.getAttribute('data-filter') || 'alle');
      });
    }

    $$('.faction-card').forEach((card) => {
      card.addEventListener('click', () => {
        setFilter(card.getAttribute('data-faction') || 'alle', { scroll: true, resetQuery: true });
      });
    });

    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', () => {
        state.query = dom.searchInput.value;
        applyFilters();
      });
      dom.searchInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        event.stopPropagation();
        if (dom.searchInput.value) {
          dom.searchInput.value = '';
          state.query = '';
          applyFilters();
        } else {
          dom.searchInput.blur();
        }
      });
    }

    if (dom.searchClear) {
      dom.searchClear.addEventListener('click', () => {
        if (dom.searchInput) {
          dom.searchInput.value = '';
          dom.searchInput.focus();
        }
        state.query = '';
        applyFilters();
      });
    }

    if (dom.resetFilters) {
      dom.resetFilters.addEventListener('click', () => {
        setFilter('alle', { resetQuery: true });
      });
    }

    if (dom.randomBtn) {
      dom.randomBtn.addEventListener('click', () => {
        const pool = visibleCharacters();
        const source = pool.length ? pool : characters;
        if (!source.length) return;
        const pick = source[Math.floor(Math.random() * source.length)];
        openCharacter(pick.id);
      });
    }
  }

  function initDialogEvents() {
    if (dom.dialogClose) {
      dom.dialogClose.addEventListener('click', () => closeDialog());
    }

    if (dom.dialogBody) {
      dom.dialogBody.addEventListener('click', (event) => {
        if (!(event.target instanceof Element)) return;
        if (event.target.closest('#dialog-share')) {
          shareCurrentCharacter();
          return;
        }
        const navButton = event.target.closest('[data-dialog-nav]');
        if (navButton) {
          const direction = navButton.getAttribute('data-dialog-nav');
          navigateDialog(direction === 'prev' ? 'prev' : 'next');
        }
      });
    }

    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;

      if (event.target.closest('[data-close-dialog]')) {
        closeDialog();
        return;
      }

      const characterTrigger = event.target.closest('[data-character]');
      if (characterTrigger) {
        const id = characterTrigger.getAttribute('data-character');
        if (id && charById.has(id)) {
          openCharacter(id, { updateUrl: dialogOpen ? 'replace' : undefined });
        }
        return;
      }

      const card = event.target.closest('[data-character-id]');
      if (card) {
        const id = card.getAttribute('data-character-id');
        if (id) openCharacter(id);
        return;
      }

      if (menuOpen && dom.header && !dom.header.contains(event.target)) {
        setMenu(false);
      }
    });
  }

  function initKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (menuOpen) {
          setMenu(false);
          if (dom.menuToggle) dom.menuToggle.focus();
          return;
        }
        if (dialogOpen) {
          closeDialog();
          return;
        }
      }

      if (dialogOpen) {
        if (event.key === 'Tab') {
          trapDialogFocus(event);
          return;
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          if (!isTypingTarget(event.target)) {
            event.preventDefault();
            navigateDialog(event.key === 'ArrowLeft' ? 'prev' : 'next');
          }
          return;
        }
        return;
      }

      if (isTypingTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
      if (menuOpen) return;

      if (event.key === '/') {
        event.preventDefault();
        if (dom.searchInput) dom.searchInput.focus();
        return;
      }

      if (event.key.length === 1 && /[a-zäöü]/i.test(event.key)) {
        identityBuffer = (identityBuffer + event.key.toLowerCase()).slice(-9);
        if (identityBuffer === 'grayskull') {
          identityBuffer = '';
          triggerPower();
        }
      }
    });

    if (dom.powerBtn) {
      dom.powerBtn.addEventListener('click', triggerPower);
    }
  }

  /* -----------------------------------------------------------------------
     Start
     ----------------------------------------------------------------------- */

  function init() {
    buildSearchIndex();
    validateContent();
    updateRepoLinks();
    updateCounts();
    renderStory();
    renderCompanions();
    renderRoster();
    renderTimeline();
    renderFacts();
    syncFilterChips();
    applyFilters();

    initTheme();
    initStarfield();
    initMenu();
    initScrollEffects();
    initReveal();
    initCompanionEvents();
    initFilterEvents();
    initDialogEvents();
    initKeyboard();

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  init();
})();
