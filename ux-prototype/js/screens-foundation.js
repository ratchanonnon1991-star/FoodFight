/**
 * FoodFighter UX Prototype — Foundation Screens (V1)
 * 
 * Implements:
 *   - Login, Register, Verify Email OTP, Forgot Password
 *   - Food Profile Onboarding (Allergies, Restrictions, Details)
 *   - Home Dashboard
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Authentication Screens
     ========================================================================== */

  /** Screen: Login */
  function renderLogin() {
    const state = P.getState();
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="login-title">
        <div class="page-shell">
          <div style="display:flex;justify-content:flex-end;margin-bottom:0.5rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>

          <header class="brand-hero">
            <div class="brand-badge-logo" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <h1 class="brand-title">FoodFighter</h1>
            <p class="brand-tagline">${t('common.appTagline')}</p>
          </header>

          <section class="screen-header">
            <h2 id="login-title" class="font-heading-1">${t('auth.login.title')}</h2>
            <p class="screen-subtitle">${t('auth.login.subtitle')}</p>
          </section>

          <div id="login-alert-area"></div>

          <form id="login-form" novalidate>
            <div class="form-group">
              <label for="login-email" class="form-label form-label-required">${t('auth.login.email')}</label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="login-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="user@example.com" 
                  value="${P.escapeHtml(state.auth.user.email)}"
                  autocomplete="email" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <div class="form-label">
                <label for="login-password" class="form-label-required" style="margin-bottom:0;">${t('auth.login.password')}</label>
                <a href="#/forgot-password" class="text-secondary" style="font-size:0.775rem;font-weight:600;">${t('auth.login.forgotPassword')}</a>
              </div>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="login-password" 
                  name="password" 
                  class="form-input form-input-password" 
                  placeholder="Password123" 
                  value="Password123"
                  autocomplete="current-password" 
                  required 
                />
                <button type="button" id="btn-toggle-login-pwd" class="btn-password-toggle" aria-label="Toggle password visibility">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" id="btn-login-submit" class="btn btn-primary btn-lg" style="margin-top:0.5rem;">
              <span id="login-submit-text">${t('auth.login.submit')}</span>
            </button>
          </form>

          <div class="divider-text">${t('auth.login.orSocial')}</div>

          <div style="display:flex;flex-direction:column;gap:0.65rem;">
            <button type="button" id="btn-login-google" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>
            <button type="button" id="btn-login-line" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#00C300" d="M24 10.3c0-4.6-4.9-8.3-10.9-8.3S2.2 5.7 2.2 10.3c0 4.1 3.7 7.6 8.7 8.2.3.1.8.2.9.6.1.3.1.8 0 1.2l-.3 1.7c-.1.5-.4 1.8 1.6 1 2-1 10.9-6.4 10.9-12.7z"/>
                <path fill="#FFFFFF" d="M9.8 13.5H7.7c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5zm2.7-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm4.4 0c0 .2-.1.4-.3.5-.1.1-.3.1-.4.1-.1 0-.3-.1-.4-.2l-2.1-2.9v2.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.2.1-.4.3-.5.2-.1.4-.1.6 0l2.1 2.9V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm3.5-3.2h-1.6v1.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1.1h1.6c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
              </svg>
              <span>LINE</span>
            </button>
          </div>

          <footer style="margin-top:auto;padding-top:1.5rem;text-align:center;">
            <p class="font-body-small text-secondary">
              ${t('auth.login.noAccount')} 
              <a href="#/register" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">${t('auth.login.register')}</a>
            </p>
          </footer>
        </div>
      </main>
    `;
  }

  function bindLoginEvents() {
    const form = document.getElementById('login-form');
    const pwdInput = document.getElementById('login-password');
    const toggleBtn = document.getElementById('btn-toggle-login-pwd');
    const alertArea = document.getElementById('login-alert-area');
    const googleBtn = document.getElementById('btn-login-google');
    const lineBtn = document.getElementById('btn-login-line');

    if (toggleBtn && pwdInput) {
      toggleBtn.onclick = () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
      };
    }

    const handleSocialAuth = (provider) => {
      const state = P.getState();
      state.auth.isAuthenticated = true;
      state.auth.user.name = provider === 'Google' ? 'Alex Google' : 'Alex LINE';
      state.auth.user.email = provider === 'Google' ? 'alex.g@gmail.com' : 'alex.line@line.me';
      P.saveState();
      P.showToast(P.t('auth.login.title') + ` (${provider}) ✓`, 'success');
      P.navigateTo('#/home');
    };

    if (googleBtn) googleBtn.onclick = () => handleSocialAuth('Google');
    if (lineBtn) lineBtn.onclick = () => handleSocialAuth('LINE');

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
          if (alertArea) {
            alertArea.innerHTML = `
              <div class="card" style="background:#FFF0F0;border-color:#F6B8B8;color:#8E1F1F;padding:0.75rem 1rem;margin-bottom:1rem;font-size:0.85rem;">
                ⚠️ ${P.t('auth.login.errorRequired')}
              </div>
            `;
          }
          return;
        }

        const state = P.getState();
        state.auth.isAuthenticated = true;
        state.auth.user.email = email;
        P.saveState();
        P.showToast(P.t('auth.login.title') + ' ✓', 'success');
        P.navigateTo('#/home');
      };
    }
  }

  /** Screen: Register */
  function renderRegister() {
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="register-title">
        <div class="page-shell">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <a href="#/login" class="top-bar-action" aria-label="${t('common.back')}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </a>
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>

          <section class="screen-header">
            <h2 id="register-title" class="font-heading-1">${t('auth.register.title')}</h2>
            <p class="screen-subtitle">${t('auth.register.subtitle')}</p>
          </section>

          <div id="register-alert-area"></div>

          <form id="register-form" novalidate>
            <div class="form-group">
              <label for="reg-name" class="form-label form-label-required">${t('auth.register.name')}</label>
              <div class="input-wrapper">
                <input 
                  type="text" 
                  id="reg-name" 
                  name="name" 
                  class="form-input" 
                  placeholder="Alex Johnson" 
                  autocomplete="name" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label for="reg-email" class="form-label form-label-required">${t('auth.register.email')}</label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="reg-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="user@example.com" 
                  autocomplete="email" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label for="reg-password" class="form-label form-label-required">${t('auth.register.password')}</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="reg-password" 
                  name="password" 
                  class="form-input form-input-password" 
                  placeholder="Password123" 
                  autocomplete="new-password" 
                  required 
                />
                <button type="button" id="btn-toggle-reg-pwd" class="btn-password-toggle" aria-label="Toggle password visibility">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="reg-confirm-password" class="form-label form-label-required">${t('auth.register.confirmPassword')}</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="reg-confirm-password" 
                  name="confirmPassword" 
                  class="form-input form-input-password" 
                  placeholder="Password123" 
                  autocomplete="new-password" 
                  required 
                />
                <button type="button" id="btn-toggle-reg-confirm-pwd" class="btn-password-toggle" aria-label="Toggle confirm password visibility">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label style="display:flex;align-items:flex-start;gap:0.5rem;font-size:0.775rem;cursor:pointer;">
                <input type="checkbox" id="reg-terms" name="terms" style="margin-top:0.15rem;" checked />
                <span class="text-secondary">${t('auth.register.terms')}</span>
              </label>
            </div>

            <button type="submit" id="btn-register-submit" class="btn btn-primary btn-lg" style="margin-top:0.5rem;">
              ${t('auth.register.submit')} →
            </button>
          </form>

          <footer style="margin-top:auto;padding-top:1.5rem;text-align:center;">
            <p class="font-body-small text-secondary">
              ${t('auth.register.hasAccount')} 
              <a href="#/login" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">${t('auth.register.login')}</a>
            </p>
          </footer>
        </div>
      </main>
    `;
  }

  function bindRegisterEvents() {
    const form = document.getElementById('register-form');
    const alertArea = document.getElementById('register-alert-area');
    const pwdInput = document.getElementById('reg-password');
    const confirmPwdInput = document.getElementById('reg-confirm-password');
    const togglePwdBtn = document.getElementById('btn-toggle-reg-pwd');
    const toggleConfirmPwdBtn = document.getElementById('btn-toggle-reg-confirm-pwd');

    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.onclick = () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
      };
    }

    if (toggleConfirmPwdBtn && confirmPwdInput) {
      toggleConfirmPwdBtn.onclick = () => {
        const isPwd = confirmPwdInput.type === 'password';
        confirmPwdInput.type = isPwd ? 'text' : 'password';
      };
    }

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const name = (document.getElementById('reg-name')?.value || '').trim();
        const email = (document.getElementById('reg-email')?.value || '').trim();
        const pwd = document.getElementById('reg-password')?.value || '';
        const confirmPwd = document.getElementById('reg-confirm-password')?.value || '';
        const terms = !!document.getElementById('reg-terms')?.checked;

        const showError = (msg) => {
          if (alertArea) {
            alertArea.innerHTML = `
              <div class="card" style="background:#FFF0F0;border:1px solid #F6B8B8;color:#8E1F1F;padding:0.75rem 1rem;margin-bottom:1rem;font-size:0.85rem;">
                ⚠️ ${msg}
              </div>
            `;
          }
        };

        if (!name) {
          showError(P.t('auth.register.errorName'));
          return;
        }

        if (!email) {
          showError(P.t('auth.register.errorEmail'));
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showError(P.t('auth.register.errorEmailInvalid'));
          return;
        }

        if (!pwd) {
          showError(P.t('auth.register.errorPassword'));
          return;
        }

        if (pwd.length < 8) {
          showError(P.t('auth.register.errorPasswordLength'));
          return;
        }

        if (!confirmPwd) {
          showError(P.t('auth.register.errorConfirmPassword'));
          return;
        }

        if (pwd !== confirmPwd) {
          showError(P.t('auth.register.errorPasswordMismatch'));
          return;
        }

        if (!terms) {
          showError(P.t('auth.register.errorTerms'));
          return;
        }

        // Clear any previous error
        if (alertArea) alertArea.innerHTML = '';

        const state = P.getState();
        state.auth.pendingVerificationEmail = email;
        state.auth.user.name = name;
        state.auth.user.email = email;
        state.auth.user.initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AJ';
        state.auth.user.avatarText = state.auth.user.initials;
        P.saveState();
        P.navigateTo('#/verify-email');
      };
    }
  }

  /** Screen: Verify Email / OTP */
  function renderVerifyEmail() {
    const state = P.getState();
    const t = P.t;
    const email = state.auth.pendingVerificationEmail || 'user@example.com';

    return `
      <main class="app-shell" aria-labelledby="otp-title">
        <div class="page-shell">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <a href="#/register" class="top-bar-action" aria-label="${t('common.back')}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </a>
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>

          <section class="screen-header" style="text-align:center;">
            <div style="font-size:40px;margin-bottom:0.5rem;">✉️</div>
            <h2 id="otp-title" class="font-heading-1">${t('auth.otp.title')}</h2>
            <p class="screen-subtitle">${t('auth.otp.subtitle', { email: P.escapeHtml(email) })}</p>
          </section>

          <div id="otp-alert-area"></div>

          <form id="otp-form" style="text-align:center;margin-top:1.5rem;">
            <div class="form-group">
              <label class="form-label">${t('auth.otp.enterCode')}</label>
              <div style="display:flex;justify-content:center;gap:0.5rem;">
                <input type="text" maxlength="1" class="form-input otp-digit" style="width:48px;height:52px;text-align:center;font-size:1.4rem;font-weight:700;" value="1" />
                <input type="text" maxlength="1" class="form-input otp-digit" style="width:48px;height:52px;text-align:center;font-size:1.4rem;font-weight:700;" value="2" />
                <input type="text" maxlength="1" class="form-input otp-digit" style="width:48px;height:52px;text-align:center;font-size:1.4rem;font-weight:700;" value="3" />
                <input type="text" maxlength="1" class="form-input otp-digit" style="width:48px;height:52px;text-align:center;font-size:1.4rem;font-weight:700;" value="4" />
                <input type="text" maxlength="1" class="form-input otp-digit" style="width:48px;height:52px;text-align:center;font-size:1.4rem;font-weight:700;" value="5" />
                <input type="text" maxlength="1" class="form-input otp-digit" style="width:48px;height:52px;text-align:center;font-size:1.4rem;font-weight:700;" value="6" />
              </div>
            </div>

            <div style="margin:1.25rem 0;">
              <button type="button" id="btn-resend-otp" class="btn-link" style="font-size:0.8rem;color:var(--color-brand-secondary);">
                ${t('auth.otp.resend')}
              </button>
            </div>

            <button type="submit" class="btn btn-primary btn-lg">
              ${t('auth.otp.submit')} ✓
            </button>
          </form>
        </div>
      </main>
    `;
  }

  function bindVerifyEmailEvents() {
    const form = document.getElementById('otp-form');
    const resendBtn = document.getElementById('btn-resend-otp');

    if (resendBtn) {
      resendBtn.onclick = () => P.showToast('OTP: 123456', 'info');
    }

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const state = P.getState();
        state.auth.isAuthenticated = true;
        P.saveState();
        P.showToast(P.t('auth.otp.title') + ' ✓', 'success');
        P.navigateTo('#/food-profile/allergies');
      };
    }
  }

  /** Screen: Forgot Password */
  function renderForgotPassword() {
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="forgot-title">
        <div class="page-shell">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <a href="#/login" class="top-bar-action" aria-label="${t('common.back')}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </a>
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>

          <section class="screen-header">
            <h2 id="forgot-title" class="font-heading-1">${t('auth.forgot.title')}</h2>
            <p class="screen-subtitle">${t('auth.forgot.subtitle')}</p>
          </section>

          <form id="forgot-form">
            <div class="form-group">
              <label for="forgot-email" class="form-label">${t('auth.forgot.email')}</label>
              <div class="input-wrapper">
                <input type="email" id="forgot-email" class="form-input" placeholder="user@example.com" value="user@example.com" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="margin-top:1rem;">
              ${t('auth.forgot.submit')} →
            </button>
          </form>
        </div>
      </main>
    `;
  }

  function bindForgotPasswordEvents() {
    const form = document.getElementById('forgot-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        P.showToast(P.t('auth.forgot.successTitle'), 'success');
        P.navigateTo('#/login');
      };
    }
  }

  /* ==========================================================================
     2. Food Profile Onboarding Screens (1-3)
     ========================================================================== */

  /** Step 1: Allergies */
  function renderFoodProfileAllergies() {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const fp = state.foodProfile || { allergies: [] };

    return `
      <main class="app-shell" aria-labelledby="allergies-title">
        <header class="top-bar">
          <a href="#/login" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <span class="step-badge">${t('foodProfile.onboarding.step', { step: '1 / 3' })}</span>
          ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="allergies-title" class="font-heading-1">${t('foodProfile.allergies.title')}</h2>
            <p class="screen-subtitle">${t('foodProfile.allergies.subtitle')}</p>
          </section>

          <div class="edit-chip-grid" style="margin:1.25rem 0;">
            ${P.ALLERGY_OPTIONS.map(opt => {
              const isSelected = (fp.allergies || []).includes(opt.id);
              const label = isTH ? (opt.thai || opt.label) : opt.label;
              return `
                <button 
                  type="button" 
                  class="edit-pill-btn btn-fp-allergy ${isSelected ? 'selected-allergy' : ''}" 
                  data-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <span>${isSelected ? '⚠️' : '＋'}</span>
                  <span>${P.escapeHtml(label)}</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="bottom-actions">
            <a href="#/food-profile/restrictions" class="btn btn-primary btn-lg">
              ${t('foodProfile.onboarding.next')}
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileAllergiesEvents() {
    const btns = document.querySelectorAll('.btn-fp-allergy');
    const state = P.getState();
    btns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        let cur = state.foodProfile.allergies || [];
        if (id === 'none') {
          state.foodProfile.allergies = ['none'];
        } else {
          cur = cur.filter(a => a !== 'none');
          state.foodProfile.allergies = cur.includes(id) ? cur.filter(a => a !== id) : [...cur, id];
        }
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });
  }

  /** Step 2: Restrictions */
  function renderFoodProfileRestrictions() {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const fp = state.foodProfile || { restrictions: [] };

    return `
      <main class="app-shell" aria-labelledby="restrictions-title">
        <header class="top-bar">
          <a href="#/food-profile/allergies" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <span class="step-badge">${t('foodProfile.onboarding.step', { step: '2 / 3' })}</span>
          ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="restrictions-title" class="font-heading-1">${t('foodProfile.restrictions.title')}</h2>
            <p class="screen-subtitle">${t('foodProfile.restrictions.subtitle')}</p>
          </section>

          <div class="edit-chip-grid" style="margin:1.25rem 0;">
            ${P.RESTRICTION_OPTIONS.map(opt => {
              const isSelected = (fp.restrictions || []).includes(opt.id);
              const label = isTH ? (opt.thai || opt.label) : opt.label;
              return `
                <button 
                  type="button" 
                  class="edit-pill-btn btn-fp-restriction ${isSelected ? 'selected-restriction' : ''}" 
                  data-id="${opt.id}"
                  aria-pressed="${isSelected}"
                >
                  <span>${isSelected ? '✓' : '＋'}</span>
                  <span>${P.escapeHtml(label)}</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="bottom-actions">
            <a href="#/food-profile/details" class="btn btn-primary btn-lg">
              ${t('foodProfile.onboarding.next')}
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileRestrictionsEvents() {
    const btns = document.querySelectorAll('.btn-fp-restriction');
    const state = P.getState();
    btns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        let cur = state.foodProfile.restrictions || [];
        if (id === 'none') {
          state.foodProfile.restrictions = ['none'];
        } else {
          cur = cur.filter(r => r !== 'none');
          state.foodProfile.restrictions = cur.includes(id) ? cur.filter(r => r !== id) : [...cur, id];
        }
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });
  }

  /** Step 3: Details */
  function renderFoodProfileDetails() {
    const state = P.getState();
    const t = P.t;
    const fp = state.foodProfile || { details: '' };

    return `
      <main class="app-shell" aria-labelledby="details-title">
        <header class="top-bar">
          <a href="#/food-profile/restrictions" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <span class="step-badge">${t('foodProfile.onboarding.step', { step: '3 / 3' })}</span>
          ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="details-title" class="font-heading-1">${t('foodProfile.details.title')}</h2>
            <p class="screen-subtitle">${t('foodProfile.details.subtitle')}</p>
          </section>

          <textarea 
            id="fp-details-input" 
            class="form-input" 
            rows="3" 
            placeholder="${t('foodProfile.details.placeholder')}"
            style="margin:1rem 0;resize:vertical;"
          >${P.escapeHtml(fp.details || '')}</textarea>

          <div>
            <div class="font-caption text-muted" style="margin-bottom:0.35rem;">${t('foodProfile.details.suggestions')}</div>
            <div class="edit-chip-grid">
              ${P.SUGGESTION_PILLS.map(p => `
                <button type="button" class="btn-suggestion-pill edit-pill-btn" data-tag="${P.escapeHtml(p.tag)}">
                  ${P.escapeHtml(p.text)}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-finish-fp" class="btn btn-primary btn-lg">
              ${t('foodProfile.onboarding.finish')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileDetailsEvents() {
    const input = document.getElementById('fp-details-input');
    const pills = document.querySelectorAll('.btn-suggestion-pill');
    const finishBtn = document.getElementById('btn-finish-fp');
    const state = P.getState();

    pills.forEach(p => {
      p.onclick = () => {
        const tag = p.getAttribute('data-tag');
        if (input) {
          const cur = input.value.trim();
          input.value = cur ? `${cur}, ${tag}` : tag;
        }
      };
    });

    if (finishBtn) {
      finishBtn.onclick = () => {
        if (input) state.foodProfile.details = input.value.trim();
        state.foodProfile.completed = true;
        P.saveState();
        P.showToast(P.t('profile.edit.toastSuccess'), 'success');
        P.navigateTo('#/home');
      };
    }
  }

  /* ==========================================================================
     3. Home Dashboard
     ========================================================================== */

  function renderHome() {
    const state = P.getState();
    const t = P.t;
    const user = state.auth.user || { name: 'Alex Johnson' };
    const fp = state.foodProfile || {};
    const allergiesCount = (fp.allergies || []).filter(a => a !== 'none').length;
    const restrictionsCount = (fp.restrictions || []).filter(r => r !== 'none').length;

    return `
      <main class="app-shell" aria-labelledby="home-welcome" style="padding-bottom: 70px;">
        <header class="top-bar">
          <div class="brand-badge-logo" style="width:32px;height:32px;border-radius:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
          </div>
          <span style="font-weight:800;color:var(--color-brand-primary);">FoodFighter</span>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- Welcome Section -->
          <section style="margin-bottom:1.25rem;">
            <div class="font-body-small text-secondary">${t('home.greeting', { name: P.escapeHtml(user.name.split(' ')[0]) })}</div>
            <h2 id="home-welcome" class="font-display" style="margin-top:0.2rem;font-size:1.65rem;">
              ${t('home.headline')}
            </h2>
          </section>

          <!-- Active Food Profile Card -->
          <div class="card card-hero" style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:2;">
              <div>
                <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">${t('home.profileActive')}</span>
                <h3 class="font-heading-3" style="margin-top:0.45rem;">${t('profile.foodSafety')}</h3>
                <p class="font-body-small text-secondary" style="margin-top:0.2rem;">
                  ${t('home.profileSummary', { allergies: allergiesCount, restrictions: restrictionsCount })}
                </p>
              </div>
              <a href="#/profile/food" class="btn btn-outline btn-sm" style="background:#fff;border-radius:var(--radius-full);">${t('common.edit')}</a>
            </div>
          </div>

          <!-- Create / Join Action Cards -->
          <section aria-label="${t('home.startBattle')}">
            <h3 class="font-label text-secondary" style="margin-bottom:0.75rem;">${t('home.startBattle')}</h3>
            <div class="action-card-grid">
              <a href="#/room/create" class="action-card action-card-create" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </div>
                <div class="action-card-title">${t('home.createRoom.title')}</div>
                <div class="action-card-desc">${t('home.createRoom.desc')}</div>
              </a>

              <a href="#/room/join" class="action-card action-card-join" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                </div>
                <div class="action-card-title">${t('home.joinRoom.title')}</div>
                <div class="action-card-desc">${t('home.joinRoom.desc')}</div>
              </a>
            </div>
          </section>

          <!-- History Preview -->
          <section style="margin-top:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <h3 class="font-label text-secondary">${t('home.recentBattles')}</h3>
              <a href="#/history" class="font-caption text-secondary" style="font-weight:600;">${t('home.viewAll')}</a>
            </div>
            <div class="card" style="display:flex;align-items:center;gap:0.85rem;padding:0.95rem;">
              <div style="width:42px;height:42px;border-radius:12px;background:var(--color-accent-custard);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🍲</div>
              <div style="flex:1;">
                <div style="font-size:0.9rem;font-weight:600;">Sukhumvit Dinner Squad</div>
                <div class="font-caption text-secondary">Tonkotsu Ramen (Nori House)</div>
              </div>
              <span class="step-badge" style="font-size:0.7rem;">${t('common.done')}</span>
            </div>
          </section>
        </div>

        ${P.renderBottomNavigation ? P.renderBottomNavigation('home') : ''}
      </main>
    `;
  }

  function bindHomeEvents() {}

  // Expose to Prototype Namespace
  P.renderLogin = renderLogin;
  P.bindLoginEvents = bindLoginEvents;
  P.renderRegister = renderRegister;
  P.bindRegisterEvents = bindRegisterEvents;
  P.renderVerifyEmail = renderVerifyEmail;
  P.bindVerifyEmailEvents = bindVerifyEmailEvents;
  P.renderForgotPassword = renderForgotPassword;
  P.bindForgotPasswordEvents = bindForgotPasswordEvents;
  P.renderFoodProfileAllergies = renderFoodProfileAllergies;
  P.bindFoodProfileAllergiesEvents = bindFoodProfileAllergiesEvents;
  P.renderFoodProfileRestrictions = renderFoodProfileRestrictions;
  P.bindFoodProfileRestrictionsEvents = bindFoodProfileRestrictionsEvents;
  P.renderFoodProfileDetails = renderFoodProfileDetails;
  P.bindFoodProfileDetailsEvents = bindFoodProfileDetailsEvents;
  P.renderHome = renderHome;
  P.bindHomeEvents = bindHomeEvents;

})();
