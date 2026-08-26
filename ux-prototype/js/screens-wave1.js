/**
 * FoodFighter - clickable product prototype, Wave 01
 *
 * The screens in this file are presentation-only simulations. They use the
 * local Wave 01 state store and are intentionally independent of the legacy
 * product-screen implementations and all network services.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;
  const W = P.WAVE1;
  const C = P.WAVE1_COMPONENTS;

  function state() {
    return W.getState();
  }

  function t(key, variables) {
    return C.esc(W.t(key, variables));
  }

  function rawText(key, variables) {
    return W.t(key, variables);
  }

  function initials(name) {
    return String(name || '')
      .split(/\s+/)
      .map((part) => part[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'P';
  }

  function renderBrand(href, compact) {
    return `<a class="ff-brand ${compact ? 'ff-brand-compact' : ''}" href="${href || '#/landing'}" aria-label="FoodFighter home"><span class="ff-brand-mark">${C.icon('utensils', 18)}</span><span><strong>FoodFighter</strong>${compact ? '' : `<small>${t('brandTagline')}</small>`}</span></a>`;
  }

  function renderLanguageButtons() {
    const current = state().ui.language;
    return `<div class="ff-language-switch" role="group" aria-label="Language"><button type="button" class="${current === 'th' ? 'is-active' : ''}" data-wave1-action="set-language" data-wave1-value="th" aria-pressed="${current === 'th'}">TH</button><button type="button" class="${current === 'en' ? 'is-active' : ''}" data-wave1-action="set-language" data-wave1-value="en" aria-pressed="${current === 'en'}">EN</button></div>`;
  }

  function renderUtilityMenu() {
    const ui = state().ui;
    if (!ui.utilityOpen) return '';
    return `<aside class="ff-utility-menu" aria-label="${t('prototypeUtility')}" data-wave1-stop><div class="ff-utility-heading"><div><span class="ff-eyebrow">LOCAL PROTOTYPE</span><strong>${t('prototypeUtility')}</strong></div><button type="button" class="ff-icon-button" data-wave1-action="toggle-utility" aria-label="${t('close')}">${C.icon('close', 17)}</button></div><p>${t('localOnly')}</p><div class="ff-utility-controls"><div><span>${t('scenario')}</span><div class="ff-utility-choice-grid"><button type="button" class="${ui.scenario === 'new-user' ? 'is-active' : ''}" data-wave1-action="set-scenario" data-wave1-value="new-user">${t('newUser')}</button><button type="button" class="${ui.scenario === 'existing-user' ? 'is-active' : ''}" data-wave1-action="set-scenario" data-wave1-value="existing-user">${t('existingUser')}</button><button type="button" class="${ui.scenario === 'host' ? 'is-active' : ''}" data-wave1-action="set-scenario" data-wave1-value="host">${t('host')}</button><button type="button" class="${ui.scenario === 'member' ? 'is-active' : ''}" data-wave1-action="set-scenario" data-wave1-value="member">${t('member')}</button></div></div><div class="ff-utility-inline"><span>${t('motionOn')}</span><button type="button" class="${ui.motion === 'on' ? 'is-active' : ''}" data-wave1-action="set-motion" data-wave1-value="on" aria-pressed="${ui.motion === 'on'}">ON</button><button type="button" class="${ui.motion === 'reduced' ? 'is-active' : ''}" data-wave1-action="set-motion" data-wave1-value="reduced" aria-pressed="${ui.motion === 'reduced'}">REDUCED</button></div><div class="ff-utility-inline"><span>Language</span>${renderLanguageButtons()}</div></div><div class="ff-utility-actions"><button type="button" class="ff-utility-reset" data-wave1-action="reset-demo">${C.icon('refresh', 15)} ${t('resetDemo')}</button><a href="#/ux-lab" class="ff-utility-lab">${C.icon('sparkles', 15)} ${t('uxLab')}</a></div></aside>`;
  }

  function renderAuthHeader(backHref, title, backAction) {
    const backControl = backAction
      ? `<button type="button" class="ff-back-link" data-wave1-action="${backAction}" aria-label="${t('back')}">${C.icon('arrowLeft', 17)}<span>${t('back')}</span></button>`
      : backHref
        ? `<a class="ff-back-link" href="${backHref}" aria-label="${t('back')}">${C.icon('arrowLeft', 17)}<span>${t('back')}</span></a>`
        : renderBrand('#/landing', true);
    return `<header class="ff-auth-header"><div class="ff-auth-header-left">${backControl}</div><div class="ff-auth-header-brand">${renderBrand('#/landing', true)}</div><div class="ff-auth-header-tools">${renderLanguageButtons()}<button type="button" class="ff-icon-button" data-wave1-action="toggle-utility" aria-label="${t('prototypeUtility')}" aria-expanded="${state().ui.utilityOpen}">${C.icon('more', 18)}</button></div>${title ? `<span class="ff-sr-only">${title}</span>` : ''}</header>`;
  }

  function renderDesktopNav(active) {
    const links = [
      ['home', '#/home', 'home'],
      ['history', '#/history', 'clock'],
      ['bills', '#/bill', 'receipt'],
      ['profile', '#/profile', 'user']
    ];
    return `<nav class="ff-desktop-nav" aria-label="FoodFighter navigation">${links.map(([id, href, iconName]) => `<a href="${href}" class="${active === id ? 'is-active' : ''}" ${active === id ? 'aria-current="page"' : ''}>${C.icon(iconName, 16)}<span>${t(id)}</span></a>`).join('')}</nav>`;
  }

  function renderMobileNav(active) {
    const links = [
      ['home', '#/home', 'home'],
      ['history', '#/history', 'clock'],
      ['bills', '#/bill', 'receipt'],
      ['profile', '#/profile', 'user']
    ];
    return `<nav class="ff-mobile-bottom-nav" aria-label="Mobile FoodFighter navigation">${links.map(([id, href, iconName]) => `<a href="${href}" class="${active === id ? 'is-active' : ''}" ${active === id ? 'aria-current="page"' : ''}>${C.icon(iconName, 17)}<span>${t(id)}</span></a>`).join('')}</nav>`;
  }

  function renderProductHeader(active) {
    const ui = state().ui;
    return `<header class="ff-product-header"><div class="ff-product-header-inner">${renderBrand('#/home', true)}${renderDesktopNav(active)}<div class="ff-product-header-actions"><button type="button" class="ff-product-icon-action" data-wave1-action="toggle-notifications" aria-label="${t('notifications')}" aria-expanded="${ui.notificationOpen}">${C.icon('bell', 18)}<i></i></button><button type="button" class="ff-product-avatar" data-wave1-action="toggle-account" aria-label="${t('account')}" aria-expanded="${ui.accountOpen}">${C.esc(state().user.initials)}</button><button type="button" class="ff-icon-button ff-product-utility" data-wave1-action="toggle-utility" aria-label="${t('prototypeUtility')}" aria-expanded="${ui.utilityOpen}">${C.icon('more', 18)}</button></div></div>${ui.notificationOpen ? `<div class="ff-header-panel ff-notification-panel" data-wave1-stop><div class="ff-panel-kicker">${t('notifications')}</div><strong>${t('waiting')}</strong><p>${state().currentRoom ? t('waitingForReady') : t('noCurrentRoomBody')}</p><button type="button" class="ff-text-button" data-wave1-action="close-panels">${t('close')}</button></div>` : ''}${ui.accountOpen ? `<div class="ff-header-panel ff-account-panel" data-wave1-stop><div class="ff-account-heading">${C.avatar(state().user, 'sm')}<div><strong>${C.esc(state().user.name)}</strong><span>${C.esc(state().user.email)}</span></div></div><a href="#/profile">${C.icon('user', 15)} ${t('profile')}</a><button type="button" class="ff-text-button" data-wave1-action="close-panels">${t('close')}</button></div>` : ''}</header>`;
  }

  function renderPageNotice() {
    const ui = state().ui;
    return ui.notice ? `<div class="ff-page-notice-wrap">${C.notice(ui.notice, ui.noticeType)}</div>` : '';
  }

  function productPage(content, active, className) {
    const ui = state().ui;
    return `<main class="ff-wave1-root ff-product-page ${className || ''} ${ui.motion === 'reduced' ? 'ff-reduced-motion' : ''}">${renderProductHeader(active)}${renderPageNotice()}<div class="ff-product-content">${content}</div>${renderMobileNav(active)}${renderUtilityMenu()}${renderWave1Overlay()}</main>`;
  }

  function authPage(content, options) {
    const opts = options || {};
    const ui = state().ui;
    return `<main class="ff-wave1-root ff-auth-page ${ui.motion === 'reduced' ? 'ff-reduced-motion' : ''}">${renderAuthHeader(opts.backHref, opts.title, opts.backAction)}${renderPageNotice()}<div class="ff-auth-content ${opts.className || ''}">${content}</div>${renderUtilityMenu()}${renderWave1Overlay()}</main>`;
  }

  function renderAuthAside(kicker, headline, body, slot, tone) {
    return `<aside class="ff-auth-aside ff-auth-aside-${tone || 'petal'}"><span class="ff-eyebrow">${kicker}</span><h2>${headline}</h2><p>${body}</p>${C.media(slot || 'landing', 'placeholder')}<div class="ff-auth-aside-note">${C.icon('lock', 14)} ${t('localOnly')}</div></aside>`;
  }

  function authFormLayout(form, aside) {
    return `<div class="ff-auth-layout"><section class="ff-form-panel">${form}</section>${aside}</div>`;
  }

  function renderFieldError(errors, key) {
    return errors[key] ? `<p class="ff-validation ff-validation-error" role="alert">${C.icon('info', 14)}<span>${C.esc(errors[key])}</span></p>` : '';
  }

  function inputControl(id, type, valueText, placeholder, options) {
    const opts = options || {};
    return `<div class="ff-control-wrap ${opts.icon ? 'has-icon' : ''} ${opts.action ? 'has-action' : ''}">${opts.icon ? C.icon(opts.icon, 17) : ''}<input id="${id}" class="ff-control" type="${type || 'text'}" value="${C.esc(valueText || '')}" placeholder="${C.esc(placeholder || '')}" autocomplete="${C.esc(opts.autocomplete || 'off')}" ${opts.required ? 'required' : ''} ${opts.disabled ? 'disabled' : ''} ${opts.field ? `data-wave1-field="${opts.field}"` : ''} ${opts.maxLength ? `maxlength="${opts.maxLength}"` : ''} />${opts.action ? `<button type="button" class="ff-control-action" data-wave1-action="${opts.action}" aria-label="${C.esc(opts.actionLabel || '')}">${C.icon(opts.actionIcon || 'eye', 17)}</button>` : ''}</div>`;
  }

  function renderLanding() {
    const ui = state().ui;
    return `<main class="ff-wave1-root ff-landing-page ${ui.motion === 'reduced' ? 'ff-reduced-motion' : ''}"><header class="ff-landing-header">${renderBrand('#/landing', false)}<div class="ff-landing-tools">${renderLanguageButtons()}<button type="button" class="ff-icon-button" data-wave1-action="toggle-utility" aria-label="${t('prototypeUtility')}" aria-expanded="${ui.utilityOpen}">${C.icon('more', 18)}</button></div></header>${renderPageNotice()}<div class="ff-landing-content"><section class="ff-landing-hero"><div class="ff-landing-copy"><span class="ff-eyebrow">${t('landingKicker')}</span><h1>${t('landingHeadline')}</h1><p>${t('landingBody')}</p><div class="ff-landing-actions">${C.link(t('getStarted'), '#/register', 'brand', 'hero', { icon: 'arrowRight', iconRight: true })}${C.link(t('logIn'), '#/login', 'outline', 'lg')}</div><button type="button" class="ff-demo-link" data-wave1-action="enter-demo">${C.icon('sparkles', 15)} ${t('enterDemo')} <span>${t('localPrototype')}</span></button></div><div class="ff-landing-visual">${C.media('landing', 'placeholder', { overlay: true })}<div class="ff-landing-visual-caption"><span>${t('landingHero')}</span><strong>16:9 · 1600 × 900</strong></div></div></section><section class="ff-landing-steps" aria-label="FoodFighter flow"><div><span>01</span><strong>${t('landingStepOne')}</strong></div><i></i><div><span>02</span><strong>${t('landingStepTwo')}</strong></div><i></i><div><span>03</span><strong>${t('landingStepThree')}</strong></div></section><p class="ff-local-note">${C.icon('lock', 14)} ${t('landingNote')}</p></div>${renderUtilityMenu()}${renderWave1Overlay()}</main>`;
  }

  function renderRegister() {
    const s = state();
    const errors = s.ui.formErrors || {};
    const auth = s.auth;
    const form = `<div class="ff-form-heading"><span class="ff-eyebrow">01 · AUTH</span><h1>${t('registerTitle')}</h1><p>${t('registerSubtitle')}</p></div><form class="ff-form" data-wave1-form="register" novalidate>${C.field(t('fullName'), 'wave1-register-name', inputControl('wave1-register-name', 'text', auth.name || '', 'Pure', { field: 'auth.name', autocomplete: 'name', required: true }), { required: true, helper: t('fullName') })}${renderFieldError(errors, 'name')}${C.field(t('email'), 'wave1-register-email', inputControl('wave1-register-email', 'email', auth.email || '', 'pure@example.com', { field: 'auth.email', autocomplete: 'email', required: true }), { required: true })}${renderFieldError(errors, 'email')}${C.field(t('password'), 'wave1-register-password', inputControl('wave1-register-password', 'password', auth.password || '', '••••••••', { field: 'auth.password', autocomplete: 'new-password', required: true, action: 'toggle-password', actionLabel: t('showPassword'), actionIcon: 'eye' }), { required: true, helper: t('passwordHint') })}${renderFieldError(errors, 'password')}${C.field(t('confirmPassword'), 'wave1-register-confirm', inputControl('wave1-register-confirm', 'password', auth.confirmPassword || '', '••••••••', { field: 'auth.confirmPassword', autocomplete: 'new-password', required: true, action: 'toggle-confirm-password', actionLabel: t('showPassword'), actionIcon: 'eye' }), { required: true })}${renderFieldError(errors, 'confirmPassword')}<label class="ff-check-row"><input type="checkbox" data-wave1-field="auth.terms" ${auth.terms ? 'checked' : ''} ${W.isLoading('register') ? 'disabled' : ''} /><span class="ff-check-mark">${C.icon('check', 13)}</span><span>${t('terms')}</span></label>${renderFieldError(errors, 'terms')}<button type="submit" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" ${W.isLoading('register') ? 'disabled aria-busy="true"' : ''}>${W.isLoading('register') ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${t('createAccount')}</span>${C.icon('arrowRight', 18)}`}</button></form><div class="ff-form-footer"><span>${t('alreadyAccount')}</span><a href="#/login">${t('logIn')}</a></div>`;
    return authPage(authFormLayout(form, renderAuthAside('MAKE ROOM FOR EVERYONE', 'Start with your people.', 'A simple account is the first seat at the table.', 'landing', 'petal')), { backHref: '#/landing', title: rawText('registerTitle') });
  }

  function renderLogin() {
    const s = state();
    const errors = s.ui.formErrors || {};
    const auth = s.auth;
    const form = `<div class="ff-form-heading"><span class="ff-eyebrow">RETURN TO THE TABLE</span><h1>${t('loginTitle')}</h1><p>${t('loginSubtitle')}</p></div><form class="ff-form" data-wave1-form="login" novalidate>${C.field(t('email'), 'wave1-login-email', inputControl('wave1-login-email', 'email', auth.email || '', 'pure@example.com', { field: 'auth.email', autocomplete: 'email', required: true }), { required: true })}${renderFieldError(errors, 'email')}${C.field(t('password'), 'wave1-login-password', inputControl('wave1-login-password', 'password', auth.password || '', '••••••••', { field: 'auth.password', autocomplete: 'current-password', required: true, action: 'toggle-password', actionLabel: t('showPassword'), actionIcon: 'eye' }), { required: true })}${renderFieldError(errors, 'password')}<div class="ff-form-inline"><span class="ff-form-hint">${t('demoCredentials')}</span><a href="#/forgot-password">${t('forgotPassword')}</a></div><button type="submit" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" ${W.isLoading('login') ? 'disabled aria-busy="true"' : ''}>${W.isLoading('login') ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${t('login')}</span>${C.icon('arrowRight', 18)}`}</button></form><div class="ff-social-divider"><span>OR</span></div><div class="ff-social-candidates"><button type="button" class="ff-social-button" data-wave1-action="social-candidate">${C.icon('sparkles', 16)} Google <small>candidate</small></button><button type="button" class="ff-social-button" data-wave1-action="social-candidate">${C.icon('users', 16)} LINE <small>candidate</small></button></div><div class="ff-form-footer"><span>${t('noAccount')}</span><a href="#/register">${t('register')}</a></div>`;
    return authPage(authFormLayout(form, renderAuthAside('YOUR TABLE IS WAITING', 'Pick up where you left off.', 'Come back to a shared decision with one calm sign-in.', 'home', 'apricot')), { backHref: '#/landing', title: rawText('loginTitle') });
  }

  function renderVerifyEmail() {
    const s = state();
    const errors = s.ui.formErrors || {};
    const auth = s.auth;
    const otp = auth.otp || ['', '', '', '', '', ''];
    const form = `<div class="ff-form-heading"><span class="ff-eyebrow">02 · VERIFY</span><h1>${t('verifyTitle')}</h1><p>${t('verifySubtitle')} <strong>${C.esc(auth.pendingEmail || auth.email || 'pure@example.com')}</strong></p></div><form class="ff-form ff-otp-form" data-wave1-form="verify" novalidate><label class="ff-label" for="wave1-otp-0">${t('verifyCode')}</label><div class="ff-otp-grid">${otp.map((digit, index) => `<input id="wave1-otp-${index}" class="ff-otp-input ${errors.otp ? 'is-error' : ''}" type="text" inputmode="numeric" maxlength="1" value="${C.esc(digit)}" data-wave1-otp="${index}" aria-label="${t('verifyCode')} ${index + 1}" ${W.isLoading('verify') ? 'disabled' : ''} />`).join('')}</div>${renderFieldError(errors, 'otp')}<div class="ff-demo-code-row"><span>${t('verifyHint')}</span><button type="button" class="ff-text-button" data-wave1-action="fill-demo-otp">${t('useDemoCode')}</button></div><button type="submit" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" ${W.isLoading('verify') ? 'disabled aria-busy="true"' : ''}>${W.isLoading('verify') ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${t('verify')}</span>${C.icon('check', 18)}`}</button><button type="button" class="ff-text-button ff-centered-button" data-wave1-action="resend-otp" ${W.isLoading('resend') ? 'disabled' : ''}>${W.isLoading('resend') ? t('loading') : t('resend')}</button></form>`;
    return authPage(authFormLayout(form, renderAuthAside('A SMALL STEP', 'Make the table yours.', 'Verification keeps this local prototype journey easy to understand.', 'landing', 'custard')), { backHref: '#/register', title: rawText('verifyTitle') });
  }

  function renderForgotPassword() {
    const s = state();
    const errors = s.ui.formErrors || {};
    const auth = s.auth;
    const confirmation = auth.forgotSent;
    const form = confirmation ? `<div class="ff-success-panel"><div class="ff-success-icon">${C.icon('send', 24)}</div><span class="ff-eyebrow">LOCAL CONFIRMATION</span><h1>${t('resetSentTitle')}</h1><p>${t('resetSentBody')}</p><button type="button" class="ff-btn ff-btn-brand ff-btn-lg ff-btn-block" data-wave1-action="to-reset">${t('continueToReset')}${C.icon('arrowRight', 18)}</button></div>` : `<div class="ff-form-heading"><span class="ff-eyebrow">ACCOUNT RECOVERY</span><h1>${t('forgotTitle')}</h1><p>${t('forgotSubtitle')}</p></div><form class="ff-form" data-wave1-form="forgot" novalidate>${C.field(t('email'), 'wave1-forgot-email', inputControl('wave1-forgot-email', 'email', auth.forgotEmail || auth.email || '', 'pure@example.com', { field: 'auth.forgotEmail', autocomplete: 'email', required: true }), { required: true })}${renderFieldError(errors, 'email')}<button type="submit" class="ff-btn ff-btn-brand ff-btn-lg ff-btn-block" ${W.isLoading('forgot') ? 'disabled aria-busy="true"' : ''}>${W.isLoading('forgot') ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${t('sendReset')}</span>${C.icon('arrowRight', 18)}`}</button></form>`;
    return authPage(authFormLayout(form, renderAuthAside('NO TABLE LEFT BEHIND', 'A calm way back in.', 'Reset the key, then return to the group food decision.', 'home', 'mauve')), { backHref: '#/login', title: rawText('forgotTitle') });
  }

  function renderResetPassword() {
    const s = state();
    const errors = s.ui.formErrors || {};
    const auth = s.auth;
    const form = auth.resetComplete ? `<div class="ff-success-panel"><div class="ff-success-icon">${C.icon('check', 25)}</div><span class="ff-eyebrow">READY AGAIN</span><h1>${t('resetSuccess')}</h1><p>${t('resetSentBody')}</p><a class="ff-btn ff-btn-brand ff-btn-lg ff-btn-block" href="#/login">${t('returnToLogin')}${C.icon('arrowRight', 18)}</a></div>` : `<div class="ff-form-heading"><span class="ff-eyebrow">ACCOUNT RECOVERY</span><h1>${t('resetTitle')}</h1><p>${t('resetSubtitle')}</p></div><form class="ff-form" data-wave1-form="reset" novalidate>${C.field(t('password'), 'wave1-reset-password', inputControl('wave1-reset-password', 'password', auth.resetPassword || '', '••••••••', { field: 'auth.resetPassword', autocomplete: 'new-password', required: true, action: 'toggle-password', actionLabel: t('showPassword'), actionIcon: 'eye' }), { required: true, helper: t('passwordHint') })}${renderFieldError(errors, 'password')}${C.field(t('confirmPassword'), 'wave1-reset-confirm', inputControl('wave1-reset-confirm', 'password', auth.resetConfirm || '', '••••••••', { field: 'auth.resetConfirm', autocomplete: 'new-password', required: true, action: 'toggle-confirm-password', actionLabel: t('showPassword'), actionIcon: 'eye' }), { required: true })}${renderFieldError(errors, 'confirmPassword')}<button type="submit" class="ff-btn ff-btn-brand ff-btn-lg ff-btn-block" ${W.isLoading('reset') ? 'disabled aria-busy="true"' : ''}>${W.isLoading('reset') ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${t('resetPassword')}</span>${C.icon('check', 18)}`}</button></form>`;
    return authPage(authFormLayout(form, renderAuthAside('KEEP IT SIMPLE', 'Back to your people.', 'A clear recovery moment should never lose the thread.', 'landing', 'petal')), { backHref: '#/forgot-password', title: rawText('resetTitle') });
  }

  function profileOption(option, type, selected) {
    const label = state().ui.language === 'en' ? option.en : option.th;
    return `<button type="button" class="ff-choice-chip ${selected ? 'is-selected' : ''}" data-wave1-action="toggle-profile-option" data-wave1-value="${C.esc(option.id)}" data-wave1-target="${type}" aria-pressed="${selected}">${selected ? C.icon('check', 14) : C.icon('plus', 14)}<span>${C.esc(label)}</span></button>`;
  }

  function renderFoodProfile() {
    const s = state();
    const profile = s.foodProfile;
    const errors = s.ui.formErrors || {};
    const step = Math.max(1, Math.min(3, Number(profile.step || 1)));
    const backHref = step === 1 ? '#/verify-email' : '';
    const backAction = step === 1 ? '' : 'back-food-profile';
    let stepContent = '';
    if (step === 1) {
      stepContent = `<div class="ff-profile-step-heading"><span class="ff-step-number">01</span><div><span class="ff-eyebrow">${t('allergies')}</span><h1>${t('foodProfileTitle')}</h1><p>${t('allergiesHelp')}</p></div></div><div class="ff-choice-grid" role="group" aria-label="${t('allergies')}">${W.allergies.map((option) => profileOption(option, 'allergy', profile.allergies.includes(option.id))).join('')}</div><button type="button" class="ff-choice-wide ${profile.noAllergies ? 'is-selected' : ''}" data-wave1-action="toggle-profile-none" data-wave1-value="allergy" aria-pressed="${profile.noAllergies}">${C.icon('check', 16)}<span>${t('noAllergies')}</span></button>${errors.profile ? `<p class="ff-validation ff-validation-error" role="alert">${C.icon('info', 14)}<span>${C.esc(errors.profile)}</span></p>` : ''}`;
    } else if (step === 2) {
      stepContent = `<div class="ff-profile-step-heading"><span class="ff-step-number">02</span><div><span class="ff-eyebrow">${t('restrictions')}</span><h1>${t('foodProfileTitle')}</h1><p>${t('restrictionsHelp')}</p></div></div><div class="ff-choice-grid" role="group" aria-label="${t('restrictions')}">${W.restrictions.map((option) => profileOption(option, 'restriction', profile.restrictions.includes(option.id))).join('')}</div><button type="button" class="ff-choice-wide ${profile.noRestrictions ? 'is-selected' : ''}" data-wave1-action="toggle-profile-none" data-wave1-value="restriction" aria-pressed="${profile.noRestrictions}">${C.icon('check', 16)}<span>${t('noRestrictions')}</span></button>${errors.profile ? `<p class="ff-validation ff-validation-error" role="alert">${C.icon('info', 14)}<span>${C.esc(errors.profile)}</span></p>` : ''}`;
    } else {
      stepContent = `<div class="ff-profile-step-heading"><span class="ff-step-number">03</span><div><span class="ff-eyebrow">${t('details')}</span><h1>${t('foodProfileTitle')}</h1><p>${t('detailsHelp')}</p></div></div><div class="ff-field"><div class="ff-form-inline"><label class="ff-label" for="wave1-profile-notes">${t('notes')}</label><span class="ff-field-optional">${t('optional')}</span></div><textarea id="wave1-profile-notes" class="ff-control ff-textarea" rows="5" maxlength="200" placeholder="${t('notesPlaceholder')}" data-wave1-field="profile.notes">${C.esc(profile.notes)}</textarea><div class="ff-character-count">${C.esc(profile.notes.length)} / 200</div></div>`;
    }
    const nextLabel = step === 3 ? t('finishProfile') : t('next');
    const form = `<div class="ff-form-heading ff-onboarding-title"><span class="ff-eyebrow">${t('step')} ${step} / 3</span><p class="ff-onboarding-subtitle">${t('foodProfileSubtitle')}</p></div><div class="ff-profile-progress" aria-label="${t('step')} ${step} / 3"><span class="is-complete"></span><span class="${step >= 2 ? 'is-complete' : ''}"></span><span class="${step >= 3 ? 'is-complete' : ''}"></span></div><form class="ff-form ff-profile-form" data-wave1-form="food-profile" novalidate>${stepContent}<button type="submit" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" ${W.isLoading('food-profile') ? 'disabled aria-busy="true"' : ''}>${W.isLoading('food-profile') ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${nextLabel}</span>${C.icon('arrowRight', 18)}`}</button></form>`;
    const aside = `<aside class="ff-onboarding-aside ff-auth-aside-custard"><span class="ff-eyebrow">${step === 1 ? 'SAFETY FIRST' : step === 2 ? 'MAKE SPACE FOR EVERYONE' : 'A LITTLE CONTEXT'}</span><h2>${step === 1 ? 'Good food starts with feeling safe.' : step === 2 ? 'Different tastes belong at one table.' : 'Small details help the group choose well.'}</h2><p>${step === 1 ? 'Your profile is a quiet guardrail for every future FoodFight.' : step === 2 ? 'Choose what matters to you. The prototype keeps the group conversation clear.' : 'Optional notes stay human and useful — never a test you need to pass.'}</p>${C.media(step === 1 ? 'food' : 'home', 'placeholder')}<div class="ff-auth-aside-note">${C.icon('lock', 14)} ${t('localOnly')}</div></aside>`;
    return authPage(`<div class="ff-onboarding-layout"><section class="ff-form-panel">${form}</section>${aside}</div>`, { backHref, backAction, title: rawText('foodProfileTitle'), className: 'ff-auth-wide' });
  }

  function renderHomeCurrentRoom(room) {
    if (!room) {
      return `<article class="ff-current-card ff-current-empty"><div class="ff-current-icon">${C.icon('sparkles', 23)}</div><div><span class="ff-eyebrow">${t('currentFoodFight')}</span><h3>${t('noCurrentRoom')}</h3><p>${t('noCurrentRoomBody')}</p></div><a href="#/room/create" class="ff-text-button">${t('createRoom')} ${C.icon('arrowRight', 14)}</a></article>`;
    }
    const readyCount = (room.members || []).filter((member) => member.ready).length;
    return `<article class="ff-current-card"><div class="ff-current-card-top"><div class="ff-current-icon">${C.icon('utensils', 23)}</div><div><span class="ff-eyebrow">${t('currentFoodFight')}</span><h3>${C.esc(room.name)}</h3><p>${C.esc(room.location)} · ${t('within')} ${C.esc(room.radius)} km</p></div>${C.badge(readyCount === room.members.length ? rawText('allReady') : rawText('waiting'), readyCount === room.members.length ? 'success' : 'warning', readyCount === room.members.length ? 'check' : 'clock')}</div><div class="ff-current-card-footer"><span>${C.avatarGroup(room.members, 5)}<small>${C.esc(room.members.length)} ${t('members')}</small></span><a href="#/room/lobby" class="ff-btn ff-btn-brand ff-btn-sm">${t('openLobby')}${C.icon('arrowRight', 15)}</a></div></article>`;
  }

  function renderHome() {
    const s = state();
    const user = s.user;
    const recent = W.recentFoodFights;
    const content = `<section class="ff-home-hero"><div class="ff-home-copy"><span class="ff-eyebrow">${t('homeGreeting', { name: user.name })}</span><h1>${t('homeHeadline')}</h1><p>${t('homeBody')}</p><div class="ff-home-actions"><a href="#/room/create" class="ff-action-card ff-action-card-petal"><span class="ff-action-icon">${C.icon('plus', 21)}</span><span><strong>${t('createRoom')}</strong><small>${t('createRoomBody')}</small></span>${C.icon('arrowRight', 18)}</a><a href="#/room/join" class="ff-action-card ff-action-card-apricot"><span class="ff-action-icon">${C.icon('users', 21)}</span><span><strong>${t('joinRoom')}</strong><small>${t('joinRoomBody')}</small></span>${C.icon('arrowRight', 18)}</a></div></div><div class="ff-home-visual">${C.media('home', 'placeholder', { overlay: true })}<div class="ff-carousel-indicator"><i class="is-active"></i><i></i><i></i><span>01 / 03</span></div></div></section><section class="ff-home-current"><div class="ff-section-heading"><div><span class="ff-eyebrow">THE TABLE RIGHT NOW</span><h2>${t('currentFoodFight')}</h2></div>${s.currentRoom ? `<a href="#/room/lobby" class="ff-text-button">${t('openLobby')} ${C.icon('arrowRight', 14)}</a>` : ''}</div>${renderHomeCurrentRoom(s.currentRoom)}</section><section class="ff-home-recent"><div class="ff-section-heading"><div><span class="ff-eyebrow">A LITTLE HISTORY</span><h2>${t('recentFoodFights')}</h2></div><a href="#/history" class="ff-text-button">${t('viewAll')} ${C.icon('arrowRight', 14)}</a></div><div class="ff-recent-grid">${recent.map((item) => `<a href="#/history" class="ff-recent-card ff-recent-card-${item.tone}">${C.media('recent', 'placeholder', { className: 'ff-recent-media' })}<div class="ff-recent-copy"><strong>${C.esc(item.name)}</strong><span>${C.esc(item.meta)}</span></div></a>`).join('')}</div></section><div class="ff-home-footer-note">${C.icon('sparkles', 15)} ${t('profileReady')} · ${t('localOnly')}</div>`;
    return productPage(content, 'home', 'ff-home-page');
  }

  function tonalFormSection(tone, eyebrow, label, helper, control, error) {
    return `<section class="ff-tonal-form ff-tonal-form-${tone}"><div class="ff-tonal-form-heading">${C.iconWell(tone, 'md', tone === 'petal' ? 'edit' : tone === 'apricot' ? 'users' : tone === 'custard' ? 'mapPin' : 'calendar')}<div><span class="ff-eyebrow">${eyebrow}</span><h2>${label}</h2></div></div>${helper ? `<p>${helper}</p>` : ''}${control}${error ? `<p class="ff-validation ff-validation-error" role="alert">${C.icon('info', 14)}<span>${C.esc(error)}</span></p>` : ''}</section>`;
  }

  function renderCreateRoom() {
    const s = state();
    const draft = s.roomDraft;
    const errors = s.ui.formErrors || {};
    const busy = W.isLoading('create-room');
    const form = `<div class="ff-room-form-heading"><span class="ff-eyebrow">ROOM SETUP · HOST</span><h1>${t('createRoomTitle')}</h1><p>${t('createRoomSubtitle')}</p></div><form class="ff-room-form" data-wave1-form="create-room" novalidate>${tonalFormSection('petal', 'PETAL', t('roomName'), t('roomNameHelp'), inputControl('wave1-room-name', 'text', draft.name, 'Friday FoodFight', { field: 'room.name', maxLength: 30, required: true, autocomplete: 'off' }), errors.name)}${tonalFormSection('apricot', 'APRICOT', t('maxMembers'), t('maxMembersHelp'), C.stepper('create-max-members', draft.maxMembers, 2, 15, busy), errors.maxMembers)}${tonalFormSection('custard', 'CUSTARD', t('location'), t('locationHelp'), `<div class="ff-control-with-action">${inputControl('wave1-room-location', 'text', draft.location, 'Siam Square', { field: 'room.location', required: true, autocomplete: 'off' })}<button type="button" class="ff-inline-action" data-wave1-action="use-location">${C.icon('mapPin', 15)}<span>${t('useLocation')}</span></button></div>`, errors.location)}${tonalFormSection('petal', 'PETAL', t('radius'), t('radiusHelp'), `<div class="ff-option-row" role="group" aria-label="${t('radius')}">${[1, 3, 5, 10].map((radius) => `<button type="button" class="ff-option ${Number(draft.radius) === radius ? 'is-selected' : ''}" data-wave1-action="set-radius" data-wave1-value="${radius}" aria-pressed="${Number(draft.radius) === radius}">${radius} km</button>`).join('')}</div>`, errors.radius)}${tonalFormSection('apricot', 'APRICOT', t('dateTime'), t('dateTimeHelp'), `<div class="ff-date-time-grid"><label class="ff-field"><span class="ff-label">Date</span><input class="ff-control" type="date" value="${C.esc(draft.date)}" data-wave1-field="room.date" /></label><label class="ff-field"><span class="ff-label">Time</span><input class="ff-control" type="time" value="${C.esc(draft.time)}" data-wave1-field="room.time" /></label></div>`, errors.date || errors.time)}<div class="ff-info-strip">${C.icon('sparkles', 17)}<span>${t('landingBody')}</span></div><button type="submit" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" ${busy ? 'disabled aria-busy="true"' : ''}>${busy ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${t('createAndPreview')}</span>${C.icon('arrowRight', 18)}`}</button></form>`;
    const aside = `<aside class="ff-room-aside ff-tonal-panel-apricot"><span class="ff-eyebrow">ROOM / SOCIAL VISUAL</span><h2>Invite the table.</h2><p>Leave room for the image that makes this group feel like yours.</p>${C.media('create', 'placeholder', { overlay: true })}<div class="ff-room-aside-meta"><span>4:3</span><span>1200 × 900</span><span>OWNER IMAGE LATER</span></div></aside>`;
    return productPage(`<div class="ff-room-page-heading"><a class="ff-back-link" href="#/home">${C.icon('arrowLeft', 17)}<span>${t('back')}</span></a></div><div class="ff-room-layout"><section class="ff-room-form-panel">${form}</section>${aside}</div>`, 'home', 'ff-room-page');
  }

  function renderJoinRoom() {
    const s = state();
    const errors = s.ui.formErrors || {};
    const busy = W.isLoading('join-room');
    const code = s.roomDraft.joinCode || '';
    const form = `<div class="ff-room-form-heading"><span class="ff-eyebrow">ROOM ENTRY · MEMBER</span><h1>${t('joinTitle')}</h1><p>${t('joinSubtitle')}</p></div><form class="ff-join-form" data-wave1-form="join-room" novalidate><div class="ff-code-well">${C.iconWell('petal', 'lg', 'users')}<span class="ff-eyebrow">${t('roomCode')}</span><input id="wave1-room-code" class="ff-code-input ${errors.code ? 'is-error' : ''}" value="${C.esc(code)}" placeholder="FF-4827" maxlength="6" autocomplete="off" inputmode="text" data-wave1-field="room.joinCode" aria-describedby="wave1-room-code-hint" /><p id="wave1-room-code-hint">${t('roomCodeHint')}</p></div>${errors.code ? `<p class="ff-validation ff-validation-error" role="alert">${C.icon('info', 14)}<span>${C.esc(errors.code)}</span></p>` : ''}<button type="submit" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" ${busy ? 'disabled aria-busy="true"' : ''}>${busy ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${t('loading')}</span>` : `<span>${t('findRoom')}</span>${C.icon('arrowRight', 18)}`}</button><button type="button" class="ff-text-button ff-demo-room-button" data-wave1-action="fill-demo-room">${C.icon('sparkles', 15)} ${t('roomCodeHint')}</button></form>`;
    const aside = `<aside class="ff-room-aside ff-tonal-panel-petal"><span class="ff-eyebrow">JOIN ROOM SOCIAL</span><h2>Your people are already choosing.</h2><p>One short code takes you to the same shared table.</p>${C.media('join', 'placeholder', { overlay: true })}<div class="ff-room-aside-meta"><span>4:3</span><span>1200 × 900</span><span>OWNER IMAGE LATER</span></div></aside>`;
    return productPage(`<div class="ff-room-page-heading"><a class="ff-back-link" href="#/home">${C.icon('arrowLeft', 17)}<span>${t('back')}</span></a></div><div class="ff-room-layout"><section class="ff-room-form-panel">${form}</section>${aside}</div>`, 'home', 'ff-room-page');
  }

  function renderRoomPreview() {
    const s = state();
    const room = s.currentRoom || W.buildRoom(s.roomDraft.source === 'join' ? 'member' : 'host', s.roomDraft);
    const isJoin = s.roomDraft.source === 'join' || room.role === 'member';
    const activeCount = room.members?.length || 0;
    const confirmLabel = isJoin ? rawText('confirmJoin') : rawText('confirmCreate');
    const content = `<div class="ff-room-page-heading"><a class="ff-back-link" href="${s.ui.returnRoute || '#/home'}">${C.icon('arrowLeft', 17)}<span>${t('back')}</span></a></div><div class="ff-preview-layout"><section class="ff-preview-copy"><div class="ff-preview-status">${C.status(rawText('roomFound'), 'success', 'check')}</div><span class="ff-eyebrow">ROOM PREVIEW</span><h1>${C.esc(room.name)}</h1><p>${t('previewSubtitle')}</p><div class="ff-preview-facts"><div>${C.icon('crown', 17)}<span><small>${t('hostedBy')}</small><strong>${C.esc(room.host)}</strong></span></div><div>${C.icon('users', 17)}<span><small>${t('members')}</small><strong>${C.esc(activeCount)} / ${C.esc(room.maxMembers)}</strong></span></div><div>${C.icon('mapPin', 17)}<span><small>${t('location')}</small><strong>${C.esc(room.location)}</strong><em>${t('within')} ${C.esc(room.radius)} km</em></span></div><div>${C.icon('calendar', 17)}<span><small>${t('dateTime')}</small><strong>${C.esc(room.date)} · ${C.esc(room.time)}</strong></span></div></div><div class="ff-preview-actions">${C.button(confirmLabel, 'brand', 'hero', { action: 'confirm-preview', icon: 'arrowRight', iconRight: true })}<a href="${s.ui.returnRoute || '#/home'}" class="ff-btn ff-btn-ghost ff-btn-lg ff-btn-block">${t('editDetails')}</a></div></section><aside class="ff-preview-visual">${C.media('lobby', 'placeholder', { overlay: true })}<div class="ff-preview-code"><span>${t('roomCode')}</span><strong>${C.esc(room.code)}</strong><button type="button" class="ff-text-button" data-wave1-action="open-share">${t('share')} ${C.icon('send', 14)}</button></div></aside></div>`;
    return productPage(content, 'home', 'ff-room-page ff-preview-page');
  }

  function renderLobbyMembers(room) {
    const members = room.members || [];
    return `<div class="ff-member-list">${members.map((member) => `<div class="ff-member-row"><div class="ff-member-identity">${C.avatar(member, 'md')}<div><strong>${C.esc(member.name)}</strong><span>${member.role === 'Host' ? `${C.icon('crown', 13)} ${t('host')}` : t('member')}</span></div></div><div class="ff-member-state">${C.status(member.ready ? rawText('ready') : rawText('notReady'), member.ready ? 'success' : 'warning', member.ready ? 'check' : 'clock')}</div></div>`).join('')}</div>`;
  }

  function renderLobby() {
    const s = state();
    const room = s.currentRoom || W.buildRoom(s.ui.lobbyScenario === 'member-waiting' ? 'member' : 'host', s.roomDraft);
    const members = room.members || [];
    const allReady = members.length > 0 && members.every((member) => member.ready);
    const isHost = room.role === 'host';
    const userMember = members.find((member) => member.id === 'pure') || members[0];
    const scenarioButtons = [['host-waiting', rawText('hostWaiting')], ['host-all-ready', rawText('hostAllReady')], ['member-waiting', rawText('memberWaiting')], ['room-full', rawText('roomFull')]];
    const content = `<div class="ff-lobby-heading"><div><span class="ff-eyebrow">${t('lobbyTitle')}</span><h1>${C.esc(room.name)}</h1><p>${t('lobbySubtitle')}</p></div><div class="ff-lobby-role">${C.badge(isHost ? rawText('host') : rawText('member'), isHost ? 'custard' : 'petal', isHost ? 'crown' : 'user')}</div></div><div class="ff-lobby-layout"><section class="ff-lobby-main"><div class="ff-lobby-identity-card"><div class="ff-lobby-image">${C.media('lobby', 'placeholder', { overlay: true })}</div><div class="ff-lobby-identity-copy"><span class="ff-eyebrow">ROOM IDENTITY</span><h2>${C.esc(room.name)}</h2><dl><div><dt>${t('hostedBy')}</dt><dd>${C.esc(room.host)}</dd></div><div><dt>${t('members')}</dt><dd>${C.esc(members.length)} / ${C.esc(room.maxMembers)}</dd></div><div><dt>${t('location')}</dt><dd>${C.esc(room.location)} · ${t('within')} ${C.esc(room.radius)} km</dd></div></dl></div></div><div class="ff-invite-card"><div class="ff-invite-copy"><span class="ff-eyebrow">${t('inviteFriends')}</span><h2>${t('inviteFriends')}</h2><p>${t('inviteBody')}</p></div><div class="ff-room-code-display"><span>${t('roomCode')}</span><strong>${C.esc(room.code)}</strong></div><div class="ff-invite-actions">${C.button(t('share'), 'brand', 'md', { action: 'open-share', icon: 'send' })}${C.button(t('qr'), 'outline', 'md', { action: 'open-qr', icon: 'image' })}</div></div></section><aside class="ff-lobby-side"><section class="ff-members-card"><div class="ff-card-heading"><div><span class="ff-eyebrow">${t('memberList')}</span><h2>${C.esc(members.length)} / ${C.esc(room.maxMembers)}</h2></div>${C.status(allReady ? rawText('allReady') : rawText('waiting'), allReady ? 'success' : 'warning', allReady ? 'check' : 'clock')}</div>${renderLobbyMembers(room)}<div class="ff-scenario-panel"><div><span class="ff-eyebrow">${t('roomScenarios')}</span><p>${t('localOnly')}</p></div><div class="ff-scenario-buttons">${scenarioButtons.map(([id, label]) => `<button type="button" class="${s.ui.lobbyScenario === id ? 'is-active' : ''}" data-wave1-action="set-lobby-scenario" data-wave1-value="${id}">${C.esc(label)}</button>`).join('')}</div></div></section><section class="ff-ready-card ${allReady ? 'is-all-ready' : ''}"><div class="ff-ready-icon">${C.icon(allReady ? 'check' : 'clock', 23)}</div><div><span class="ff-eyebrow">${allReady ? t('allMembersReady') : t('waitingForReady')}</span><p>${isHost ? t('simulateAllReady') : t('toggleReady')}</p></div>${isHost ? C.button(rawText('simulateAllReady'), allReady ? 'secondary' : 'brand', 'sm', { action: 'simulate-all-ready', icon: 'check' }) : C.button(userMember?.ready ? rawText('ready') : rawText('notReady'), userMember?.ready ? 'secondary' : 'brand', 'sm', { action: 'toggle-ready', icon: userMember?.ready ? 'check' : 'clock' })}</section>${isHost ? `<button type="button" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block ff-start-button" data-wave1-action="start-foodfight" ${allReady ? '' : 'disabled'}>${C.icon('sparkles', 19)}<span>${t('startFoodFight')}</span>${C.icon('arrowRight', 18)}</button><p class="ff-start-hint">${allReady ? t('allMembersReady') : t('waitingForReady')}</p>` : `<p class="ff-member-lobby-note">${C.icon('lock', 15)} ${t('waitingForReady')}</p>`}</aside></div>`;
    return productPage(content, 'home', 'ff-lobby-page');
  }

  function renderWave2Boundary() {
    const s = state();
    const content = `<div class="ff-boundary-layout"><section class="ff-boundary-card"><span class="ff-candidate-ribbon">${t('prototypeOnly')}</span><div class="ff-boundary-icon">${C.icon('sparkles', 28)}</div><span class="ff-eyebrow">${t('nextWave')}</span><h1>${t('mealPreference')}</h1><p>${t('nextWaveBody')}</p><div class="ff-boundary-actions"><a href="#/room/lobby" class="ff-btn ff-btn-brand ff-btn-lg">${t('back')} ${C.icon('arrowLeft', 17)}</a><a href="#/ux-lab" class="ff-btn ff-btn-ghost ff-btn-lg">${t('openUxLab')}</a></div></section><aside class="ff-boundary-visual">${C.media('home', 'placeholder', { overlay: true })}<span>WAVE 02 · FOOD DECISION</span></aside></div>`;
    return productPage(content, 'home', 'ff-boundary-page');
  }

  function renderWave1Overlay() {
    const s = state();
    const overlay = s.ui.overlay;
    if (!overlay) return '';
    const room = s.currentRoom || W.buildRoom('host', s.roomDraft);
    if (overlay === 'share') {
      return `<div class="ff-overlay-layer" data-wave1-action="close-overlay" role="presentation"><div class="ff-overlay-surface" data-wave1-stop role="dialog" aria-modal="true" aria-labelledby="wave1-share-title"><button type="button" class="ff-icon-button ff-overlay-close" data-wave1-action="close-overlay" aria-label="${t('close')}">${C.icon('close', 18)}</button><span class="ff-eyebrow">${t('inviteFriends')}</span><h2 id="wave1-share-title">${t('shareRoom')}</h2><p>${t('shareBody')}</p><div class="ff-overlay-code"><span>${t('roomCode')}</span><strong>${C.esc(room.code)}</strong></div><div class="ff-overlay-actions">${C.button(t('copy'), 'brand', 'md', { action: 'copy-room-code', icon: 'copy' })}${C.button(t('close'), 'ghost', 'md', { action: 'close-overlay' })}</div></div></div>`;
    }
    return `<div class="ff-overlay-layer" data-wave1-action="close-overlay" role="presentation"><div class="ff-overlay-surface ff-qr-overlay" data-wave1-stop role="dialog" aria-modal="true" aria-labelledby="wave1-qr-title"><button type="button" class="ff-icon-button ff-overlay-close" data-wave1-action="close-overlay" aria-label="${t('close')}">${C.icon('close', 18)}</button><span class="ff-eyebrow">${t('qr')}</span><h2 id="wave1-qr-title">${t('qrTitle')}</h2><p>${t('qrBody')}</p><div class="ff-qr-placeholder"><span></span><span></span><span></span><i>QR</i></div><strong class="ff-qr-label">${t('prototypeQr')}</strong><div class="ff-overlay-actions">${C.button(t('close'), 'brand', 'md', { action: 'close-overlay' })}</div></div></div>`;
  }

  function setFormErrors(errors) {
    state().ui.formErrors = errors || {};
    W.refresh();
  }

  function handleRegisterSubmit() {
    const s = state();
    const auth = s.auth;
    const errors = {};
    if (!String(auth.name || '').trim()) errors.name = rawText('required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(auth.email || '').trim())) errors.email = rawText('invalidEmail');
    if (String(auth.password || '').length < 8) errors.password = rawText('passwordShort');
    if (auth.password !== auth.confirmPassword) errors.confirmPassword = rawText('passwordMismatch');
    if (!auth.terms) errors.terms = rawText('termsRequired');
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    auth.pendingEmail = auth.email.trim();
    auth.registered = true;
    s.user.name = auth.name.trim();
    s.user.email = auth.email.trim();
    s.user.initials = initials(s.user.name);
    W.runLoading('register', () => W.navigate('#/verify-email', '#/register'), 620);
  }

  function handleLoginSubmit() {
    const s = state();
    const errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s.auth.email || '').trim())) errors.email = rawText('invalidEmail');
    if (!String(s.auth.password || '').trim()) errors.password = rawText('required');
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    s.auth.isAuthenticated = true;
    s.auth.registered = true;
    s.auth.verified = true;
    s.foodProfile.completed = true;
    if (!s.user.name) s.user.name = 'Pure';
    W.runLoading('login', () => W.navigate('#/home'), 560);
  }

  function handleVerifySubmit() {
    const s = state();
    const otp = (s.auth.otp || []).join('');
    if (otp !== '123456') {
      setFormErrors({ otp: rawText('wrongOtp') });
      return;
    }
    s.auth.verified = true;
    setFormErrors({});
    W.runLoading('verify', () => W.navigate('#/food-profile', '#/verify-email'), 520);
  }

  function handleForgotSubmit() {
    const s = state();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s.auth.forgotEmail || '').trim())) {
      setFormErrors({ email: rawText('invalidEmail') });
      return;
    }
    setFormErrors({});
    W.runLoading('forgot', () => {
      s.auth.forgotSent = true;
      W.refresh();
    }, 480);
  }

  function handleResetSubmit() {
    const s = state();
    const errors = {};
    if (String(s.auth.resetPassword || '').length < 8) errors.password = rawText('passwordShort');
    if (s.auth.resetPassword !== s.auth.resetConfirm) errors.confirmPassword = rawText('passwordMismatch');
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    W.runLoading('reset', () => {
      s.auth.resetComplete = true;
      W.refresh();
    }, 520);
  }

  function handleFoodProfileSubmit() {
    const s = state();
    const profile = s.foodProfile;
    if (profile.step === 1 && !profile.noAllergies && profile.allergies.length === 0) {
      setFormErrors({ profile: rawText('profileRequired') });
      return;
    }
    if (profile.step === 2 && !profile.noRestrictions && profile.restrictions.length === 0) {
      setFormErrors({ profile: rawText('profileRequired') });
      return;
    }
    setFormErrors({});
    if (profile.step < 3) {
      profile.step += 1;
      W.refresh();
      return;
    }
    W.runLoading('food-profile', () => {
      profile.completed = true;
      s.auth.isAuthenticated = true;
      W.navigate('#/home');
    }, 560);
  }

  function handleCreateRoomSubmit() {
    const s = state();
    const draft = s.roomDraft;
    const errors = {};
    if (!String(draft.name || '').trim()) errors.name = rawText('roomNameRequired');
    if (!String(draft.location || '').trim()) errors.location = rawText('locationRequired');
    if (!draft.date) errors.date = rawText('required');
    if (!draft.time) errors.time = rawText('required');
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    draft.source = 'create';
    W.setCurrentRoom(W.buildRoom('host', draft));
    W.runLoading('create-room', () => W.navigate('#/room/preview', '#/room/create'), 620);
  }

  function handleJoinRoomSubmit() {
    const s = state();
    const code = String(s.roomDraft.joinCode || '').trim().toUpperCase();
    if (code !== 'FF-4827') {
      setFormErrors({ code: rawText('roomCodeInvalid') });
      return;
    }
    setFormErrors({});
    s.roomDraft.joinCode = code;
    s.roomDraft.source = 'join';
    W.setCurrentRoom(W.buildRoom('member', s.roomDraft));
    W.runLoading('join-room', () => W.navigate('#/room/preview', '#/room/join'), 620);
  }

  function updateField(field, target) {
    if (!field || !target) return;
    const [scope, key] = field.split('.');
    const nextValue = target.type === 'checkbox' ? target.checked : target.value;
    const s = state();
    if (scope === 'auth') s.auth[key] = nextValue;
    if (scope === 'profile') s.foodProfile[key] = nextValue;
    if (scope === 'room') s.roomDraft[key] = target.type === 'number' ? Number(nextValue) : nextValue;
  }

  function changePasswordVisibility(target, confirm) {
    const wrap = target.closest('.ff-control-wrap');
    const input = wrap?.querySelector('input');
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    target.setAttribute('aria-label', input.type === 'password' ? rawText('showPassword') : rawText('hidePassword'));
  }

  function copyRoomCode() {
    const code = (state().currentRoom || W.buildRoom('host', state().roomDraft)).code;
    const showCopied = () => {
      W.setNotice(rawText('roomCodeCopied'), 'success');
      state().ui.overlay = '';
      W.refresh();
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(showCopied).catch(showCopied);
    } else {
      showCopied();
    }
  }

  function handleWave1Action(target) {
    const action = target.getAttribute('data-wave1-action');
    const item = target.getAttribute('data-wave1-value') || '';
    const targetId = target.getAttribute('data-wave1-target') || '';
    const s = state();

    if (action === 'toggle-utility') {
      W.toggleUtility();
      return;
    }
    if (action === 'set-language') {
      W.setLanguage(item);
      return;
    }
    if (action === 'set-motion') {
      s.ui.motion = item === 'reduced' ? 'reduced' : 'on';
      W.refresh();
      return;
    }
    if (action === 'set-scenario') {
      W.applyScenario(item);
      return;
    }
    if (action === 'reset-demo') {
      W.resetDemo();
      return;
    }
    if (action === 'toggle-notifications') {
      W.toggleNotifications();
      return;
    }
    if (action === 'toggle-account') {
      W.toggleAccount();
      return;
    }
    if (action === 'close-panels') {
      s.ui.accountOpen = false;
      s.ui.notificationOpen = false;
      W.refresh();
      return;
    }
    if (action === 'enter-demo') {
      s.auth.isAuthenticated = true;
      s.auth.registered = true;
      s.auth.verified = true;
      s.foodProfile.completed = true;
      s.ui.scenario = 'existing-user';
      W.setCurrentRoom(W.buildRoom('host', s.roomDraft));
      W.navigate('#/home');
      return;
    }
    if (action === 'social-candidate') {
      W.setNotice('Social sign-in is a visual candidate only in this prototype.', 'info');
      W.refresh();
      return;
    }
    if (action === 'toggle-password' || action === 'toggle-confirm-password') {
      changePasswordVisibility(target, action === 'toggle-confirm-password');
      return;
    }
    if (action === 'fill-demo-otp') {
      s.auth.otp = ['1', '2', '3', '4', '5', '6'];
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'resend-otp') {
      W.runLoading('resend', () => {
        W.setNotice(rawText('resendDone'), 'success');
        W.refresh();
      }, 560);
      return;
    }
    if (action === 'to-reset') {
      W.navigate('#/reset-password', '#/forgot-password');
      return;
    }
    if (action === 'back-food-profile') {
      s.foodProfile.step = Math.max(1, Number(s.foodProfile.step || 1) - 1);
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'toggle-profile-option') {
      const list = item ? (targetId === 'allergy' ? s.foodProfile.allergies : s.foodProfile.restrictions) : [];
      const index = list.indexOf(item);
      if (index >= 0) list.splice(index, 1);
      else list.push(item);
      if (targetId === 'allergy') s.foodProfile.noAllergies = false;
      else s.foodProfile.noRestrictions = false;
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'toggle-profile-none') {
      if (item === 'allergy') {
        s.foodProfile.noAllergies = !s.foodProfile.noAllergies;
        if (s.foodProfile.noAllergies) s.foodProfile.allergies = [];
      } else {
        s.foodProfile.noRestrictions = !s.foodProfile.noRestrictions;
        if (s.foodProfile.noRestrictions) s.foodProfile.restrictions = [];
      }
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'use-location') {
      s.roomDraft.location = 'Sukhumvit, Bangkok';
      s.ui.formErrors.location = '';
      W.setNotice('Prototype location selected locally.', 'success');
      W.refresh();
      return;
    }
    if (action === 'set-radius') {
      s.roomDraft.radius = Number(item);
      W.refresh();
      return;
    }
    if (action === 'fill-demo-room') {
      s.roomDraft.joinCode = 'FF-4827';
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'stepper') {
      const current = Number(s.roomDraft.maxMembers || 6);
      s.roomDraft.maxMembers = Math.max(2, Math.min(15, current + Number(item || 0)));
      W.refresh();
      return;
    }
    if (action === 'confirm-preview') {
      if (!s.currentRoom) W.setCurrentRoom(W.buildRoom(s.roomDraft.source === 'join' ? 'member' : 'host', s.roomDraft));
      W.navigate('#/room/lobby', '#/room/preview');
      return;
    }
    if (action === 'set-lobby-scenario') {
      W.applyLobbyScenario(item);
      return;
    }
    if (action === 'simulate-all-ready') {
      W.simulateAllReady();
      return;
    }
    if (action === 'toggle-ready') {
      W.toggleReady();
      return;
    }
    if (action === 'open-share') {
      s.ui.overlay = 'share';
      W.refresh();
      return;
    }
    if (action === 'open-qr') {
      s.ui.overlay = 'qr';
      W.refresh();
      return;
    }
    if (action === 'copy-room-code') {
      copyRoomCode();
      return;
    }
    if (action === 'close-overlay') {
      s.ui.overlay = '';
      W.refresh();
      return;
    }
    if (action === 'start-foodfight') {
      if (s.currentRoom?.role !== 'host' || !s.currentRoom.members.every((member) => member.ready)) return;
      W.navigate('#/meal-preference', '#/room/lobby');
    }
  }

  function bindWave1Events() {
    const root = document.querySelector('.ff-wave1-root');
    if (!root) return;

    if (!document.__foodfighterWave1EscapeBound) {
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !document.body.classList.contains('wave1-active')) return;
        const current = state();
        if (current.ui.overlay || current.ui.utilityOpen || current.ui.accountOpen || current.ui.notificationOpen) {
          current.ui.overlay = '';
          current.ui.utilityOpen = false;
          current.ui.accountOpen = false;
          current.ui.notificationOpen = false;
          W.refresh();
        }
      });
      document.__foodfighterWave1EscapeBound = true;
    }

    root.addEventListener('click', (event) => {
      const target = event.target.closest('[data-wave1-action]');
      if (target) {
        event.preventDefault();
        handleWave1Action(target);
        return;
      }
      if (event.target.classList.contains('ff-overlay-layer')) {
        state().ui.overlay = '';
        W.refresh();
      }
    });

    root.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
      const field = target.getAttribute('data-wave1-field');
      if (field) updateField(field, target);
      const otpIndex = target.getAttribute('data-wave1-otp');
      if (otpIndex !== null) {
        const digit = target.value.replace(/\D/g, '').slice(-1);
        state().auth.otp = state().auth.otp || ['', '', '', '', '', ''];
        state().auth.otp[Number(otpIndex)] = digit;
        target.value = digit;
        if (digit && Number(otpIndex) < 5) root.querySelector(`#wave1-otp-${Number(otpIndex) + 1}`)?.focus();
      }
    });

    root.addEventListener('change', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
        const field = target.getAttribute('data-wave1-field');
        if (field) updateField(field, target);
      }
    });

    root.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      const formId = form.getAttribute('data-wave1-form');
      if (formId === 'register') handleRegisterSubmit();
      if (formId === 'login') handleLoginSubmit();
      if (formId === 'verify') handleVerifySubmit();
      if (formId === 'forgot') handleForgotSubmit();
      if (formId === 'reset') handleResetSubmit();
      if (formId === 'food-profile') handleFoodProfileSubmit();
      if (formId === 'create-room') handleCreateRoomSubmit();
      if (formId === 'join-room') handleJoinRoomSubmit();
    });
  }

  function renderWave1Route(hash) {
    switch (hash) {
      case '#/landing': return renderLanding();
      case '#/login': return renderLogin();
      case '#/register': return renderRegister();
      case '#/verify-email': return renderVerifyEmail();
      case '#/forgot-password': return renderForgotPassword();
      case '#/reset-password': return renderResetPassword();
      case '#/food-profile': return renderFoodProfile();
      case '#/home': return renderHome();
      case '#/room/create': return renderCreateRoom();
      case '#/room/join': return renderJoinRoom();
      case '#/room/preview': return renderRoomPreview();
      case '#/room/lobby': return renderLobby();
      case '#/meal-preference': return renderWave2Boundary();
      default: return renderLanding();
    }
  }

  P.renderWave1Route = renderWave1Route;
  P.bindWave1Events = bindWave1Events;
})();
