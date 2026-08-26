/**
 * FoodFighter - Wave 04 profile and account closure prototype
 *
 * This module completes the local account experience without changing the
 * legacy screen implementations or any production account contract. It
 * deliberately reuses the Wave 01 shell, state store, and render helpers.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;
  const W = P.WAVE1;
  const C = P.WAVE1_COMPONENTS;
  const S = P.WAVE1_SHELL;

  const COPY = {
    en: {
      profileKicker: 'YOUR TABLE',
      profileTitle: 'Your profile, ready for the next FoodFight',
      profileBody: 'Keep your identity and lasting food preferences close at hand.',
      identity: 'Identity',
      identityBody: 'The name your friends see around the table.',
      foodProfile: 'Food Profile',
      foodProfileBody: 'Persistent preferences that guide future FoodFights.',
      persistentProfile: 'Persistent profile',
      persistentHint: 'This is your long-lived Food Profile. Session Meal Preference stays separate for each FoodFight.',
      editProfile: 'Edit profile',
      editFoodProfile: 'Edit Food Profile',
      account: 'Account',
      accountBody: 'A local prototype account identity.',
      email: 'Email address',
      localAccount: 'Local prototype account',
      security: 'Security',
      securityBody: 'Use the existing password-reset prototype when needed.',
      password: 'Password',
      passwordHint: 'Managed through the local reset flow.',
      resetPassword: 'Open reset flow',
      logout: 'Log out',
      logoutBody: 'End this local session and return to the FoodFighter entry screen.',
      logoutTitle: 'Log out of this prototype session?',
      logoutConfirmBody: 'Your saved Food Profile and local history stay available for the next demo login. The active room and in-progress FoodFight will be cleared.',
      confirmLogout: 'Log out',
      cancel: 'Cancel',
      back: 'Back',
      saved: 'Saved locally',
      saving: 'Saving locally...',
      saveChanges: 'Save changes',
      displayName: 'Display name',
      displayNameHelp: 'This is the name members see in the prototype.',
      avatarTreatment: 'Avatar treatment',
      avatarTreatmentHelp: 'A visual treatment only; no image upload is connected.',
      tonePetal: 'Petal',
      toneApricot: 'Apricot',
      toneCustard: 'Custard',
      toneMauve: 'Mauve',
      nameRequired: 'Add a display name before saving.',
      profileSaved: 'Profile changes saved locally.',
      foodProfileSaved: 'Food Profile changes saved locally.',
      foodProfileEditTitle: 'Tune your Food Profile',
      foodProfileEditBody: 'These lasting preferences travel with your account. They are different from the choices you make for one FoodFight.',
      allergies: 'Food allergies',
      allergiesHelp: 'Choose any that apply, or choose no allergies.',
      restrictions: 'Dietary restrictions',
      restrictionsHelp: 'Choose any that apply, or choose no restrictions.',
      noAllergies: 'No allergies',
      noRestrictions: 'No restrictions',
      notes: 'Preferences and notes',
      notesHelp: 'A small note helps friends understand your table.',
      notesPlaceholder: 'e.g. Medium spice, no cilantro...',
      notSet: 'Not set yet',
      foodProfileRequired: 'Choose an option or explicitly choose none in each section.',
      profileReady: 'Food Profile ready',
      noAdditionalNotes: 'No additional notes yet.',
      localOnly: 'Local prototype data · no account or API is connected.',
      logoutDone: 'You are logged out of the local prototype.',
      close: 'Close',
      prototypeOnly: 'PROTOTYPE ONLY'
    },
    th: {
      profileKicker: 'โต๊ะของคุณ',
      profileTitle: 'โปรไฟล์พร้อมสำหรับ FoodFight ครั้งถัดไป',
      profileBody: 'จัดการตัวตนและความชอบอาหารที่ใช้ซ้ำได้ในที่เดียว',
      identity: 'ตัวตน',
      identityBody: 'ชื่อที่เพื่อนจะเห็นบนโต๊ะอาหาร',
      foodProfile: 'โปรไฟล์อาหาร',
      foodProfileBody: 'ความชอบระยะยาวสำหรับ FoodFight ครั้งต่อไป',
      persistentProfile: 'โปรไฟล์ถาวร',
      persistentHint: 'นี่คือ Food Profile ระยะยาวของคุณ ส่วน Meal Preference จะเริ่มใหม่ในแต่ละ FoodFight',
      editProfile: 'แก้ไขโปรไฟล์',
      editFoodProfile: 'แก้ไขโปรไฟล์อาหาร',
      account: 'บัญชี',
      accountBody: 'ตัวตนบัญชีในต้นแบบบนเครื่อง',
      email: 'อีเมล',
      localAccount: 'บัญชีต้นแบบในเครื่อง',
      security: 'ความปลอดภัย',
      securityBody: 'ใช้ต้นแบบการรีเซ็ตรหัสผ่านเดิมเมื่อต้องการ',
      password: 'รหัสผ่าน',
      passwordHint: 'จัดการผ่านขั้นตอนรีเซ็ตในต้นแบบ',
      resetPassword: 'เปิดขั้นตอนรีเซ็ต',
      logout: 'ออกจากระบบ',
      logoutBody: 'จบเซสชันในต้นแบบและกลับไปหน้าหลัก FoodFighter',
      logoutTitle: 'ออกจากเซสชันต้นแบบนี้หรือไม่?',
      logoutConfirmBody: 'Food Profile และประวัติในเครื่องจะยังอยู่สำหรับการเข้าสู่ระบบครั้งถัดไป ห้องและ FoodFight ที่กำลังดำเนินการจะถูกล้าง',
      confirmLogout: 'ออกจากระบบ',
      cancel: 'ยกเลิก',
      back: 'ย้อนกลับ',
      saved: 'บันทึกในเครื่องแล้ว',
      saving: 'กำลังบันทึกในเครื่อง...',
      saveChanges: 'บันทึกการเปลี่ยนแปลง',
      displayName: 'ชื่อที่ใช้แสดง',
      displayNameHelp: 'ชื่อที่สมาชิกจะเห็นในต้นแบบ',
      avatarTreatment: 'โทนอวาตาร์',
      avatarTreatmentHelp: 'เป็นเพียงรูปแบบภาพ ยังไม่มีการอัปโหลดรูปจริง',
      tonePetal: 'ชมพูอ่อน',
      toneApricot: 'แอปริคอต',
      toneCustard: 'คัสตาร์ด',
      toneMauve: 'ม่วงหม่น',
      nameRequired: 'กรุณาใส่ชื่อที่ใช้แสดงก่อนบันทึก',
      profileSaved: 'บันทึกการแก้ไขโปรไฟล์ในเครื่องแล้ว',
      foodProfileSaved: 'บันทึกการแก้ไข Food Profile ในเครื่องแล้ว',
      foodProfileEditTitle: 'ปรับ Food Profile ของคุณ',
      foodProfileEditBody: 'ความชอบถาวรเหล่านี้จะอยู่กับบัญชีของคุณ ต่างจากตัวเลือกสำหรับ FoodFight ครั้งเดียว',
      allergies: 'อาหารที่แพ้',
      allergiesHelp: 'เลือกข้อที่เกี่ยวข้อง หรือเลือกไม่มีอาการแพ้',
      restrictions: 'ข้อจำกัดด้านอาหาร',
      restrictionsHelp: 'เลือกข้อที่เกี่ยวข้อง หรือเลือกไม่มีข้อจำกัด',
      noAllergies: 'ไม่มีอาหารที่แพ้',
      noRestrictions: 'ไม่มีข้อจำกัด',
      notes: 'ความชอบและหมายเหตุ',
      notesHelp: 'หมายเหตุสั้น ๆ ช่วยให้เพื่อนเข้าใจโต๊ะของคุณมากขึ้น',
      notesPlaceholder: 'เช่น ชอบเผ็ดปานกลาง ไม่ชอบผักชี...',
      notSet: 'ยังไม่ได้ตั้งค่า',
      foodProfileRequired: 'เลือกอย่างน้อยหนึ่งรายการ หรือเลือกไม่มีในแต่ละส่วน',
      profileReady: 'Food Profile พร้อมแล้ว',
      noAdditionalNotes: 'ยังไม่มีหมายเหตุเพิ่มเติม',
      localOnly: 'ข้อมูลต้นแบบในเครื่อง · ไม่มีบัญชีหรือ API จริง',
      logoutDone: 'ออกจากระบบต้นแบบในเครื่องแล้ว',
      close: 'ปิด',
      prototypeOnly: 'ต้นแบบเท่านั้น'
    }
  };

  const TONES = [
    ['petal', 'tonePetal'],
    ['apricot', 'toneApricot'],
    ['custard', 'toneCustard'],
    ['mauve', 'toneMauve']
  ];

  function state() {
    return W.getState();
  }

  function lang() {
    return state().ui.language === 'en' ? 'en' : 'th';
  }

  function raw(key, variables) {
    let value = COPY[lang()][key] || COPY.en[key] || key;
    Object.entries(variables || {}).forEach(([name, replacement]) => {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(replacement));
    });
    return value;
  }

  function text(key, variables) {
    return C.esc(raw(key, variables));
  }

  function profileUi() {
    const ui = state().ui;
    if (ui.profileStatus === undefined) ui.profileStatus = 'idle';
    if (ui.profileDraftName === undefined) ui.profileDraftName = '';
    if (ui.profileAvatarTone === undefined) ui.profileAvatarTone = state().user.tone || 'petal';
    if (ui.profileFormError === undefined) ui.profileFormError = '';
    if (ui.foodProfileFormError === undefined) ui.foodProfileFormError = '';
    return ui;
  }

  function actionButton(label, variant, size, action, options) {
    const opts = options || {};
    const iconName = opts.loading ? 'spinner' : opts.icon;
    const iconMarkup = iconName ? C.icon(iconName, opts.iconSize || 18, opts.loading ? 'ff-spinner' : '') : '';
    const classes = ['ff-btn', `ff-btn-${variant || 'brand'}`, `ff-btn-${size || 'md'}`, 'ff-w4-button'];
    if (opts.className) classes.push(opts.className);
    const attrs = [
      `data-wave4-action="${C.esc(action)}"`,
      opts.value !== undefined ? `data-wave4-value="${C.esc(opts.value)}"` : '',
      opts.label ? `aria-label="${C.esc(opts.label)}"` : '',
      opts.loading ? 'disabled aria-busy="true"' : '',
      opts.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');
    const content = opts.iconOnly
      ? iconMarkup || C.icon('sparkles', opts.iconSize || 18)
      : `${opts.iconRight ? '' : iconMarkup}<span>${C.esc(label)}</span>${opts.iconRight ? iconMarkup : ''}`;
    return `<button type="button" class="${classes.join(' ')}" ${attrs}>${content}</button>`;
  }

  function flowHeading(kicker, title, body, backHref, backLabel) {
    return `<div class="ff-w4-flow-heading"><div>${backHref ? `<a class="ff-back-link ff-w4-back" href="${C.esc(backHref)}">${C.icon('arrowLeft', 17)}<span>${C.esc(backLabel || raw('back'))}</span></a>` : ''}<span class="ff-eyebrow">${C.esc(kicker)}</span><h1>${C.esc(title)}</h1><p>${C.esc(body)}</p></div><div class="ff-w4-heading-mark">${C.icon('user', 23)}</div></div>`;
  }

  function localNote() {
    return `<p class="ff-w4-local-note">${C.icon('lock', 14)}<span>${text('localOnly')}</span></p>`;
  }

  function page(content, className) {
    const body = `<div class="ff-w4-flow">${content}${renderOverlay()}</div>`;
    return S.productPage(body, 'profile', `ff-w4-page ${className || ''}`, { includeOverlay: false });
  }

  function optionLabel(option) {
    if (!option) return '';
    return option[lang() === 'th' ? 'th' : 'en'] || option.en || option.label || option.id;
  }

  function findOption(collection, id) {
    return (collection || []).find((option) => option.id === id);
  }

  function preferencePills(options, selected, emptyLabel, tone) {
    const values = (selected || []).filter((id) => id !== 'none').map((id) => findOption(options, id)).filter(Boolean);
    if (!values.length) return `<span class="ff-w4-empty-pill">${C.icon('info', 13)}<span>${C.esc(emptyLabel)}</span></span>`;
    return values.map((option) => `<span class="ff-w4-preference-pill ff-w4-pill-${tone || 'petal'}">${C.icon('check', 13)}<span>${C.esc(optionLabel(option))}</span></span>`).join('');
  }

  function renderProfile() {
    const s = state();
    const ui = profileUi();
    const user = s.user || { name: 'Pure', email: 'pure@example.com', initials: 'P', tone: 'petal' };
    const fp = s.foodProfile || { allergies: [], restrictions: [], noAllergies: false, noRestrictions: false, notes: '' };
    const userWithTone = { ...user, tone: ui.profileAvatarTone || user.tone || 'petal' };
    const savedNotice = ui.profileStatus === 'saved' ? `<div class="ff-w4-saved-state" role="status">${C.icon('check', 16)}<span>${text('saved')}</span></div>` : '';
    const content = `${flowHeading(raw('profileKicker'), raw('profileTitle'), raw('profileBody'), '#/home', raw('back'))}${savedNotice}<section class="ff-w4-profile-grid"><article class="ff-w4-identity-card ff-w4-tone-petal"><div class="ff-w4-card-kicker"><span class="ff-eyebrow">${text('identity')}</span>${C.icon('user', 17)}</div><div class="ff-w4-identity-main">${C.avatar(userWithTone, 'lg')}<div><h2>${C.esc(user.name || 'Pure')}</h2><p>${C.esc(user.email || 'pure@example.com')}</p>${C.status(raw('profileReady'), 'success', 'check')}</div></div><p class="ff-w4-card-copy">${text('identityBody')}</p><div class="ff-w4-card-actions"><a class="ff-btn ff-btn-brand ff-btn-md ff-w4-button" href="#/profile/edit">${C.icon('user', 17)}<span>${text('editProfile')}</span></a></div></article><article class="ff-w4-food-card ff-w4-tone-apricot"><div class="ff-w4-card-kicker"><div><span class="ff-eyebrow">${text('foodProfile')}</span><h2>${text('persistentProfile')}</h2></div>${C.icon('utensils', 20)}</div><p class="ff-w4-card-copy">${text('foodProfileBody')}</p><div class="ff-w4-preference-group"><span>${text('allergies')}</span><div class="ff-w4-pill-row">${fp.noAllergies ? `<span class="ff-w4-preference-pill ff-w4-pill-success">${C.icon('check', 13)}<span>${text('noAllergies')}</span></span>` : preferencePills(W.allergies, fp.allergies, raw('notSet'), 'petal')}</div></div><div class="ff-w4-preference-group"><span>${text('restrictions')}</span><div class="ff-w4-pill-row">${fp.noRestrictions ? `<span class="ff-w4-preference-pill ff-w4-pill-success">${C.icon('check', 13)}<span>${text('noRestrictions')}</span></span>` : preferencePills(W.restrictions, fp.restrictions, raw('notSet'), 'custard')}</div></div><p class="ff-w4-profile-note">${fp.notes ? C.esc(fp.notes) : text('noAdditionalNotes')}</p><a class="ff-btn ff-btn-secondary ff-btn-md ff-w4-button" href="#/profile/food">${C.icon('utensils', 17)}<span>${text('editFoodProfile')}</span></a></article></section><p class="ff-w4-persistent-hint">${C.icon('info', 15)}<span>${text('persistentHint')}</span></p><section class="ff-w4-account-grid"><article class="ff-w4-functional-card"><div class="ff-w4-card-kicker"><div><span class="ff-eyebrow">${text('account')}</span><h2>${text('email')}</h2></div>${C.icon('user', 20)}</div><div class="ff-w4-account-row"><span>${text('email')}</span><strong>${C.esc(user.email || 'pure@example.com')}</strong></div><p>${text('accountBody')}</p><span class="ff-w4-local-chip">${C.icon('lock', 13)}<span>${text('localAccount')}</span></span></article><article class="ff-w4-functional-card ff-w4-security-card"><div class="ff-w4-card-kicker"><div><span class="ff-eyebrow">${text('security')}</span><h2>${text('password')}</h2></div>${C.icon('lock', 20)}</div><p>${text('securityBody')}</p><div class="ff-w4-security-row"><span>${text('passwordHint')}</span><a class="ff-text-button" href="#/forgot-password">${text('resetPassword')}</a></div></article></section><section class="ff-w4-logout-card"><div><span class="ff-eyebrow">${text('logout')}</span><h2>${text('logout')}</h2><p>${text('logoutBody')}</p></div>${actionButton(raw('logout'), 'danger', 'md', 'request-logout', { icon: 'close' })}</section>${localNote()}`;
    return page(content, 'ff-w4-profile-screen');
  }

  function renderProfileEdit() {
    const s = state();
    const ui = profileUi();
    const name = ui.profileDraftName || s.user.name || '';
    const selectedTone = ui.profileAvatarTone || s.user.tone || 'petal';
    const error = ui.profileFormError ? `<p class="ff-w4-form-error" role="alert">${C.icon('info', 15)}<span>${C.esc(ui.profileFormError)}</span></p>` : '';
    const loading = W.isLoading('profile-save');
    const toneChoices = TONES.map(([tone, labelKey]) => `<button type="button" class="ff-w4-tone-choice ${selectedTone === tone ? 'is-selected' : ''}" data-wave4-action="select-avatar-tone" data-wave4-value="${tone}" aria-pressed="${selectedTone === tone}"><span class="ff-w4-tone-dot ff-w4-tone-dot-${tone}"></span><span>${text(labelKey)}</span></button>`).join('');
    const content = `${flowHeading(raw('identity'), raw('editProfile'), raw('displayNameHelp'), '#/profile', raw('back'))}<form class="ff-w4-edit-form" data-wave4-form="profile" novalidate><section class="ff-w4-form-section ff-w4-tone-petal"><div class="ff-w4-section-heading">${C.icon('user', 19)}<div><span class="ff-eyebrow">${text('identity')}</span><h2>${text('displayName')}</h2><p>${text('identityBody')}</p></div></div><label class="ff-w4-label" for="ff-w4-profile-name">${text('displayName')}<span aria-hidden="true">*</span></label><input class="ff-w4-input" id="ff-w4-profile-name" name="displayName" value="${C.esc(name)}" data-wave4-field="profile-name" autocomplete="name" required aria-describedby="ff-w4-name-help"><p class="ff-w4-helper" id="ff-w4-name-help">${text('displayNameHelp')}</p>${error}</section><section class="ff-w4-form-section ff-w4-tone-apricot"><div class="ff-w4-section-heading">${C.icon('sparkles', 19)}<div><span class="ff-eyebrow">${text('identity')}</span><h2>${text('avatarTreatment')}</h2><p>${text('avatarTreatmentHelp')}</p></div></div><div class="ff-w4-avatar-preview">${C.avatar({ ...s.user, tone: selectedTone }, 'lg')}<div><strong>${C.esc(name || s.user.name || 'Pure')}</strong><span>${text('avatarTreatmentHelp')}</span></div></div><div class="ff-w4-tone-grid" role="group" aria-label="${text('avatarTreatment')}">${toneChoices}</div></section><div class="ff-w4-form-actions"><a class="ff-btn ff-btn-secondary ff-btn-md ff-w4-button" href="#/profile">${C.icon('arrowLeft', 17)}<span>${text('cancel')}</span></a><button type="submit" class="ff-btn ff-btn-brand ff-btn-lg ff-w4-button" ${loading ? 'disabled aria-busy="true"' : ''}>${loading ? C.icon('spinner', 18, 'ff-spinner') : C.icon('check', 18)}<span>${text(loading ? 'saving' : 'saveChanges')}</span></button></div></form>${localNote()}`;
    return page(content, 'ff-w4-profile-edit-screen');
  }

  function renderFoodOptionSection(group, titleKey, helpKey, options, selected, noneSelected, tone) {
    const choiceButtons = (options || []).map((option) => {
      const active = (selected || []).includes(option.id);
      return `<button type="button" class="ff-w4-food-choice ${active ? 'is-selected' : ''}" data-wave4-action="toggle-food-option" data-wave4-group="${group}" data-wave4-value="${C.esc(option.id)}" aria-pressed="${active}">${C.icon(active ? 'check' : 'plus', 15)}<span>${C.esc(optionLabel(option))}</span></button>`;
    }).join('');
    return `<section class="ff-w4-form-section ff-w4-tone-${tone}"><div class="ff-w4-section-heading">${C.icon(group === 'allergies' ? 'info' : 'utensils', 19)}<div><span class="ff-eyebrow">${C.esc(tone.toUpperCase())}</span><h2>${text(titleKey)}</h2><p>${text(helpKey)}</p></div></div><div class="ff-w4-food-choice-grid" role="group" aria-label="${text(titleKey)}">${choiceButtons}</div><button type="button" class="ff-w4-none-choice ${noneSelected ? 'is-selected' : ''}" data-wave4-action="toggle-food-none" data-wave4-group="${group}" aria-pressed="${Boolean(noneSelected)}">${C.icon(noneSelected ? 'check' : 'close', 15)}<span>${text(group === 'allergies' ? 'noAllergies' : 'noRestrictions')}</span></button></section>`;
  }

  function renderFoodProfileEdit() {
    const s = state();
    const ui = profileUi();
    const fp = s.foodProfile || { allergies: [], restrictions: [], noAllergies: false, noRestrictions: false, notes: '' };
    const error = ui.foodProfileFormError ? `<p class="ff-w4-form-error" role="alert">${C.icon('info', 15)}<span>${C.esc(ui.foodProfileFormError)}</span></p>` : '';
    const loading = W.isLoading('profile-food-save');
    const content = `${flowHeading(raw('foodProfile'), raw('foodProfileEditTitle'), raw('foodProfileEditBody'), '#/profile', raw('back'))}<div class="ff-w4-persistent-banner">${C.icon('lock', 17)}<div><strong>${text('persistentProfile')}</strong><span>${text('persistentHint')}</span></div></div><form class="ff-w4-food-edit-form" data-wave4-form="food-profile">${renderFoodOptionSection('allergies', 'allergies', 'allergiesHelp', W.allergies, fp.allergies, fp.noAllergies, 'petal')}${renderFoodOptionSection('restrictions', 'restrictions', 'restrictionsHelp', W.restrictions, fp.restrictions, fp.noRestrictions, 'custard')}<section class="ff-w4-form-section ff-w4-tone-apricot"><div class="ff-w4-section-heading">${C.icon('sparkles', 19)}<div><span class="ff-eyebrow">${text('notes')}</span><h2>${text('notes')}</h2><p>${text('notesHelp')}</p></div></div><label class="ff-w4-label" for="ff-w4-food-notes">${text('notes')}</label><textarea class="ff-w4-input ff-w4-textarea" id="ff-w4-food-notes" rows="4" data-wave4-field="food-notes" placeholder="${text('notesPlaceholder')}">${C.esc(fp.notes || '')}</textarea></section>${error}<div class="ff-w4-form-actions"><a class="ff-btn ff-btn-secondary ff-btn-md ff-w4-button" href="#/profile">${C.icon('arrowLeft', 17)}<span>${text('cancel')}</span></a><button type="submit" class="ff-btn ff-btn-brand ff-btn-lg ff-w4-button" ${loading ? 'disabled aria-busy="true"' : ''}>${loading ? C.icon('spinner', 18, 'ff-spinner') : C.icon('check', 18)}<span>${text(loading ? 'saving' : 'saveChanges')}</span></button></div></form>${localNote()}`;
    return page(content, 'ff-w4-food-profile-screen');
  }

  function renderOverlay() {
    if (state().ui.overlay !== 'wave4-logout') return '';
    return `<div class="ff-overlay-layer ff-w4-overlay-layer" data-wave4-action="close-overlay" role="presentation"><section class="ff-w4-dialog" data-wave4-stop role="dialog" aria-modal="true" aria-labelledby="ff-w4-logout-title" aria-describedby="ff-w4-logout-body"><button type="button" class="ff-icon-button ff-w4-dialog-close" data-wave4-action="close-overlay" aria-label="${text('close')}">${C.icon('close', 18)}</button>${C.iconWell('petal', 'lg', 'user')}<span class="ff-eyebrow">${text('logout')}</span><h2 id="ff-w4-logout-title">${text('logoutTitle')}</h2><p id="ff-w4-logout-body">${text('logoutConfirmBody')}</p><div class="ff-w4-dialog-actions">${actionButton(raw('cancel'), 'ghost', 'md', 'close-overlay')}${actionButton(raw('confirmLogout'), 'danger', 'md', 'confirm-logout', { icon: 'close' })}</div></section></div>`;
  }

  function resetActiveSession(s) {
    s.auth.isAuthenticated = false;
    s.auth.verified = false;
    s.auth.pendingEmail = '';
    s.auth.forgotEmail = '';
    s.auth.resetComplete = false;
    s.currentRoom = null;
    s.roomMembers = [];
    s.readiness = { user: false, allReady: false };
    s.roomDraft.source = 'create';
    s.roomDraft.joinCode = '';
    s.mealPreference = { cuisine: [], ingredients: [], cookingType: [], submitted: false };
    s.recommendationProgress = { stage: 0, message: '', started: false, complete: false };
    s.recommendationRound = 1;
    s.recommendations = W.deepClone(W.recommendations);
    s.voteSelections = { 1: [], 2: [] };
    s.passedOptions = { 1: [], 2: [] };
    s.roundResult = null;
    s.winner = null;
    s.restaurantSelection = null;
    s.bill = null;
    s.payments = [];
    s.billFlow = {
      receiptStep: 'entry',
      splitStep: 'setup',
      selectedItems: [],
      selectedMembers: [],
      itemAssignments: {},
      completion: 'open',
      historySelection: null,
      validationError: '',
      splitConfirmed: false,
      historyRecorded: false
    };
  }

  function logoutPrototype() {
    const s = state();
    const ui = profileUi();
    resetActiveSession(s);
    ui.overlay = '';
    ui.utilityOpen = false;
    ui.notificationOpen = false;
    ui.accountOpen = false;
    ui.scenario = 'new-user';
    ui.lobbyScenario = 'host-waiting';
    ui.wave2State = 'normal';
    ui.restaurantState = 'normal';
    ui.billScenario = 'normal';
    ui.receiptState = 'empty';
    ui.historyScenario = 'normal';
    ui.formErrors = {};
    ui.profileStatus = 'idle';
    ui.profileDraftName = s.user.name || '';
    ui.profileFormError = '';
    ui.foodProfileFormError = '';
    W.setNotice(raw('logoutDone'), 'success');
    W.navigate('#/landing');
  }

  function handleAction(target) {
    const action = target.getAttribute('data-wave4-action');
    const value = target.getAttribute('data-wave4-value') || '';
    const group = target.getAttribute('data-wave4-group') || '';
    const s = state();
    const ui = profileUi();
    if (action === 'request-logout') {
      ui.overlay = 'wave4-logout';
      W.refresh();
      return;
    }
    if (action === 'confirm-logout') {
      logoutPrototype();
      return;
    }
    if (action === 'close-overlay') {
      ui.overlay = '';
      W.refresh();
      return;
    }
    if (action === 'select-avatar-tone') {
      ui.profileAvatarTone = TONES.some(([tone]) => tone === value) ? value : 'petal';
      W.refresh();
      return;
    }
    if (action === 'toggle-food-option') {
      const listKey = group === 'restrictions' ? 'restrictions' : 'allergies';
      const noneKey = group === 'restrictions' ? 'noRestrictions' : 'noAllergies';
      const list = s.foodProfile[listKey] || [];
      const index = list.indexOf(value);
      if (index >= 0) list.splice(index, 1);
      else list.push(value);
      s.foodProfile[noneKey] = false;
      ui.foodProfileFormError = '';
      W.refresh();
      return;
    }
    if (action === 'toggle-food-none') {
      const listKey = group === 'restrictions' ? 'restrictions' : 'allergies';
      const noneKey = group === 'restrictions' ? 'noRestrictions' : 'noAllergies';
      s.foodProfile[noneKey] = !s.foodProfile[noneKey];
      if (s.foodProfile[noneKey]) s.foodProfile[listKey] = [];
      ui.foodProfileFormError = '';
      W.refresh();
    }
  }

  function saveProfile() {
    const s = state();
    const ui = profileUi();
    const name = String(ui.profileDraftName || '').trim();
    if (!name) {
      ui.profileFormError = raw('nameRequired');
      W.refresh();
      return;
    }
    ui.profileFormError = '';
    W.runLoading('profile-save', () => {
      s.user.name = name;
      s.user.initials = name.split(/\s+/).map((part) => part[0] || '').join('').toUpperCase().slice(0, 2) || 'P';
      s.user.tone = ui.profileAvatarTone || s.user.tone || 'petal';
      if (s.currentRoom?.members) {
        s.currentRoom.members = s.currentRoom.members.map((member) => member.id === 'pure' ? { ...member, name: s.user.name, initials: s.user.initials, tone: s.user.tone } : member);
        s.roomMembers = W.deepClone(s.currentRoom.members);
      }
      ui.profileStatus = 'saved';
      W.setNotice(raw('profileSaved'), 'success');
      W.navigate('#/profile', '#/profile/edit');
    }, 360);
  }

  function saveFoodProfile() {
    const s = state();
    const ui = profileUi();
    const fp = s.foodProfile;
    const allergiesReady = Boolean(fp.noAllergies || (fp.allergies || []).length);
    const restrictionsReady = Boolean(fp.noRestrictions || (fp.restrictions || []).length);
    if (!allergiesReady || !restrictionsReady) {
      ui.foodProfileFormError = raw('foodProfileRequired');
      W.refresh();
      return;
    }
    ui.foodProfileFormError = '';
    W.runLoading('profile-food-save', () => {
      fp.completed = true;
      ui.profileStatus = 'saved';
      W.setNotice(raw('foodProfileSaved'), 'success');
      W.navigate('#/profile', '#/profile/food');
    }, 360);
  }

  function bindEvents() {
    const root = document.querySelector('.ff-wave1-root');
    if (!root) return;
    if (typeof P.bindWave1Events === 'function') P.bindWave1Events();

    root.addEventListener('click', (event) => {
      const target = event.target.closest('[data-wave4-action]');
      if (!target || !root.contains(target)) return;
      event.preventDefault();
      handleAction(target);
    });

    root.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
      const field = target.getAttribute('data-wave4-field');
      if (field === 'profile-name') {
        profileUi().profileDraftName = target.value;
        profileUi().profileFormError = '';
      }
      if (field === 'food-notes') {
        state().foodProfile.notes = target.value;
        profileUi().foodProfileFormError = '';
      }
    });

    root.addEventListener('submit', (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      const formId = form.getAttribute('data-wave4-form');
      if (!formId) return;
      event.preventDefault();
      if (formId === 'profile') saveProfile();
      if (formId === 'food-profile') saveFoodProfile();
    });
  }

  function renderWave4Route(hash) {
    switch (hash) {
      case '#/profile': return renderProfile();
      case '#/profile/edit': return renderProfileEdit();
      case '#/profile/food': return renderFoodProfileEdit();
      default: return renderProfile();
    }
  }

  P.logoutPrototype = logoutPrototype;
  P.renderWave4Route = renderWave4Route;
  P.bindWave4Events = bindEvents;
  P.WAVE4 = {
    routes: ['#/profile', '#/profile/edit', '#/profile/food'],
    classification: 'PRODUCTION-CONTRACT-ALIGNED shell with local prototype account editing'
  };
})();
