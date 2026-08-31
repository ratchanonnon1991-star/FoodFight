/**
 * FoodFighter UX Lab - interactive reference surface
 *
 * All state in this file is local to the lab. The candidate screens are
 * intentionally static and never call product services.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;
  const D = P.UX_LAB;
  const C = P.UX_LAB_COMPONENTS;

  let viewportPinned = false;

  const labState = {
    viewport: '390',
    globalState: 'normal',
    motion: 'on',
    scenario: 'existing-user',
    roomScenario: 'Host Waiting',
    historyScenario: 'Many Items',
    billScenario: 'Partially Paid',
    activeNav: 'home',
    screen: 'home',
    selectedMeal: '',
    vote: '',
    ready: false,
    winner: false,
    accountOpen: false,
    overlay: '',
    uploadState: 'idle',
    downloadState: 'download',
    buttonLoading: false,
    progress: 42,
    flowIndex: 0,
    selectedChips: ['Thai']
  };

  function viewportForWidth(width) {
    const exact = D.viewports.find(item => item.width === width);
    if (exact) return exact;
    return D.viewports.reduce((closest, item) => Math.abs(item.width - width) < Math.abs(closest.width - width) ? item : closest, D.viewports[2]);
  }

  if (typeof window !== 'undefined' && window.innerWidth) {
    labState.viewport = viewportForWidth(window.innerWidth).id;
  }

  const flowDescriptions = [
    'A calm entry point that frames dinner as a shared decision.',
    'Tonal form sections collect room setup without feeling administrative.',
    'Room identity, invite code, members, and readiness are grouped clearly.',
    'Preference choices stay task-first and easy to scan.',
    'Food options lead with image, name, tags, and group match context.',
    'OK / Pass feedback is tactile, visible, and never hover-dependent.',
    'The result moment uses a restrained celebration surface.',
    'Restaurant discovery carries the winner into a practical next step.',
    'Bill and payment information use dense elevated surfaces for clarity.',
    'History closes the loop with a quiet, scannable record.'
  ];

  function text(key) {
    const language = P.i18n && P.i18n.getLanguage ? P.i18n.getLanguage() : 'en';
    return D.copy[language]?.[key] || D.copy.en[key] || key;
  }

  function esc(value) {
    return C.escape(value);
  }

  function viewport() {
    return D.viewports.find(item => item.id === labState.viewport) || D.viewports[2];
  }

  function currentScenario() {
    return D.scenarios.find(item => item.id === labState.scenario) || D.scenarios[1];
  }

  function section(id, eyebrow, title, description, content, tone) {
    return `
      <section id="lab-${id}" class="lab-section lab-section-${tone || 'quiet'}" aria-labelledby="lab-${id}-title">
        <div class="lab-section-heading">
          <div>
            <p class="lab-eyebrow">${esc(eyebrow)}</p>
            <h2 id="lab-${id}-title">${title}</h2>
          </div>
          <p class="lab-section-description">${description}</p>
        </div>
        <div class="lab-section-content">${content}</div>
      </section>
    `;
  }

  function statePill(state, label) {
    return `<span class="lab-state-pill lab-state-pill-${state}">${esc(label || state)}</span>`;
  }

  function renderTopbar() {
    const activeLanguage = P.i18n && P.i18n.getLanguage ? P.i18n.getLanguage() : 'en';
    const v = viewport();
    return `
      <header class="lab-topbar">
        <a class="lab-brand" href="#/ux-lab" aria-label="Return to FoodFighter UX Lab">
          <span class="lab-brand-mark">${C.icon('utensils', 20)}</span>
          <span><strong>FoodFighter</strong><small>UX Lab</small></span>
        </a>
        <div class="lab-topbar-tools">
          <label class="lab-tool-select">VIEWPORT
            <select data-lab-control="viewport" aria-label="Prototype viewport preset">
              ${D.viewports.map(item => `<option value="${item.id}" ${item.id === v.id ? 'selected' : ''}>${esc(item.label)}</option>`).join('')}
            </select>
          </label>
          <span class="lab-current-viewport"><i></i>${esc(v.label)}</span>
          <div class="lab-toggle lab-toggle-compact" role="group" aria-label="Language">
            <button type="button" class="${activeLanguage === 'th' ? 'is-active' : ''}" data-lab-action="set-language" data-lab-value="th" aria-pressed="${activeLanguage === 'th'}">TH</button>
            <button type="button" class="${activeLanguage === 'en' ? 'is-active' : ''}" data-lab-action="set-language" data-lab-value="en" aria-pressed="${activeLanguage === 'en'}">EN</button>
          </div>
          <button type="button" class="lab-icon-button" data-lab-action="open-overlay" data-lab-value="about" aria-label="About this prototype">${C.icon('info', 18)}</button>
        </div>
      </header>
      <div class="lab-controlbar">
        <div class="lab-controlbar-group">
          <span class="lab-control-label">STATE</span>
          <div class="lab-toggle" role="group" aria-label="Global prototype state">
            ${['normal', 'loading', 'empty', 'error', 'disabled', 'success'].map(item => `<button type="button" class="${labState.globalState === item ? 'is-active' : ''}" data-lab-action="set-global-state" data-lab-value="${item}" aria-pressed="${labState.globalState === item}">${esc(item)}</button>`).join('')}
          </div>
        </div>
        <div class="lab-controlbar-group">
          <span class="lab-control-label">MOTION</span>
          <div class="lab-toggle" role="group" aria-label="Motion preference">
            <button type="button" class="${labState.motion === 'on' ? 'is-active' : ''}" data-lab-action="set-motion" data-lab-value="on" aria-pressed="${labState.motion === 'on'}">Motion ON</button>
            <button type="button" class="${labState.motion === 'reduced' ? 'is-active' : ''}" data-lab-action="set-motion" data-lab-value="reduced" aria-pressed="${labState.motion === 'reduced'}">Reduced Motion</button>
          </div>
        </div>
        <div class="lab-controlbar-group lab-scenario-group">
          <span class="lab-control-label">SCENARIO</span>
          <div class="lab-toggle" role="group" aria-label="Global data scenario">
            ${D.scenarios.map(item => `<button type="button" class="${labState.scenario === item.id ? 'is-active' : ''}" data-lab-action="set-scenario" data-lab-value="${item.id}" aria-pressed="${labState.scenario === item.id}">${esc(item.label)}</button>`).join('')}
          </div>
        </div>
        <span class="lab-local-note">${C.icon('lock', 13)} ${esc(text('localData'))}</span>
      </div>
    `;
  }

  function renderSidebar() {
    return `
      <aside class="lab-sidebar" aria-label="UX Lab section index">
        <div class="lab-sidebar-header">
          <span class="lab-sidebar-kicker">REFERENCE SURFACE</span>
          <p>${esc(text('sourceOfTruth'))}</p>
        </div>
        <button type="button" class="lab-sidebar-overview" data-lab-action="scroll-section" data-lab-value="lab-overview">
          ${C.icon('sparkles', 17)}<span>Overview</span>
        </button>
        <div class="lab-sidebar-groups">
          ${D.sectionGroups.map(group => `
            <div class="lab-sidebar-group">
              <p>${esc(group.label)}</p>
              ${group.items.map(([id, label]) => `<button type="button" class="lab-sidebar-link" data-lab-action="scroll-section" data-lab-value="lab-${id}"><span>${esc(label)}</span>${id === labState.screen || id === `screen-${labState.screen}` ? C.icon('arrowRight', 14) : ''}</button>`).join('')}
            </div>
          `).join('')}
        </div>
        <div class="lab-sidebar-footer">
          <span>${C.icon('layers', 14)} 38 preserved screens</span>
          <span>${C.icon('lock', 14)} no API connection</span>
        </div>
      </aside>
    `;
  }

  function renderMobileSectionSelect() {
    return `
      <label class="lab-mobile-section-select">JUMP TO
        <select data-lab-control="section" aria-label="Jump to UX Lab section">
          <option value="lab-overview">Overview</option>
          ${D.sectionGroups.flatMap(group => group.items).map(([id, label]) => `<option value="lab-${id}">${esc(label)}</option>`).join('')}
        </select>
      </label>
    `;
  }

  function renderInspector() {
    const meta = D.screenMeta[labState.screen] || D.screenMeta.home;
    return `
      <aside class="lab-inspector" aria-label="Screen specification inspector">
        <div class="lab-inspector-header"><span class="lab-eyebrow">INSPECTOR</span><span class="lab-inspector-dot"></span></div>
        <div class="lab-inspector-title-row"><h2>${esc(meta.title)}</h2>${statePill('candidate', 'Candidate')}</div>
        <dl class="lab-spec-list">
          <div><dt>Purpose</dt><dd>${esc(meta.purpose)}</dd></div>
          <div><dt>Primary action</dt><dd>${esc(meta.primary)}</dd></div>
          <div><dt>Secondary action</dt><dd>${esc(meta.secondary)}</dd></div>
          <div><dt>Responsive</dt><dd>${esc(meta.responsive)}</dd></div>
          <div><dt>Image</dt><dd>${esc(meta.image)}</dd></div>
          <div><dt>States</dt><dd>${esc(meta.states)}</dd></div>
          <div><dt>Data</dt><dd>Static local prototype data</dd></div>
          <div><dt>Backend</dt><dd>${esc(meta.backend)}</dd></div>
        </dl>
        <p class="lab-inspector-footnote">${C.icon('info', 14)} Product pages remain unchanged until this reference is approved.</p>
      </aside>
    `;
  }

  function renderOverview() {
    const v = viewport();
    return `
      <section id="lab-overview" class="lab-overview" aria-labelledby="lab-overview-title">
        <div class="lab-overview-copy">
          <div class="lab-overview-kicker"><span class="lab-overview-mark">${C.icon('utensils', 17)}</span> FoodFighter / UX reference lab</div>
          <h1 id="lab-overview-title">Soft editorial<br><em>food social.</em></h1>
          <p class="lab-overview-lede">A warm, food-forward visual language for groups deciding what to eat together. Browse the foundations, test the states, then inspect the candidate screens.</p>
          <div class="lab-overview-actions">
            ${C.button('Explore foundations', 'brand', 'lg', { action: 'scroll-section', value: 'lab-colors', icon: 'arrowRight', iconRight: true })}
            <span class="lab-overview-meta">${C.icon('lock', 14)} ${esc(text('localData'))}</span>
          </div>
          <div class="lab-overview-facts"><span><strong>5</strong> source colors</span><span><strong>8</strong> viewport presets</span><span><strong>38</strong> preserved screens</span></div>
        </div>
        <div class="lab-overview-art" aria-label="Food visual placeholder, 16:9, recommended 1600 x 900">
          <div class="lab-art-plate"></div><div class="lab-art-bowl"></div><div class="lab-art-garnish garnish-a"></div><div class="lab-art-garnish garnish-b"></div><div class="lab-art-garnish garnish-c"></div>
          <div class="lab-art-copy"><span>HOME HERO</span><strong>IMAGE PLACEHOLDER</strong><small>16:9 · 1600 x 900</small></div>
          <div class="lab-art-sticker">food first<br><small>owner asset later</small></div>
        </div>
        <div class="lab-overview-strip"><span class="lab-overview-strip-label">CURRENT PREVIEW</span><strong>${esc(v.label)}</strong><span>${esc(currentScenario().label)}</span><span>${labState.motion === 'reduced' ? 'Reduced motion' : 'Motion on'}</span><span class="lab-overview-strip-spacer"></span>${statePill(labState.globalState, labState.globalState)}</div>
      </section>
    `;
  }

  function renderColors() {
    const semantic = [
      ['Canvas', 'Warm blush / cream base', 'canvas'],
      ['Surface', 'Quiet tonal grouping', 'petal-soft'],
      ['Elevated', 'Inputs, dialogs, dense data', 'elevated'],
      ['Primary', 'Strong CTA and brand anchor', 'brand'],
      ['Secondary', 'Supporting brand actions', 'mauve'],
      ['Accent / social', 'Group and people moments', 'petal'],
      ['Accent / food', 'Dish and meal moments', 'apricot'],
      ['Accent / highlight', 'Selection and celebration', 'custard'],
      ['Text primary', 'Blackberry readability anchor', 'ink'],
      ['Text secondary', 'Supporting copy', 'secondary'],
      ['Border / focus', 'Quiet separation and visible focus', 'border'],
      ['Success / warning / error / info', 'Status layer with icon + text', 'status']
    ];
    return section('colors', '01 / foundations', 'Color is surface, rhythm, and signal.', 'The five approved source colors stay exact. V3 derives a tonal world around them so white supports function instead of taking over the page.', `
      <div class="lab-subheading-row"><div><p class="lab-overline">SOURCE PALETTE</p><h3>Five colors, one FoodFighter world</h3></div><span class="lab-token-note">SOURCE_PALETTE_CHANGED: NO</span></div>
      <div class="lab-palette-grid">
        ${D.sourcePalette.map(color => `<article class="lab-palette-swatch lab-palette-${color.id}" style="--lab-swatch:${color.hex}"><div class="lab-palette-color"><span>${color.id === 'blackberry' || color.id === 'mauve' ? 'Light type' : 'Blackberry type'}</span><strong>${color.hex}</strong></div><div class="lab-palette-name"><strong>${esc(color.name)}</strong><span>${esc(color.foreground)} foreground</span></div></article>`).join('')}
      </div>
      <div class="lab-subheading-row lab-subheading-space"><div><p class="lab-overline">TONAL WORLD</p><h3>Derived surfaces keep the page warm</h3></div><span class="lab-token-note">semantic candidates · isolated</span></div>
      <div class="lab-semantic-grid">${semantic.map(([label, purpose, tone]) => `<div class="lab-semantic-item lab-semantic-${tone}"><span class="lab-semantic-dot"></span><div><strong>${esc(label)}</strong><small>${esc(purpose)}</small></div></div>`).join('')}</div>
      <div class="lab-composition-grid">
        <article class="lab-composition lab-composition-petal"><span class="lab-overline">WARM / FOOD</span><h3>Gather around the table.</h3><p>Petal gives a soft social surface; Blackberry keeps the message confident.</p><div>${C.badge('Food visual', 'custard', 'utensils')} ${C.badge('Group ready', 'petal', 'users')}</div></article>
        <article class="lab-composition lab-composition-apricot"><span class="lab-overline">SOCIAL / GROUP</span><h3>Make room for everyone.</h3><p>Apricot carries inviting actions and room identity without becoming sugary.</p><div>${C.badge('6 members', 'apricot', 'users')} ${C.badge('Host', 'neutral', 'user')}</div></article>
        <article class="lab-composition lab-composition-custard"><span class="lab-overline">HIGHLIGHT / WINNER</span><h3>Tom Yum wins the table.</h3><p>Custard is reserved for meaningful choice, progress, and celebration.</p><div>${C.badge('Winner', 'custard', 'trophy')} ${C.badge('Selected', 'brand', 'check')}</div></article>
        <article class="lab-composition lab-composition-neutral"><span class="lab-overline">NEUTRAL / CONTENT</span><h3>Quiet clarity for the details.</h3><p>Warm elevated surfaces hold forms, menus, and dense information with contrast.</p><div>${C.badge('4:3 food card', 'neutral', 'image')} ${C.badge('Metadata', 'neutral', 'info')}</div></article>
      </div>
      <div class="lab-contrast-row"><div><p class="lab-overline">ACCESSIBLE FOREGROUND PAIRS</p><p>Blackberry is the default text anchor on all light pastel surfaces. White type is reserved for strong Blackberry or dark image overlays.</p></div><div class="lab-contrast-pairs"><span class="lab-contrast-pair contrast-light"><strong>Blackberry</strong><small>on Petal / Apricot / Custard</small></span><span class="lab-contrast-pair contrast-dark"><strong>White</strong><small>on Blackberry</small></span></div></div>
    `, 'petal');
  }

  function renderTypography() {
    const rows = [
      ['Display', 'Georgia / candidate', '36px', '56px', '700', '1.05'],
      ['H1', 'Poppins / Noto Sans Thai', '28px', '40px', '700', '1.15'],
      ['H2', 'Poppins / Noto Sans Thai', '22px', '28px', '700', '1.2'],
      ['H3', 'Poppins / Noto Sans Thai', '18px', '20px', '600', '1.3'],
      ['Card title', 'Poppins / Noto Sans Thai', '16px', '18px', '600', '1.35'],
      ['Body', 'Poppins / Noto Sans Thai', '15px', '16px', '400', '1.55'],
      ['Supporting', 'Poppins / Noto Sans Thai', '13px', '14px', '400', '1.45'],
      ['Label / metadata', 'Poppins / Noto Sans Thai', '11px', '12px', '600', '1.3']
    ];
    return section('typography', '02 / foundations', 'Editorial emotion, functional clarity.', 'Poppins and Noto Sans Thai keep the product useful. A system-safe Georgia candidate gives hero messages, meal names, and winner moments a more editorial voice without adding a dependency.', `
      <div class="lab-type-hero"><div><span class="lab-overline">EDITORIAL DISPLAY CANDIDATE</span><p class="lab-type-display">What are we eating today?</p><p class="lab-type-display lab-type-thai">กินอะไรดีวันนี้?</p><span class="lab-token-note">Georgia fallback · candidate only · no package added</span></div><div class="lab-type-menu"><span class="lab-overline">MEAL NAME</span><strong>Tom Yum</strong><strong>Korean BBQ</strong><span>Expressive title / clean metadata</span></div></div>
      <div class="lab-type-function"><div class="lab-subheading-row"><div><p class="lab-overline">FUNCTIONAL UI</p><h3>Everyday hierarchy</h3></div><span class="lab-token-note">Poppins + Noto Sans Thai</span></div><div class="lab-type-table-wrap"><table class="lab-type-table"><thead><tr><th>Role</th><th>Family</th><th>Mobile</th><th>Desktop</th><th>Weight</th><th>Line height</th></tr></thead><tbody>${rows.map(row => `<tr><td><span class="lab-type-sample lab-type-${row[0].toLowerCase().replace(/[^a-z]+/g, '-')}">${esc(row[0])}</span></td><td>${esc(row[1])}</td><td>${esc(row[2])}</td><td>${esc(row[3])}</td><td>${esc(row[4])}</td><td>${esc(row[5])}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="lab-mixed-type"><p class="lab-overline">MIXED THAI + ENGLISH</p><p>เย็นนี้ชวนเพื่อนมาเลือก <strong>Tom Yum</strong> กันไหม? <span>Tap to decide together.</span></p><p class="lab-type-note">Thai line wrapping should remain comfortable at 360px and 390px.</p></div>
    `, 'apricot');
  }

  function renderSpacing() {
    const values = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];
    return section('spacing', '03 / foundations', 'A compact spacing vocabulary.', 'The scale stays expressive enough for editorial rhythm and disciplined enough for functional screens. Gutters grow with the viewport; controls keep touch targets intact.', `
      <div class="lab-spacing-grid">${values.map(value => `<div class="lab-spacing-token" style="--lab-space:${value}px"><div class="lab-spacing-bar"></div><strong>${value}</strong><span>${value <= 12 ? 'inline' : value <= 24 ? 'control / card' : value <= 48 ? 'section' : 'page rhythm'}</span></div>`).join('')}</div>
      <div class="lab-spacing-map"><div><span>INLINE</span><strong>4 · 8 · 12</strong><small>icon / label / chip gap</small></div><div><span>CONTROL</span><strong>12 · 16 · 20</strong><small>field and action rhythm</small></div><div><span>CARD</span><strong>20 · 24 · 32</strong><small>internal breathing room</small></div><div><span>SECTION</span><strong>32 · 40 · 48</strong><small>visual chapters</small></div><div><span>GUTTER</span><strong>20 → 80</strong><small>responsive page edge</small></div></div>
    `, 'custard');
  }

  function renderLayout() {
    const v = viewport();
    return section('layout', '04 / foundations', 'Layouts that adapt with intent.', 'Narrow, standard, and wide containers give each product moment room to breathe. The preview below is one responsive pattern, not eight duplicated screens.', `
      <div class="lab-container-demo"><div class="lab-container-sample lab-container-narrow"><span>NARROW</span><strong>520px max</strong><small>focused forms / reading</small></div><div class="lab-container-sample lab-container-standard"><span>STANDARD</span><strong>960px max</strong><small>task screens / lists</small></div><div class="lab-container-sample lab-container-wide"><span>WIDE</span><strong>1280px max</strong><small>home / image-led composition</small></div></div>
      <div class="lab-layout-demo"><div class="lab-subheading-row"><div><p class="lab-overline">RESPONSIVE GRID</p><h3>Same system, changing density</h3></div><span class="lab-token-note">current preview: ${esc(v.label)}</span></div><div class="lab-grid-demo lab-grid-1"><span>1 column</span><span>task</span><span>first</span><span>stack</span></div><div class="lab-grid-demo lab-grid-2"><span>2 column</span><span>split</span><span>form</span><span>visual</span></div><div class="lab-grid-demo lab-grid-3"><span>3 column</span><span>card</span><span>card</span><span>card</span></div><div class="lab-grid-demo lab-grid-4"><span>4 column</span><span>dish</span><span>dish</span><span>dish</span><span>dish</span></div></div>
      <div class="lab-viewport-ruler"><div class="lab-subheading-row"><div><p class="lab-overline">VIEWPORT PRESETS</p><h3>360 → 1440</h3></div><span class="lab-token-note">switch in the top bar</span></div><div class="lab-ruler-track">${D.viewports.map(item => `<button type="button" class="lab-ruler-stop ${item.id === labState.viewport ? 'is-active' : ''}" data-lab-action="set-viewport" data-lab-value="${item.id}" style="--lab-ruler-width:${Math.max(16, Math.min(100, item.width / 14))}px"><i></i><span>${item.width}</span></button>`).join('')}</div><div class="lab-ruler-note"><span>Mobile task-first</span><span>Tablet progressive grids</span><span>Desktop image-led rhythm</span></div></div>
    `, 'quiet');
  }

  function renderShape() {
    const radii = [['small', '8px', 'controls'], ['medium', '12px', 'fields / chips'], ['large', '20px', 'cards'], ['XL', '28px', 'major sections'], ['pill', '999px', 'status / compact actions'], ['circle', '50%', 'icon wells / avatar'], ['organic', 'asymmetric', 'hero / food moment']];
    return section('shape', '05 / foundations', 'Soft geometry with a job to do.', 'Controls stay precise. Cards become friendlier. Organic shapes belong to hero and media moments, where they add appetite rather than making every input irregular.', `
      <div class="lab-shape-grid">${radii.map(([name, value, use]) => `<div class="lab-shape-item"><div class="lab-shape-preview lab-shape-${name.toLowerCase()}" aria-hidden="true"></div><strong>${esc(name)}</strong><span>${esc(value)}</span><small>${esc(use)}</small></div>`).join('')}</div>
      <div class="lab-elevation-grid"><div class="lab-elevation-item lab-elevation-flat"><span>FLAT</span><strong>Quiet structure</strong><small>tonal sections / dividers</small></div><div class="lab-elevation-item lab-elevation-raised"><span>RAISED</span><strong>Functional lift</strong><small>cards / fields</small></div><div class="lab-elevation-item lab-elevation-floating"><span>FLOATING</span><strong>Needs attention</strong><small>nav / dialogs / sheets</small></div></div>
      <div class="lab-organic-mini"><div class="lab-organic-blob"></div><div class="lab-organic-circle"></div><div><p class="lab-overline">ORGANIC / PROMINENT ONLY</p><h3>Plate-inspired framing</h3><p>Cropped circles, soft blobs, and overlapping fields stay decorative and light on mobile.</p></div></div>
    `, 'mauve');
  }

  function renderMedia() {
    const states = ['empty', 'loading', 'loaded', 'missing', 'overlay'];
    return section('media', '06 / foundations', 'Image slots are ready before the images arrive.', 'The owner will provide real imagery later. These asset-free slots make purpose, ratio, crop, and state explicit without inventing restaurants or downloading stock photography.', `
      <div class="lab-media-slot-grid">${D.mediaSlots.map(slot => `<div class="lab-media-slot-card">${C.mediaSlot(slot.id, 'loaded')}<p class="lab-media-slot-purpose">Purpose: ${slot.id === 'hero' ? 'emotional entry' : slot.id === 'winner' ? 'result emphasis' : 'contextual food / social support'}</p></div>`).join('')}</div>
      <div class="lab-subheading-row lab-subheading-space"><div><p class="lab-overline">MEDIA STATES</p><h3>Empty, loading, fallback, overlay</h3></div><div class="lab-inline-actions">${states.map(item => C.button(item, item === 'loaded' ? 'brand' : 'outline', 'sm', { action: 'set-media-state', value: item })).join('')}</div></div>
      <div class="lab-media-state-demo">${C.mediaSlot('food', labState.mediaState || 'loaded', { overlay: labState.mediaState === 'overlay' })}</div>
      <div class="lab-media-spec"><span><strong>FOOD</strong> appetizing / warm / close crop</span><span><strong>SOCIAL</strong> candid / shared / non-corporate</span><span><strong>FRAME</strong> organic mask only for hero / winner</span><span><strong>NO EXTERNAL ASSETS</strong> placeholder only in this lab</span></div>
    `, 'apricot');
  }

  function renderGraphics() {
    return section('graphics', '06.5 / foundations', 'Organic accents add appetite, not noise.', 'Soft blobs, cropped circles, plate-inspired shapes, tiny ingredient marks, and restrained confetti are decorative candidates. They stay out of the critical path and quiet down on mobile.', `
      <div class="lab-graphics-board"><div class="lab-graphic-specimen lab-graphic-blobs"><span class="lab-overline">SOFT BLOBS</span><div class="lab-blob blob-one"></div><div class="lab-blob blob-two"></div><div class="lab-blob blob-three"></div><strong>Layer tonal fields</strong></div><div class="lab-graphic-specimen lab-graphic-plates"><span class="lab-overline">PLATE-INSPIRED CIRCLES</span><div class="lab-plate-ring"></div><div class="lab-plate-core"></div><strong>Frame a food moment</strong></div><div class="lab-graphic-specimen lab-graphic-ingredients"><span class="lab-overline">TINY INGREDIENT GRAPHICS</span><div class="lab-ingredient-row"><i></i><i></i><i></i><i></i><i></i></div><strong>Small detail, large warmth</strong></div><div class="lab-graphic-specimen lab-graphic-confetti"><span class="lab-overline">CONFETTI / DOODLES</span><div class="lab-confetti-field"><i></i><i></i><i></i><i></i><i></i><i></i><span>${C.icon('sparkles', 20)}</span></div><strong>Celebrate with restraint</strong></div></div><div class="lab-graphic-rule"><span>Use on</span><strong>hero / winner / empty state</strong><span>Keep clear of</span><strong>inputs / dense lists / essential labels</strong></div>
    `, 'custard');
  }

  function renderIconWells() {
    const tones = ['petal', 'apricot', 'custard', 'brand'];
    const sizes = [['sm', 'Small', '32px'], ['md', 'Medium', '46px'], ['lg', 'Large', '64px']];
    return section('icon-wells', '09.5 / components', 'Icon wells give meaning a soft landing.', 'Circular and soft-rounded containers carry a semantic cue while keeping action targets consistent. The icon is never the only signal.', `
      <div class="lab-icon-well-size-grid">${sizes.map(([size, label, px]) => `<div><span class="lab-overline">${esc(label)} · ${px}</span><div class="lab-icon-well-row">${tones.map((tone, index) => C.iconWell(tone, size, ['sparkles', 'users', 'mapPin', 'check'][index], { selected: tone === 'brand' && size === 'lg' }))}</div></div>`).join('')}</div>
      <div class="lab-icon-well-states"><div><span>DEFAULT</span>${C.iconWell('petal', 'md', 'heart')}</div><div class="is-hover-preview"><span>HOVER</span>${C.iconWell('apricot', 'md', 'heart')}</div><div class="is-pressed-preview"><span>PRESSED</span>${C.iconWell('custard', 'md', 'heart')}</div><div><span>SELECTED</span>${C.iconWell('brand', 'md', 'check', { selected: true })}</div><div><span>DISABLED</span>${C.iconWell('mauve', 'md', 'lock', { disabled: true })}</div></div>
      <p class="lab-component-note">Use icon wells for status, room identity, food moments, and action cards. Keep the well shape regular even when the surrounding hero is organic.</p>
    `, 'petal');
  }

  function renderMotion() {
    const motionRows = [
      ['Hover', '100–140ms', 'tonal shift + lift'],
      ['Press', '80–120ms', 'small scale / depth'],
      ['Select', '140–180ms', 'surface fill + icon'],
      ['Dropdown', '160–220ms', 'opacity + translate'],
      ['Card', '180–240ms', 'restrained lift'],
      ['Modal / drawer', '220–300ms', 'enter / exit'],
      ['Ready milestone', '280–380ms', 'pop + highlight'],
      ['Winner reveal', '400–550ms', 'controlled expressive reveal']
    ];
    return section('motion', '07 / foundations', 'Motion gives feedback, not noise.', 'Transitions use transform and opacity, stay centralized, and collapse to understandable state changes when Reduced Motion is selected or the OS requests it.', `
      <div class="lab-motion-board"><div class="lab-motion-table"><div class="lab-motion-table-head"><span>Semantic tier</span><span>Timing</span><span>Purpose</span></div>${motionRows.map(row => `<div class="lab-motion-row"><strong>${esc(row[0])}</strong><span>${esc(row[1])}</span><span>${esc(row[2])}</span></div>`).join('')}</div><div class="lab-motion-demo"><div class="lab-motion-orbit"><span></span><span></span><span></span></div><p>${labState.motion === 'reduced' ? 'Reduced Motion: preserve state, remove travel.' : 'Motion ON: hover the orbit and the card.'}</p><div class="lab-motion-demo-card">${C.icon('sparkles', 18)}<strong>Ready to share</strong><span>purposeful feedback</span></div></div></div>
      <div class="lab-reduced-note"><span class="lab-reduced-icon">${C.icon('settings', 17)}</span><div><strong>Reduced-motion contract</strong><p>Disable nonessential translate, scale, shimmer, and reveal movement. Keep focus, selected fill, progress, and success copy visible.</p></div><span class="lab-token-note">prefers-reduced-motion: reduce</span></div>
    `, 'custard');
  }

  function renderButtons() {
    const variants = [['Primary', 'brand'], ['Secondary', 'secondary'], ['Tonal Petal', 'petal'], ['Tonal Apricot', 'apricot'], ['Tonal Custard', 'custard'], ['Outline', 'outline'], ['Ghost', 'ghost'], ['Danger', 'danger']];
    return section('buttons', '08 / components', 'Buttons should feel ready to act.', 'Critical actions are visible at rest, readable on touch, and visibly responsive to hover, press, focus, loading, and disabled states.', `
      <div class="lab-button-matrix">${variants.map(([label, variant]) => `<div class="lab-button-row"><div><strong>${esc(label)}</strong><span>${variant === 'brand' ? 'high emphasis' : variant === 'ghost' ? 'low emphasis' : 'candidate variant'}</span></div><div class="lab-button-samples">${C.button('Small', variant, 'sm', { action: 'button-feedback' })}${C.button('Medium', variant, 'md', { action: 'button-feedback' })}${C.button('Large', variant, 'lg', { action: 'button-feedback', icon: variant === 'brand' ? 'arrowRight' : '' , iconRight: true })}</div></div>`).join('')}</div>
      <div class="lab-button-states"><div><p class="lab-overline">INTERACTION STATES</p><h3>Hover, pressed, focus, loading, disabled</h3></div><div class="lab-state-grid"><div><span>DEFAULT</span>${C.button('Create Room', 'brand', 'md', { action: 'button-feedback' })}</div><div><span>HOVER</span>${C.button('Hover me', 'petal', 'md', { action: 'button-feedback', className: 'lab-force-hover' })}</div><div><span>PRESSED</span>${C.button('Press me', 'apricot', 'md', { action: 'button-feedback', className: 'lab-force-pressed' })}</div><div><span>FOCUS</span>${C.button('Tab to focus', 'outline', 'md', { action: 'button-feedback', className: 'lab-force-focus' })}</div><div><span>LOADING</span>${C.button(labState.buttonLoading ? 'Loading…' : 'Toggle loading', 'brand', 'md', { action: 'toggle-button-loading', disabled: labState.buttonLoading, icon: labState.buttonLoading ? 'spinner' : 'clock' })}</div><div><span>DISABLED</span>${C.button('Unavailable', 'secondary', 'md', { disabled: true })}</div></div><div class="lab-icon-button-state"><span>ICON BUTTON</span>${C.button('', 'outline', 'md', { action: 'button-feedback', iconOnly: true, icon: 'bell', ariaLabel: 'Icon-only notification button' })}<p>Icon-only controls keep a semantic label and a 44px-ish target.</p></div></div>
      <div class="lab-pointer-contract"><div><span class="lab-overline">DESKTOP POINTER</span><p>Default → hover → mouse-down → pressed → focus-visible → action.</p></div><div><span class="lab-overline">TOUCH CONTRACT</span><p>Default → pressed → selected → focus → action. No critical action is hidden behind hover.</p></div><div class="lab-pointer-mark">${C.icon('mousePointer', 18)} <span>44px-ish target</span></div></div>
    `, 'brand');
  }

  function renderTonalFormSection(tone, title, helper, id, control) {
    return `<div class="lab-tonal-form lab-tonal-form-${tone}"><div class="lab-tonal-form-head">${C.iconWell(tone, 'md', tone === 'petal' ? 'edit' : tone === 'apricot' ? 'users' : tone === 'custard' ? 'mapPin' : 'calendar')}<div><span class="lab-overline">${esc(tone)}</span><strong>${esc(title)}</strong></div></div><p>${esc(helper)}</p>${control || `<input class="lab-control" id="${esc(id)}" value="${esc(title === 'Room Name' ? 'Friday FoodFight' : '')}" aria-label="${esc(title)}" />`}</div>`;
  }

  function renderForms() {
    return section('forms', '09 / components', 'Forms can feel warm without losing precision.', 'The tonal form section is the signature pattern for setup flows. Every control keeps a native semantic, visible focus, and a state that can be understood without color alone.', `
      <div class="lab-tonal-form-grid">
        ${renderTonalFormSection('petal', 'Room Name', 'Give the table a name people recognize.', 'tonal-room-name')}
        ${renderTonalFormSection('apricot', 'Max Members', 'Set a clear upper bound for the group.', 'tonal-members', '<select class="lab-control" id="tonal-members" aria-label="Max members"><option>4 people</option><option selected>6 people</option><option>8 people</option></select>')}
        ${renderTonalFormSection('custard', 'Location', 'Use a nearby landmark as a gentle anchor.', 'tonal-location', '<div class="lab-control-with-icon">' + C.icon('mapPin', 16) + '<input class="lab-control" id="tonal-location" value="Siam Square" aria-label="Location" /></div>')}
        ${renderTonalFormSection('petal', 'Search Radius', 'Keep the search area in the group’s comfort zone.', 'tonal-radius', '<div class="lab-choice-row"><button type="button" class="lab-choice is-selected" data-lab-action="choice" data-lab-value="3 km">3 km</button><button type="button" class="lab-choice" data-lab-action="choice" data-lab-value="5 km">5 km</button><button type="button" class="lab-choice" data-lab-action="choice" data-lab-value="10 km">10 km</button></div>')}
        ${renderTonalFormSection('apricot', 'Date / Time', 'A light scheduling cue for the group.', 'tonal-date', '<div class="lab-control-split"><input class="lab-control" type="date" id="tonal-date" value="2026-08-28" aria-label="Date" /><input class="lab-control" type="time" id="tonal-time" value="19:00" aria-label="Time" /></div>')}
      </div>
      <div class="lab-subheading-row lab-subheading-space"><div><p class="lab-overline">CONTROL GALLERY</p><h3>Real browser controls, candidate styling</h3></div><span class="lab-token-note">default · filled · hover · focus · error · success · disabled · loading</span></div>
      <form id="lab-form-demo" class="lab-form-gallery">
        <div class="lab-form-column">
          ${C.field('Text input', 'lab-text-input', '<input class="lab-control" id="lab-text-input" value="Friday FoodFight" />', { helper: 'Room names stay short and scannable.' })}
          ${C.field('Email / error', 'lab-email-input', '<input class="lab-control is-error" id="lab-email-input" value="pure@" aria-invalid="true" />', { error: 'Enter a complete email address.' })}
          ${C.field('Password', 'lab-password-input', '<div class="lab-control-with-action"><input class="lab-control" id="lab-password-input" type="password" value="Password123" /><button type="button" class="lab-control-action" data-lab-action="toggle-password" aria-label="Show password">' + C.icon('eye', 16) + '</button></div>', { helper: 'Password visibility is an assistive action, not a new flow.' })}
          ${C.field('Search', 'lab-search-input', '<div class="lab-control-with-icon">' + C.icon('search', 16) + '<input class="lab-control" id="lab-search-input" placeholder="Search food or area" /></div>', { helper: 'Search remains visible without hover.' })}
          ${C.field('Textarea', 'lab-textarea', '<textarea class="lab-control" id="lab-textarea" rows="3" placeholder="Anything the group should know?"></textarea>')}
        </div>
        <div class="lab-form-column">
          ${C.field('Select', 'lab-select', C.select('lab-select', 'Siam Square', { items: ['Siam Square', 'Ari', 'Thonglor'] }))}
          ${C.field('Combobox', 'lab-combobox', '<input class="lab-control" id="lab-combobox" list="lab-location-options" value="Siam Square" /><datalist id="lab-location-options"><option value="Ari"></option><option value="Thonglor"></option><option value="Siam Square"></option></datalist>')}
          <div class="lab-control-cluster"><span class="lab-label">Checkbox / radio</span><label class="lab-check"><input type="checkbox" checked /><span>${C.icon('check', 13)}</span><strong>Vegetarian friendly</strong></label><label class="lab-check"><input type="radio" name="lab-diet" checked /><span></span><strong>Group default</strong></label><label class="lab-check"><input type="radio" name="lab-diet" /><span></span><strong>Ask every time</strong></label></div>
          <div class="lab-control-cluster"><span class="lab-label">Toggle</span><label class="lab-switch"><input type="checkbox" checked /><span></span><strong>Use current location</strong></label></div>
          <div class="lab-control-cluster"><span class="lab-label">Stepper</span><div class="lab-stepper"><button type="button" data-lab-action="stepper" data-lab-value="-1" aria-label="Decrease members">${C.icon('minus', 15)}</button><strong id="lab-stepper-value">6</strong><button type="button" data-lab-action="stepper" data-lab-value="1" aria-label="Increase members">${C.icon('plus', 15)}</button><span>members</span></div></div>
        </div>
        <div class="lab-form-wide">
          <div class="lab-control-cluster"><span class="lab-label">Segmented control</span><div class="lab-segmented"><button type="button" class="is-selected" data-lab-action="segment" data-lab-value="Nearby">Nearby</button><button type="button" data-lab-action="segment" data-lab-value="Map">Map</button><button type="button" data-lab-action="segment" data-lab-value="Saved">Saved</button></div></div>
          <div class="lab-control-cluster"><span class="lab-label">OTP</span><div class="lab-otp">${[1, 2, 3, 4, 5, 6].map(number => `<input class="lab-otp-input" inputmode="numeric" maxlength="1" value="${number === 1 ? '1' : ''}" aria-label="OTP digit ${number}" />`).join('')}</div></div>
          <div class="lab-control-cluster"><span class="lab-label">Radius selector</span><div class="lab-choice-row"><button type="button" class="lab-choice" data-lab-action="choice" data-lab-value="1 km">1 km</button><button type="button" class="lab-choice is-selected" data-lab-action="choice" data-lab-value="3 km">3 km</button><button type="button" class="lab-choice" data-lab-action="choice" data-lab-value="5 km">5 km</button><button type="button" class="lab-choice" data-lab-action="choice" data-lab-value="10 km">10 km</button></div></div>
          <div class="lab-control-cluster"><span class="lab-label">State strip</span><div class="lab-state-strip"><span>${statePill('normal', 'Default')}</span><span class="is-error">${statePill('error', 'Error')}</span><span class="is-success">${statePill('success', 'Success')}</span><span class="is-disabled">${statePill('disabled', 'Disabled')}</span><span>${statePill('loading', 'Loading')}</span></div></div>
        </div>
      </form>
    `, 'petal');
  }

  function renderChips() {
    const statuses = [
      ['Lobby', 'waiting', 'clock'], ['Ready', 'success', 'check'], ['Not Ready', 'warning', 'clock'], ['Waiting', 'warning', 'clock'], ['Completed', 'success', 'check'], ['Cancelled', 'danger', 'close'], ['Paid', 'success', 'check'], ['Unpaid', 'danger', 'receipt'], ['Host', 'brand', 'crown'], ['Member', 'neutral', 'user'], ['Selected', 'brand', 'check'], ['Winner', 'custard', 'trophy']
    ];
    const prefs = ['Thai', 'Korean', 'Japanese', 'Halal', 'Vegetarian', 'No Seafood', 'Spicy'];
    return section('chips', '10 / components', 'Status and preference signals at a glance.', 'Color supports the message; icon and text carry the meaning. Preference chips are compact, tactile, and safe to scan on mobile.', `
      <div class="lab-subheading-row"><div><p class="lab-overline">FOODFIGHTER STATUS</p><h3>Icon + text + color</h3></div><span class="lab-token-note">never color alone</span></div><div class="lab-status-grid">${statuses.map(([label, tone, iconName]) => `<div class="lab-status-specimen">${C.status(label, tone, iconName)}<span>${esc(tone)} state</span></div>`).join('')}</div>
      <div class="lab-subheading-row lab-subheading-space"><div><p class="lab-overline">PREFERENCE CHIPS</p><h3>Static selection candidates</h3></div><span class="lab-token-note">local interaction only</span></div><div class="lab-preference-chips">${prefs.map((label, index) => `<button type="button" class="lab-preference-chip ${labState.selectedChips.includes(label) ? 'is-selected' : ''}" data-lab-action="toggle-chip" data-lab-value="${esc(label)}" aria-pressed="${labState.selectedChips.includes(label)}">${labState.selectedChips.includes(label) ? C.icon('check', 14) : ''}${esc(label)}</button>`).join('')}</div>
      <div class="lab-chip-contract"><div><strong>Selected</strong><span>filled surface + check</span></div><div><strong>Touch</strong><span>44px-ish target</span></div><div><strong>Keyboard</strong><span>native button focus</span></div><div><strong>Copy</strong><span>short, readable labels</span></div></div>
    `, 'custard');
  }

  function renderCardFamily(label, className, content, options) {
    const opts = options || {};
    if (opts.selectable) {
      return `<button type="button" class="lab-card lab-card-${className} ${labState.selectedMeal === opts.value ? 'is-selected' : ''}" data-lab-action="toggle-meal" data-lab-value="${esc(opts.value)}" aria-pressed="${labState.selectedMeal === opts.value}"><span class="lab-card-kicker">${esc(label)}</span>${content}</button>`;
    }
    return `<article class="lab-card lab-card-${className}"><span class="lab-card-kicker">${esc(label)}</span>${content}</article>`;
  }

  function renderCards() {
    return section('cards', '11 / components', 'Card families make hierarchy visible.', 'Not every card is white, bordered, and identical. Neutral, tonal, image-led, selectable, functional, and celebration surfaces each get a distinct job.', `
      <div class="lab-card-family-grid">
        ${renderCardFamily('Neutral Card', 'neutral', '<h3>Room preferences</h3><p>Quiet information with a clean scan path.</p><span class="lab-card-footer">4 settings <i>' + C.icon('arrowRight', 14) + '</i></span>')}
        ${renderCardFamily('Tonal Petal Card', 'petal', '<h3>Make it social</h3><p>Soft group surface for shared context and inviting copy.</p><span class="lab-card-footer">6 members <i>' + C.icon('users', 14) + '</i></span>')}
        ${renderCardFamily('Tonal Apricot Card', 'apricot', '<h3>Room identity</h3><p>Warm support for setup, location, and light metadata.</p><span class="lab-card-footer">Siam Square <i>' + C.icon('mapPin', 14) + '</i></span>')}
        ${renderCardFamily('Tonal Custard Card', 'custard', '<h3>Selected direction</h3><p>Highlight only when a decision, win, or next step matters.</p><span class="lab-card-footer">Keep this one <i>' + C.icon('check', 14) + '</i></span>')}
        ${renderCardFamily('Brand Card', 'brand', '<h3>FoodFight is ready</h3><p>Blackberry is a strong anchor for high-emphasis content.</p><span class="lab-card-footer">Start together <i>' + C.icon('arrowRight', 14) + '</i></span>')}
        ${renderCardFamily('Action Card', 'action', '<span class="lab-card-icon">' + C.icon('users', 22) + '</span><h3>Create a room</h3><p>One clear next action, visible on touch.</p><span class="lab-card-footer">Create Room <i>' + C.icon('arrowRight', 14) + '</i></span>')}
        ${renderCardFamily('Image Card', 'image', C.mediaSlot('food', 'overlay') + '<div class="lab-card-image-copy"><h3>Tom Yum</h3><p>Warm dish focus / 4:3</p></div>')}
        ${renderCardFamily('Selectable Card', 'selectable', '<div class="lab-selectable-copy"><h3>Korean BBQ</h3><p>Click or press to see selected feedback.</p></div><span class="lab-selectable-mark">' + C.icon(labState.selectedMeal === 'Korean BBQ' ? 'check' : 'heart', 19) + '</span>', { selectable: true, value: 'Korean BBQ' })}
        ${renderCardFamily('Current FoodFight Card', 'current', '<div class="lab-card-split"><div><h3>Friday FoodFight</h3><p>4 members · Lobby</p></div>' + C.badge('Waiting', 'warning', 'clock') + '</div><button type="button" class="lab-card-action" data-lab-action="button-feedback">Continue ' + C.icon('arrowRight', 14) + '</button>')}
        ${renderCardFamily('Celebration Card', 'celebration', '<div class="lab-card-split"><div><h3>Winner: Tom Yum</h3><p>Controlled expressive result moment.</p></div>' + C.iconWell('custard', 'lg', 'trophy') + '</div>')}
      </div>
      <div class="lab-domain-card-grid"><div><span>ROOM CARD</span><strong>Identity + code + ready</strong></div><div><span>CURRENT FOODFIGHT</span><strong>Status + continue</strong></div><div><span>MEMBER CARD</span><strong>Avatar + role + state</strong></div><div><span>FOOD CARD</span><strong>Image + name + tags</strong></div><div><span>RECOMMENDATION CARD</span><strong>Match + context + action</strong></div><div><span>HISTORY CARD</span><strong>Date + dish + result</strong></div><div><span>BILL / PAYMENT CARD</span><strong>Amount + paid status</strong></div><div><span>EMPTY CARD</span><strong>Visual + heading + CTA</strong></div></div>
    `, 'apricot');
  }

  function renderDesktopNav() {
    return `<nav class="lab-product-desktop-nav" aria-label="Desktop FoodFighter navigation"><strong class="lab-product-wordmark">FoodFighter</strong><div class="lab-product-nav-links">${D.navItems.map(item => `<button type="button" class="${labState.activeNav === item.id ? 'is-active' : ''}" data-lab-action="set-nav" data-lab-value="${item.id}">${C.icon(item.icon, 15)}<span>${esc(item.label)}</span></button>`).join('')}</div><div class="lab-product-nav-actions"><button type="button" class="lab-product-icon-action" data-lab-action="toast-info" aria-label="Notifications">${C.icon('bell', 17)}<i></i></button><button type="button" class="lab-product-avatar" data-lab-action="toggle-account" aria-label="Open account menu">P</button></div></nav>`;
  }

  function renderMobileNav() {
    return `<nav class="lab-product-mobile-nav" aria-label="Mobile FoodFighter navigation">${D.navItems.map(item => `<button type="button" class="${labState.activeNav === item.id ? 'is-active' : ''}" data-lab-action="set-nav" data-lab-value="${item.id}">${C.icon(item.icon, 17)}<span>${esc(item.label)}</span></button>`).join('')}</nav>`;
  }

  function renderNavigation() {
    return section('navigation', '12 / components', 'Navigation changes shape, not meaning.', 'Desktop uses a calm top bar. Mobile uses a floating bottom surface with a clear active indicator. Tabs, back, breadcrumbs, pagination, and account controls stay inspectable in the same language.', `
      <div class="lab-navigation-grid"><div class="lab-nav-specimen lab-nav-desktop"><span class="lab-overline">DESKTOP TOP NAV</span>${renderDesktopNav()}<p>Warm background · Blackberry text · tonal active tab · account / notification affordances.</p></div><div class="lab-nav-specimen lab-nav-mobile"><span class="lab-overline">MOBILE FLOATING BOTTOM NAV</span>${renderMobileNav()}<p>Floating surface · soft elevation · icon + label · selected tonal indicator.</p></div></div>
      <div class="lab-navigation-tools"><div class="lab-nav-tool"><span class="lab-overline">TABS</span><div class="lab-tabs"><button type="button" class="is-active" data-lab-action="tab">Overview</button><button type="button" data-lab-action="tab">Members</button><button type="button" data-lab-action="tab">Activity</button></div></div><div class="lab-nav-tool"><span class="lab-overline">BACK / BREADCRUMB</span><div class="lab-back-row"><button type="button" class="lab-back-button" data-lab-action="toast-info">${C.icon('arrowLeft', 15)} Back</button><span>Home</span><i>/</i><strong>Room</strong></div></div><div class="lab-nav-tool"><span class="lab-overline">PAGINATION</span><div class="lab-pagination"><button type="button" data-lab-action="pagination" data-lab-value="prev" aria-label="Previous page">${C.icon('arrowLeft', 14)}</button><button type="button" class="is-active" data-lab-action="pagination" data-lab-value="1">1</button><button type="button" data-lab-action="pagination" data-lab-value="2">2</button><button type="button" data-lab-action="pagination" data-lab-value="3">3</button><button type="button" data-lab-action="pagination" data-lab-value="next" aria-label="Next page">${C.icon('arrowRight', 14)}</button></div></div></div>
      <div class="lab-account-demo"><div><span class="lab-overline">ACCOUNT DROPDOWN</span><h3>Local interaction / no auth</h3><p>Open the avatar in the navigation specimen to inspect the menu.</p></div><button type="button" class="lab-product-avatar lab-account-trigger" data-lab-action="toggle-account" aria-expanded="${labState.accountOpen}">P</button>${labState.accountOpen ? `<div class="lab-account-menu"><strong>Pure</strong><span>pure@example.com</span><button type="button" data-lab-action="toast-info">Profile settings</button><button type="button" data-lab-action="toast-info">Sign out candidate</button></div>` : ''}</div>
    `, 'mauve');
  }

  function renderFeedback() {
    return section('feedback', '13 / components', 'Feedback keeps the group oriented.', 'Toast, inline, network, offline, retry, and page-error states share the same readable status language. Trigger the local toasts to test timing and focus-friendly copy.', `
      <div class="lab-feedback-trigger"><div><span class="lab-overline">TOASTS</span><h3>Try each feedback tone</h3></div><div class="lab-inline-actions">${C.button('Success', 'success', 'sm', { action: 'toast-success', icon: 'check' })}${C.button('Warning', 'warning', 'sm', { action: 'toast-warning', icon: 'clock' })}${C.button('Error', 'danger', 'sm', { action: 'toast-error', icon: 'close' })}${C.button('Info', 'outline', 'sm', { action: 'toast-info', icon: 'info' })}</div></div>
      <div class="lab-inline-feedback-grid"><div class="lab-inline-feedback lab-inline-success">${C.status('Saved', 'success', 'check')}<p>Your FoodFight preferences are ready for the group.</p></div><div class="lab-inline-feedback lab-inline-warning">${C.status('Waiting', 'warning', 'clock')}<p>One member still needs to choose a preference.</p></div><div class="lab-inline-feedback lab-inline-error">${C.status('Could not load', 'danger', 'close')}<p>Try again when your connection is stable.</p><button type="button" class="lab-text-action" data-lab-action="retry">${text('retry')} ${C.icon('refresh', 13)}</button></div><div class="lab-inline-feedback lab-inline-info">${C.status('Offline', 'info', 'wifiOff')}<p>Changes stay local until you are back online.</p></div></div>
      <div class="lab-page-feedback-grid"><article><span class="lab-feedback-icon">${C.icon('file', 22)}</span><h3>Page error</h3><p>We could not prepare this view. Your room is safe.</p><button type="button" class="lab-text-action" data-lab-action="retry">Retry ${C.icon('refresh', 13)}</button></article><article><span class="lab-feedback-icon">${C.icon('wifiOff', 22)}</span><h3>Network error</h3><p>Check your connection and return when ready.</p><button type="button" class="lab-text-action" data-lab-action="retry">Try again ${C.icon('arrowRight', 13)}</button></article><article><span class="lab-feedback-icon">${C.icon('search', 22)}</span><h3>No search results</h3><p>Try a wider radius or a different food term.</p><button type="button" class="lab-text-action" data-lab-action="toast-info">Adjust search ${C.icon('arrowRight', 13)}</button></article></div>
    `, 'quiet');
  }

  function skeletonCard() {
    return `<div class="lab-skeleton-card"><span></span><span></span><span></span></div>`;
  }

  function renderLoading() {
    const uploadLabels = { idle: 'Idle drop zone', dragging: 'Dragging', uploading: 'Uploading', processing: 'Processing', success: 'Success', failure: 'Failure / retry' };
    const downloadLabels = { download: 'Download', preparing: 'Preparing', downloading: 'Downloading', complete: 'Complete', failed: 'Failed / retry' };
    return section('loading', '14 / components', 'Loading is a shared language.', 'Warm neutral skeletons, subtle shimmer, and clear waiting copy make progress feel considered. Infinite motion is quiet and always has a reduced-motion fallback.', `
      <div class="lab-loading-grid"><div class="lab-loading-specimen"><span class="lab-overline">PAGE LOADING</span><div class="lab-page-loader">${C.icon('utensils', 20)}<span>Setting the table…</span></div></div><div class="lab-loading-specimen"><span class="lab-overline">SECTION LOADING</span><div class="lab-section-loader"><span></span><span></span><span></span></div></div><div class="lab-loading-specimen"><span class="lab-overline">CARD SKELETON</span>${skeletonCard()}</div><div class="lab-loading-specimen"><span class="lab-overline">LIST SKELETON</span><div class="lab-list-skeleton"><span></span><span></span><span></span></div></div><div class="lab-loading-specimen"><span class="lab-overline">IMAGE LOADING</span>${C.mediaSlot('food', 'loading')}</div><div class="lab-loading-specimen"><span class="lab-overline">BUTTON / INLINE</span><div class="lab-inline-loading">${C.button('Loading…', 'brand', 'sm', { disabled: true, icon: 'spinner' })}<span>${C.icon('spinner', 15)} Checking the table</span></div></div></div>
      <div class="lab-waiting-panel"><div class="lab-waiting-orbit">${C.icon('users', 26)}</div><div><span class="lab-overline">WAITING ROOM</span><h3>Waiting for the group</h3><p>3 of 4 people are ready. Keep this state calm and useful.</p></div><div class="lab-waiting-count">3<span>/4</span></div></div>
      <div class="lab-subheading-row lab-subheading-space"><div><p class="lab-overline">UPLOAD / DOWNLOAD</p><h3>Transfer states without server behavior</h3></div><span class="lab-token-note">static UI demonstration</span></div><div class="lab-transfer-grid"><div class="lab-transfer-card"><div class="lab-transfer-head"><div><strong>Upload receipt image</strong><span>${esc(uploadLabels[labState.uploadState])}</span></div><button type="button" class="lab-icon-button" data-lab-action="cycle-upload" aria-label="Cycle upload state">${C.icon('refresh', 16)}</button></div><div class="lab-dropzone ${labState.uploadState === 'dragging' ? 'is-dragging' : ''} ${labState.uploadState === 'failure' ? 'is-failure' : ''}">${C.icon(labState.uploadState === 'success' ? 'check' : labState.uploadState === 'failure' ? 'close' : 'upload', 22)}<strong>${esc(uploadLabels[labState.uploadState])}</strong><span>${labState.uploadState === 'idle' ? 'Drop a file here or choose a local file' : labState.uploadState === 'success' ? 'Receipt is ready for review' : labState.uploadState === 'failure' ? 'File could not be processed' : 'Local-only visual state'}</span></div><div class="lab-progress-line"><span style="--lab-progress:${labState.uploadState === 'success' ? 100 : labState.uploadState === 'uploading' ? 62 : labState.uploadState === 'processing' ? 86 : 0}%"></span></div>${labState.uploadState === 'failure' ? `<button type="button" class="lab-text-action" data-lab-action="cycle-upload">Retry ${C.icon('refresh', 13)}</button>` : ''}</div><div class="lab-transfer-card"><div class="lab-transfer-head"><div><strong>Download summary</strong><span>${esc(downloadLabels[labState.downloadState])}</span></div><button type="button" class="lab-icon-button" data-lab-action="cycle-download" aria-label="Cycle download state">${C.icon('refresh', 16)}</button></div><div class="lab-download-state"><span class="lab-download-icon">${C.icon(labState.downloadState === 'failed' ? 'close' : labState.downloadState === 'complete' ? 'check' : 'download', 21)}</span><div><strong>${esc(downloadLabels[labState.downloadState])}</strong><p>${labState.downloadState === 'download' ? 'A clear action before transfer starts.' : labState.downloadState === 'complete' ? 'Your local summary is ready.' : 'Progress remains visible and recoverable.'}</p></div></div><div class="lab-progress-line"><span style="--lab-progress:${labState.downloadState === 'complete' ? 100 : labState.downloadState === 'downloading' ? 58 : 0}%"></span></div></div></div>
      <div class="lab-loading-success"><span>${C.icon('check', 19)}</span><div><strong>Success transition</strong><p>Replace the spinner with a meaningful next step, not a confetti storm.</p></div><button type="button" class="lab-text-action" data-lab-action="toast-success">Show success ${C.icon('arrowRight', 13)}</button></div>
    `, 'apricot');
  }

  function renderProgress() {
    const progress = labState.progress;
    return section('progress', '14.5 / components', 'Progress makes waiting feel actionable.', 'Linear, step, upload, and indeterminate progress share a restrained track and a visible label. Use progress to explain what is happening, not to decorate idle space.', `
      <div class="lab-progress-grid"><div class="lab-progress-specimen"><span class="lab-overline">LINEAR PROGRESS</span><div class="lab-progress-label"><strong>Preparing recommendations</strong><span>${progress}%</span></div><div class="lab-progress-track"><span style="--lab-progress:${progress}%"></span></div><button type="button" class="lab-text-action" data-lab-action="advance-progress">Advance locally ${C.icon('arrowRight', 13)}</button></div><div class="lab-progress-specimen"><span class="lab-overline">STEP PROGRESS</span><div class="lab-step-progress"><div class="is-complete"><i>${C.icon('check', 12)}</i><span>Room</span></div><div class="is-current"><i>2</i><span>Pick</span></div><div><i>3</i><span>Vote</span></div><div><i>4</i><span>Result</span></div></div></div><div class="lab-progress-specimen"><span class="lab-overline">INDETERMINATE</span><div class="lab-indeterminate-track"><span></span></div><p>Working through the group’s choices…</p></div><div class="lab-progress-specimen"><span class="lab-overline">UPLOAD PROGRESS</span><div class="lab-progress-label"><strong>Receipt image</strong><span>62%</span></div><div class="lab-progress-track lab-progress-track-petal"><span style="--lab-progress:62%"></span></div><p>Processing follows upload; state stays visible.</p></div></div>
    `, 'mauve');
  }

  function renderOverlays() {
    return section('overlays', '15 / components', 'Overlays should feel close, clear, and local.', 'Modal, confirmation, drawer, sheet, popover, tooltip, and dropdown patterns are demonstrated here with local state only. Open one, then close it with the visible action or Escape.', `
      <div class="lab-overlay-trigger-grid"><div><span class="lab-overline">MODAL</span><p>Focused decision with a clear escape.</p>${C.button('Open modal', 'brand', 'sm', { action: 'open-overlay', value: 'modal' })}</div><div><span class="lab-overline">CONFIRMATION</span><p>Destructive or consequential next step.</p>${C.button('Open confirmation', 'outline', 'sm', { action: 'open-overlay', value: 'confirmation' })}</div><div><span class="lab-overline">DRAWER</span><p>Desktop-friendly supporting context.</p>${C.button('Open drawer', 'apricot', 'sm', { action: 'open-overlay', value: 'drawer' })}</div><div><span class="lab-overline">BOTTOM SHEET</span><p>Mobile-friendly action grouping.</p>${C.button('Open bottom sheet', 'petal', 'sm', { action: 'open-overlay', value: 'sheet' })}</div><div><span class="lab-overline">POPOVER</span><p>Short contextual content near a trigger.</p>${C.button('Open popover', 'custard', 'sm', { action: 'open-overlay', value: 'popover' })}</div><div><span class="lab-overline">TOOLTIP</span><p>Supplementary, never essential content.</p><button type="button" class="lab-tooltip-trigger" data-tooltip="Short supplementary hint">Hover / focus me ${C.icon('info', 14)}</button></div></div>
      <div class="lab-dropdown-demo"><div><span class="lab-overline">DROPDOWN MENU</span><p>Click the trigger to expose a local menu.</p></div><button type="button" class="lab-dropdown-trigger" data-lab-action="toggle-dropdown" aria-expanded="${labState.overlay === 'dropdown'}">Pure ${C.icon('chevronDown', 15)}</button>${labState.overlay === 'dropdown' ? `<div class="lab-dropdown-menu"><button type="button" data-lab-action="toast-info">View profile</button><button type="button" data-lab-action="toast-info">Notification settings</button><button type="button" data-lab-action="close-overlay">Close menu</button></div>` : ''}</div>
    `, 'quiet');
  }

  function renderOverlayLayer() {
    if (!labState.overlay || labState.overlay === 'dropdown') return '';
    const overlay = labState.overlay;
    const copyMap = {
      about: ['About this UX Lab', 'A standalone, local-only reference surface for FoodFighter visual language and interaction decisions.', 'Close'],
      modal: ['Preview the shared table?', 'This local modal demonstrates a focused decision with a warm elevated surface.', 'Continue'],
      confirmation: ['Leave this candidate flow?', 'No product state will change. This is only a visual confirmation pattern.', 'Confirm'],
      drawer: ['Room details', 'A supporting panel can hold invite code, member context, or secondary explanation without taking over the task.', 'Done'],
      sheet: ['Choose an action', 'On mobile, related actions can gather in a bottom sheet with a large touch target.', 'Select'],
      popover: ['Group match', '3 of 4 people are aligned on this direction.', 'Got it']
    };
    const content = copyMap[overlay] || copyMap.modal;
    const isSide = overlay === 'drawer';
    const isSheet = overlay === 'sheet';
    return `<div class="lab-overlay-layer" data-lab-action="close-overlay" role="presentation"><div class="lab-overlay-surface ${isSide ? 'is-drawer' : ''} ${isSheet ? 'is-sheet' : ''} ${overlay === 'popover' ? 'is-popover' : ''}" role="dialog" aria-modal="true" aria-labelledby="lab-overlay-title" data-lab-stop><button type="button" class="lab-overlay-close" data-lab-action="close-overlay" aria-label="Close overlay">${C.icon('close', 18)}</button><span class="lab-overlay-kicker">${esc(overlay.toUpperCase())} · LOCAL</span><div class="lab-overlay-icon">${C.icon(overlay === 'confirmation' || overlay === 'about' ? 'info' : overlay === 'drawer' ? 'layers' : overlay === 'sheet' ? 'menu' : overlay === 'popover' ? 'users' : 'sparkles', 25)}</div><h2 id="lab-overlay-title">${esc(content[0])}</h2><p>${esc(content[1])}</p><div class="lab-overlay-actions">${C.button('Cancel', 'ghost', 'sm', { action: 'close-overlay' })}${C.button(content[2], overlay === 'confirmation' ? 'danger' : 'brand', 'sm', { action: 'close-overlay' })}</div></div></div>`;
  }

  function renderScreenCandidateTag(screenId) {
    return `<div class="lab-recipe-head"><div><span class="lab-candidate-ribbon">${esc(text('candidate'))}</span><span class="lab-recipe-label">${esc(D.screenMeta[screenId]?.title || screenId)}</span></div>${C.button('Inspect spec', 'ghost', 'sm', { action: 'inspect-screen', value: screenId, icon: 'info' })}</div>`;
  }

  function deviceStage(screenId, content, presetId, className) {
    const selectedViewport = D.viewports.find(item => item.id === (presetId || labState.viewport)) || viewport();
    return `<div class="lab-device-stage ${className || ''}" style="--lab-stage-width:${selectedViewport.width}px"><div class="lab-device-caption"><span>${esc(selectedViewport.label)}</span><span>${selectedViewport.width}px preview</span></div><div class="lab-product-screen lab-product-${screenId}" data-lab-screen="${screenId}">${content}</div></div>`;
  }

  function renderHomeProduct() {
    return `${renderDesktopNav()}<div class="lab-product-home-grid"><div class="lab-product-home-copy"><p class="lab-product-greeting">${esc(text('greeting'))}</p><h2>${esc(text('headline'))}</h2><p class="lab-product-support">Gather the table, share the choice, and let everyone have a say.</p></div><div class="lab-product-home-visual">${C.mediaSlot('hero', 'overlay', { overlay: true })}<div class="lab-product-carousel"><i class="is-active"></i><i></i><i></i><span>1 / 3</span></div></div><div class="lab-product-home-actions">${C.button(text('create'), 'brand', 'lg', { action: 'toast-success', icon: 'users' })}${C.button(text('join'), 'outline', 'lg', { action: 'toast-info', icon: 'arrowRight', iconRight: true })}</div><article class="lab-product-current"><div><span class="lab-overline">${esc(text('current'))}</span><h3>Friday FoodFight</h3><p>4 members · ${esc(text('lobby'))}</p></div>${C.badge(text('waiting'), 'warning', 'clock')}<button type="button" data-lab-action="toast-info">${esc(text('continue'))} ${C.icon('arrowRight', 14)}</button></article></div><div class="lab-product-recent"><div class="lab-product-section-title"><div><span class="lab-overline">${esc(text('recent'))}</span><h3>Small records, familiar faces.</h3></div><button type="button" data-lab-action="toast-info">${esc(text('viewAll'))} ${C.icon('arrowRight', 13)}</button></div><div class="lab-recent-grid"><article>${C.mediaSlot('recent', 'loaded')}<div><strong>Sukhumvit Dinner Squad</strong><span>Tonkotsu Ramen · Completed</span></div></article><article>${C.mediaSlot('recent', 'loaded')}<div><strong>Friday FoodFight</strong><span>Tom Yum · 6 members</span></div></article><article>${C.mediaSlot('recent', 'empty')}<div><strong>Keep the next one social.</strong><span>No image yet · placeholder</span></div></article></div></div>${renderMobileNav()}`;
  }

  function renderHomeRecipe() {
    return section('screen-home', '16 / screens', 'Home · the warm first step.', 'DESIGN CANDIDATE. The same composition uses a stacked task-first mobile rhythm and a wide image-led desktop split. No home product route is changed.', `${renderScreenCandidateTag('home')}${deviceStage('home', renderHomeProduct())}<div class="lab-responsive-intent"><div><strong>Mobile</strong><span>greeting → editorial question → food visual → actions → current → recent → floating nav</span></div><div><strong>Tablet</strong><span>progressive two-column hero with generous tonal surfaces</span></div><div><strong>Desktop</strong><span>top nav → asymmetric hero → wide recent grid</span></div></div>`, 'brand');
  }

  function renderCreateProduct() {
    return `${renderDesktopNav()}<div class="lab-product-create-grid"><div class="lab-product-create-copy"><div class="lab-product-screen-heading"><span class="lab-product-eyebrow">SET UP THE TABLE</span><h2>Make dinner a group decision.</h2><p>A room starts with a shared invitation.</p></div><div class="lab-product-form-stack">${renderTonalFormSection('petal', 'Room Name', 'Give the room a name.', 'create-room-name')}${renderTonalFormSection('apricot', 'Max Members', 'How many people are joining?', 'create-room-members', '<select class="lab-control" id="create-room-members" aria-label="Max members"><option>4 people</option><option selected>6 people</option><option>8 people</option></select>')}${renderTonalFormSection('custard', 'Location', 'Start with a nearby place.', 'create-location', '<div class="lab-control-with-icon">' + C.icon('mapPin', 16) + '<input class="lab-control" id="create-location" value="Siam Square" aria-label="Location" /></div>')}${renderTonalFormSection('petal', 'Search Radius', 'Keep options close enough.', 'create-radius', '<div class="lab-choice-row"><button type="button" class="lab-choice is-selected" data-lab-action="choice" data-lab-value="3 km">3 km</button><button type="button" class="lab-choice" data-lab-action="choice" data-lab-value="5 km">5 km</button><button type="button" class="lab-choice" data-lab-action="choice" data-lab-value="10 km">10 km</button></div>')}</div><div class="lab-product-info-panel">${C.iconWell('custard', 'md', 'sparkles')}<div><strong>Food-first setup</strong><p>Keep the form light; reserve the visual space for the feeling of gathering.</p></div></div>${C.button(text('create'), 'brand', 'hero', { action: 'toast-success', icon: 'arrowRight', iconRight: true })}</div><div class="lab-product-create-visual">${C.mediaSlot('room', 'overlay', { overlay: true })}<div class="lab-create-visual-copy"><span>ROOM IMAGE</span><strong>Invite the table.</strong><p>4:3 contextual visual · owner asset later</p></div></div></div>`;
  }

  function renderCreateRecipe() {
    return section('screen-create', '17 / screens', 'Create Room · setup with warmth.', 'DESIGN CANDIDATE. Tonal form sections, icon wells, a strong Blackberry CTA, and a desktop split are shown here without changing real room logic.', `${renderScreenCandidateTag('create')}${deviceStage('create', renderCreateProduct())}<div class="lab-responsive-intent"><div><strong>Mobile</strong><span>tonal sections stack; CTA stays full-width and close to the last field</span></div><div><strong>Tablet</strong><span>two fields can share a row while copy remains readable</span></div><div><strong>Desktop</strong><span>form side + large 4:3 contextual visual</span></div></div>`, 'petal');
  }

  function renderLobbyProduct() {
    const readyCount = labState.roomScenario === 'Host All Ready' ? 4 : labState.roomScenario === 'Room Full' ? 4 : 3;
    const members = [['Pure', 'Host', true], ['Alex', 'Member', true], ['Noon', 'Member', labState.roomScenario === 'Host All Ready'], ['Maya', 'Member', labState.roomScenario === 'Host All Ready']];
    return `${renderDesktopNav()}<div class="lab-product-lobby-grid"><div class="lab-lobby-identity">${C.mediaSlot('room', 'overlay', { overlay: true })}<div class="lab-lobby-identity-copy"><span class="lab-overline">ROOM IDENTITY</span><h2>Friday FoodFight</h2><p>Siam Square · ${readyCount}/4 ready</p>${C.badge(labState.roomScenario, labState.roomScenario === 'Host All Ready' ? 'success' : 'warning', labState.roomScenario === 'Host All Ready' ? 'check' : 'clock')}</div></div><div class="lab-lobby-side"><div class="lab-room-code"><div><span class="lab-overline">INVITE CODE</span><strong>FF-4827</strong><span>Share this with the table.</span></div>${C.button('Copy', 'outline', 'sm', { action: 'toast-success', icon: 'copy' })}</div><div class="lab-member-panel"><div class="lab-product-section-title"><div><span class="lab-overline">MEMBERS</span><h3>Who is at the table?</h3></div>${C.badge(`${readyCount} ready`, 'success', 'check')}</div><div class="lab-member-list">${members.map(([name, role, isReady]) => `<div class="lab-member-row"><span class="lab-avatar lab-avatar-${name.toLowerCase()}">${name[0]}</span><div><strong>${name}</strong><span>${role}</span></div><span class="lab-member-status">${isReady ? C.status(text('ready'), 'success', 'check') : C.status(text('notReady'), 'warning', 'clock')}</span></div>`).join('')}</div></div>${C.button('Start FoodFight', 'brand', 'hero', { action: 'toast-success', icon: 'sparkles', iconRight: true })}</div></div>${C.button('Share room', 'ghost', 'sm', { action: 'toast-info', icon: 'send' })}`;
  }

  function renderLobbyRecipe() {
    return section('screen-lobby', '18 / screens', 'Room Lobby · identity before action.', 'DESIGN CANDIDATE. Room identity, invite code, member list, readiness, and host CTA are visual specimens only. The room runtime remains untouched.', `${renderScreenCandidateTag('lobby')}<div class="lab-scenario-subbar"><span>ROOM SCENARIO</span>${D.roomScenarios.map(item => `<button type="button" class="${labState.roomScenario === item ? 'is-active' : ''}" data-lab-action="set-room-scenario" data-lab-value="${esc(item)}">${esc(item)}</button>`).join('')}</div>${deviceStage('lobby', renderLobbyProduct())}<div class="lab-responsive-intent"><div><strong>Mobile</strong><span>identity → code → members → ready action</span></div><div><strong>Tablet</strong><span>identity and invite can share a row</span></div><div><strong>Desktop</strong><span>large image identity + functional side panel</span></div></div>`, 'custard');
  }

  function renderPicksProduct() {
    const selected = labState.selectedMeal || '';
    return `${renderDesktopNav()}<div class="lab-product-picks-head"><div><span class="lab-product-eyebrow">FOODFIGHT PICKS</span><h2>Choose what feels right.</h2><p>Round 2 · group match context</p></div>${C.badge('2 of 4', 'petal', 'sparkles')}</div><div class="lab-picks-grid"><article class="lab-meal-option ${selected === 'Tom Yum' ? 'is-selected' : ''}"><button type="button" class="lab-meal-image-button" data-lab-action="toggle-meal" data-lab-value="Tom Yum" aria-pressed="${selected === 'Tom Yum'}">${C.mediaSlot('meal', 'overlay', { overlay: true })}</button><div class="lab-meal-copy"><div class="lab-meal-title-row"><div><span class="lab-overline">RANK #1</span><h3>Tom Yum</h3></div>${selected === 'Tom Yum' ? C.status(text('selected'), 'brand', 'check') : C.badge('75% match', 'custard', 'heart')}</div><div class="lab-meal-tags">${C.badge('Thai', 'apricot')}${C.badge('Spicy', 'petal')}${C.badge('Group favorite', 'custard')}</div><p>Bright, warming, and easy to share around one table.</p><div class="lab-meal-actions">${C.button('OK', selected === 'Tom Yum' && labState.vote === 'ok' ? 'brand' : 'outline', 'md', { action: 'set-vote', value: 'ok', icon: 'thumbsUp' })}${C.button('Pass', selected === 'Tom Yum' && labState.vote === 'pass' ? 'secondary' : 'outline', 'md', { action: 'set-vote', value: 'pass', icon: 'thumbsDown' })}</div></div></article><article class="lab-meal-option ${selected === 'Korean BBQ' ? 'is-selected' : ''}"><button type="button" class="lab-meal-image-button" data-lab-action="toggle-meal" data-lab-value="Korean BBQ" aria-pressed="${selected === 'Korean BBQ'}">${C.mediaSlot('meal', 'loaded')}</button><div class="lab-meal-copy"><div class="lab-meal-title-row"><div><span class="lab-overline">RANK #2</span><h3>Korean BBQ</h3></div>${selected === 'Korean BBQ' ? C.status(text('selected'), 'brand', 'check') : C.badge('68% match', 'apricot', 'heart')}</div><div class="lab-meal-tags">${C.badge('Korean', 'petal')}${C.badge('Shared grill', 'apricot')}${C.badge('6 people', 'custard')}</div><p>Social, interactive, and built for passing plates around.</p><div class="lab-meal-actions">${C.button('OK', selected === 'Korean BBQ' && labState.vote === 'ok' ? 'brand' : 'outline', 'md', { action: 'set-vote', value: 'ok', icon: 'thumbsUp' })}${C.button('Pass', selected === 'Korean BBQ' && labState.vote === 'pass' ? 'secondary' : 'outline', 'md', { action: 'set-vote', value: 'pass', icon: 'thumbsDown' })}</div></div></article></div><div class="lab-picks-safety">${C.icon('info', 17)}<div><strong>Safety / match context</strong><span>Preference chips and match copy should stay visible next to the action. No recommendation runtime is implied.</span></div>${C.badge('DESIGN CANDIDATE', 'brand')}</div>`;
  }

  function renderPicksRecipe() {
    return section('screen-picks', '19 / screens', 'Food Picks / Vote · make the choice feel good.', 'DESIGN CANDIDATE · NOT RUNTIME CAPABILITY. Food image, meal name, ranking, tags, match score, OK / Pass, and selection states are local visual specimens only.', `${renderScreenCandidateTag('picks')}<div class="lab-scenario-subbar"><span>VOTE STATE</span>${['', 'ok', 'pass'].map(item => `<button type="button" class="${labState.vote === item ? 'is-active' : ''}" data-lab-action="set-vote" data-lab-value="${item}">${item || 'none'}</button>`).join('')}</div>${deviceStage('picks', renderPicksProduct())}<div class="lab-responsive-intent"><div><strong>Mobile</strong><span>one meal focus; OK / Pass stays within the thumb zone</span></div><div><strong>Tablet</strong><span>two options share the visual field</span></div><div><strong>Desktop</strong><span>horizontal comparison with larger image zones</span></div></div>`, 'brand');
  }

  function renderScreenInventory() {
    const groups = {};
    (P.SCREEN_REGISTRY || []).forEach(screen => { groups[screen.category] = groups[screen.category] || []; groups[screen.category].push(screen); });
    return section('screen-inventory', '20 / screens', 'The existing prototype remains the product map.', 'These links preserve the 38 existing standalone prototype screens. The UX Lab is an approval surface, not a migration of those screens.', `<div class="lab-inventory-banner">${C.icon('layers', 19)}<div><strong>Preserved architecture</strong><p>Use the navigator or the route links below to inspect the existing product journeys. They remain separate from the candidate language.</p></div><span>38 screens</span></div><div class="lab-prototype-scenarios"><div><span class="lab-overline">ROOM SCENARIOS</span><div>${D.roomScenarios.map(item => `<button type="button" class="${labState.roomScenario === item ? 'is-active' : ''}" data-lab-action="set-room-scenario" data-lab-value="${esc(item)}">${esc(item)}</button>`).join('')}</div></div><div><span class="lab-overline">HISTORY SCENARIOS</span><div>${D.historyScenarios.map(item => `<button type="button" class="${labState.historyScenario === item ? 'is-active' : ''}" data-lab-action="set-history-scenario" data-lab-value="${esc(item)}">${esc(item)}</button>`).join('')}</div></div><div><span class="lab-overline">BILL SCENARIOS</span><div>${D.billScenarios.map(item => `<button type="button" class="${labState.billScenario === item ? 'is-active' : ''}" data-lab-action="set-bill-scenario" data-lab-value="${esc(item)}">${esc(item)}</button>`).join('')}</div></div></div><div class="lab-screen-inventory">${Object.entries(groups).map(([category, screens]) => `<div class="lab-inventory-group"><p class="lab-overline">${esc(category)}</p>${screens.map(screen => `<a href="${screen.hash}" class="lab-inventory-item"><span><strong>${esc(screen.title)}</strong><small>${esc(screen.description || 'Existing prototype screen')}</small></span>${C.badge('preserved', 'neutral')}</a>`).join('')}</div>`).join('')}</div>`, 'quiet');
  }

  function renderSignature() {
    return section('signature', '21 / interactions', 'Small moments that feel like FoodFighter.', 'Only three signature interactions are prototyped: Ready, Selection / Vote, and Winner. The feedback is expressive enough to feel human, restrained enough to keep the task clear.', `<div class="lab-signature-grid"><article class="lab-signature-card lab-signature-ready ${labState.ready ? 'is-complete' : ''}"><div class="lab-signature-head"><span class="lab-signature-number">01</span>${C.icon('users', 21)}</div><span class="lab-overline">READY</span><h3>Ready to share?</h3><p>Small pop + highlight confirms the milestone.</p>${C.button(labState.ready ? 'Ready to share' : text('toggleReady'), labState.ready ? 'success' : 'brand', 'md', { action: 'toggle-ready', icon: labState.ready ? 'check' : 'sparkles' })}</article><article class="lab-signature-card lab-signature-vote ${labState.vote === 'ok' ? 'is-complete' : ''}"><div class="lab-signature-head"><span class="lab-signature-number">02</span>${C.icon('heart', 21)}</div><span class="lab-overline">SELECTION / VOTE</span><h3>Keep Tom Yum?</h3><p>Surface fill + tactile response makes selection obvious.</p>${C.button(labState.vote === 'ok' ? 'Selected' : text('selectMeal'), labState.vote === 'ok' ? 'brand' : 'apricot', 'md', { action: 'set-vote', value: labState.vote === 'ok' ? '' : 'ok', icon: labState.vote === 'ok' ? 'check' : 'heart' })}</article><article class="lab-signature-card lab-signature-winner ${labState.winner ? 'is-complete' : ''}"><div class="lab-signature-head"><span class="lab-signature-number">03</span>${C.icon('trophy', 21)}</div><span class="lab-overline">WINNER</span><h3>${labState.winner ? 'Tom Yum wins!' : 'Reveal the result'}</h3><p>Controlled reveal, no confetti storm.</p>${C.button(labState.winner ? 'Hide result' : text('reveal'), labState.winner ? 'custard' : 'outline', 'md', { action: 'toggle-winner', icon: labState.winner ? 'check' : 'trophy' })}</article></div><div class="lab-signature-note">${C.icon('info', 15)} These interactions do not read or write gameplay state.</div>`, 'custard');
  }

  function renderResponsiveGallery() {
    return section('responsive', '22 / responsive intent', 'Density changes before type gets tiny.', 'The prototype uses the same semantic pattern across mobile, tablet, and desktop. Decoration decreases on small screens; image-led rhythm and multi-column composition emerge as space becomes available.', `<div class="lab-density-grid"><article class="lab-density-mobile"><span class="lab-overline">MOBILE / 390</span><h3>Task first</h3><p>Single column, smaller image footprint, floating nav, full-width actions.</p><div class="lab-density-pattern"><i></i><i></i><i></i><i></i></div></article><article class="lab-density-tablet"><span class="lab-overline">TABLET / 768</span><h3>Progressive grid</h3><p>Two columns where purpose supports it, larger tonal areas, same touch targets.</p><div class="lab-density-pattern"><i></i><i></i><i></i><i></i></div></article><article class="lab-density-desktop"><span class="lab-overline">DESKTOP / 1440</span><h3>Image-led composition</h3><p>Asymmetric 12-column intent, horizontal cards, breathing room, stronger hierarchy.</p><div class="lab-density-pattern"><i></i><i></i><i></i><i></i></div></article></div><div class="lab-shared-pattern">${C.icon('layers', 18)}<div><strong>Shared responsive pattern</strong><span>Switch the viewport preset above; the candidate screen markup stays the same.</span></div><span class="lab-token-note">container queries · local only</span></div>`, 'apricot');
  }

  function renderAccessibility() {
    return section('accessibility', '23 / accessibility', 'Warm does not mean vague.', 'Contrast, focus-visible, keyboard order, status text, touch target, disabled semantics, and reduced motion stay visible in the reference language.', `<div class="lab-accessibility-grid"><article><span class="lab-accessibility-icon">${C.icon('eye', 20)}</span><h3>Contrast-safe</h3><p>Blackberry is the content anchor on pastel; white type stays on strong Blackberry or dark overlays.</p><div class="lab-accessibility-sample lab-sample-petal">Blackberry on Petal</div></article><article><span class="lab-accessibility-icon">${C.icon('keyboard', 20)}</span><h3>Focus-visible</h3><p>Native buttons and controls show a high-contrast ring without changing DOM order.</p><button type="button" class="lab-focus-sample">Focus me</button></article><article><span class="lab-accessibility-icon">${C.icon('users', 20)}</span><h3>Touch contract</h3><p>Primary actions and nav items keep approximately 44px targets, labels included.</p><div class="lab-touch-target"><span>44px</span></div></article><article><span class="lab-accessibility-icon">${C.icon('settings', 20)}</span><h3>Reduced motion</h3><p>State remains understandable when transforms, shimmer, and nonessential travel disappear.</p><span class="lab-reduced-badge">${labState.motion === 'reduced' ? 'Active in this lab' : 'Toggle above to preview'}</span></article></div>`, 'quiet');
  }

  function renderFlow() {
    const current = D.flowSteps[labState.flowIndex] || D.flowSteps[0];
    return section('flow', '24 / flows', 'Core FoodFight flow · prototype only.', 'A local step-through shows how the visual language travels from Home to History. It does not implement a room, recommendation, vote, restaurant, bill, or API.', `<div class="lab-flow-layout"><div class="lab-flow-rail">${D.flowSteps.map(([id, label], index) => `<button type="button" class="${index === labState.flowIndex ? 'is-active' : ''} ${index < labState.flowIndex ? 'is-complete' : ''}" data-lab-action="set-flow" data-lab-value="${index}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${esc(label)}</strong>${index < labState.flowIndex ? C.icon('check', 13) : ''}</button>`).join('')}</div><div class="lab-flow-stage"><div class="lab-flow-stage-top"><span class="lab-candidate-ribbon">PROTOTYPE ONLY</span><span>${String(labState.flowIndex + 1).padStart(2, '0')} / ${D.flowSteps.length}</span></div><div class="lab-flow-mark">${C.icon(current[0] === 'home' ? 'home' : current[0] === 'picks' || current[0] === 'vote' ? 'utensils' : current[0] === 'bill' ? 'receipt' : current[0] === 'history' ? 'clock' : 'users', 30)}</div><span class="lab-overline">${esc(current[1])}</span><h3>${esc(current[1])}</h3><p>${esc(flowDescriptions[labState.flowIndex])}</p><div class="lab-flow-actions">${C.button('Previous', 'ghost', 'sm', { action: 'flow-prev', disabled: labState.flowIndex === 0, icon: 'arrowLeft' })}${C.button(labState.flowIndex === D.flowSteps.length - 1 ? 'Restart' : 'Next step', 'brand', 'sm', { action: labState.flowIndex === D.flowSteps.length - 1 ? 'flow-reset' : 'flow-next', icon: labState.flowIndex === D.flowSteps.length - 1 ? 'refresh' : 'arrowRight', iconRight: labState.flowIndex !== D.flowSteps.length - 1 })}</div></div></div>`, 'brand');
  }

  function renderReferenceMap() {
    return section('reference-map', '25 / implementation boundary', 'Approval first, migration later.', 'The UX Lab is the visual source of truth. Production pages remain separate until the owner freezes this language.', `<div class="lab-reference-map"><div><span class="lab-reference-number">01</span><strong>Browse</strong><p>Foundations, components, states, and recipes are visible in one place.</p></div><div><span class="lab-reference-number">02</span><strong>Interact</strong><p>Switch viewport, language, state, scenario, motion, and local demos.</p></div><div><span class="lab-reference-number">03</span><strong>Review</strong><p>Use the inspector to capture screen purpose, responsive intent, and state coverage.</p></div><div><span class="lab-reference-number">04</span><strong>Migrate later</strong><p>Home, Create Room, Join Room, Lobby, History, Bills, Profile, and Auth are not changed here.</p></div></div><div class="lab-boundary-strip">${C.icon('lock', 16)} <strong>Frontend product routes untouched</strong><span>Prototype assets, styles, and scripts only</span><span>Backend calls: NONE</span><span>API changes: NO</span></div>`, 'mauve');
  }

  function renderUXLab() {
    return `<main class="ux-lab ${labState.motion === 'reduced' ? 'lab-reduced-motion' : ''}" data-lab-state="${labState.globalState}" data-lab-viewport="${labState.viewport}">${renderTopbar()}<div class="lab-shell">${renderSidebar()}<div class="lab-main"><div class="lab-mobile-toolbar">${renderMobileSectionSelect()}</div>${renderOverview()}<div class="lab-canvas">${renderColors()}${renderTypography()}${renderSpacing()}${renderLayout()}${renderShape()}${renderMedia()}${renderGraphics()}${renderMotion()}${renderButtons()}${renderForms()}${renderIconWells()}${renderChips()}${renderCards()}${renderNavigation()}${renderFeedback()}${renderLoading()}${renderProgress()}${renderOverlays()}${renderHomeRecipe()}${renderCreateRecipe()}${renderLobbyRecipe()}${renderPicksRecipe()}${renderScreenInventory()}${renderSignature()}${renderResponsiveGallery()}${renderAccessibility()}${renderFlow()}${renderReferenceMap()}</div></div>${renderInspector()}</div><div class="lab-toast-stack" id="lab-toast-stack" aria-live="polite" aria-atomic="true"></div>${renderOverlayLayer()}</main>`;
  }

  function rerender() {
    if (P.renderCurrentRoute) P.renderCurrentRoute();
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: labState.motion === 'reduced' ? 'auto' : 'smooth', block: 'start' });
  }

  function showLabToast(message, tone) {
    const stack = document.getElementById('lab-toast-stack');
    if (!stack) return;
    const toast = document.createElement('div');
    toast.className = `lab-toast lab-toast-${tone || 'info'}`;
    toast.innerHTML = `${C.icon(tone === 'success' ? 'check' : tone === 'error' ? 'close' : tone === 'warning' ? 'clock' : 'info', 16)}<span>${esc(message)}</span><button type="button" aria-label="Dismiss notification">${C.icon('close', 14)}</button>`;
    toast.querySelector('button').addEventListener('click', () => toast.remove());
    stack.appendChild(toast);
    window.setTimeout(() => toast.remove(), labState.motion === 'reduced' ? 2600 : 3600);
  }

  function toggleArrayValue(list, value) {
    return list.includes(value) ? list.filter(item => item !== value) : list.concat(value);
  }

  function bindUXLabEvents() {
    const root = document.querySelector('.ux-lab');
    if (!root) return;

    if (!document.__foodfighterUxLabEscapeBound) {
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('ux-lab-active') && labState.overlay) {
          labState.overlay = '';
          rerender();
        }
      });
      document.__foodfighterUxLabEscapeBound = true;
    }

    if (!document.__foodfighterUxLabResizeBound) {
      window.addEventListener('resize', () => {
        if (viewportPinned || !document.body.classList.contains('ux-lab-active')) return;
        const nextViewport = viewportForWidth(window.innerWidth).id;
        if (nextViewport !== labState.viewport) {
          labState.viewport = nextViewport;
          rerender();
        }
      });
      document.__foodfighterUxLabResizeBound = true;
    }

    const viewportControl = root.querySelector('[data-lab-control="viewport"]');
    if (viewportControl) viewportControl.addEventListener('change', event => { viewportPinned = true; labState.viewport = event.target.value; rerender(); });
    const sectionControl = root.querySelector('[data-lab-control="section"]');
    if (sectionControl) sectionControl.addEventListener('change', event => scrollToSection(event.target.value));

    root.addEventListener('click', event => {
      const target = event.target.closest('[data-lab-action]');
      if (!target) return;
      const action = target.getAttribute('data-lab-action');
      const value = target.getAttribute('data-lab-value') || '';
      if (action === 'scroll-section') { event.preventDefault(); scrollToSection(value); return; }
      if (action === 'set-language') { if (P.i18n?.setLanguage) P.i18n.setLanguage(value); return; }
      if (action === 'set-viewport') { viewportPinned = true; labState.viewport = value; rerender(); return; }
      if (action === 'set-global-state') { labState.globalState = value; rerender(); return; }
      if (action === 'set-motion') { labState.motion = value; rerender(); return; }
      if (action === 'set-scenario') { labState.scenario = value; rerender(); return; }
      if (action === 'set-room-scenario') { labState.roomScenario = value; rerender(); return; }
      if (action === 'set-nav') { labState.activeNav = value; rerender(); showLabToast(`Navigation active: ${value}`, 'info'); return; }
      if (action === 'set-history-scenario') { labState.historyScenario = value; rerender(); return; }
      if (action === 'set-bill-scenario') { labState.billScenario = value; rerender(); return; }
      if (action === 'inspect-screen') { labState.screen = value; rerender(); scrollToSection(`lab-screen-${value}`); return; }
      if (action === 'toggle-ready') { labState.ready = !labState.ready; rerender(); return; }
      if (action === 'toggle-winner') { labState.winner = !labState.winner; rerender(); return; }
      if (action === 'toggle-meal') { labState.selectedMeal = labState.selectedMeal === value ? '' : value; rerender(); return; }
      if (action === 'set-vote') { labState.vote = labState.vote === value ? '' : value; rerender(); return; }
      if (action === 'toggle-chip') { labState.selectedChips = toggleArrayValue(labState.selectedChips, value); rerender(); return; }
      if (action === 'toggle-button-loading') { labState.buttonLoading = !labState.buttonLoading; rerender(); return; }
      if (action === 'button-feedback') { showLabToast('Local interaction acknowledged.', 'success'); return; }
      if (action === 'choice' || action === 'segment' || action === 'tab') { const group = target.parentElement; group.querySelectorAll('.is-selected, .is-active').forEach(item => item.classList.remove('is-selected', 'is-active')); target.classList.add(action === 'tab' ? 'is-active' : 'is-selected'); showLabToast(`${value || target.textContent.trim()} selected.`, 'info'); return; }
      if (action === 'stepper') { const valueNode = document.getElementById('lab-stepper-value'); if (valueNode) valueNode.textContent = String(Math.max(1, Math.min(12, Number(valueNode.textContent || 6) + Number(value)))); return; }
      if (action === 'toggle-password') { const password = document.getElementById('lab-password-input'); if (password) { password.type = password.type === 'password' ? 'text' : 'password'; target.setAttribute('aria-label', password.type === 'password' ? 'Show password' : 'Hide password'); } return; }
      if (action === 'toast-success') { showLabToast('Success state demonstrated locally.', 'success'); return; }
      if (action === 'toast-warning') { showLabToast('Waiting state demonstrated locally.', 'warning'); return; }
      if (action === 'toast-error') { showLabToast('Error state demonstrated locally.', 'error'); return; }
      if (action === 'toast-info') { showLabToast('Info state demonstrated locally.', 'info'); return; }
      if (action === 'retry') { showLabToast('Retry acknowledged; no network request was made.', 'info'); return; }
      if (action === 'set-media-state') { labState.mediaState = value; rerender(); return; }
      if (action === 'cycle-upload') { const states = ['idle', 'dragging', 'uploading', 'processing', 'success', 'failure']; labState.uploadState = states[(states.indexOf(labState.uploadState) + 1) % states.length]; rerender(); return; }
      if (action === 'cycle-download') { const states = ['download', 'preparing', 'downloading', 'complete', 'failed']; labState.downloadState = states[(states.indexOf(labState.downloadState) + 1) % states.length]; rerender(); return; }
      if (action === 'toggle-account') { labState.accountOpen = !labState.accountOpen; rerender(); return; }
      if (action === 'toggle-dropdown') { labState.overlay = labState.overlay === 'dropdown' ? '' : 'dropdown'; rerender(); return; }
      if (action === 'open-overlay') { labState.overlay = value; rerender(); return; }
      if (action === 'close-overlay') { labState.overlay = ''; rerender(); return; }
      if (action === 'set-flow') { labState.flowIndex = Math.max(0, Math.min(D.flowSteps.length - 1, Number(value))); rerender(); return; }
      if (action === 'flow-next') { labState.flowIndex = Math.min(D.flowSteps.length - 1, labState.flowIndex + 1); rerender(); return; }
      if (action === 'flow-prev') { labState.flowIndex = Math.max(0, labState.flowIndex - 1); rerender(); return; }
      if (action === 'flow-reset') { labState.flowIndex = 0; rerender(); return; }
      if (action === 'pagination') { showLabToast(`Page ${value || 'next'} selected.`, 'info'); return; }
    });

    root.addEventListener('click', event => {
      if (event.target.classList.contains('lab-overlay-layer')) { labState.overlay = ''; rerender(); }
    });

    root.addEventListener('keydown', event => {
      const selectable = event.target.closest('[data-lab-action="toggle-meal"]');
      if (selectable && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); selectable.click(); }
    });
  }

  P.renderUXLab = renderUXLab;
  P.bindUXLabEvents = bindUXLabEvents;
  P.UX_LAB_STATE = labState;
})();
