/**
 * FoodFighter UX Prototype — Room & FoodFight Screens (V2)
 * 
 * Implements:
 *   - Room: Create Room, Join Room Hub, Room Code, Scan QR, Invite Link, Preview, Host Lobby, Member Lobby
 *   - FoodFight: Meal Preferences (6 categories), Waiting for Group Members, AI Generating Recommendations
 *   - Recommendations Boundary Shell (V3 Extension Point) & Future Shells
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
    return `
      <main class="app-shell" aria-labelledby="create-room-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Back to Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Create Room</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <section class="screen-header">
            <h2 id="create-room-title" class="font-heading-1">Set Up FoodFight Room</h2>
            <p class="screen-subtitle">Host a session and invite your group to decide on a meal.</p>
          </section>

          <form id="create-room-form">
            <div class="form-group">
              <label for="room-name-input" class="form-label form-label-required">Room Name</label>
              <input type="text" id="room-name-input" class="form-input" value="${P.escapeHtml(state.room.roomName || 'Dinner Food Fight')}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Search Location</label>
              <input type="text" id="room-location-input" class="form-input" value="${P.escapeHtml(state.room.location || 'Current Location (Sukhumvit)')}" />
            </div>

            <div class="form-group">
              <label class="form-label">Search Radius</label>
              <div class="pill-list" id="radius-pills">
                <button type="button" class="pill-item ${state.room.radius === '1 km' ? 'selected' : ''}" data-radius="1 km">1 km</button>
                <button type="button" class="pill-item ${state.room.radius === '3 km' ? 'selected' : ''}" data-radius="3 km">3 km</button>
                <button type="button" class="pill-item ${state.room.radius === '5 km' ? 'selected' : ''}" data-radius="5 km">5 km</button>
                <button type="button" class="pill-item ${state.room.radius === '10 km' ? 'selected' : ''}" data-radius="10 km">10 km</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Max Group Members</label>
              <div class="pill-list" id="max-member-pills">
                <button type="button" class="pill-item ${state.room.maxMembers === 4 ? 'selected' : ''}" data-max="4">4 Members</button>
                <button type="button" class="pill-item ${state.room.maxMembers === 6 ? 'selected' : ''}" data-max="6">6 Members</button>
                <button type="button" class="pill-item ${state.room.maxMembers === 8 ? 'selected' : ''}" data-max="8">8 Members</button>
              </div>
            </div>
          </form>

          <div class="bottom-actions">
            <button type="button" id="btn-submit-create-room" class="btn btn-primary btn-lg">
              Create Room & Open Lobby →
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
        const locInput = document.getElementById('room-location-input');
        if (nameInput) state.room.roomName = nameInput.value.trim() || 'Dinner Food Fight';
        if (locInput) state.room.location = locInput.value.trim() || 'Sukhumvit';

        state.room.role = 'host';
        state.room.roomCode = 'FF-4827';
        state.room.inviteLink = 'https://foodfight.app/join/FF-4827';
        state.room.foodFightStarted = false;
        state.room.simulatedTwoMinutesElapsed = false;

        // Ensure host is ready
        state.room.members[0].isReady = true;
        P.saveState();

        P.showToast('Room FF-4827 created successfully!', 'success');
        P.navigateTo('#/room/lobby-host');
      };
    }
  }

  /** Screen: Room Lobby — Host */
  function renderRoomLobbyHost() {
    const state = P.getState();
    const room = state.room;
    const members = room.members || [];
    const totalCount = members.length;
    const readyCount = members.filter(m => m.isReady).length;
    const readyRatio = totalCount > 0 ? readyCount / totalCount : 0;
    const isAllReady = readyCount === totalCount && totalCount > 0;
    const isThresholdMet = (readyRatio >= 0.6) && room.simulatedTwoMinutesElapsed;
    const canStart = isAllReady || isThresholdMet;

    return `
      <main class="app-shell" aria-labelledby="lobby-host-title">
        <header class="top-bar">
          <button type="button" id="btn-host-leave" class="top-bar-action" aria-label="Leave Room">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          <h1 class="top-bar-title">Room Lobby</h1>
          <button type="button" id="btn-host-open-invite" class="top-bar-action" aria-label="Invite Friends">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Room Identity Card -->
          <div class="room-identity-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <span class="step-badge" style="background:#FFF4CC;color:#7F4E00;border-color:#FFE082;">Host View</span>
                <h2 id="lobby-host-title" class="font-heading-2" style="margin-top:0.35rem;">
                  ${P.escapeHtml(room.roomName || 'Dinner Food Fight')}
                </h2>
                <div class="font-caption text-secondary" style="margin-top:0.2rem;">
                  📍 ${P.escapeHtml(room.location || 'Sukhumvit')} • Radius: ${P.escapeHtml(room.radius || '5 km')}
                </div>
              </div>
              
              <button type="button" id="btn-badge-copy-code" class="room-code-badge" title="Click to copy Room Code">
                <span>${P.escapeHtml(room.roomCode || 'FF-4827')}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>

          <!-- Readiness Summary Banner -->
          <div class="readiness-banner ${isAllReady ? 'ready-all' : (isThresholdMet ? 'threshold-met' : '')}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
              <span class="font-label" style="color:var(--color-brand-primary);">Member Readiness</span>
              <span style="font-size:0.85rem;font-weight:700;color:var(--color-brand-primary);">${readyCount} / ${totalCount} Ready (${Math.round(readyRatio * 100)}%)</span>
            </div>
            <div class="progress-track" style="margin-bottom:0.6rem;height:8px;">
              <div class="progress-fill" style="width:${Math.round(readyRatio * 100)}%;background:${isAllReady ? '#22863A' : 'linear-gradient(90deg, #FFC6D9, #916C80)'}"></div>
            </div>
            
            <p class="font-caption text-secondary" style="line-height:1.4;">
              ${isAllReady 
                ? '✅ <strong>All members are Ready!</strong> You can start the FoodFight now.'
                : (isThresholdMet 
                    ? '⚡ <strong>Threshold reached (≥60% ready + 2 min elapsed).</strong> You can start now with Ready members as Active participants.'
                    : '⏳ Waiting for members. (Rule: You can start when everyone is ready, or after 2 min if ≥60% are ready).')}
            </p>
          </div>

          <!-- Invite Button Banner -->
          <button type="button" id="btn-host-invite-card" class="btn btn-secondary" style="margin-bottom:1.25rem;">
            <span>📤 Invite Friends (Share Code / QR / Link)</span>
          </button>

          <!-- Members List -->
          <section>
            <h3 class="font-label text-secondary" style="margin-bottom:0.65rem;">Group Members (${totalCount})</h3>
            <div class="member-list">
              ${members.map(m => `
                <div class="member-card ${m.id === 'user' ? 'is-you' : ''}">
                  <div class="member-info">
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}">${P.escapeHtml(m.initials)}</div>
                    <div>
                      <div style="font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.35rem;">
                        ${P.escapeHtml(m.name)}
                        ${m.role === 'Host' ? '<span class="step-badge" style="font-size:0.65rem;padding:1px 5px;">Host</span>' : ''}
                      </div>
                      <div class="font-caption text-secondary">${m.isReady ? 'Participating as Active Member' : 'Will observe unless Ready'}</div>
                    </div>
                  </div>
                  
                  <div>
                    ${m.isReady 
                      ? '<span class="member-badge-ready">✓ Ready</span>' 
                      : '<span class="member-badge-waiting">⏳ Waiting</span>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Host Start CTA -->
          <div class="bottom-actions">
            <button type="button" id="btn-host-start-foodfight" class="btn btn-primary btn-lg" ${canStart ? '' : 'disabled'}>
              <span>${canStart ? 'Start FoodFight Now 🚀' : 'Waiting for Ready Members...'}</span>
            </button>
            <div class="font-caption text-muted text-center">
              ${canStart ? 'Active Members will submit their cravings' : 'Need 100% ready or ≥60% after 2 min threshold'}
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function bindRoomLobbyHostEvents() {
    const leaveBtn = document.getElementById('btn-host-leave');
    const inviteTopBtn = document.getElementById('btn-host-open-invite');
    const inviteCardBtn = document.getElementById('btn-host-invite-card');
    const copyCodeBtn = document.getElementById('btn-badge-copy-code');
    const startBtn = document.getElementById('btn-host-start-foodfight');
    const state = P.getState();

    if (leaveBtn) leaveBtn.onclick = () => P.showLeaveRoomModal();
    if (inviteTopBtn) inviteTopBtn.onclick = () => P.showInviteModal();
    if (inviteCardBtn) inviteCardBtn.onclick = () => P.showInviteModal();
    if (copyCodeBtn) {
      copyCodeBtn.onclick = () => P.copyTextToClipboard(state.room.roomCode || 'FF-4827', 'Room Code');
    }

    if (startBtn) {
      startBtn.onclick = () => {
        state.room.members.forEach(m => {
          m.isActive = m.isReady;
          m.hasSubmitted = false;
        });
        state.room.foodFightStarted = true;
        P.saveState();

        const activeCount = state.room.members.filter(m => m.isActive).length;
        const observerCount = state.room.members.length - activeCount;
        P.showToast(`FoodFight started! ${activeCount} Active, ${observerCount} Observers.`, 'success');
        P.navigateTo('#/foodfight/preferences');
      };
    }
  }

  /** Screen: Join Room Hub */
  function renderRoomJoinHub() {
    return `
      <main class="app-shell" aria-labelledby="join-hub-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Back to Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Join a Room</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="join-hub-title" class="font-heading-1">How would you like to join?</h2>
            <p class="screen-subtitle">Choose the method shared by your session host.</p>
          </section>

          <div style="display:flex;flex-direction:column;gap:0.9rem;margin-top:0.5rem;">
            <!-- Option 1: Enter Room Code -->
            <a href="#/room/code" class="action-card" style="flex-direction:row;align-items:center;text-align:left;gap:1rem;padding:1.15rem;">
              <div class="action-card-icon-bubble" style="background:#FFE1C6;margin-bottom:0;flex-shrink:0;">
                🔢
              </div>
              <div style="flex:1;">
                <div class="action-card-title">Enter Room Code</div>
                <div class="action-card-desc">Type the 6-character code (e.g. FF-4827)</div>
              </div>
              <span>→</span>
            </a>

            <!-- Option 2: Scan QR Code -->
            <a href="#/room/scan-qr" class="action-card" style="flex-direction:row;align-items:center;text-align:left;gap:1rem;padding:1.15rem;">
              <div class="action-card-icon-bubble" style="background:#FFC6D9;margin-bottom:0;flex-shrink:0;">
                📷
              </div>
              <div style="flex:1;">
                <div class="action-card-title">Scan QR Code</div>
                <div class="action-card-desc">Point your camera at the host's screen</div>
              </div>
              <span>→</span>
            </a>

            <!-- Option 3: Invite Link -->
            <a href="#/room/invite" class="action-card" style="flex-direction:row;align-items:center;text-align:left;gap:1rem;padding:1.15rem;">
              <div class="action-card-icon-bubble" style="background:#FFF7AE;margin-bottom:0;flex-shrink:0;">
                🔗
              </div>
              <div style="flex:1;">
                <div class="action-card-title">Use Invite Link</div>
                <div class="action-card-desc">Open directly from a shared WhatsApp or LINE link</div>
              </div>
              <span>→</span>
            </a>
          </div>

          <!-- Demo Quick Join Card -->
          <div class="card" style="margin-top:1.5rem;background:var(--color-surface-subtle);text-align:center;">
            <div class="font-label text-muted" style="margin-bottom:0.25rem;">Active Demo Room</div>
            <div style="font-weight:700;font-size:1.1rem;color:var(--color-brand-primary);">
              Dinner Food Fight (FF-4827)
            </div>
            <a href="#/room/preview" class="btn btn-outline btn-sm" style="margin-top:0.75rem;background:#fff;border-radius:var(--radius-full);">
              Quick Preview & Join Demo Room
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomJoinHubEvents() {}

  /** Screen: Enter Room Code */
  function renderRoomCode() {
    return `
      <main class="app-shell" aria-labelledby="code-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Enter Room Code</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 id="code-title" class="font-heading-1">Type 6-Digit Code</h2>
            <p class="screen-subtitle">Ask your host for the room code displayed in their lobby.</p>
          </section>

          <div id="room-code-alert"></div>

          <form id="enter-code-form">
            <div class="form-group" style="text-align:center;">
              <input 
                type="text" 
                id="input-room-code" 
                class="form-input" 
                placeholder="FF-4827" 
                value="FF-4827"
                style="text-align:center;font-size:1.5rem;font-weight:700;letter-spacing:0.15em;font-family:monospace;text-transform:uppercase;"
                required 
              />
            </div>

            <div class="alert alert-info" style="font-size:0.8rem;">
              <span>💡 <strong>Demo Code:</strong> Try <code>FF-4827</code> (or <code>FF-0000</code> to test invalid room error).</span>
            </div>

            <button type="submit" id="btn-submit-code" class="btn btn-primary btn-lg" style="margin-top:1rem;">
              Continue to Room →
            </button>
          </form>
        </div>
      </main>
    `;
  }

  function bindRoomCodeEvents() {
    const form = document.getElementById('enter-code-form');
    const alertArea = document.getElementById('room-code-alert');
    const input = document.getElementById('input-room-code');
    const state = P.getState();

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const code = input.value.trim().toUpperCase();
        if (!code) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter a room code.</div>`;
          return;
        }

        if (code === 'FF-0000') {
          alertArea.innerHTML = `<div class="alert alert-danger">Room code not found. Please try <code>FF-4827</code>.</div>`;
        } else {
          state.room.role = 'member';
          state.room.roomCode = code;
          P.saveState();
          P.showToast(`Found room ${code}!`, 'success');
          P.navigateTo('#/room/preview');
        }
      };
    }
  }

  /** Screen: Scan QR Code (Simulation) */
  function renderRoomScanQR() {
    return `
      <main class="app-shell" aria-labelledby="scan-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Scan Room QR</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 id="scan-title" class="font-heading-1">Scan to Join</h2>
            <p class="screen-subtitle">Align the host's QR code within the frame below.</p>
          </section>

          <!-- Camera Viewfinder Simulation -->
          <div class="camera-scanner-frame">
            <div class="scanner-reticle">
              <div class="scanner-laser"></div>
              <span style="color:rgba(255,255,255,0.7);font-size:0.8rem;text-align:center;padding:1rem;">
                Align QR Code
              </span>
            </div>
          </div>

          <div style="text-align:center;margin:1rem 0;">
            <p class="font-caption text-muted">Zero camera permissions required in prototype mode</p>
          </div>

          <button type="button" id="btn-simulate-qr-found" class="btn btn-primary btn-lg">
            ⚡ Simulate QR Scan Found (FF-4827)
          </button>
        </div>
      </main>
    `;
  }

  function bindRoomScanQREvents() {
    const simBtn = document.getElementById('btn-simulate-qr-found');
    const state = P.getState();
    if (simBtn) {
      simBtn.onclick = () => {
        state.room.role = 'member';
        state.room.roomCode = 'FF-4827';
        P.saveState();
        P.showToast('QR Code scanned: FF-4827', 'success');
        P.navigateTo('#/room/preview');
      };
    }
  }

  /** Screen: Invite Link / Share View */
  function renderRoomInviteScreen() {
    const state = P.getState();
    const code = state.room.roomCode || 'FF-4827';
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Invite Link</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 class="font-heading-1">Invite Link Resolver</h2>
            <p class="screen-subtitle">Simulating opening a shared FoodFight link</p>
          </section>

          <div class="card" style="text-align:center;padding:1.5rem;margin:1rem 0;">
            <div class="font-label text-muted" style="margin-bottom:0.25rem;">Detected URL</div>
            <code style="font-size:0.85rem;color:var(--color-brand-primary);word-break:break-all;">
              https://foodfight.app/join/${P.escapeHtml(code)}
            </code>
          </div>

          <button type="button" id="btn-resolve-invite-link" class="btn btn-primary btn-lg" style="margin-top:1rem;">
            Open Room Preview →
          </button>
        </div>
      </main>
    `;
  }

  function bindRoomInviteScreenEvents() {
    const btn = document.getElementById('btn-resolve-invite-link');
    const state = P.getState();
    if (btn) {
      btn.onclick = () => {
        state.room.role = 'member';
        P.saveState();
        P.showToast('Invite link resolved!', 'success');
        P.navigateTo('#/room/preview');
      };
    }
  }

  /** Screen: Room Preview (Pre-Join Confirmation) */
  function renderRoomPreview() {
    const state = P.getState();
    const room = state.room;
    return `
      <main class="app-shell" aria-labelledby="preview-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Room Preview</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <section class="screen-header screen-header-center">
            <div class="brand-badge-logo" style="margin:0 auto 1rem auto;">🍽️</div>
            <h2 id="preview-title" class="font-heading-1">${P.escapeHtml(room.roomName || 'Dinner Food Fight')}</h2>
            <p class="screen-subtitle">Hosted by <strong>Alex Johnson</strong> • Code: <code>${P.escapeHtml(room.roomCode || 'FF-4827')}</code></p>
          </section>

          <div class="card" style="margin:1rem 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <span class="font-label text-secondary">Members in Room</span>
              <span class="step-badge">${(room.members || []).length} Waiting</span>
            </div>
            
            <div style="display:flex;align-items:center;gap:0.5rem;padding:0.25rem 0;">
              ${(room.members || []).map(m => `
                <div class="avatar-badge ${m.colorClass || 'avatar-petal'}" title="${P.escapeHtml(m.name)}">${P.escapeHtml(m.initials)}</div>
              `).join('')}
            </div>
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-confirm-join-room" class="btn btn-primary btn-lg">
              Join Room as Member →
            </button>
            <a href="#/room/join" class="btn btn-secondary">Cancel</a>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomPreviewEvents() {
    const btn = document.getElementById('btn-confirm-join-room');
    const state = P.getState();
    if (btn) {
      btn.onclick = () => {
        state.room.role = 'member';
        state.room.roomJoined = true;
        P.saveState();
        P.showToast('Joined Dinner Food Fight!', 'success');
        P.navigateTo('#/room/lobby-member');
      };
    }
  }

  /** Screen: Room Lobby — Member */
  function renderRoomLobbyMember() {
    const state = P.getState();
    const room = state.room;
    const members = room.members || [];
    const userMember = members.find(m => m.id === 'user') || { isReady: false };
    const isUserReady = !!userMember.isReady;

    return `
      <main class="app-shell" aria-labelledby="lobby-member-title">
        <header class="top-bar">
          <button type="button" id="btn-member-leave" class="top-bar-action" aria-label="Leave Room">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          <h1 class="top-bar-title">Room Lobby</h1>
          <button type="button" id="btn-member-open-invite" class="top-bar-action" aria-label="Invite Friends">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <div class="room-identity-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <span class="step-badge" style="background:#EFF6FC;color:#185582;border-color:#A7D3F3;">Member View</span>
                <h2 id="lobby-member-title" class="font-heading-2" style="margin-top:0.35rem;">
                  ${P.escapeHtml(room.roomName || 'Dinner Food Fight')}
                </h2>
                <div class="font-caption text-secondary" style="margin-top:0.2rem;">
                  Host: <strong>Maya Lin</strong> • Radius: ${P.escapeHtml(room.radius || '5 km')}
                </div>
              </div>
              
              <button type="button" id="btn-member-copy-code" class="room-code-badge" title="Click to copy code">
                <span>${P.escapeHtml(room.roomCode || 'FF-4827')}</span>
              </button>
            </div>
          </div>

          <!-- User Personal Readiness Status Card -->
          <div class="card ${isUserReady ? 'alert-success' : 'alert-warning'}" style="margin-bottom:1.25rem;border-radius:var(--radius-xl);">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div class="font-label" style="margin-bottom:0.2rem;">Your Status</div>
                <div style="font-size:1.05rem;font-weight:700;">
                  ${isUserReady ? '✅ You are READY!' : '⏳ You are NOT READY yet'}
                </div>
                <div class="font-caption" style="margin-top:0.25rem;">
                  ${isUserReady 
                    ? 'You will participate in AI dish recommendations & voting.' 
                    : 'Press Ready below before the host starts to participate!'}
                </div>
              </div>
            </div>
          </div>

          <!-- Group Members List -->
          <section>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.65rem;">
              <h3 class="font-label text-secondary">Group Members (${members.length})</h3>
              <button type="button" id="btn-member-invite-link" class="font-caption text-secondary" style="font-weight:600;text-decoration:underline;">
                + Invite more
              </button>
            </div>

            <div class="member-list">
              ${members.map(m => `
                <div class="member-card ${m.id === 'user' ? 'is-you' : ''}">
                  <div class="member-info">
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}">${P.escapeHtml(m.initials)}</div>
                    <div>
                      <div style="font-size:0.9rem;font-weight:600;">
                        ${P.escapeHtml(m.name)}
                        ${m.role === 'Host' ? '<span class="step-badge" style="font-size:0.65rem;padding:1px 5px;margin-left:4px;">Host</span>' : ''}
                      </div>
                      <div class="font-caption text-secondary">${m.isReady ? 'Ready to vote' : 'Waiting...'}</div>
                    </div>
                  </div>
                  <div>
                    ${m.isReady 
                      ? '<span class="member-badge-ready">✓ Ready</span>' 
                      : '<span class="member-badge-waiting">⏳ Waiting</span>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Member Toggle Ready CTA -->
          <div class="bottom-actions">
            <button type="button" id="btn-toggle-member-ready" class="btn ${isUserReady ? 'btn-secondary' : 'btn-primary'} btn-lg">
              <span>${isUserReady ? 'Cancel Ready (Become Not Ready)' : 'I\'m Ready! (Ready to Vote) ✅'}</span>
            </button>
            <div class="font-caption text-muted text-center">
              Host will start FoodFight once members are ready
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function bindRoomLobbyMemberEvents() {
    const leaveBtn = document.getElementById('btn-member-leave');
    const inviteBtn = document.getElementById('btn-member-open-invite');
    const inviteLink = document.getElementById('btn-member-invite-link');
    const copyCodeBtn = document.getElementById('btn-member-copy-code');
    const readyToggleBtn = document.getElementById('btn-toggle-member-ready');
    const state = P.getState();

    if (leaveBtn) leaveBtn.onclick = () => P.showLeaveRoomModal();
    if (inviteBtn) inviteBtn.onclick = () => P.showInviteModal();
    if (inviteLink) inviteLink.onclick = () => P.showInviteModal();
    if (copyCodeBtn) {
      copyCodeBtn.onclick = () => P.copyTextToClipboard(state.room.roomCode || 'FF-4827', 'Room Code');
    }

    if (readyToggleBtn) {
      readyToggleBtn.onclick = () => {
        const userMem = state.room.members.find(m => m.id === 'user');
        if (userMem) {
          userMem.isReady = !userMem.isReady;
          P.saveState();
          P.showToast(userMem.isReady ? 'You are now Ready!' : 'Ready status cancelled', 'info');
          if (P.renderCurrentRoute) P.renderCurrentRoute();
        }
      };
    }
  }

  /* ==========================================================================
     2. FoodFight Screens (Preferences, Waiting, Generating)
     ========================================================================== */

  /** Screen: Meal Preferences */
  function renderMealPreferences() {
    const state = P.getState();
    const prefs = state.mealPreferences;

    return `
      <main class="app-shell" aria-labelledby="pref-title">
        <header class="top-bar">
          <div style="width:38px;"></div>
          <h1 class="top-bar-title">Meal Preferences</h1>
          <button type="button" id="btn-pref-exit" class="top-bar-action" aria-label="Leave Session">✕</button>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <section class="screen-header">
            <div style="display:flex;align-items:center;gap:0.45rem;margin-bottom:0.35rem;">
              <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Active Member</span>
              <span class="font-caption text-secondary">Step 1 of 2</span>
            </div>
            <h2 id="pref-title" class="font-heading-1">What are you craving?</h2>
            <p class="screen-subtitle">Select your preferences for this group meal.</p>
          </section>

          <!-- Category 1: Food Type -->
          <div class="pref-category-block">
            <div class="pref-category-title">1. ประเภทอาหาร / Food Type</div>
            <div class="pref-category-sub">Select one or more categories</div>
            <div class="pill-list" id="pref-food-types">
              ${P.PREF_FOOD_TYPES.map(t => {
                const sel = (prefs.foodTypes || []).includes(t);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${P.escapeHtml(t)}">${P.escapeHtml(t)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 2: Cuisine / Nationality -->
          <div class="pref-category-block">
            <div class="pref-category-title">2. สัญชาติ / Cuisine</div>
            <div class="pref-category-sub">Nationalities you would like to eat</div>
            <div class="pill-list" id="pref-cuisines">
              ${P.PREF_CUISINES.map(c => {
                const sel = (prefs.cuisines || []).includes(c);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${P.escapeHtml(c)}">${P.escapeHtml(c)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 3: Ingredients -->
          <div class="pref-category-block">
            <div class="pref-category-title">3. วัตถุดิบ / Preferred Ingredients</div>
            <div class="pref-category-sub">Key proteins or ingredients desired</div>
            <div class="pill-list" id="pref-ingredients">
              ${P.PREF_INGREDIENTS.map(i => {
                const sel = (prefs.ingredients || []).includes(i);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${P.escapeHtml(i)}">${P.escapeHtml(i)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 4: Price Level -->
          <div class="pref-category-block">
            <div class="pref-category-title">4. ระดับราคา / Budget Level</div>
            <div class="pref-category-sub">Single select budget tier</div>
            <div class="price-level-grid" id="pref-price-grid">
              ${P.PREF_PRICE_LEVELS.map(p => {
                const sel = prefs.priceLevel === p.symbol;
                return `
                  <button type="button" class="price-card ${sel ? 'selected' : ''}" data-price="${p.symbol}">
                    <div class="price-symbol">${p.symbol}</div>
                    <div style="font-size:0.85rem;font-weight:600;">${p.title}</div>
                    <div class="price-label">${p.sub}</div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Category 5: Restaurant Style -->
          <div class="pref-category-block">
            <div class="pref-category-title">5. สไตล์ร้าน / Dining Style</div>
            <div class="pref-category-sub">Atmosphere and setting</div>
            <div class="pill-list" id="pref-styles">
              ${P.PREF_STYLES.map(s => {
                const sel = (prefs.restaurantStyles || []).includes(s);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${P.escapeHtml(s)}">${P.escapeHtml(s)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 6: Other Notes -->
          <div class="pref-category-block">
            <div class="pref-category-title">6. ความต้องการเพิ่มเติม / Other Notes</div>
            <div class="pref-category-sub">Specific cravings or extra group notes</div>
            <textarea id="pref-other-notes" class="form-textarea" placeholder="วันนี้อยากกินอะไรเป็นพิเศษ? (เช่น ไม่อยากกินของทอด, อยากได้ร้านเดินทางสะดวก)">${P.escapeHtml(prefs.otherNotes || '')}</textarea>
          </div>

          <!-- Submit CTA -->
          <div class="bottom-actions">
            <button type="button" id="btn-submit-preferences" class="btn btn-primary btn-lg">
              Submit Preferences →
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindMealPreferencesEvents() {
    const state = P.getState();

    const bindPillGroup = (containerId, stateKey) => {
      const pills = document.querySelectorAll(`#${containerId} .pill-item`);
      pills.forEach(p => {
        p.onclick = () => {
          const val = p.getAttribute('data-val');
          let current = state.mealPreferences[stateKey] || [];
          current = current.includes(val) ? current.filter(x => x !== val) : [...current, val];
          state.mealPreferences[stateKey] = current;
          p.classList.toggle('selected', current.includes(val));
          P.saveState();
        };
      });
    };

    bindPillGroup('pref-food-types', 'foodTypes');
    bindPillGroup('pref-cuisines', 'cuisines');
    bindPillGroup('pref-ingredients', 'ingredients');
    bindPillGroup('pref-styles', 'restaurantStyles');

    const priceCards = document.querySelectorAll('#pref-price-grid .price-card');
    priceCards.forEach(card => {
      card.onclick = () => {
        priceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.mealPreferences.priceLevel = card.getAttribute('data-price');
        P.saveState();
      };
    });

    const exitBtn = document.getElementById('btn-pref-exit');
    if (exitBtn) exitBtn.onclick = () => P.showLeaveRoomModal();

    const submitBtn = document.getElementById('btn-submit-preferences');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const notesInput = document.getElementById('pref-other-notes');
        if (notesInput) state.mealPreferences.otherNotes = notesInput.value.trim();

        const userMem = state.room.members.find(m => m.id === 'user');
        if (userMem) userMem.hasSubmitted = true;
        P.saveState();

        P.showToast('Preferences submitted!', 'success');
        P.navigateTo('#/foodfight/waiting');
      };
    }
  }

  /** Screen: Waiting for Members */
  function renderFoodFightWaiting() {
    const state = P.getState();
    const members = state.room.members || [];
    const activeMembers = members.filter(m => m.isActive);
    const observerMembers = members.filter(m => !m.isActive);
    const submittedCount = activeMembers.filter(m => m.hasSubmitted).length;
    const totalActive = activeMembers.length;
    const allSubmitted = submittedCount === totalActive && totalActive > 0;

    return `
      <main class="app-shell" aria-labelledby="waiting-title">
        <header class="top-bar">
          <div style="width:38px;"></div>
          <h1 class="top-bar-title">FoodFight Session</h1>
          <button type="button" id="btn-waiting-exit" class="top-bar-action" aria-label="Exit">✕</button>
        </header>

        <div class="page-shell">
          
          <div class="waiting-hero-card">
            <div class="brand-badge-logo" style="margin:0 auto 0.75rem auto;">
              <span class="spinner spinner-primary"></span>
            </div>
            <h2 id="waiting-title" class="font-heading-1">Waiting for Group</h2>
            <p class="screen-subtitle" style="margin-top:0.25rem;">
              ${allSubmitted 
                ? '🎉 All active members have submitted! Synthesizing AI recommendations...' 
                : 'Waiting for active members to complete their cravings.'}
            </p>

            <div style="margin-top:1.25rem;">
              <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:600;margin-bottom:0.35rem;">
                <span>Submissions</span>
                <span>${submittedCount} of ${totalActive} Submitted</span>
              </div>
              <div class="progress-track" style="height:8px;">
                <div class="progress-fill" style="width:${Math.round((submittedCount / totalActive) * 100)}%;"></div>
              </div>
            </div>
          </div>

          <!-- Active Members List -->
          <section style="margin-bottom:1.5rem;">
            <h3 class="font-label text-secondary" style="margin-bottom:0.65rem;">Active Members (${totalActive})</h3>
            <div class="member-list">
              ${activeMembers.map(m => `
                <div class="member-card">
                  <div class="member-info">
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}">${P.escapeHtml(m.initials)}</div>
                    <div>
                      <div style="font-size:0.9rem;font-weight:600;">${P.escapeHtml(m.name)}</div>
                      <div class="font-caption text-secondary">${m.hasSubmitted ? 'Submitted preferences' : 'Choosing preferences...'}</div>
                    </div>
                  </div>
                  <div>
                    ${m.hasSubmitted 
                      ? '<span class="member-badge-ready">✓ Submitted</span>' 
                      : '<span class="member-badge-waiting"><span class="spinner" style="width:12px;height:12px;"></span> Waiting</span>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Observers List (If any) -->
          ${observerMembers.length > 0 ? `
            <section style="margin-bottom:1.5rem;">
              <h3 class="font-label text-muted" style="margin-bottom:0.5rem;">Observers (${observerMembers.length})</h3>
              <div class="card" style="background:var(--color-surface-subtle);padding:0.75rem 1rem;">
                <div class="font-caption text-secondary" style="line-height:1.4;">
                  ${observerMembers.map(m => `<strong>${P.escapeHtml(m.name)}</strong>`).join(', ')} joined as observers (not ready at start) and will follow along without submitting preferences.
                </div>
              </div>
            </section>
          ` : ''}

        </div>
      </main>
    `;
  }

  function bindFoodFightWaitingEvents() {
    const exitBtn = document.getElementById('btn-waiting-exit');
    if (exitBtn) exitBtn.onclick = () => P.showLeaveRoomModal();

    const state = P.getState();
    const members = state.room.members || [];
    const activeMembers = members.filter(m => m.isActive);
    const submittedCount = activeMembers.filter(m => m.hasSubmitted).length;

    if (submittedCount === activeMembers.length && activeMembers.length > 0) {
      setTimeout(() => {
        P.navigateTo('#/foodfight/generating');
      }, 700);
    }
  }

  /** Screen: Generating Recommendations */
  function renderFoodFightGenerating() {
    return `
      <main class="app-shell" aria-labelledby="generating-title">
        <header class="top-bar">
          <div style="width:38px;"></div>
          <h1 class="top-bar-title">AI Synthesis</h1>
          <div style="width:38px;"></div>
        </header>

        <div class="page-shell">
          <div class="generating-container">
            
            <div class="radar-pulse-box">
              <div class="radar-pulse-ring"></div>
              <div class="radar-pulse-ring-2"></div>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>

            <div>
              <h2 id="generating-title" class="font-heading-1">Finding the Best Match</h2>
              <p class="screen-subtitle" style="margin-top:0.35rem;max-width:320px;">
                AI is analyzing active member allergies, dietary constraints, budgets, and cravings...
              </p>
            </div>

            <!-- Live synthesis tags preview -->
            <div class="synthesis-tag-list">
              <div class="synthesis-tag-item">
                <span>🛡️</span>
                <span>Allergens & Dietary Constraints checked (0 conflicts)</span>
              </div>
              <div class="synthesis-tag-item">
                <span>🍜</span>
                <span>Top Cravings Synthesized: Noodles & Hot Pot</span>
              </div>
              <div class="synthesis-tag-item">
                <span>💰</span>
                <span>Budget Tier: ฿฿ Moderate (150-400 THB)</span>
              </div>
              <div class="synthesis-tag-item">
                <span>📍</span>
                <span>Filtering within 5 km of Sukhumvit</span>
              </div>
            </div>

            <div class="progress-track" style="width:200px;height:6px;margin-top:1rem;">
              <div class="progress-fill" style="width:100%;animation:laserScan 1.5s infinite;"></div>
            </div>

          </div>
        </div>
      </main>
    `;
  }

  function bindFoodFightGeneratingEvents() {
    setTimeout(() => {
      P.showToast('AI recommendations generated successfully!', 'success');
      P.navigateTo('#/recommendations');
    }, 1500);
  }

  /* ==========================================================================
     3. Recommendations Boundary & Future Shells
     ========================================================================== */

  /** V3 Boundary Screen: Recommendations Ready */
  function renderRecommendationsBoundaryShell() {
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Recommended Menus</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell">
          <div class="future-shell-container">
            
            <div class="future-shell-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">
              V2 PHASE COMPLETE • CONTINUES IN V3
            </div>

            <div class="future-shell-card" style="border-style:solid;border-color:var(--color-brand-secondary);">
              <div class="future-shell-icon" style="background:var(--color-accent-custard);font-size:32px;">
                🎉
              </div>

              <h2 class="font-heading-2" style="margin-top:0.35rem;">
                Recommendations Are Ready!
              </h2>

              <p class="font-body-small text-secondary" style="max-width:320px;line-height:1.45;">
                AI has successfully synthesized your group's food profiles, dietary constraints, and meal preferences.
              </p>

              <div class="card" style="background:var(--color-surface-subtle);text-align:left;width:100%;margin-top:0.5rem;">
                <div class="font-label text-secondary" style="margin-bottom:0.25rem;">Next in Prototype V3:</div>
                <ul style="font-size:0.8rem;color:var(--color-text-secondary);padding-left:1.15rem;line-height:1.4;">
                  <li>2-Dish Recommendation Cards & Allergens</li>
                  <li>Interactive OK / PASS Group Voting</li>
                  <li>Consensus & Round 2 Re-recommendation</li>
                  <li>4-Dish Final Vote Tie-Break</li>
                  <li>Final Menu Winner Reveal & Restaurants</li>
                </ul>
              </div>
            </div>

            <div style="width:100%;display:flex;flex-direction:column;gap:0.65rem;margin-top:1rem;">
              <a href="#/home" class="btn btn-primary">
                Return to Home Dashboard
              </a>
              <button type="button" id="btn-open-proto-nav-v3" class="btn btn-secondary">
                Open Screen Navigator
              </button>
            </div>

          </div>
        </div>
      </main>
    `;
  }

  function bindRecommendationsBoundaryEvents() {
    const navBtn = document.getElementById('btn-open-proto-nav-v3');
    if (navBtn) navBtn.onclick = () => P.openPrototypeNavigator();
  }

  /** Future Screen Shell (For Unimplemented Screens) */
  function renderFutureShell(screen) {
    const isExploration = screen.scope === 'PROTOTYPE_EXPLORATION';

    return `
      <main class="app-shell" aria-labelledby="shell-screen-title">
        <header class="top-bar">
          <button type="button" id="btn-shell-back" class="top-bar-action" aria-label="Go Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <h1 class="top-bar-title">${P.escapeHtml(screen.title)}</h1>
          <a href="#/home" class="top-bar-action" aria-label="Go Home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
        </header>

        <div class="page-shell">
          <div class="future-shell-container">
            <div class="future-shell-badge">
              <span>${P.escapeHtml(screen.category)}</span>
              ${isExploration ? '• EXPLORATION' : ''}
            </div>

            <div class="future-shell-card">
              <div class="future-shell-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              </div>

              <h2 id="shell-screen-title" class="font-heading-2" style="margin-top:0.35rem;">
                ${P.escapeHtml(screen.title)}
              </h2>

              <p class="font-body-small text-secondary" style="max-width:320px;line-height:1.45;">
                ${P.escapeHtml(screen.description)}
              </p>

              <div class="step-badge" style="margin-top:0.5rem;background:var(--color-surface-subtle);color:var(--color-brand-secondary);">
                COMING IN NEXT PROTOTYPE PHASE
              </div>
            </div>

            <div style="width:100%;display:flex;flex-direction:column;gap:0.65rem;margin-top:1rem;">
              <a href="#/home" class="btn btn-primary">Return to Home Dashboard</a>
              <button type="button" id="btn-open-proto-nav-from-shell" class="btn btn-secondary">Open Screen Navigator</button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  function bindFutureShellEvents() {
    const backBtn = document.getElementById('btn-shell-back');
    if (backBtn) {
      backBtn.onclick = () => {
        if (window.history.length > 1) window.history.back();
        else P.navigateTo('#/home');
      };
    }
    const navBtn = document.getElementById('btn-open-proto-nav-from-shell');
    if (navBtn) navBtn.onclick = () => P.openPrototypeNavigator();
  }

  function renderNotFoundShell(hash) {
    return `
      <main class="app-shell">
        <header class="top-bar"><h1 class="top-bar-title">Screen Not Found</h1></header>
        <div class="page-shell">
          <div class="future-shell-container">
            <h2 class="font-heading-1">404</h2>
            <p class="font-body-small text-secondary">Route <code>${P.escapeHtml(hash)}</code> is not registered.</p>
            <a href="#/home" class="btn btn-primary" style="margin-top:1rem;">Go to Home</a>
          </div>
        </div>
      </main>
    `;
  }

  // Expose to Prototype Namespace
  P.renderRoomCreate = renderRoomCreate;
  P.bindRoomCreateEvents = bindRoomCreateEvents;
  P.renderRoomLobbyHost = renderRoomLobbyHost;
  P.bindRoomLobbyHostEvents = bindRoomLobbyHostEvents;
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
  P.renderRoomLobbyMember = renderRoomLobbyMember;
  P.bindRoomLobbyMemberEvents = bindRoomLobbyMemberEvents;
  P.renderMealPreferences = renderMealPreferences;
  P.bindMealPreferencesEvents = bindMealPreferencesEvents;
  P.renderFoodFightWaiting = renderFoodFightWaiting;
  P.bindFoodFightWaitingEvents = bindFoodFightWaitingEvents;
  P.renderFoodFightGenerating = renderFoodFightGenerating;
  P.bindFoodFightGeneratingEvents = bindFoodFightGeneratingEvents;
  P.renderRecommendationsBoundaryShell = renderRecommendationsBoundaryShell;
  P.bindRecommendationsBoundaryEvents = bindRecommendationsBoundaryEvents;
  P.renderFutureShell = renderFutureShell;
  P.bindFutureShellEvents = bindFutureShellEvents;
  P.renderNotFoundShell = renderNotFoundShell;

})();
