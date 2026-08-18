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
    return `
      <main class="app-shell" aria-labelledby="login-title">
        <div class="page-shell">
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
            <p class="brand-tagline">Group Food Decisions Made Easy</p>
          </header>

          <section class="screen-header">
            <h2 id="login-title" class="font-heading-1">Welcome back</h2>
            <p class="screen-subtitle">Sign in to join a food fight or create a new room</p>
          </section>

          <div id="login-alert-area"></div>

          <form id="login-form" novalidate>
            <div class="form-group">
              <label for="login-email" class="form-label form-label-required">Email Address</label>
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
                <label for="login-password" class="form-label-required" style="margin-bottom:0;">Password</label>
                <a href="#/forgot-password" class="text-secondary" style="font-size:0.775rem;font-weight:600;">Forgot password?</a>
              </div>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="login-password" 
                  name="password" 
                  class="form-input form-input-password" 
                  placeholder="Enter your password" 
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
              <span id="login-submit-text">Log In</span>
            </button>
          </form>

          <div class="divider-text">OR CONTINUE WITH</div>

          <div style="display:flex;flex-direction:column;gap:0.65rem;">
            <button type="button" id="btn-login-google" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <button type="button" id="btn-login-line" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#00C300" d="M24 10.3c0-4.6-4.9-8.3-10.9-8.3S2.2 5.7 2.2 10.3c0 4.1 3.7 7.6 8.7 8.2.3.1.8.2.9.6.1.3.1.8 0 1.2l-.3 1.7c-.1.5-.4 1.8 1.6 1 2-1 10.9-6.4 10.9-12.7z"/>
                <path fill="#FFFFFF" d="M9.8 13.5H7.7c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5zm2.7-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm4.4 0c0 .2-.1.4-.3.5-.1.1-.3.1-.4.1-.1 0-.3-.1-.4-.2l-2.1-2.9v2.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.2.1-.4.3-.5.2-.1.4-.1.6 0l2.1 2.9V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm3.5-3.2h-1.6v1.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1.1h1.6c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
              </svg>
              <span>Continue with LINE</span>
            </button>
          </div>

          <footer style="margin-top:auto;padding-top:1.5rem;text-align:center;">
            <p class="font-body-small text-secondary">
              Don't have an account? 
              <a href="#/register" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">Sign up</a>
            </p>
          </footer>
        </div>
      </main>
    `;
  }

  function bindLoginEvents() {
    const form = document.getElementById('login-form');
    const pwdInput = document.getElementById('login-password');
    const togglePwdBtn = document.getElementById('btn-toggle-login-pwd');
    const alertArea = document.getElementById('login-alert-area');
    const submitBtn = document.getElementById('btn-login-submit');
    const submitText = document.getElementById('login-submit-text');
    const state = P.getState();

    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.onclick = () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
      };
    }

    const handleSocialLogin = (provider) => {
      P.showToast(`Signed in with ${provider} (Demo)`, 'success');
      state.auth.isAuthenticated = true;
      P.saveState();
      setTimeout(() => {
        if (!state.foodProfile.completed) {
          P.navigateTo('#/food-profile/allergies');
        } else {
          P.navigateTo('#/home');
        }
      }, 400);
    };

    const googleBtn = document.getElementById('btn-login-google');
    const lineBtn = document.getElementById('btn-login-line');
    if (googleBtn) googleBtn.onclick = () => handleSocialLogin('Google');
    if (lineBtn) lineBtn.onclick = () => handleSocialLogin('LINE');

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        alertArea.innerHTML = '';
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter your email and password.</div>`;
          return;
        }

        submitBtn.disabled = true;
        submitText.innerHTML = `<span class="spinner"></span> Signing in...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitText.textContent = 'Log In';

          if (email === 'wrong@example.com' || password === 'wrong') {
            alertArea.innerHTML = `
              <div class="alert alert-danger">
                <strong>Invalid credentials.</strong> For demo, use <code>user@example.com</code> / <code>Password123</code>.
              </div>
            `;
          } else {
            state.auth.isAuthenticated = true;
            state.auth.user.email = email;
            P.saveState();
            P.showToast('Welcome back to FoodFighter!', 'success');
            if (!state.foodProfile.completed) {
              P.navigateTo('#/food-profile/allergies');
            } else {
              P.navigateTo('#/home');
            }
          }
        }, 350);
      };
    }
  }

  /** Screen: Register */
  function renderRegister() {
    return `
      <main class="app-shell" aria-labelledby="register-title">
        <header class="top-bar">
          <a href="#/login" class="top-bar-action" aria-label="Back to Login">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Create Account</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="register-title" class="font-heading-1">Join FoodFighter</h2>
            <p class="screen-subtitle">Sign up to end mealtime arguments with AI recommendations</p>
          </section>

          <div id="register-alert-area"></div>

          <form id="register-form" novalidate>
            <div class="form-group">
              <label for="reg-name" class="form-label form-label-required">Full Name</label>
              <input type="text" id="reg-name" class="form-input" placeholder="Alex Johnson" value="Alex Johnson" required />
            </div>

            <div class="form-group">
              <label for="reg-email" class="form-label form-label-required">Email Address</label>
              <input type="email" id="reg-email" class="form-input" placeholder="alex@example.com" value="alex@example.com" required />
            </div>

            <div class="form-group">
              <label for="reg-password" class="form-label form-label-required">Password</label>
              <div class="input-wrapper">
                <input type="password" id="reg-password" class="form-input form-input-password" placeholder="At least 8 characters" value="Password123" required />
                <button type="button" id="btn-toggle-reg-pwd" class="btn-password-toggle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="reg-confirm-password" class="form-label form-label-required">Confirm Password</label>
              <input type="password" id="reg-confirm-password" class="form-input" value="Password123" required />
            </div>

            <label class="checkbox-group" for="reg-terms">
              <input type="checkbox" id="reg-terms" checked required />
              <span class="checkbox-custom">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <span class="checkbox-label-text">
                I agree to the <span style="text-decoration:underline;">Terms of Service</span> and <span style="text-decoration:underline;">Privacy Policy</span>
              </span>
            </label>

            <button type="submit" id="btn-reg-submit" class="btn btn-primary btn-lg">
              <span id="reg-submit-text">Create Account</span>
            </button>
          </form>

          <div style="margin-top:auto;padding-top:1.5rem;text-align:center;">
            <p class="font-body-small text-secondary">
              Already have an account? <a href="#/login" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">Log in</a>
            </p>
          </div>
        </div>
      </main>
    `;
  }

  function bindRegisterEvents() {
    const form = document.getElementById('register-form');
    const alertArea = document.getElementById('register-alert-area');
    const togglePwdBtn = document.getElementById('btn-toggle-reg-pwd');
    const pwdInput = document.getElementById('reg-password');
    const submitBtn = document.getElementById('btn-reg-submit');
    const submitText = document.getElementById('reg-submit-text');
    const state = P.getState();

    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.onclick = () => {
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      };
    }

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (!name || !email || !password) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please fill in all required fields.</div>`;
          return;
        }
        if (password !== confirmPassword) {
          alertArea.innerHTML = `<div class="alert alert-danger">Passwords do not match.</div>`;
          return;
        }

        submitBtn.disabled = true;
        submitText.innerHTML = `<span class="spinner"></span> Creating account...`;

        setTimeout(() => {
          state.auth.user.name = name;
          state.auth.user.email = email;
          state.auth.pendingVerificationEmail = email;
          P.saveState();
          P.showToast(`Verification code sent to ${email}`, 'success');
          P.navigateTo('#/verify-email');
        }, 350);
      };
    }
  }

  /** Screen: Verify Email / OTP */
  function renderVerifyEmail() {
    const state = P.getState();
    const email = state.auth.pendingVerificationEmail || 'user@example.com';
    return `
      <main class="app-shell" aria-labelledby="verify-title">
        <header class="top-bar">
          <a href="#/register" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Verify Email</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 id="verify-title" class="font-heading-1">Enter Verification Code</h2>
            <p class="screen-subtitle">We sent a 6-digit code to<br /><strong>${P.escapeHtml(email)}</strong></p>
          </section>

          <div id="otp-alert-area"></div>

          <div class="otp-container">
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" autofocus />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
          </div>

          <div class="alert alert-info" style="font-size:0.8rem;">
            <span>💡 <strong>Demo Code:</strong> Enter <code>123456</code> (or <code>111111</code> to test invalid error).</span>
          </div>

          <button type="button" id="btn-verify-otp" class="btn btn-primary btn-lg" style="margin-top:1rem;">
            Verify & Continue
          </button>

          <div style="margin-top:1.5rem;text-align:center;display:flex;flex-direction:column;gap:0.5rem;">
            <button type="button" id="btn-resend-otp" class="btn-ghost font-body-small" style="font-weight:600;">
              Resend Code
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindVerifyEmailEvents() {
    const otpBoxes = document.querySelectorAll('.otp-box');
    const verifyBtn = document.getElementById('btn-verify-otp');
    const alertArea = document.getElementById('otp-alert-area');
    const resendBtn = document.getElementById('btn-resend-otp');
    const state = P.getState();

    otpBoxes.forEach((box, index) => {
      box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }
      });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && index > 0) {
          otpBoxes[index - 1].focus();
        }
      });
      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
        if (/^\d{6}$/.test(pasteData)) {
          pasteData.split('').forEach((char, i) => {
            if (otpBoxes[i]) otpBoxes[i].value = char;
          });
          otpBoxes[5].focus();
        }
      });
    });

    if (verifyBtn) {
      verifyBtn.onclick = () => {
        let code = '';
        otpBoxes.forEach(b => code += b.value);
        if (code.length < 6) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter all 6 digits.</div>`;
          return;
        }

        if (code === '111111') {
          alertArea.innerHTML = `<div class="alert alert-danger">Invalid code. Try <code>123456</code>.</div>`;
        } else {
          state.auth.isAuthenticated = true;
          P.saveState();
          P.showToast('Email verified successfully!', 'success');
          P.navigateTo('#/food-profile/allergies');
        }
      };
    }

    if (resendBtn) {
      resendBtn.onclick = () => P.showToast('New code sent: 123456', 'info');
    }
  }

  /** Screen: Forgot Password */
  function renderForgotPassword() {
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/login" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Reset Password</h1>
          <div class="top-bar-placeholder"></div>
        </header>
        <div class="page-shell">
          <section class="screen-header">
            <h2 class="font-heading-1">Forgot your password?</h2>
            <p class="screen-subtitle">Enter your registered email and we'll send reset instructions.</p>
          </section>
          <form id="forgot-form">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="forgot-email" class="form-input" value="user@example.com" required />
            </div>
            <button type="submit" class="btn btn-primary btn-lg">Send Reset Link</button>
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
        P.showToast('Password reset link sent to your email!', 'success');
        setTimeout(() => P.navigateTo('#/login'), 800);
      };
    }
  }

  /* ==========================================================================
     2. Food Profile Onboarding Screens (1/3, 2/3, 3/3)
     ========================================================================== */

  /** Food Profile: Allergies (1/3) */
  function renderFoodProfileAllergies() {
    const state = P.getState();
    const selected = state.foodProfile.allergies || [];
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <div class="progress-header">
            <span class="font-label text-secondary">Step 1 of 3</span>
            <span class="step-badge">Allergies</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:33%;"></div></div>

          <section class="screen-header">
            <h2 class="font-heading-1">Any food allergies?</h2>
            <p class="screen-subtitle">Select items to strictly exclude for your group.</p>
          </section>

          <div class="chip-grid" id="allergy-chips">
            ${P.ALLERGY_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.id);
              return `
                <button type="button" class="chip-card ${isSelected ? 'selected' : ''}" data-allergy-id="${opt.id}">
                  <span class="chip-card-title">${P.escapeHtml(opt.label)}</span>
                  <span class="chip-card-sub">${P.escapeHtml(opt.thai)}</span>
                  <span class="chip-card-check">✓</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-allergies-continue" class="btn btn-primary btn-lg">
              Continue (1 / 3) →
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileAllergiesEvents() {
    const chips = document.querySelectorAll('#allergy-chips .chip-card');
    const state = P.getState();
    chips.forEach(chip => {
      chip.onclick = () => {
        const id = chip.getAttribute('data-allergy-id');
        let current = state.foodProfile.allergies || [];
        if (id === 'none') {
          current = current.includes('none') ? [] : ['none'];
        } else {
          current = current.filter(x => x !== 'none');
          current = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
        }
        state.foodProfile.allergies = current;
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    document.getElementById('btn-allergies-continue').onclick = () => {
      P.navigateTo('#/food-profile/restrictions');
    };
  }

  /** Food Profile: Restrictions (2/3) */
  function renderFoodProfileRestrictions() {
    const state = P.getState();
    const selected = state.foodProfile.restrictions || [];
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/food-profile/allergies" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <div class="progress-header">
            <span class="font-label text-secondary">Step 2 of 3</span>
            <span class="step-badge">Dietary Habits</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:66%;"></div></div>

          <section class="screen-header">
            <h2 class="font-heading-1">Dietary Restrictions</h2>
            <p class="screen-subtitle">Choose religious or lifestyle eating habits.</p>
          </section>

          <div class="chip-grid" id="restriction-chips">
            ${P.RESTRICTION_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.id);
              return `
                <button type="button" class="chip-card ${isSelected ? 'selected' : ''}" data-restriction-id="${opt.id}">
                  <span class="chip-card-title">${P.escapeHtml(opt.label)}</span>
                  <span class="chip-card-sub">${P.escapeHtml(opt.thai)}</span>
                  <span class="chip-card-check">✓</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="bottom-actions">
            <div class="bottom-actions-row">
              <a href="#/food-profile/allergies" class="btn btn-secondary" style="flex:1;">Back</a>
              <button type="button" id="btn-restrictions-continue" class="btn btn-primary btn-lg" style="flex:2;">
                Continue (2 / 3) →
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileRestrictionsEvents() {
    const chips = document.querySelectorAll('#restriction-chips .chip-card');
    const state = P.getState();
    chips.forEach(chip => {
      chip.onclick = () => {
        const id = chip.getAttribute('data-restriction-id');
        let current = state.foodProfile.restrictions || [];
        if (id === 'none') {
          current = current.includes('none') ? [] : ['none'];
        } else {
          current = current.filter(x => x !== 'none');
          current = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
        }
        state.foodProfile.restrictions = current;
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    document.getElementById('btn-restrictions-continue').onclick = () => {
      P.navigateTo('#/food-profile/details');
    };
  }

  /** Food Profile: Details (3/3) */
  function renderFoodProfileDetails() {
    const state = P.getState();
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/food-profile/restrictions" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <div class="progress-header">
            <span class="font-label text-secondary">Step 3 of 3</span>
            <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Finish</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:100%;"></div></div>

          <section class="screen-header">
            <h2 class="font-heading-1">Personal Preferences</h2>
            <p class="screen-subtitle">Notes, flavor preferences, or dislikes for AI analysis.</p>
          </section>

          <div class="form-group">
            <label class="form-label">Notes & Dislikes</label>
            <textarea id="profile-notes" class="form-textarea" placeholder="e.g. Love spicy food, dislike raw onions...">${P.escapeHtml(state.foodProfile.details)}</textarea>
          </div>

          <div style="margin-bottom:1.5rem;">
            <label class="form-label" style="margin-bottom:0.5rem;">Quick Suggestions</label>
            <div class="pill-list" id="quick-pill-list">
              ${P.SUGGESTION_PILLS.map(p => {
                const isSelected = (state.foodProfile.quickTags || []).includes(p.tag);
                return `
                  <button type="button" class="pill-item ${isSelected ? 'selected' : ''}" data-tag="${p.tag}">
                    ${P.escapeHtml(p.text)}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="bottom-actions">
            <div class="bottom-actions-row">
              <a href="#/food-profile/restrictions" class="btn btn-secondary" style="flex:1;">Back</a>
              <button type="button" id="btn-details-finish" class="btn btn-primary btn-lg" style="flex:2;">
                Finish & Start Exploring
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileDetailsEvents() {
    const textarea = document.getElementById('profile-notes');
    const finishBtn = document.getElementById('btn-details-finish');
    const pills = document.querySelectorAll('#quick-pill-list .pill-item');
    const state = P.getState();

    pills.forEach(pill => {
      pill.onclick = () => {
        const tag = pill.getAttribute('data-tag');
        let current = state.foodProfile.quickTags || [];
        current = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
        state.foodProfile.quickTags = current;
        P.saveState();
        pill.classList.toggle('selected', current.includes(tag));
      };
    });

    if (finishBtn) {
      finishBtn.onclick = () => {
        if (textarea) state.foodProfile.details = textarea.value.trim();
        state.foodProfile.completed = true;
        P.saveState();
        P.showToast('Food Profile saved successfully!', 'success');
        P.navigateTo('#/home');
      };
    }
  }

  /* ==========================================================================
     3. Home Dashboard Screen
     ========================================================================== */

  /** Screen: Home Dashboard */
  function renderHome() {
    const state = P.getState();
    const user = state.auth.user;
    const allergiesCount = (state.foodProfile.allergies || []).filter(a => a !== 'none').length;
    const restrictionsCount = (state.foodProfile.restrictions || []).filter(r => r !== 'none').length;

    return `
      <main class="app-shell" aria-labelledby="home-welcome">
        <header class="top-bar">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <div class="brand-badge-logo" style="width:34px;height:34px;border-radius:10px;" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
            </div>
            <span style="font-weight:700;font-size:1.15rem;color:var(--color-brand-primary);">FoodFighter</span>
          </div>
          
          <a href="#/profile" class="top-bar-action" aria-label="Profile">
            <div style="width:32px;height:32px;border-radius:var(--radius-full);background:var(--color-accent-petal);color:var(--color-brand-primary);font-size:0.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--color-brand-secondary);">
              ${P.escapeHtml(user.avatarText || 'AJ')}
            </div>
          </a>
        </header>

        <div class="page-shell page-shell-has-bottom-nav">
          <section style="margin-bottom:1.25rem;">
            <div class="font-body-small text-secondary">Hello, ${P.escapeHtml(user.name.split(' ')[0])} 👋</div>
            <h2 id="home-welcome" class="font-display" style="margin-top:0.2rem;font-size:1.65rem;">
              What's the plan today?
            </h2>
          </section>

          <!-- Active Food Profile Card -->
          <div class="card card-hero" style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:2;">
              <div>
                <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Profile Active</span>
                <h3 class="font-heading-3" style="margin-top:0.45rem;">Your Food Profile</h3>
                <p class="font-body-small text-secondary" style="margin-top:0.2rem;">
                  ${allergiesCount > 0 ? `${allergiesCount} allergies` : 'No allergies'} • 
                  ${restrictionsCount > 0 ? `${restrictionsCount} diet rules` : 'Standard diet'}
                </p>
              </div>
              <a href="#/food-profile/allergies" class="btn btn-outline btn-sm" style="background:#fff;border-radius:var(--radius-full);">Edit</a>
            </div>
          </div>

          <!-- Create / Join Action Cards -->
          <section aria-label="Room Actions">
            <h3 class="font-label text-secondary" style="margin-bottom:0.75rem;">Start or Join a Meal Battle</h3>
            <div class="action-card-grid">
              <a href="#/room/create" class="action-card action-card-create" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </div>
                <div class="action-card-title">Create Room</div>
                <div class="action-card-desc">Host session, invite friends via QR or code</div>
              </a>

              <a href="#/room/join" class="action-card action-card-join" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                </div>
                <div class="action-card-title">Join Room</div>
                <div class="action-card-desc">Enter code or scan host's QR invite</div>
              </a>
            </div>
          </section>

          <!-- History Preview -->
          <section style="margin-top:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <h3 class="font-label text-secondary">Recent Battles</h3>
              <a href="#/history" class="font-caption text-secondary" style="font-weight:600;">View all</a>
            </div>
            <div class="card" style="display:flex;align-items:center;gap:0.85rem;padding:0.95rem;">
              <div style="width:42px;height:42px;border-radius:12px;background:var(--color-accent-custard);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🍲</div>
              <div style="flex:1;">
                <div style="font-size:0.9rem;font-weight:600;">Sukhumvit Dinner Squad</div>
                <div class="font-caption text-secondary">Winner: Tonkotsu Ramen (Nori House)</div>
              </div>
              <span class="step-badge" style="font-size:0.7rem;">Completed</span>
            </div>
          </section>
        </div>

        ${P.renderBottomNavigation ? P.renderBottomNavigation('home') : `
          <nav class="bottom-nav-bar" aria-label="Main Navigation">
            <a href="#/home" class="bottom-nav-item active" aria-current="page">
              <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span>Home</span>
            </a>
            <a href="#/history" class="bottom-nav-item">
              <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>History</span>
            </a>
            <a href="#/profile" class="bottom-nav-item">
              <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Profile</span>
            </a>
          </nav>
        `}
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
