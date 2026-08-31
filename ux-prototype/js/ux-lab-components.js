/**
 * FoodFighter UX Lab - small HTML render helpers
 *
 * These helpers are intentionally local to the prototype. They keep the lab
 * specimens consistent without becoming a second production component layer.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;

  function escape(value) {
    if (P.escapeHtml) return P.escapeHtml(value);
    return String(value ?? '').replace(/[&<>"']/g, function (match) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[match];
    });
  }

  const iconPaths = {
    arrowRight: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
    arrowLeft: '<path d="M19 12H5"></path><path d="m11 18-6-6 6-6"></path>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path>',
    check: '<path d="m5 12 4 4L19 6"></path>',
    chevronDown: '<path d="m6 9 6 6 6-6"></path>',
    crown: '<path d="m3 7 4 4 5-7 5 7 4-4-2 12H5Z"></path><path d="M5 19h14"></path>',
    chevronRight: '<path d="m9 18 6-6-6-6"></path>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
    close: '<path d="M6 6l12 12M18 6 6 18"></path>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
    download: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M4 21h16"></path>',
    edit: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"></path>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="2.5"></circle>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6M8 13h8M8 17h5"></path>',
    heart: '<path d="M20.8 8.7c0 5.5-8.8 10.4-8.8 10.4S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"></path>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"></path><path d="M9 21v-7h6v7"></path>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="8.5" cy="9" r="1.5"></circle><path d="m21 15-4-4L5 20"></path>',
    info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h8M17 14h1"></path>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"></path><path d="m3 12 9 5 9-5M3 16l9 5 9-5"></path>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>',
    mapPin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    mousePointer: '<path d="m5 3 5.5 17 2.6-6.3L19 11Z"></path><path d="m13 13 4 5"></path>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"></path>',
    minus: '<path d="M5 12h14"></path>',
    more: '<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',
    plus: '<path d="M12 5v14M5 12h14"></path>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.9-3L3 11"></path><path d="M3 5v6h6"></path><path d="M4 13a8 8 0 0 0 14.9 3L21 13"></path><path d="M21 19v-6h-6"></path>',
    receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2Z"></path><path d="M8 8h8M8 12h8M8 16h4"></path>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m16 16 5 5"></path>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
    settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path><path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 1 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 1.7 12a2 2 0 0 1 0-4h.2a2 2 0 0 0 1.4-3.4l-.1-.1A2 2 0 1 1 6 1.7l.1.1A2 2 0 0 0 9.5.4V.2a2 2 0 1 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a2 2 0 0 0 1.4 3.4h.2a2 2 0 1 1 0 4h-.2a2 2 0 0 0-1.7 3.1Z"></path>',
    sparkles: '<path d="m12 3-1.1 3.5L7.5 8 11 9.1 12 13l1.1-3.9L16.5 8l-3.4-1.5Z"></path><path d="m19 13-.7 2.3L16 16l2.3.7L19 19l.7-2.3L22 16l-2.3-.7ZM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8Z"></path>',
    spinner: '<circle cx="12" cy="12" r="9"></circle>',
    thumbsDown: '<path d="M10 5v11l-2 5-1-1a3 3 0 0 1-.5-3.1L8 13H4a2 2 0 0 1-2-2l1-6a2 2 0 0 1 2-2h7v2M14 3h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5Z"></path>',
    thumbsUp: '<path d="M14 19V8l2-5 1 1a3 3 0 0 1 .5 3.1L16 11h4a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 2h-7v-2M10 21H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h5Z"></path>',
    trophy: '<path d="M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0Z"></path><path d="M6 6H3v2a4 4 0 0 0 4 4M18 6h3v2a4 4 0 0 1-4 4"></path>',
    upload: '<path d="M12 16V4"></path><path d="m7 9 5-5 5 5"></path><path d="M5 20h14"></path>',
    user: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path>',
    utensils: '<path d="M7 3v7M4 3v4a3 3 0 0 0 6 0V3M7 10v11M17 3v18M17 3c3 1 3 5 0 7"></path>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"></path>',
    wifiOff: '<path d="m3 3 18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M7.5 7.5a8 8 0 0 1 11 1.5M4 4.8a12 12 0 0 0-1 1M1 9a16 16 0 0 1 2-1.5M22 9a16 16 0 0 0-2-1.5"></path><path d="M12 21h.01"></path>'
  };

  function icon(name, size, className) {
    const safeName = iconPaths[name] ? name : 'sparkles';
    const iconSize = size || 18;
    return `<svg class="lab-icon ${className || ''}" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[safeName]}</svg>`;
  }

  function button(label, variant, size, options) {
    const opts = options || {};
    const classes = ['lab-btn', `lab-btn-${variant || 'primary'}`, `lab-btn-${size || 'md'}`];
    if (opts.iconOnly) classes.push('lab-btn-icon');
    if (opts.className) classes.push(opts.className);
    const attrs = [
      'type="button"',
      `class="${classes.join(' ')}"`,
      opts.action ? `data-lab-action="${escape(opts.action)}"` : '',
      opts.target ? `data-lab-target="${escape(opts.target)}"` : '',
      opts.value ? `data-lab-value="${escape(opts.value)}"` : '',
      opts.pressed ? 'aria-pressed="true"' : '',
      opts.disabled ? 'disabled' : '',
      opts.ariaLabel ? `aria-label="${escape(opts.ariaLabel)}"` : ''
    ].filter(Boolean).join(' ');
    const left = opts.icon && !opts.iconRight ? icon(opts.icon, opts.iconSize || 18) : '';
    const right = opts.icon && opts.iconRight ? icon(opts.icon, opts.iconSize || 18) : '';
    const content = opts.iconOnly ? icon(opts.icon || 'sparkles', opts.iconSize || 18) : `${left}<span>${label}</span>${right}`;
    return `<button ${attrs}>${content}</button>`;
  }

  function badge(label, tone, iconName, options) {
    const opts = options || {};
    const classes = ['lab-badge', `lab-badge-${tone || 'neutral'}`];
    if (opts.dot) classes.push('lab-badge-dot');
    if (opts.className) classes.push(opts.className);
    return `<span class="${classes.join(' ')}">${iconName ? icon(iconName, 13) : ''}<span>${escape(label)}</span></span>`;
  }

  function status(label, tone, iconName) {
    return `<span class="lab-status lab-status-${tone || 'neutral'}">${icon(iconName || 'info', 15)}<span>${escape(label)}</span></span>`;
  }

  function iconWell(tone, size, iconName, options) {
    const opts = options || {};
    return `<span class="lab-icon-well lab-icon-well-${size || 'md'} lab-icon-well-${tone || 'petal'} ${opts.selected ? 'is-selected' : ''} ${opts.disabled ? 'is-disabled' : ''}">${icon(iconName || 'sparkles', size === 'lg' ? 27 : size === 'sm' ? 15 : 21)}</span>`;
  }

  function mediaSlot(slotId, state, options) {
    const slot = (P.UX_LAB.mediaSlots || []).find(item => item.id === slotId) || P.UX_LAB.mediaSlots[0];
    const opts = options || {};
    const mediaState = state || 'loaded';
    const classes = ['lab-media', `lab-media-${slot.tone}`, `lab-media-state-${mediaState}`];
    if (opts.className) classes.push(opts.className);
    const art = mediaState === 'loading'
      ? '<span class="lab-media-shimmer" aria-hidden="true"></span>'
      : mediaState === 'missing'
        ? `${icon('image', 28)}<span class="lab-media-state-copy">Image unavailable</span>`
        : mediaState === 'empty'
          ? `${icon('image', 28)}<span class="lab-media-state-copy">No image yet</span>`
          : `${icon(slot.icon, 30)}<span class="lab-media-state-copy">IMAGE PLACEHOLDER</span>`;
    const overlay = mediaState === 'overlay' || opts.overlay
      ? '<span class="lab-media-overlay"><strong>Food visual</strong><span>Warm close crop · owner asset later</span></span>'
      : '';
    return `
      <figure class="${classes.join(' ')}" style="--lab-media-ratio:${slot.ratio.replace(':', ' / ')}" data-media-state="${mediaState}">
        <div class="lab-media-art" aria-label="${escape(slot.label)} image placeholder, ${escape(slot.ratio)}, recommended ${escape(slot.size)}">${art}</div>
        ${overlay}
        <figcaption><strong>${escape(slot.label)}</strong><span>${escape(slot.ratio)} · ${escape(slot.size)}</span></figcaption>
      </figure>
    `;
  }

  function field(label, id, controlHtml, options) {
    const opts = options || {};
    return `
      <div class="lab-field ${opts.state ? `is-${opts.state}` : ''}">
        <label class="lab-label" for="${escape(id)}">${escape(label)}${opts.required ? '<span aria-hidden="true">*</span>' : ''}</label>
        ${controlHtml}
        ${opts.helper ? `<p class="lab-helper">${opts.helper}</p>` : ''}
        ${opts.error ? `<p class="lab-validation lab-validation-error" role="alert">${icon('info', 14)}${opts.error}</p>` : ''}
        ${opts.success ? `<p class="lab-validation lab-validation-success">${icon('check', 14)}${opts.success}</p>` : ''}
      </div>
    `;
  }

  function select(id, value, options) {
    return `<select class="lab-control" id="${escape(id)}" ${options?.disabled ? 'disabled' : ''}>${(options?.items || ['Siam Square', 'Ari', 'Thonglor']).map(item => `<option ${item === value ? 'selected' : ''}>${escape(item)}</option>`).join('')}</select>`;
  }

  function tokenRow(label, value, className) {
    return `<div class="lab-token-row"><span class="lab-token-name">${escape(label)}</span><span class="lab-token-value ${className || ''}">${escape(value)}</span></div>`;
  }

  P.UX_LAB_COMPONENTS = { escape, icon, button, badge, status, iconWell, mediaSlot, field, select, tokenRow };
})();
