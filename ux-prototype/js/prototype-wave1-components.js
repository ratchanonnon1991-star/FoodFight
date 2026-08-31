/**
 * FoodFighter - Wave 01 product-prototype render helpers
 *
 * These helpers borrow the UX Lab icon system and vocabulary while keeping
 * product-prototype markup separate from the preserved legacy screens.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;
  const W = P.WAVE1;
  const Lab = P.UX_LAB_COMPONENTS || {};

  function esc(value) {
    if (Lab.escape) return Lab.escape(value);
    return String(value ?? '').replace(/[&<>"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[match]));
  }

  function icon(name, size, className) {
    if (Lab.icon) return Lab.icon(name, size, className);
    return '';
  }

  function attrs(options) {
    const opts = options || {};
    return [
      opts.action ? `data-wave1-action="${esc(opts.action)}"` : '',
      opts.value !== undefined && opts.value !== null ? `data-wave1-value="${esc(opts.value)}"` : '',
      opts.target ? `data-wave1-target="${esc(opts.target)}"` : '',
      opts.pressed ? 'aria-pressed="true"' : '',
      opts.expanded !== undefined ? `aria-expanded="${Boolean(opts.expanded)}"` : '',
      opts.disabled ? 'disabled' : '',
      opts.busy ? 'aria-busy="true"' : '',
      opts.label ? `aria-label="${esc(opts.label)}"` : ''
    ].filter(Boolean).join(' ');
  }

  function button(label, variant, size, options) {
    const opts = options || {};
    const classes = ['ff-btn', `ff-btn-${variant || 'brand'}`, `ff-btn-${size || 'md'}`];
    if (opts.iconOnly) classes.push('ff-btn-icon');
    if (opts.className) classes.push(opts.className);
    const iconName = opts.loading ? 'spinner' : opts.icon;
    const iconMarkup = iconName ? icon(iconName, opts.iconSize || 18, opts.loading ? 'ff-spinner' : '') : '';
    const content = opts.iconOnly ? iconMarkup || icon('sparkles', opts.iconSize || 18) : `${opts.iconRight ? '' : iconMarkup}<span>${label}</span>${opts.iconRight ? iconMarkup : ''}`;
    return `<button type="${esc(opts.type || 'button')}" class="${classes.join(' ')}" ${attrs({ ...opts, busy: opts.loading })}>${content}</button>`;
  }

  function link(label, href, variant, size, options) {
    const opts = options || {};
    const classes = ['ff-btn', `ff-btn-${variant || 'ghost'}`, `ff-btn-${size || 'md'}`];
    if (opts.className) classes.push(opts.className);
    return `<a href="${esc(href)}" class="${classes.join(' ')}" ${opts.label ? `aria-label="${esc(opts.label)}"` : ''}>${opts.icon && !opts.iconRight ? icon(opts.icon, opts.iconSize || 18) : ''}<span>${label}</span>${opts.icon && opts.iconRight ? icon(opts.icon, opts.iconSize || 18) : ''}</a>`;
  }

  function badge(label, tone, iconName, className) {
    return `<span class="ff-badge ff-badge-${tone || 'neutral'} ${className || ''}">${iconName ? icon(iconName, 13) : ''}<span>${esc(label)}</span></span>`;
  }

  function status(label, tone, iconName) {
    return `<span class="ff-status ff-status-${tone || 'neutral'}">${icon(iconName || 'info', 15)}<span>${esc(label)}</span></span>`;
  }

  function iconWell(tone, size, iconName, state) {
    const currentState = state || '';
    return `<span class="ff-icon-well ff-icon-well-${size || 'md'} ff-icon-well-${tone || 'petal'} ${currentState ? `is-${currentState}` : ''}">${icon(iconName || 'sparkles', size === 'lg' ? 28 : size === 'sm' ? 15 : 21)}</span>`;
  }

  function media(slotId, mediaState, options) {
    const opts = options || {};
    const slot = W.mediaSlots[slotId] || W.mediaSlots.home;
    const currentState = mediaState || 'placeholder';
    const art = currentState === 'loading'
      ? '<span class="ff-media-shimmer" aria-hidden="true"></span><span class="ff-media-state-label">Loading visual</span>'
      : currentState === 'missing'
        ? `${icon('image', 28)}<span class="ff-media-state-label">Image unavailable</span>`
        : currentState === 'fallback'
          ? `${icon('utensils', 28)}<span class="ff-media-state-label">Warm fallback treatment</span>`
          : `${icon(opts.icon || 'utensils', 30)}<span class="ff-media-state-label">IMAGE PLACEHOLDER</span>`;
    const overlay = currentState === 'overlay' || opts.overlay
      ? '<span class="ff-media-overlay"><strong>Food visual</strong><span>Owner asset later</span></span>'
      : '';
    return `<figure class="ff-media ff-media-${esc(slotId)} ff-media-state-${esc(currentState)} ${opts.className || ''}" style="--ff-media-ratio:${slot.ratio.replace(':', ' / ')}" data-media-state="${esc(currentState)}"><div class="ff-media-art" role="img" aria-label="${esc(slot.label)} image placeholder, ${esc(slot.ratio)}, recommended ${esc(slot.size)}">${art}</div>${overlay}<figcaption><strong>${esc(slot.label)}</strong><span>${esc(slot.purpose)} · ${esc(slot.ratio)} · ${esc(slot.size)}</span></figcaption></figure>`;
  }

  function field(label, id, control, options) {
    const opts = options || {};
    return `<div class="ff-field ${opts.error ? 'is-error' : ''} ${opts.success ? 'is-success' : ''}"><label for="${esc(id)}" class="ff-label">${esc(label)}${opts.required ? '<span aria-hidden="true">*</span>' : ''}</label>${control}${opts.helper ? `<p class="ff-helper">${opts.helper}</p>` : ''}${opts.error ? `<p class="ff-validation ff-validation-error" role="alert">${icon('info', 14)}<span>${esc(opts.error)}</span></p>` : ''}${opts.success ? `<p class="ff-validation ff-validation-success">${icon('check', 14)}<span>${esc(opts.success)}</span></p>` : ''}</div>`;
  }

  function avatar(member, size) {
    const user = member || { initials: '?', name: 'Unknown', tone: 'mauve' };
    return `<span class="ff-avatar ff-avatar-${size || 'md'} ff-avatar-${esc(user.tone || 'mauve')}" aria-label="${esc(user.name)}">${esc(user.initials || user.name?.slice(0, 1) || '?')}</span>`;
  }

  function avatarGroup(members, limit) {
    const visible = (members || []).slice(0, limit || 5);
    return `<div class="ff-avatar-group" aria-label="${esc(visible.map((member) => member.name).join(', '))}">${visible.map((member) => avatar(member, 'sm')).join('')}</div>`;
  }

  function notice(message, tone) {
    if (!message) return '';
    return `<div class="ff-notice ff-notice-${tone || 'info'}" role="${tone === 'error' ? 'alert' : 'status'}">${icon(tone === 'error' ? 'close' : tone === 'success' ? 'check' : tone === 'warning' ? 'clock' : 'info', 17)}<span>${esc(message)}</span></div>`;
  }

  function stepper(id, value, min, max, disabled) {
    return `<div class="ff-stepper" data-stepper-id="${esc(id)}"><button type="button" aria-label="Decrease ${esc(id)}" data-wave1-action="stepper" data-wave1-value="-1" data-wave1-target="${esc(id)}" ${disabled ? 'disabled' : ''}>${icon('minus', 17)}</button><output id="${esc(id)}" aria-live="polite">${esc(value)}</output><button type="button" aria-label="Increase ${esc(id)}" data-wave1-action="stepper" data-wave1-value="1" data-wave1-target="${esc(id)}" ${disabled ? 'disabled' : ''}>${icon('plus', 17)}</button><span class="ff-stepper-range">${esc(min)}–${esc(max)}</span></div>`;
  }

  P.WAVE1_COMPONENTS = { esc, icon, button, link, badge, status, iconWell, media, field, avatar, avatarGroup, notice, stepper };
})();
