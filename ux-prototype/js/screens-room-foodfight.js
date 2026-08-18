/**
 * FoodFighter UX Prototype — Room & FoodFight Screens (V2)
 * 
 * Implements:
 *   - Room: Create Room, Join Room Hub, Room Code, Scan QR, Invite Link, Preview, Host Lobby, Member Lobby
 *   - FoodFight: Meal Preferences (6 categories), Waiting for Group Members, AI Generating Recommendations
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Room Screens (Creation, Join Hub, Code, QR, Invite, Preview)
     ========================================================================== */

  /** Screen: Create Room */
  function renderRoomCreate() {
    const state = P.getState();
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="create-room-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('home.createRoom.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <section class="screen-header">
            <h2 id="create-room-title" class="font-heading-1">${t('room.create.title')}</h2>
            <p class="screen-subtitle">${t('home.createRoom.desc')}</p>
          </section>

          <form id="create-room-form">
            <div class="form-group">
              <label for="room-name-input" class="form-label form-label-required">${t('room.create.roomName')}</label>
              <input type="text" id="room-name-input" class="form-input" value="${P.escapeHtml(state.room.roomName || 'Dinner Food Fight')}" required />
            </div>

            <div class="form-group">
              <label class="form-label">${t('room.create.location')}</label>
              <input type="text" id="room-location-input" class="form-input" value="${P.escapeHtml(state.room.location || 'Current Location (Sukhumvit)')}" />
            </div>

            <div class="form-group">
              <label class="form-label">${t('room.create.radius')}</label>
              <div class="pill-list" id="radius-pills">
                <button type="button" class="pill-item ${state.room.radius === '1 km' ? 'selected' : ''}" data-radius="1 km">1 km</button>
                <button type="button" class="pill-item ${state.room.radius === '3 km' ? 'selected' : ''}" data-radius="3 km">3 km</button>
                <button type="button" class="pill-item ${state.room.radius === '5 km' ? 'selected' : ''}" data-radius="5 km">5 km</button>
                <button type="button" class="pill-item ${state.room.radius === '10 km' ? 'selected' : ''}" data-radius="10 km">10 km</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${t('room.create.maxMembers')}</label>
              <div class="pill-list" id="max-member-pills">
                <button type="button" class="pill-item ${state.room.maxMembers === 4 ? 'selected' : ''}" data-max="4">4 ${t('common.member')}</button>
                <button type="button" class="pill-item ${state.room.maxMembers === 6 ? 'selected' : ''}" data-max="6">6 ${t('common.member')}</button>
                <button type="button" class="pill-item ${state.room.maxMembers === 8 ? 'selected' : ''}" data-max="8">8 ${t('common.member')}</button>
              </div>
            </div>
          </form>

          <div class="bottom-actions">
            <button type="button" id="btn-submit-create-room" class="btn btn-primary btn-lg">
              ${t('room.create.submit')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomCreateEvents() {
    const radiusPills = document.querySelectorAll('#radius-pills .pill-item');
    const memberPills = document.querySelectorAll('#max-member-pills .pill-item');
    const submitBtn = document.getElementById('btn-submit-create-room');
    const state = P.getState();

    radiusPills.forEach(p => {
      p.onclick = () => {
        radiusPills.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
        state.room.radius = p.getAttribute('data-radius');
        P.saveState();
      };
    });

    memberPills.forEach(p => {
      p.onclick = () => {
        memberPills.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
        state.room.maxMembers = parseInt(p.getAttribute('data-max'), 10);
        P.saveState();
      };
    });

    if (submitBtn) {
      submitBtn.onclick = () => {
        const nameInput = document.getElementById('room-name-input');
        if (nameInput) state.room.roomName = nameInput.value.trim() || 'Dinner Food Fight';
        state.room.role = 'host';
        state.room.roomJoined = true;
        P.saveState();
        P.showToast(P.t('home.createRoom.title') + ' ✓', 'success');
        P.navigateTo('#/room/lobby-host');
      };
    }
  }

  /** Screen: Join Room Hub */
  function renderRoomJoinHub() {
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="join-hub-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('home.joinRoom.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="join-hub-title" class="font-heading-1">${t('room.join.title')}</h2>
            <p class="screen-subtitle">${t('room.join.subtitle')}</p>
          </section>

          <div class="join-options-grid" style="display:flex;flex-direction:column;gap:0.85rem;margin-top:1.25rem;">
            <a href="#/room/code" class="action-card" style="padding:1.15rem;display:flex;align-items:center;gap:1rem;">
              <div class="action-card-icon-bubble" style="width:48px;height:48px;font-size:1.5rem;flex-shrink:0;">🔢</div>
              <div style="flex:1;">
                <div class="action-card-title" style="font-size:1rem;">${t('room.join.byCode')}</div>
                <div class="action-card-desc">${t('room.join.byCodeDesc')}</div>
              </div>
              <span class="text-secondary">→</span>
            </a>

            <a href="#/room/scan-qr" class="action-card" style="padding:1.15rem;display:flex;align-items:center;gap:1rem;">
              <div class="action-card-icon-bubble" style="width:48px;height:48px;font-size:1.5rem;flex-shrink:0;">📷</div>
              <div style="flex:1;">
                <div class="action-card-title" style="font-size:1rem;">${t('room.join.byQR')}</div>
                <div class="action-card-desc">${t('room.join.byQRDesc')}</div>
              </div>
              <span class="text-secondary">→</span>
            </a>

            <a href="#/room/preview" class="action-card" style="padding:1.15rem;display:flex;align-items:center;gap:1rem;">
              <div class="action-card-icon-bubble" style="width:48px;height:48px;font-size:1.5rem;flex-shrink:0;">🔗</div>
              <div style="flex:1;">
                <div class="action-card-title" style="font-size:1rem;">${t('room.join.byLink')}</div>
                <div class="action-card-desc">${t('room.join.byLinkDesc')}</div>
              </div>
              <span class="text-secondary">→</span>
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomJoinHubEvents() {}

  /** Screen: Enter Room Code */
  function renderRoomCode() {
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="code-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('room.code.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <section class="screen-header" style="text-align:center;">
            <div style="font-size:36px;margin-bottom:0.5rem;">🔢</div>
            <h2 id="code-title" class="font-heading-1">${t('room.code.title')}</h2>
            <p class="screen-subtitle">${t('room.join.byCodeDesc')}</p>
          </section>

          <div id="code-alert-area"></div>

          <form id="room-code-form" style="margin-top:1.5rem;text-align:center;">
            <input 
              type="text" 
              id="room-code-input" 
              class="form-input" 
              placeholder="${t('room.code.placeholder')}" 
              value="FF-4827" 
              style="text-align:center;font-size:1.5rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;" 
              required 
            />

            <div class="font-caption text-muted" style="margin-top:0.75rem;">
              ${t('room.code.demoHint')}
            </div>

            <div class="bottom-actions">
              <button type="submit" class="btn btn-primary btn-lg">
                ${t('room.code.submit')} →
              </button>
            </div>
          </form>
        </div>
      </main>
    `;
  }

  function bindRoomCodeEvents() {
    const form = document.getElementById('room-code-form');
    const alertArea = document.getElementById('code-alert-area');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const code = document.getElementById('room-code-input').value.trim().toUpperCase();
        if (code !== 'FF-4827') {
          if (alertArea) {
            alertArea.innerHTML = `<div class="card" style="background:#FFF0F0;color:#8E1F1F;padding:0.75rem;margin-bottom:1rem;font-size:0.85rem;">⚠️ ${P.t('room.code.errorInvalid')}</div>`;
          }
          return;
        }
        const state = P.getState();
        state.room.role = 'member';
        state.room.roomJoined = true;
        P.saveState();
        P.navigateTo('#/room/preview');
      };
    }
  }

  /** Screen: Scan QR Code Viewfinder */
  function renderRoomScanQR() {
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="scan-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('room.scan.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions" style="text-align:center;">
          <section class="screen-header">
            <h2 id="scan-title" class="font-heading-1">${t('room.scan.title')}</h2>
            <p class="screen-subtitle">${t('room.scan.instruction')}</p>
          </section>

          <!-- Simulated Camera Viewfinder -->
          <div class="viewfinder-box" style="margin:1.5rem auto;position:relative;width:240px;height:240px;background:#1A131C;border-radius:18px;overflow:hidden;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-md);">
            <div class="viewfinder-corner tl" style="position:absolute;top:12px;left:12px;width:24px;height:24px;border-top:3px solid #FFC6D9;border-left:3px solid #FFC6D9;"></div>
            <div class="viewfinder-corner tr" style="position:absolute;top:12px;right:12px;width:24px;height:24px;border-top:3px solid #FFC6D9;border-right:3px solid #FFC6D9;"></div>
            <div class="viewfinder-corner bl" style="position:absolute;bottom:12px;left:12px;width:24px;height:24px;border-bottom:3px solid #FFC6D9;border-left:3px solid #FFC6D9;"></div>
            <div class="viewfinder-corner br" style="position:absolute;bottom:12px;right:12px;width:24px;height:24px;border-bottom:3px solid #FFC6D9;border-right:3px solid #FFC6D9;"></div>

            <div class="laser-scanner" style="position:absolute;width:100%;height:2px;background:linear-gradient(90deg, transparent, #FFC6D9, transparent);top:40%;"></div>
            
            <div style="color:rgba(255,255,255,0.7);font-size:0.8rem;padding:1rem;">
              📷 ${t('room.scan.simulated')}
            </div>
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-trigger-scan" class="btn btn-primary btn-lg">
              ${t('room.scan.simulateTrigger')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomScanQREvents() {
    const scanBtn = document.getElementById('btn-trigger-scan');
    if (scanBtn) {
      scanBtn.onclick = () => {
        const state = P.getState();
        state.room.role = 'member';
        state.room.roomJoined = true;
        P.saveState();
        P.showToast(P.t('room.preview.title') + ' ✓', 'success');
        P.navigateTo('#/room/preview');
      };
    }
  }

  /** Screen: Room Preview */
  function renderRoomPreview() {
    const state = P.getState();
    const t = P.t;
    const roomName = state.room.roomName || 'Dinner Food Fight';
    const activeCount = (state.room.members || []).filter(m => m.isActive).length;

    return `
      <main class="app-shell" aria-labelledby="preview-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('room.preview.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <div class="card" style="text-align:center;padding:1.5rem;background:#FFFFFF;border-radius:var(--radius-xl);box-shadow:var(--shadow-sm);margin-top:1rem;">
            <div style="font-size:42px;margin-bottom:0.5rem;">🎉</div>
            <h2 id="preview-title" class="font-heading-1">${P.escapeHtml(roomName)}</h2>
            <div class="font-body-small text-secondary" style="margin-top:0.25rem;">
              ${t('room.preview.host', { hostName: 'Alex Johnson' })}
            </div>

            <div class="card" style="background:var(--color-surface-subtle);margin:1.25rem 0;padding:1rem;">
              <div style="font-weight:700;color:var(--color-brand-primary);font-size:1.1rem;">
                ${t('room.preview.activeMembers', { count: activeCount })}
              </div>
              <div class="font-caption text-secondary" style="margin-top:0.25rem;">
                📍 ${P.escapeHtml(state.room.location || 'Sukhumvit, Bangkok')}
              </div>
            </div>
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-confirm-join" class="btn btn-primary btn-lg">
              ${t('room.preview.confirm')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomPreviewEvents() {
    const confirmBtn = document.getElementById('btn-confirm-join');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        P.navigateTo('#/room/lobby-member');
      };
    }
  }

  /** Screen: Room Lobby — Host */
  function renderRoomLobbyHost() {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const room = state.room || {};
    const members = room.members || [];
    const readyCount = members.filter(m => m.isReady).length;
    const totalCount = members.length;
    const canStart = readyCount === totalCount || (readyCount / totalCount >= 0.6 && room.simulatedTwoMinutesElapsed);

    return `
      <main class="app-shell" aria-labelledby="host-lobby-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <button type="button" class="top-bar-action btn-leave-room" aria-label="${t('room.lobby.leaveRoom')}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          <h1 class="top-bar-title" id="host-lobby-title">${t('room.lobby.hostTitle')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- Room Hero Banner -->
          <div class="card card-hero" style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <span class="step-badge" style="background:#FFF7AE;color:#5E4C00;">👑 ${t('common.host')}</span>
                <h2 class="font-heading-2" style="margin-top:0.4rem;">${P.escapeHtml(room.roomName || 'Dinner Food Fight')}</h2>
                <div class="font-caption text-secondary" style="margin-top:0.15rem;">
                  ${t('room.lobby.roomCode')}: <strong style="font-family:monospace;letter-spacing:0.05em;color:var(--color-brand-primary);">${P.escapeHtml(room.roomCode || 'FF-4827')}</strong>
                </div>
              </div>
              <button type="button" class="btn btn-outline btn-sm btn-open-invite" style="border-radius:var(--radius-full);">
                ${t('room.lobby.inviteCTA')}
              </button>
            </div>
          </div>

          <!-- Readiness Rule Callout -->
          <div class="card" style="background:var(--color-surface-subtle);margin-bottom:1.25rem;padding:0.85rem 1rem;">
            <div class="font-label text-secondary">${t('room.lobby.readyStatus', { readyCount: readyCount, totalCount: totalCount })}</div>
            <div class="font-caption text-muted" style="margin-top:0.2rem;">${t('room.lobby.readyRule')}</div>
          </div>

          <!-- Members Roster -->
          <section aria-label="${t('room.lobby.membersList', { count: members.length, max: room.maxMembers || 6 })}">
            <h3 class="font-label text-secondary" style="margin-bottom:0.75rem;">
              ${t('room.lobby.membersList', { count: members.length, max: room.maxMembers || 6 })}
            </h3>
            
            <div class="members-roster-list" style="display:flex;flex-direction:column;gap:0.6rem;">
              ${members.map(m => `
                <div class="card member-row" style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;">
                  <div style="display:flex;align-items:center;gap:0.75rem;">
                    <div class="member-avatar ${m.colorClass || 'avatar-petal'}">${m.initials}</div>
                    <div>
                      <div style="font-weight:700;font-size:0.9rem;">
                        ${P.escapeHtml(m.name)} 
                        ${m.role === 'Host' ? `<span style="font-size:0.7rem;color:var(--color-brand-secondary);">👑 (${t('common.host')})</span>` : ''}
                      </div>
                      <div class="font-caption ${m.isReady ? 'text-success' : 'text-muted'}">
                        ${m.isReady ? `✓ ${t('common.ready')}` : `⏳ ${t('common.notReady')}`}
                      </div>
                    </div>
                  </div>

                  <span class="step-badge ${m.isReady ? 'status-ready' : 'status-waiting'}" style="font-size:0.7rem;">
                    ${m.isReady ? t('common.ready') : t('common.notReady')}
                  </span>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Bottom Actions for Host -->
          <div class="bottom-actions">
            <button type="button" id="btn-start-battle" class="btn btn-primary btn-lg">
              ${t('room.lobby.startBattle')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomLobbyHostEvents() {
    const leaveBtns = document.querySelectorAll('.btn-leave-room');
    const inviteBtns = document.querySelectorAll('.btn-open-invite');
    const startBtn = document.getElementById('btn-start-battle');

    leaveBtns.forEach(btn => btn.onclick = () => P.showLeaveRoomModal());
    inviteBtns.forEach(btn => btn.onclick = () => P.showInviteModal());

    if (startBtn) {
      startBtn.onclick = () => {
        const state = P.getState();
        state.room.foodFightStarted = true;
        P.saveState();
        P.showToast(P.t('room.lobby.startBattle'), 'success');
        P.navigateTo('#/foodfight/preferences');
      };
    }
  }

  /** Screen: Room Lobby — Member */
  function renderRoomLobbyMember() {
    const state = P.getState();
    const t = P.t;
    const room = state.room || {};
    const members = room.members || [];
    const userMember = members.find(m => m.id === 'user') || members[0];

    return `
      <main class="app-shell" aria-labelledby="member-lobby-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <button type="button" class="top-bar-action btn-leave-room" aria-label="${t('room.lobby.leaveRoom')}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          <h1 class="top-bar-title" id="member-lobby-title">${t('room.lobby.memberTitle')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- Room Hero Banner -->
          <div class="card card-hero" style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <span class="step-badge" style="background:#EDF9F0;color:#165E2A;">${t('common.member')}</span>
                <h2 class="font-heading-2" style="margin-top:0.4rem;">${P.escapeHtml(room.roomName || 'Dinner Food Fight')}</h2>
                <div class="font-caption text-secondary" style="margin-top:0.15rem;">
                  ${t('room.lobby.roomCode')}: <strong style="font-family:monospace;color:var(--color-brand-primary);">${P.escapeHtml(room.roomCode || 'FF-4827')}</strong>
                </div>
              </div>
              <button type="button" class="btn btn-outline btn-sm btn-open-invite" style="border-radius:var(--radius-full);">
                ${t('room.lobby.inviteCTA')}
              </button>
            </div>
          </div>

          <!-- Waiting Notice Card -->
          <div class="card" style="background:var(--color-surface-subtle);margin-bottom:1.25rem;text-align:center;padding:1.25rem;">
            <div style="font-size:32px;margin-bottom:0.25rem;">⏳</div>
            <div style="font-weight:700;color:var(--color-brand-primary);font-size:1rem;">${t('room.lobby.waitingForHost')}</div>
            <div class="font-caption text-secondary" style="margin-top:0.25rem;">
              ${userMember.isReady ? `✓ ${t('common.ready')}` : `⚠️ ${t('common.notReady')}`}
            </div>
          </div>

          <!-- Members List -->
          <section>
            <h3 class="font-label text-secondary" style="margin-bottom:0.75rem;">
              ${t('room.lobby.membersList', { count: members.length, max: room.maxMembers || 6 })}
            </h3>
            
            <div class="members-roster-list" style="display:flex;flex-direction:column;gap:0.6rem;">
              ${members.map(m => `
                <div class="card member-row" style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;">
                  <div style="display:flex;align-items:center;gap:0.75rem;">
                    <div class="member-avatar ${m.colorClass || 'avatar-petal'}">${m.initials}</div>
                    <div style="font-weight:700;font-size:0.9rem;">
                      ${P.escapeHtml(m.name)} 
                      ${m.role === 'Host' ? `<span style="font-size:0.7rem;color:var(--color-brand-secondary);">👑 (${t('common.host')})</span>` : ''}
                    </div>
                  </div>
                  <span class="step-badge ${m.isReady ? 'status-ready' : 'status-waiting'}" style="font-size:0.7rem;">
                    ${m.isReady ? t('common.ready') : t('common.notReady')}
                  </span>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Member Toggle Ready Action -->
          <div class="bottom-actions">
            <button type="button" id="btn-toggle-member-ready" class="btn ${userMember.isReady ? 'btn-secondary' : 'btn-primary'} btn-lg">
              ${userMember.isReady ? `✓ ${t('common.ready')} (${t('room.lobby.toggleReady')})` : `＋ ${t('room.lobby.toggleReady')}`}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomLobbyMemberEvents() {
    const leaveBtns = document.querySelectorAll('.btn-leave-room');
    const inviteBtns = document.querySelectorAll('.btn-open-invite');
    const toggleReadyBtn = document.getElementById('btn-toggle-member-ready');

    leaveBtns.forEach(btn => btn.onclick = () => P.showLeaveRoomModal());
    inviteBtns.forEach(btn => btn.onclick = () => P.showInviteModal());

    if (toggleReadyBtn) {
      toggleReadyBtn.onclick = () => {
        const state = P.getState();
        const user = (state.room.members || []).find(m => m.id === 'user');
        if (user) {
          user.isReady = !user.isReady;
          P.saveState();
          P.showToast(user.isReady ? P.t('common.ready') + ' ✓' : P.t('common.notReady'), 'info');
          if (P.renderCurrentRoute) P.renderCurrentRoute();
        }
      };
    }
  }

  /* ==========================================================================
     2. FoodFight Preparation & Session Screens
     ========================================================================== */

  /** Screen: Meal Preferences */
  function renderMealPreferences() {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const pref = state.mealPreferences || {};

    return `
      <main class="app-shell" aria-labelledby="pref-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/room/lobby-host" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">FoodFight</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="pref-title" class="font-heading-1">${t('foodfight.pref.title')}</h2>
            <p class="screen-subtitle">${t('foodfight.pref.subtitle')}</p>
          </section>

          <!-- 1. Food Types -->
          <section class="pref-section">
            <h3 class="pref-section-heading">${t('foodfight.pref.foodTypes')}</h3>
            <div class="pref-chips-grid">
              ${P.PREF_FOOD_TYPES.map(typeStr => {
                const parts = typeStr.split(' / ');
                const label = isTH ? (parts[1] || parts[0]) : parts[0];
                const isSelected = (pref.foodTypes || []).includes(typeStr);
                return `
                  <button 
                    type="button" 
                    class="pref-chip-btn ${isSelected ? 'selected' : ''}" 
                    data-category="foodTypes" 
                    data-val="${P.escapeHtml(typeStr)}"
                    aria-pressed="${isSelected}"
                  >
                    <span class="pref-chip-icon">${isSelected ? '✓' : '＋'}</span>
                    <span>${P.escapeHtml(label)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <!-- 2. Cuisines -->
          <section class="pref-section">
            <h3 class="pref-section-heading">${t('foodfight.pref.cuisines')}</h3>
            <div class="pref-chips-grid">
              ${P.PREF_CUISINES.map(cStr => {
                const parts = cStr.split(' / ');
                const label = isTH ? (parts[1] || parts[0]) : parts[0];
                const isSelected = (pref.cuisines || []).includes(cStr);
                return `
                  <button 
                    type="button" 
                    class="pref-chip-btn ${isSelected ? 'selected' : ''}" 
                    data-category="cuisines" 
                    data-val="${P.escapeHtml(cStr)}"
                    aria-pressed="${isSelected}"
                  >
                    <span class="pref-chip-icon">${isSelected ? '✓' : '＋'}</span>
                    <span>${P.escapeHtml(label)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <!-- 3. Key Ingredients -->
          <section class="pref-section">
            <h3 class="pref-section-heading">${t('foodfight.pref.ingredients')}</h3>
            <div class="pref-chips-grid">
              ${P.PREF_INGREDIENTS.map(iStr => {
                const parts = iStr.split(' / ');
                const label = isTH ? (parts[1] || parts[0]) : parts[0];
                const isSelected = (pref.ingredients || []).includes(iStr);
                return `
                  <button 
                    type="button" 
                    class="pref-chip-btn ${isSelected ? 'selected' : ''}" 
                    data-category="ingredients" 
                    data-val="${P.escapeHtml(iStr)}"
                    aria-pressed="${isSelected}"
                  >
                    <span class="pref-chip-icon">${isSelected ? '✓' : '＋'}</span>
                    <span>${P.escapeHtml(label)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <!-- 4. Price Levels / Budget -->
          <section class="pref-section">
            <h3 class="pref-section-heading">${t('foodfight.pref.priceLevel')}</h3>
            <div class="pref-budget-grid">
              <button 
                type="button" 
                class="pref-budget-card ${pref.priceLevel === '฿' ? 'selected' : ''}" 
                data-price="฿"
                aria-pressed="${pref.priceLevel === '฿'}"
              >
                <div class="pref-budget-symbol">฿</div>
                <div class="pref-budget-label">${t('foodfight.pref.budgetTier1')}</div>
              </button>
              <button 
                type="button" 
                class="pref-budget-card ${pref.priceLevel === '฿฿' ? 'selected' : ''}" 
                data-price="฿฿"
                aria-pressed="${pref.priceLevel === '฿฿'}"
              >
                <div class="pref-budget-symbol">฿฿</div>
                <div class="pref-budget-label">${t('foodfight.pref.budgetTier2')}</div>
              </button>
              <button 
                type="button" 
                class="pref-budget-card ${pref.priceLevel === '฿฿฿' ? 'selected' : ''}" 
                data-price="฿฿฿"
                aria-pressed="${pref.priceLevel === '฿฿฿'}"
              >
                <div class="pref-budget-symbol">฿฿฿</div>
                <div class="pref-budget-label">${t('foodfight.pref.budgetTier3')}</div>
              </button>
            </div>
          </section>

          <!-- 5. Atmosphere / Styles -->
          <section class="pref-section">
            <h3 class="pref-section-heading">${t('foodfight.pref.restaurantStyles')}</h3>
            <div class="pref-chips-grid">
              ${P.PREF_STYLES.map(sStr => {
                const parts = sStr.split(' / ');
                const label = isTH ? (parts[1] || parts[0]) : parts[0];
                const isSelected = (pref.restaurantStyles || []).includes(sStr);
                return `
                  <button 
                    type="button" 
                    class="pref-chip-btn ${isSelected ? 'selected' : ''}" 
                    data-category="restaurantStyles" 
                    data-val="${P.escapeHtml(sStr)}"
                    aria-pressed="${isSelected}"
                  >
                    <span class="pref-chip-icon">${isSelected ? '✓' : '＋'}</span>
                    <span>${P.escapeHtml(label)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <!-- 6. Additional Notes -->
          <section class="pref-section">
            <h3 class="pref-section-heading">${t('foodfight.pref.otherNotes')}</h3>
            <textarea 
              id="pref-notes-input" 
              class="pref-notes-textarea" 
              rows="2" 
              placeholder="${t('foodfight.pref.notesPlaceholder')}"
            >${P.escapeHtml(pref.otherNotes || '')}</textarea>
          </section>

          <!-- Bottom Action -->
          <div class="bottom-actions">
            <button type="button" id="btn-submit-preferences" class="btn btn-primary btn-lg">
              ${t('foodfight.pref.submit')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindMealPreferencesEvents() {
    const chips = document.querySelectorAll('.pref-chip-btn');
    const budgetCards = document.querySelectorAll('.pref-budget-card');
    const submitBtn = document.getElementById('btn-submit-preferences');
    const notesInput = document.getElementById('pref-notes-input');
    const state = P.getState();

    chips.forEach(chip => {
      chip.onclick = () => {
        const cat = chip.getAttribute('data-category');
        const val = chip.getAttribute('data-val');
        let cur = state.mealPreferences[cat] || [];
        const isSelected = cur.includes(val);
        if (isSelected) {
          state.mealPreferences[cat] = cur.filter(x => x !== val);
          chip.classList.remove('selected');
          chip.setAttribute('aria-pressed', 'false');
          const icon = chip.querySelector('.pref-chip-icon');
          if (icon) icon.textContent = '＋';
        } else {
          state.mealPreferences[cat] = [...cur, val];
          chip.classList.add('selected');
          chip.setAttribute('aria-pressed', 'true');
          const icon = chip.querySelector('.pref-chip-icon');
          if (icon) icon.textContent = '✓';
        }
        P.saveState();
      };
    });

    budgetCards.forEach(btn => {
      btn.onclick = () => {
        budgetCards.forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        state.mealPreferences.priceLevel = btn.getAttribute('data-price');
        P.saveState();
      };
    });

    if (submitBtn) {
      submitBtn.onclick = () => {
        if (notesInput) state.mealPreferences.otherNotes = notesInput.value.trim();
        P.saveState();
        P.navigateTo('#/foodfight/waiting');
      };
    }
  }

  /** Screen: Waiting for Members */
  function renderFoodFightWaiting() {
    const state = P.getState();
    const t = P.t;
    const members = state.room.members || [];
    const submittedCount = members.filter(m => m.hasSubmitted).length;

    return `
      <main class="app-shell" aria-labelledby="waiting-title">
        <header class="top-bar">
          <a href="#/foodfight/preferences" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('foodfight.waiting.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions" style="text-align:center;">
          <div style="font-size:42px;margin:1.5rem 0 0.5rem 0;">⏳</div>
          <h2 id="waiting-title" class="font-heading-1">${t('foodfight.waiting.title')}</h2>
          <p class="screen-subtitle">${t('foodfight.waiting.submitted', { count: submittedCount, total: members.length })}</p>

          <div class="members-roster-list" style="margin:1.5rem 0;text-align:left;display:flex;flex-direction:column;gap:0.5rem;">
            ${members.map(m => `
              <div class="card member-row" style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;">
                <div style="display:flex;align-items:center;gap:0.75rem;">
                  <div class="member-avatar ${m.colorClass || 'avatar-petal'}">${m.initials}</div>
                  <div style="font-weight:700;">${P.escapeHtml(m.name)}</div>
                </div>
                <span class="step-badge ${m.hasSubmitted ? 'status-ready' : 'status-waiting'}">
                  ${m.hasSubmitted ? `✓ ${t('common.done')}` : `⏳ ${t('common.notReady')}`}
                </span>
              </div>
            `).join('')}
          </div>

          <div class="bottom-actions">
            <a href="#/foodfight/generating" class="btn btn-primary btn-lg">
              ${t('foodfight.generating.title')} →
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodFightWaitingEvents() {}

  /** Screen: Generating Recommendations */
  function renderFoodFightGenerating() {
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="gen-title">
        <div class="page-shell page-shell-has-bottom-actions" style="text-align:center;padding-top:3rem;">
          <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>

          <!-- Radar Pulse Animation -->
          <div class="radar-pulse-container" style="position:relative;width:120px;height:120px;margin:0 auto 1.5rem auto;display:flex;align-items:center;justify-content:center;">
            <div class="radar-ring" style="position:absolute;width:100%;height:100%;border-radius:50%;border:2px solid var(--color-brand-secondary);opacity:0.3;animation:pulse 2s infinite;"></div>
            <div style="font-size:42px;">✨</div>
          </div>

          <h2 id="gen-title" class="font-heading-1">${t('foodfight.generating.title')}</h2>
          <p class="screen-subtitle">${t('foodfight.generating.subtitle')}</p>

          <div class="bottom-actions">
            <a href="#/recommendations" class="btn btn-primary btn-lg">
              ${t('recommend.round1.title')} →
            </a>
          </div>
        </div>
      </main>
    `;
  }

  /** Screen: Room Invite Link & QR Screen */
  function renderRoomInviteScreen() {
    const state = P.getState();
    const t = P.t;
    const code = state.room.roomCode || 'FF-4827';
    const link = state.room.inviteLink || `https://foodfight.app/join/${code}`;

    return `
      <main class="app-shell" aria-labelledby="invite-title">
        <header class="top-bar">
          <a href="#/room/lobby-host" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title" id="invite-title">${t('room.invite.modalTitle')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <section class="screen-header" style="text-align:center;">
            <h2 class="font-heading-1">${t('room.invite.modalTitle')}</h2>
            <p class="screen-subtitle">${t('room.invite.modalSubtitle')}</p>
          </section>

          <!-- Room Code Card -->
          <div class="card" style="text-align:center;background:var(--color-surface-subtle);padding:1.25rem;margin:1rem 0;">
            <div class="font-label text-muted" style="margin-bottom:0.25rem;">${t('room.lobby.roomCode')}</div>
            <div style="font-family:monospace;font-size:1.8rem;font-weight:700;letter-spacing:0.1em;color:var(--color-brand-primary);">
              ${P.escapeHtml(code)}
            </div>
            <button type="button" id="btn-copy-code-screen" class="btn btn-outline btn-sm" style="margin-top:0.75rem;background:#fff;border-radius:var(--radius-full);">
              📋 ${t('room.invite.copyCode')}
            </button>
          </div>

          <!-- Simulated QR Matrix Box -->
          <div class="qr-mock-container" style="text-align:center;margin:1rem 0;">
            <div class="qr-matrix-box" aria-label="Simulated QR Code" style="margin:0 auto;width:160px;height:160px;display:grid;grid-template-columns:repeat(5, 1fr);gap:4px;padding:12px;background:#fff;border:2px solid var(--color-brand-primary);border-radius:16px;">
              <div style="background:#48284A;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFE1C6;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div>
              <div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFE1C6;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFE1C6;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div>
              <div style="background:#FFE1C6;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFC6D9;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFE1C6;border-radius:4px;"></div>
              <div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFE1C6;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFE1C6;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div>
              <div style="background:#48284A;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#FFE1C6;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div><div style="background:#48284A;border-radius:4px;"></div>
            </div>
          </div>

          <!-- Share Link Box -->
          <div class="form-group" style="margin-bottom:1.5rem;">
            <label class="form-label">${t('room.join.byLink')}</label>
            <div style="display:flex;gap:0.5rem;">
              <input type="text" readonly value="${P.escapeHtml(link)}" class="form-input" style="font-size:0.8rem;background:var(--color-surface-subtle);" />
              <button type="button" id="btn-copy-link-screen" class="btn btn-secondary" style="width:auto;white-space:nowrap;padding:0 0.85rem;">
                ${t('room.invite.copyLink')}
              </button>
            </div>
          </div>

          <div class="bottom-actions">
            <a href="#/room/lobby-host" class="btn btn-primary btn-lg">
              ${t('common.done')}
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomInviteScreenEvents() {
    const state = P.getState();
    const code = state.room.roomCode || 'FF-4827';
    const link = state.room.inviteLink || `https://foodfight.app/join/${code}`;
    const copyCodeBtn = document.getElementById('btn-copy-code-screen');
    const copyLinkBtn = document.getElementById('btn-copy-link-screen');

    if (copyCodeBtn) copyCodeBtn.onclick = () => P.copyTextToClipboard(code, P.t('room.lobby.roomCode'));
    if (copyLinkBtn) copyLinkBtn.onclick = () => P.copyTextToClipboard(link, P.t('room.join.byLink'));
  }

  function bindFoodFightGeneratingEvents() {}

  // Expose to Prototype Namespace
  P.renderRoomCreate = renderRoomCreate;
  P.bindRoomCreateEvents = bindRoomCreateEvents;
  P.renderRoomJoinHub = renderRoomJoinHub;
  P.bindRoomJoinHubEvents = bindRoomJoinHubEvents;
  P.renderRoomCode = renderRoomCode;
  P.bindRoomCodeEvents = bindRoomCodeEvents;
  P.renderRoomScanQR = renderRoomScanQR;
  P.bindRoomScanQREvents = bindRoomScanQREvents;
  P.renderRoomInviteScreen = renderRoomInviteScreen;
  P.bindRoomInviteScreenEvents = bindRoomInviteScreenEvents;
  P.renderRoomPreview = renderRoomPreview;
  P.bindRoomPreviewEvents = bindRoomPreviewEvents;
  P.renderRoomLobbyHost = renderRoomLobbyHost;
  P.bindRoomLobbyHostEvents = bindRoomLobbyHostEvents;
  P.renderRoomLobbyMember = renderRoomLobbyMember;
  P.bindRoomLobbyMemberEvents = bindRoomLobbyMemberEvents;
  P.renderMealPreferences = renderMealPreferences;
  P.bindMealPreferencesEvents = bindMealPreferencesEvents;
  P.renderFoodFightWaiting = renderFoodFightWaiting;
  P.bindFoodFightWaitingEvents = bindFoodFightWaitingEvents;
  P.renderFoodFightGenerating = renderFoodFightGenerating;
  P.bindFoodFightGeneratingEvents = bindFoodFightGeneratingEvents;

})();
