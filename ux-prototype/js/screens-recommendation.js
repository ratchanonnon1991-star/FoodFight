/**
 * FoodFighter UX Prototype — Recommendation & Voting Screens (V3)
 * 
 * Implements:
 *   - AI Recommendation Menus (Round 1 & Round 2)
 *   - Active Member OK / PASS Voting Interaction
 *   - 60% Acceptance Threshold Math
 *   - Voting Result Breakdown & Consensus Evaluation
 *   - Recommend Again (Round 2 New Dishes)
 *   - 4-Dish Final Vote
 *   - Head/Host Tie-Break Resolution
 *   - Final Menu Celebratory Winner Announcement (Transitions to V4 Restaurant Boundary)
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Helper Calculations & Vote Mathematics
     ========================================================================== */

  function getActiveMembers() {
    const state = P.getState();
    const members = state.room.members || [];
    const active = members.filter(m => m.isActive);
    return active.length > 0 ? active : members.slice(0, 3);
  }

  function isCurrentUserActive() {
    const state = P.getState();
    const userMem = (state.room.members || []).find(m => m.id === 'user');
    return userMem ? !!userMem.isActive : true;
  }

  function getRoundMenus(roundNumber = 1) {
    if (roundNumber === 2) {
      return [P.CANDIDATE_MENUS['menu-c'], P.CANDIDATE_MENUS['menu-d']];
    }
    return [P.CANDIDATE_MENUS['menu-a'], P.CANDIDATE_MENUS['menu-b']];
  }

  function calculateRoundResults(roundNumber = 1) {
    const state = P.getState();
    const activeMembers = getActiveMembers();
    const totalActive = activeMembers.length;
    const roundMenus = getRoundMenus(roundNumber);
    const roundVotes = (state.recommendation.roundVotes && state.recommendation.roundVotes[roundNumber]) || {};

    const menuResults = roundMenus.map(menu => {
      let okCount = 0;
      let passCount = 0;

      activeMembers.forEach(mem => {
        const memVotes = roundVotes[mem.id] || {};
        const vote = memVotes[menu.id];
        if (vote === 'OK') okCount++;
        else if (vote === 'PASS') passCount++;
      });

      const okPercentage = totalActive > 0 ? Math.round((okCount / totalActive) * 100) : 0;
      const isWinner = okPercentage >= 60;

      return {
        menu,
        okCount,
        passCount,
        okPercentage,
        isWinner
      };
    });

    const winningMenus = menuResults.filter(r => r.isWinner);
    let singleWinner = null;
    if (winningMenus.length === 1) {
      singleWinner = winningMenus[0].menu;
    } else if (winningMenus.length > 1) {
      winningMenus.sort((a, b) => b.okPercentage - a.okPercentage);
      singleWinner = winningMenus[0].menu;
    }

    return {
      roundNumber,
      totalActive,
      menuResults,
      winningMenus,
      singleWinner,
      hasWinner: !!singleWinner
    };
  }

  /* ==========================================================================
     2. Screen: Recommended Menus & OK/PASS Voting (Round 1 & Round 2)
     ========================================================================== */

  function renderRecommendations(roundNumber = 1) {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const isHost = state.room.role === 'host';
    const isMemberActive = isCurrentUserActive();
    const roundMenus = getRoundMenus(roundNumber);
    const userVotes = (state.recommendation.roundVotes && state.recommendation.roundVotes[roundNumber] && state.recommendation.roundVotes[roundNumber]['user']) || {};
    const activeMembers = getActiveMembers();

    const titleText = roundNumber === 1 ? t('recommend.round1.title') : t('recommend.round2.title');

    return `
      <main class="app-shell" aria-labelledby="recs-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/foodfight/waiting" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${titleText}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- Active / Observer Status Bar -->
          <div class="card" style="background:var(--color-surface-subtle);margin-bottom:1.25rem;padding:0.75rem 1rem;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span class="step-badge" style="background:${isMemberActive ? '#EDF9F0' : '#FFF0F0'};color:${isMemberActive ? '#165E2A' : '#8E1F1F'};">
                ${isMemberActive ? `✓ ${t('common.member')}` : `👁️ ${t('common.observer')}`}
              </span>
              <span class="font-caption text-secondary">
                ${activeMembers.length} ${t('common.member')}
              </span>
            </div>
            <span class="font-caption text-muted">Threshold: 60%</span>
          </div>

          <!-- Top 2 AI Menus List -->
          <section aria-label="Menu Options">
            <div style="display:flex;flex-direction:column;gap:1.25rem;">
              ${roundMenus.map((menu, idx) => {
                const userVote = userVotes[menu.id];
                const menuLabel = idx === 0 ? (roundNumber === 1 ? t('recommend.menuA') : t('recommend.menuC')) : (roundNumber === 1 ? t('recommend.menuB') : t('recommend.menuD'));
                const displayName = isTH ? menu.thaiName : menu.name;

                return `
                  <article class="card menu-card" style="padding:1.25rem;background:#FFFFFF;border-radius:var(--radius-xl);border:1.5px solid var(--color-border);box-shadow:var(--shadow-sm);">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">
                      <span class="step-badge" style="background:var(--color-surface-subtle);color:var(--color-brand-primary);font-weight:700;">
                        ${menuLabel}
                      </span>
                      <span class="font-caption text-secondary" style="font-weight:600;">
                        ${menu.price}
                      </span>
                    </div>

                    <div style="display:flex;gap:0.75rem;align-items:center;margin-bottom:0.75rem;">
                      <div class="menu-icon-bubble ${menu.visualClass || ''}" style="width:52px;height:52px;border-radius:14px;background:var(--color-accent-custard);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;">
                        ${menu.icon || '🍽️'}
                      </div>
                      <div>
                        <h3 class="font-heading-2" style="font-size:1.15rem;line-height:1.3;">
                          ${P.escapeHtml(displayName)}
                        </h3>
                        <div class="font-caption text-secondary" style="margin-top:0.15rem;">
                          ${P.escapeHtml(menu.cuisine)} • ${P.escapeHtml(menu.style)}
                        </div>
                      </div>
                    </div>

                    <!-- AI Match Reason Callout -->
                    <div class="menu-match-callout" style="background:var(--color-surface-subtle);border-radius:var(--radius-md);padding:0.75rem;margin-bottom:0.85rem;font-size:0.8rem;line-height:1.4;">
                      <strong style="color:var(--color-brand-primary);">✨ ${t('recommend.whyMatch')}</strong>
                      <div class="text-secondary" style="margin-top:0.25rem;">${P.escapeHtml(menu.matchReason)}</div>
                    </div>

                    <!-- Tags -->
                    <div class="menu-card-tags" style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem;">
                      ${menu.tags.map(tag => `
                        <span class="menu-tag" style="background:#FFFFFF;border:1px solid var(--color-border);font-size:0.725rem;padding:0.25rem 0.5rem;border-radius:var(--radius-full);color:var(--color-text-secondary);">
                          ${P.escapeHtml(tag)}
                        </span>
                      `).join('')}
                    </div>

                    <!-- Voting Action Controls for Active Members -->
                    ${isMemberActive ? `
                      <div class="vote-controls-row" style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;padding-top:0.75rem;border-top:1px dashed var(--color-border);">
                        <button 
                          type="button" 
                          class="btn-vote-pass btn ${userVote === 'PASS' ? 'btn-danger' : 'btn-outline'}" 
                          data-menu-id="${menu.id}"
                          data-round="${roundNumber}"
                          style="font-size:0.85rem;"
                        >
                          ${userVote === 'PASS' ? '✕ PASS (Selected)' : 'PASS'}
                        </button>
                        
                        <button 
                          type="button" 
                          class="btn-vote-ok btn ${userVote === 'OK' ? 'btn-primary' : 'btn-outline'}" 
                          data-menu-id="${menu.id}"
                          data-round="${roundNumber}"
                          style="font-size:0.85rem;"
                        >
                          ${userVote === 'OK' ? '✓ OK (Selected)' : 'OK'}
                        </button>
                      </div>
                    ` : `
                      <div class="font-caption text-muted" style="text-align:center;padding:0.5rem;background:var(--color-surface-subtle);border-radius:var(--radius-md);">
                        👁️ ${t('common.observer')}
                      </div>
                    `}
                  </article>
                `;
              }).join('')}
            </div>
          </section>

          <!-- Bottom Action: Tally Votes -->
          <div class="bottom-actions">
            <a href="#/vote-result" class="btn btn-primary btn-lg">
              ${t('recommend.result.title', { round: roundNumber })} →
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindRecommendationsEvents(roundNumber = 1) {
    const okBtns = document.querySelectorAll('.btn-vote-ok');
    const passBtns = document.querySelectorAll('.btn-vote-pass');
    const state = P.getState();

    state.recommendation = state.recommendation || { round: 1, roundVotes: { 1: {}, 2: {} } };
    state.recommendation.round = roundNumber;
    state.recommendation.roundVotes[roundNumber] = state.recommendation.roundVotes[roundNumber] || {};
    state.recommendation.roundVotes[roundNumber]['user'] = state.recommendation.roundVotes[roundNumber]['user'] || {};

    okBtns.forEach(btn => {
      btn.onclick = () => {
        const menuId = btn.getAttribute('data-menu-id');
        state.recommendation.roundVotes[roundNumber]['user'][menuId] = 'OK';
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    passBtns.forEach(btn => {
      btn.onclick = () => {
        const menuId = btn.getAttribute('data-menu-id');
        state.recommendation.roundVotes[roundNumber]['user'][menuId] = 'PASS';
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });
  }

  /* ==========================================================================
     3. Screen: Voting Result
     ========================================================================== */

  function renderVotingResult() {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const roundNumber = state.recommendation.round || 1;
    const results = calculateRoundResults(roundNumber);
    const hasWinner = results.hasWinner;

    return `
      <main class="app-shell" aria-labelledby="result-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/recommendations" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('recommend.result.title', { round: roundNumber })}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- Consensus Outcome Callout -->
          <div class="card" style="background:${hasWinner ? '#EDF9F0' : '#FFF8E6'};border:1.5px solid ${hasWinner ? '#A6DEB4' : '#F6D68A'};margin-bottom:1.25rem;text-align:center;padding:1.25rem;">
            <div style="font-size:36px;margin-bottom:0.25rem;">${hasWinner ? '🎉' : '🤔'}</div>
            <h2 id="result-title" class="font-heading-2" style="color:${hasWinner ? '#165E2A' : '#784C00'};">
              ${hasWinner ? t('recommend.result.consensus', { percent: results.singleWinner ? results.menuResults.find(r => r.menu.id === results.singleWinner.id).okPercentage : 100 }) : t('recommend.result.noConsensus')}
            </h2>
            <p class="font-body-small" style="margin-top:0.25rem;color:${hasWinner ? '#165E2A' : '#784C00'};">
              ${hasWinner ? 'Threshold >= 60% reached' : 'Round ended without 60% consensus'}
            </p>
          </div>

          <!-- Tally Breakdown per Menu -->
          <section aria-label="Vote Tally">
            <div style="display:flex;flex-direction:column;gap:0.85rem;">
              ${results.menuResults.map(r => {
                const displayName = isTH ? r.menu.thaiName : r.menu.name;
                return `
                  <div class="card" style="padding:1rem;background:#FFFFFF;border:1px solid ${r.isWinner ? '#A6DEB4' : 'var(--color-border)'};">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <div style="display:flex;align-items:center;gap:0.6rem;">
                        <span style="font-size:24px;">${r.menu.icon || '🍽️'}</span>
                        <div>
                          <div style="font-weight:700;font-size:0.95rem;">${P.escapeHtml(displayName)}</div>
                          <div class="font-caption text-secondary">${r.okCount} OK • ${r.passCount} PASS</div>
                        </div>
                      </div>
                      <div style="text-align:right;">
                        <div style="font-family:monospace;font-size:1.2rem;font-weight:800;color:${r.isWinner ? '#165E2A' : 'var(--color-brand-primary)'};">
                          ${r.okPercentage}%
                        </div>
                        <span class="step-badge ${r.isWinner ? 'status-ready' : 'status-waiting'}" style="font-size:0.65rem;">
                          ${r.isWinner ? 'Winner' : 'No Consensus'}
                        </span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            ${hasWinner ? `
              <button type="button" id="btn-proceed-final-menu" class="btn btn-primary btn-lg">
                ${t('recommend.finalMenu.title')} →
              </button>
            ` : (roundNumber === 1 ? `
              <a href="#/recommendations/round-2" class="btn btn-primary btn-lg">
                ${t('recommend.result.recommendAgain')}
              </a>
            ` : `
              <a href="#/final-vote" class="btn btn-primary btn-lg">
                ${t('recommend.finalVote.title')} →
              </a>
            `)}
          </div>
        </div>
      </main>
    `;
  }

  function bindVotingResultEvents() {
    const proceedBtn = document.getElementById('btn-proceed-final-menu');
    if (proceedBtn) {
      proceedBtn.onclick = () => {
        const state = P.getState();
        const roundNumber = state.recommendation.round || 1;
        const results = calculateRoundResults(roundNumber);
        if (results.singleWinner) {
          state.recommendation.finalWinnerMenuId = results.singleWinner.id;
          P.saveState();
        }
        P.navigateTo('#/final-menu');
      };
    }
  }

  /* ==========================================================================
     4. Screen: Final Vote (4 Dishes) & Host Tie Break
     ========================================================================== */

  function renderFinalVote() {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const isHost = state.room.role === 'host';
    const allCandidateMenus = Object.values(P.CANDIDATE_MENUS);
    const selectedVote = state.recommendation.finalVotes?.['user'] || 'menu-a';

    return `
      <main class="app-shell" aria-labelledby="final-vote-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/vote-result" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('recommend.finalVote.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="final-vote-title" class="font-heading-1">${t('recommend.finalVote.title')}</h2>
            <p class="screen-subtitle">${t('recommend.finalVote.subtitle')}</p>
          </section>

          <!-- 4 Dishes Grid -->
          <div style="display:flex;flex-direction:column;gap:0.75rem;margin:1.25rem 0;">
            ${allCandidateMenus.map(menu => {
              const isSelected = selectedVote === menu.id;
              const displayName = isTH ? menu.thaiName : menu.name;
              return `
                <div 
                  class="card btn-final-dish-card ${isSelected ? 'selected' : ''}" 
                  data-menu-id="${menu.id}"
                  tabindex="0"
                  role="button"
                  aria-pressed="${isSelected}"
                  style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:1rem;border:1.5px solid ${isSelected ? 'var(--color-brand-primary)' : 'var(--color-border)'};background:${isSelected ? 'var(--color-surface-subtle)' : '#FFFFFF'};"
                >
                  <div style="display:flex;align-items:center;gap:0.75rem;">
                    <span style="font-size:28px;">${menu.icon || '🍽️'}</span>
                    <div>
                      <div style="font-weight:700;font-size:0.95rem;">${P.escapeHtml(displayName)}</div>
                      <div class="font-caption text-secondary">${P.escapeHtml(menu.cuisine)} • ${P.escapeHtml(menu.price)}</div>
                    </div>
                  </div>
                  <span class="step-badge ${isSelected ? 'status-ready' : 'status-waiting'}">
                    ${isSelected ? '✓ Selected' : 'Vote'}
                  </span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Host Tie-Break Notice -->
          ${isHost ? `
            <div class="card" style="background:#EFF6FC;border:1px solid #A7D3F3;padding:0.85rem 1rem;margin-bottom:1rem;">
              <div class="font-label" style="color:#185582;">👑 ${t('recommend.finalVote.hostTieBreak')}</div>
            </div>
          ` : ''}

          <!-- Bottom Action -->
          <div class="bottom-actions">
            <button type="button" id="btn-submit-final-vote" class="btn btn-primary btn-lg">
              ${t('recommend.finalMenu.title')} →
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindFinalVoteEvents() {
    const dishCards = document.querySelectorAll('.btn-final-dish-card');
    const submitBtn = document.getElementById('btn-submit-final-vote');
    const state = P.getState();

    dishCards.forEach(card => {
      card.onclick = () => {
        const menuId = card.getAttribute('data-menu-id');
        state.recommendation.finalVotes = state.recommendation.finalVotes || {};
        state.recommendation.finalVotes['user'] = menuId;
        state.recommendation.finalWinnerMenuId = menuId;
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    if (submitBtn) {
      submitBtn.onclick = () => {
        const winnerId = state.recommendation.finalVotes?.['user'] || 'menu-a';
        state.recommendation.finalWinnerMenuId = winnerId;
        P.saveState();
        P.navigateTo('#/final-menu');
      };
    }
  }

  /* ==========================================================================
     5. Screen: Final Menu Winner Celebration
     ========================================================================== */

  function renderFinalMenu() {
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const winnerId = state.recommendation.finalWinnerMenuId || 'menu-a';
    const menu = P.CANDIDATE_MENUS[winnerId] || P.CANDIDATE_MENUS['menu-a'];
    const displayName = isTH ? menu.thaiName : menu.name;

    return `
      <main class="app-shell" aria-labelledby="winner-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
          <h1 class="top-bar-title">${t('recommend.finalMenu.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions" style="text-align:center;">
          <!-- Celebration Banner -->
          <div style="font-size:54px;margin:1rem 0 0.5rem 0;">🏆</div>
          <span class="step-badge" style="background:#EDF9F0;color:#165E2A;font-weight:700;font-size:0.85rem;padding:0.35rem 0.85rem;">
            ${t('recommend.finalMenu.title')}
          </span>

          <h2 id="winner-title" class="font-heading-1" style="font-size:1.6rem;margin-top:0.75rem;">
            ${P.escapeHtml(displayName)}
          </h2>
          <div class="font-body-small text-secondary" style="margin-top:0.25rem;">
            ${P.escapeHtml(menu.cuisine)} • ${P.escapeHtml(menu.style)}
          </div>

          <!-- Match Detail Card -->
          <div class="card" style="background:var(--color-surface-subtle);border-radius:var(--radius-xl);padding:1.25rem;margin:1.5rem 0;text-align:left;">
            <div class="font-label" style="color:var(--color-brand-primary);margin-bottom:0.25rem;">✨ ${t('recommend.whyMatch')}</div>
            <p class="font-body-small text-secondary" style="line-height:1.45;">
              ${P.escapeHtml(menu.matchReason)}
            </p>
          </div>

          <!-- Transition to V4 Restaurants -->
          <div class="bottom-actions">
            <a href="#/restaurants" class="btn btn-primary btn-lg">
              ${t('recommend.finalMenu.findRestaurants')}
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindFinalMenuEvents() {}

  // Expose to Prototype Namespace
  P.renderRecommendations = renderRecommendations;
  P.bindRecommendationsEvents = bindRecommendationsEvents;
  P.renderVotingResult = renderVotingResult;
  P.bindVotingResultEvents = bindVotingResultEvents;
  P.renderFinalVote = renderFinalVote;
  P.bindFinalVoteEvents = bindFinalVoteEvents;
  P.renderFinalMenu = renderFinalMenu;
  P.bindFinalMenuEvents = bindFinalMenuEvents;

})();
