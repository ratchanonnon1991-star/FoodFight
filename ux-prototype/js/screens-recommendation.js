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
    return active.length > 0 ? active : members.slice(0, 3); // Fallback to first 3 if none flagged
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

  /**
   * Calculates OK/PASS rates per menu among ACTIVE members only.
   * FoodFighter SRS Rule: Threshold is 60% OK.
   */
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
      const isWinner = okPercentage >= 60; // 60% SRS threshold rule

      return {
        menu,
        okCount,
        passCount,
        okPercentage,
        isWinner
      };
    });

    // Check if any menu won
    const winningMenus = menuResults.filter(r => r.isWinner);
    let outcome = 'NO_WINNER';
    let primaryWinner = null;

    if (winningMenus.length > 0) {
      outcome = 'WINNER';
      // If both won, pick the higher percentage or first
      winningMenus.sort((a, b) => b.okPercentage - a.okPercentage);
      primaryWinner = winningMenus[0].menu;
      state.recommendation.finalWinnerMenuId = primaryWinner.id;
      P.saveState();
    }

    return {
      round: roundNumber,
      totalActive,
      menuResults,
      outcome,
      primaryWinner
    };
  }

  /**
   * Calculates Final Vote results among 4 menus for Active Members
   */
  function calculateFinalVoteResults() {
    const state = P.getState();
    const activeMembers = getActiveMembers();
    const finalVotes = state.recommendation.finalVotes || {};
    const allMenus = [
      P.CANDIDATE_MENUS['menu-a'],
      P.CANDIDATE_MENUS['menu-b'],
      P.CANDIDATE_MENUS['menu-c'],
      P.CANDIDATE_MENUS['menu-d']
    ];

    const counts = {};
    allMenus.forEach(m => counts[m.id] = 0);

    activeMembers.forEach(mem => {
      const choice = finalVotes[mem.id];
      if (choice && counts[choice] !== undefined) {
        counts[choice]++;
      }
    });

    let maxVotes = -1;
    allMenus.forEach(m => {
      if (counts[m.id] > maxVotes) maxVotes = counts[m.id];
    });

    const topMenus = allMenus.filter(m => counts[m.id] === maxVotes && maxVotes > 0);

    if (topMenus.length === 1) {
      state.recommendation.finalWinnerMenuId = topMenus[0].id;
      P.saveState();
      return {
        outcome: 'UNIQUE_WINNER',
        winner: topMenus[0],
        counts,
        topMenus
      };
    } else if (topMenus.length > 1) {
      return {
        outcome: 'TIE',
        winner: null,
        counts,
        topMenus
      };
    }

    return {
      outcome: 'NO_VOTES',
      winner: allMenus[0],
      counts,
      topMenus: [allMenus[0]]
    };
  }

  /* ==========================================================================
     2. Recommended Menus Screen (Round 1 & Round 2)
     ========================================================================== */

  function renderRecommendations(roundNumber = 1) {
    const state = P.getState();
    state.recommendation.round = roundNumber;
    P.saveState();

    const activeMembers = getActiveMembers();
    const isUserActive = isCurrentUserActive();
    const menus = getRoundMenus(roundNumber);
    const roundVotes = (state.recommendation.roundVotes && state.recommendation.roundVotes[roundNumber]) || {};
    const userVotes = roundVotes['user'] || {};

    // Count how many active members have voted
    let votedMembersCount = 0;
    activeMembers.forEach(mem => {
      const v = roundVotes[mem.id] || {};
      if (menus.every(m => v[m.id] !== undefined && v[m.id] !== null)) {
        votedMembersCount++;
      }
    });

    const isRound2 = roundNumber === 2;

    return `
      <main class="app-shell" aria-labelledby="recom-screen-title">
        <header class="top-bar">
          <div style="width:38px;"></div>
          <h1 class="top-bar-title">${isRound2 ? 'Round 2 Menus' : 'Recommended Menus'}</h1>
          <button type="button" id="btn-recom-exit" class="top-bar-action" aria-label="Exit">✕</button>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Round Indicator & Header -->
          <div class="recom-round-header">
            <span class="recom-round-badge ${isRound2 ? 'round-2' : ''}">
              ${isRound2 ? '🔄 Round 2 — New Alternative Picks' : '✨ Round 1 Recommendations'}
            </span>
            <span class="font-caption text-secondary">
              60% OK to Win
            </span>
          </div>

          <section class="screen-header">
            <h2 id="recom-screen-title" class="font-heading-1">
              ${isRound2 ? 'Fresh Pair for Your Group' : 'FoodFighter Picked 2 Options'}
            </h2>
            <p class="screen-subtitle">
              Vote <strong>OK</strong> if you\'d like to eat this, or <strong>PASS</strong> if you prefer another option.
            </p>
          </section>

          <!-- Observer Notice if current user is an observer -->
          ${!isUserActive ? `
            <div class="recom-observer-notice" role="note">
              <span>👀</span>
              <span><strong>Observing mode:</strong> You joined as an observer and can follow along while active members vote.</span>
            </div>
          ` : ''}

          <!-- Live Voting Progress Tracker Card -->
          <div class="vote-progress-card">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="font-label text-secondary">Group Voting Status</span>
              <span style="font-size:0.85rem;font-weight:700;color:var(--color-brand-primary);">
                ${votedMembersCount} of ${activeMembers.length} Voted
              </span>
            </div>

            <div class="progress-track" style="margin:0.5rem 0;height:6px;">
              <div class="progress-fill" style="width:${Math.round((votedMembersCount / activeMembers.length) * 100)}%;"></div>
            </div>

            <div class="vote-avatar-tracker">
              ${activeMembers.map(m => {
                const v = roundVotes[m.id] || {};
                const hasVoted = menus.every(menu => v[menu.id] !== undefined && v[menu.id] !== null);
                return `
                  <span class="avatar-voted-pill ${hasVoted ? 'done' : ''}">
                    <span style="font-size:0.75rem;">${hasVoted ? '✅' : '⏳'}</span>
                    <span>${P.escapeHtml(m.name.split(' ')[0])}</span>
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 2 Recommendation Menu Cards -->
          <div class="recom-cards-container">
            ${menus.map(menu => {
              const currentVote = userVotes[menu.id];
              return `
                <article class="menu-card" data-menu-id="${menu.id}" aria-labelledby="title-${menu.id}">
                  
                  <!-- Menu Artwork Banner -->
                  <div class="menu-card-visual ${menu.visualClass || 'visual-krapow'}">
                    <span class="menu-card-price-tag">${P.escapeHtml(menu.price)}</span>
                    <div class="menu-card-badge-dish" aria-hidden="true">${menu.icon}</div>
                  </div>

                  <div class="menu-card-body">
                    <div>
                      <h3 id="title-${menu.id}" class="menu-card-title">${P.escapeHtml(menu.name)}</h3>
                      <div class="menu-card-thai-title">${P.escapeHtml(menu.thaiName)}</div>
                    </div>

                    <div class="menu-card-tags">
                      <span class="menu-tag menu-tag-highlight">${P.escapeHtml(menu.cuisine)}</span>
                      <span class="menu-tag">${P.escapeHtml(menu.style)}</span>
                      ${menu.tags.map(t => `<span class="menu-tag">${P.escapeHtml(t)}</span>`).join('')}
                    </div>

                    <div class="menu-match-reason">
                      <strong>Why it fits:</strong> ${P.escapeHtml(menu.matchReason)}
                    </div>
                  </div>

                  <!-- OK / PASS Voting Controls for Active User -->
                  ${isUserActive ? `
                    <div class="menu-vote-controls" role="group" aria-label="Vote for ${P.escapeHtml(menu.name)}">
                      <button 
                        type="button" 
                        class="btn-vote-choice btn-vote-ok ${currentVote === 'OK' ? 'selected' : ''}" 
                        data-menu-id="${menu.id}" 
                        data-vote="OK"
                        aria-pressed="${currentVote === 'OK'}"
                      >
                        <span>👍 OK</span>
                      </button>
                      <button 
                        type="button" 
                        class="btn-vote-choice btn-vote-pass ${currentVote === 'PASS' ? 'selected' : ''}" 
                        data-menu-id="${menu.id}" 
                        data-vote="PASS"
                        aria-pressed="${currentVote === 'PASS'}"
                      >
                        <span>👎 PASS</span>
                      </button>
                    </div>
                  ` : `
                    <div style="padding:0 1.15rem 1rem 1.15rem;font-size:0.8rem;color:var(--color-text-muted);text-align:center;">
                      Observer view only
                    </div>
                  `}

                </article>
              `;
            }).join('')}
          </div>

          <!-- Bottom Action -->
          <div class="bottom-actions">
            <button type="button" id="btn-view-vote-results" class="btn btn-primary btn-lg">
              <span>View Voting Results →</span>
            </button>
            <div class="font-caption text-muted text-center">
              Requires 60% OK among Active Members to reach Final Menu
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function bindRecommendationsEvents(roundNumber = 1) {
    const state = P.getState();
    const menus = getRoundMenus(roundNumber);

    const voteButtons = document.querySelectorAll('.btn-vote-choice');
    voteButtons.forEach(btn => {
      btn.onclick = () => {
        const menuId = btn.getAttribute('data-menu-id');
        const voteChoice = btn.getAttribute('data-vote');

        if (!state.recommendation.roundVotes[roundNumber]) {
          state.recommendation.roundVotes[roundNumber] = {};
        }
        if (!state.recommendation.roundVotes[roundNumber]['user']) {
          state.recommendation.roundVotes[roundNumber]['user'] = {};
        }

        // Toggle vote choice
        state.recommendation.roundVotes[roundNumber]['user'][menuId] = voteChoice;
        P.saveState();

        // Update UI button highlights
        const parentCard = btn.closest('.menu-card');
        if (parentCard) {
          parentCard.querySelectorAll('.btn-vote-choice').forEach(b => {
            const isMatch = b.getAttribute('data-vote') === voteChoice;
            b.classList.toggle('selected', isMatch);
            b.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
          });
        }

        P.showToast(`Voted ${voteChoice} for ${menus.find(m => m.id === menuId)?.name || 'Dish'}`, 'info');
      };
    });

    const exitBtn = document.getElementById('btn-recom-exit');
    if (exitBtn) exitBtn.onclick = () => P.showLeaveRoomModal();

    const viewResultBtn = document.getElementById('btn-view-vote-results');
    if (viewResultBtn) {
      viewResultBtn.onclick = () => {
        P.navigateTo('#/vote-result');
      };
    }
  }

  /* ==========================================================================
     3. Voting Result Screen
     ========================================================================== */

  function renderVotingResult() {
    const state = P.getState();
    const roundNumber = state.recommendation.round || 1;
    const calc = calculateRoundResults(roundNumber);
    const isWinner = calc.outcome === 'WINNER';
    const isRound1 = roundNumber === 1;
    const canRecommendAgain = isRound1 && !state.recommendation.recommendAgainUsed && !isWinner;

    return `
      <main class="app-shell" aria-labelledby="result-screen-title">
        <header class="top-bar">
          <a href="#/recommendations" class="top-bar-action" aria-label="Back to Voting">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Voting Results</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Outcome Hero Banner -->
          <div class="result-hero-banner ${isWinner ? 'winner' : 'no-winner'}">
            <div style="font-size:36px;margin-bottom:0.35rem;">
              ${isWinner ? '🎉' : '⏳'}
            </div>
            <h2 id="result-screen-title" class="font-heading-1">
              ${isWinner ? 'We Have a Winner!' : 'No Consensus in This Round'}
            </h2>
            <p class="screen-subtitle" style="margin-top:0.25rem;">
              ${isWinner 
                ? `<strong>${P.escapeHtml(calc.primaryWinner?.name)}</strong> reached the 60% approval threshold.` 
                : `Neither menu reached the 60% threshold (${calc.totalActive} active members).`}
            </p>
          </div>

          <!-- Per-Dish Results Breakdown -->
          <section style="margin-bottom:1.5rem;">
            <h3 class="font-label text-secondary" style="margin-bottom:0.75rem;">Vote Breakdown (Round ${roundNumber})</h3>
            
            ${calc.menuResults.map(item => `
              <div class="result-card-row ${item.isWinner ? 'is-winner' : ''}">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div style="display:flex;align-items:center;gap:0.5rem;">
                    <span style="font-size:24px;">${item.menu.icon}</span>
                    <div>
                      <div style="font-weight:700;font-size:0.95rem;">${P.escapeHtml(item.menu.name)}</div>
                      <div class="font-caption text-secondary">${P.escapeHtml(item.menu.thaiName)}</div>
                    </div>
                  </div>
                  <span class="step-badge ${item.isWinner ? 'member-badge-ready' : ''}">
                    ${item.okPercentage}% OK ${item.isWinner ? '✓ Winner' : ''}
                  </span>
                </div>

                <div class="progress-track" style="height:10px;margin:0.25rem 0;">
                  <div class="progress-fill ${item.isWinner ? 'vote-bar-fill-ok' : ''}" style="width:${item.okPercentage}%;"></div>
                </div>

                <div style="display:flex;justify-content:space-between;font-size:0.775rem;color:var(--color-text-secondary);">
                  <span>👍 ${item.okCount} OK</span>
                  <span>👎 ${item.passCount} PASS</span>
                  <span>Total Active: ${calc.totalActive}</span>
                </div>
              </div>
            `).join('')}
          </section>

          <!-- Bottom Actions / Transition Logic -->
          <div class="bottom-actions">
            ${isWinner ? `
              <button type="button" id="btn-result-to-final-menu" class="btn btn-primary btn-lg">
                Proceed to Final Menu 🎉 →
              </button>
            ` : (canRecommendAgain ? `
              <button type="button" id="btn-result-recommend-again" class="btn btn-primary btn-lg">
                Recommend Again (Round 2) 🔄
              </button>
              <div class="font-caption text-muted text-center">
                AI will generate 2 brand-new dishes (1 Recommend Again chance)
              </div>
            ` : `
              <button type="button" id="btn-result-to-final-vote" class="btn btn-primary btn-lg">
                Go to Final Vote (4 Dishes) ⚔️ →
              </button>
              <div class="font-caption text-muted text-center">
                Vote between all 4 candidate dishes from Rounds 1 & 2
              </div>
            `)}
          </div>

        </div>
      </main>
    `;
  }

  function bindVotingResultEvents() {
    const toFinalMenuBtn = document.getElementById('btn-result-to-final-menu');
    const recAgainBtn = document.getElementById('btn-result-recommend-again');
    const toFinalVoteBtn = document.getElementById('btn-result-to-final-vote');
    const state = P.getState();

    if (toFinalMenuBtn) {
      toFinalMenuBtn.onclick = () => {
        P.navigateTo('#/final-menu');
      };
    }

    if (recAgainBtn) {
      recAgainBtn.onclick = () => {
        state.recommendation.recommendAgainUsed = true;
        state.recommendation.round = 2;
        P.saveState();
        P.showToast('Generating 2 new dishes for Round 2...', 'info');
        P.navigateTo('#/recommendations/round-2');
      };
    }

    if (toFinalVoteBtn) {
      toFinalVoteBtn.onclick = () => {
        P.navigateTo('#/final-vote');
      };
    }
  }

  /* ==========================================================================
     4. Final Vote Screen (4 Candidate Dishes) & Host Tie Break
     ========================================================================== */

  function renderFinalVote() {
    const state = P.getState();
    const activeMembers = getActiveMembers();
    const isUserActive = isCurrentUserActive();
    const isHost = state.room.role === 'host';
    const allMenus = [
      P.CANDIDATE_MENUS['menu-a'],
      P.CANDIDATE_MENUS['menu-b'],
      P.CANDIDATE_MENUS['menu-c'],
      P.CANDIDATE_MENUS['menu-d']
    ];
    const finalVotes = state.recommendation.finalVotes || {};
    const userChoice = finalVotes['user'] || 'menu-a';
    const calc = calculateFinalVoteResults();
    const isTie = calc.outcome === 'TIE';

    return `
      <main class="app-shell" aria-labelledby="final-vote-title">
        <header class="top-bar">
          <a href="#/vote-result" class="top-bar-action" aria-label="Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Final Vote</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <section class="screen-header">
            <div style="display:flex;align-items:center;gap:0.45rem;margin-bottom:0.35rem;">
              <span class="step-badge" style="background:#FFF8E6;color:#784C00;border-color:#F6D68A;">Final Showdown</span>
              <span class="font-caption text-secondary">Single Choice</span>
            </div>
            <h2 id="final-vote-title" class="font-heading-1">Choose 1 Final Dish</h2>
            <p class="screen-subtitle">Select your favorite from all 4 candidate dishes.</p>
          </section>

          <!-- Tie Break Announcement Area (If tie detected) -->
          ${isTie ? `
            <div class="tie-break-hero" role="alert">
              <div style="font-size:28px;margin-bottom:0.25rem;">⚖️</div>
              <h3 class="font-heading-2" style="color:#784C00;">Tie Detected!</h3>
              <p class="font-body-small text-secondary" style="margin-top:0.25rem;">
                ${isHost 
                  ? '<strong>You are the Host!</strong> Choose the final winner among the tied dishes below.'
                  : 'Waiting for Host (Alex) to break the tie and select the winning dish.'}
              </p>
            </div>
          ` : ''}

          <!-- 4 Final Menu Selectable Options -->
          <div class="final-vote-grid" role="radiogroup" aria-label="Final Menu Selection">
            ${allMenus.map(menu => {
              const isSelected = userChoice === menu.id;
              const isTiedTop = isTie && calc.topMenus.some(m => m.id === menu.id);
              const voteCount = calc.counts[menu.id] || 0;

              return `
                <div 
                  class="final-vote-card ${isSelected ? 'selected' : ''}" 
                  data-menu-id="${menu.id}"
                  role="radio"
                  aria-checked="${isSelected}"
                  tabindex="0"
                >
                  <div class="final-radio-circle">
                    <div class="final-radio-inner"></div>
                  </div>

                  <span style="font-size:28px;flex-shrink:0;">${menu.icon}</span>

                  <div style="flex:1;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-weight:700;font-size:0.95rem;color:var(--color-brand-primary);">${P.escapeHtml(menu.name)}</span>
                      <span class="font-caption text-muted">${P.escapeHtml(menu.price.split(' ')[0])}</span>
                    </div>
                    <div class="font-caption text-secondary">${P.escapeHtml(menu.thaiName)}</div>
                    <div class="font-caption text-muted" style="margin-top:0.15rem;">
                      ${isTie ? `Current votes: ${voteCount} • ` : ''}Round ${menu.round} pick
                      ${isTiedTop ? ' • <strong style="color:#784C00;">Tied Top Choice</strong>' : ''}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            ${isTie ? (
              isHost ? `
                <button type="button" id="btn-host-resolve-tie" class="btn btn-primary btn-lg">
                  Confirm Winner as Host 👑 →
                </button>
              ` : `
                <button type="button" class="btn btn-secondary btn-lg" disabled>
                  ⏳ Waiting for Host to Break Tie...
                </button>
              `
            ) : `
              <button type="button" id="btn-submit-final-vote" class="btn btn-primary btn-lg">
                Submit Vote & View Winner →
              </button>
            `}
          </div>

        </div>
      </main>
    `;
  }

  function bindFinalVoteEvents() {
    const state = P.getState();
    const cards = document.querySelectorAll('.final-vote-card');

    cards.forEach(card => {
      card.onclick = () => {
        const menuId = card.getAttribute('data-menu-id');
        state.recommendation.finalVotes['user'] = menuId;
        P.saveState();

        cards.forEach(c => {
          const isMatch = c.getAttribute('data-menu-id') === menuId;
          c.classList.toggle('selected', isMatch);
          c.setAttribute('aria-checked', isMatch ? 'true' : 'false');
        });

        P.showToast(`Selected ${P.CANDIDATE_MENUS[menuId]?.name}`, 'info');
      };
    });

    const submitBtn = document.getElementById('btn-submit-final-vote');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const calc = calculateFinalVoteResults();
        if (calc.outcome === 'TIE') {
          P.showToast('Votes are tied! Host must break the tie.', 'info');
          if (P.renderCurrentRoute) P.renderCurrentRoute();
        } else {
          P.navigateTo('#/final-menu');
        }
      };
    }

    const hostResolveBtn = document.getElementById('btn-host-resolve-tie');
    if (hostResolveBtn) {
      hostResolveBtn.onclick = () => {
        const userChoice = state.recommendation.finalVotes['user'] || 'menu-a';
        state.recommendation.finalWinnerMenuId = userChoice;
        state.recommendation.tieBreakWinnerId = userChoice;
        P.saveState();
        P.showToast(`Host chose ${P.CANDIDATE_MENUS[userChoice]?.name} as the Final Winner!`, 'success');
        P.navigateTo('#/final-menu');
      };
    }
  }

  /* ==========================================================================
     5. Final Menu Winner Screen (Transitions to V4 Restaurant Boundary)
     ========================================================================== */

  function renderFinalMenu() {
    const state = P.getState();
    const winnerId = state.recommendation.finalWinnerMenuId || 'menu-a';
    const menu = P.CANDIDATE_MENUS[winnerId] || P.CANDIDATE_MENUS['menu-a'];
    const activeMembers = getActiveMembers();
    const isTieBreak = !!state.recommendation.tieBreakWinnerId;

    return `
      <main class="app-shell" aria-labelledby="final-menu-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
          <h1 class="top-bar-title">Final Menu</h1>
          <a href="#/history" class="top-bar-action" aria-label="History">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Celebratory Winner Hero Card -->
          <div class="final-menu-hero">
            <div class="final-winner-ribbon">
              🏆 Group Winner Selection
            </div>

            <div class="final-menu-content">
              <div class="final-menu-avatar-large ${menu.visualClass || 'visual-krapow'}">
                ${menu.icon}
              </div>

              <div>
                <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">
                  ${isTieBreak ? 'Decided by Host Tie Break' : 'Group Consensus Winner'}
                </span>
                <h2 id="final-menu-title" class="font-display" style="margin-top:0.45rem;font-size:1.55rem;">
                  ${P.escapeHtml(menu.name)}
                </h2>
                <div class="font-body-small text-secondary" style="font-weight:600;">
                  ${P.escapeHtml(menu.thaiName)}
                </div>
              </div>

              <div class="menu-card-tags" style="justify-content:center;">
                <span class="menu-tag menu-tag-highlight">${P.escapeHtml(menu.cuisine)}</span>
                <span class="menu-tag">${P.escapeHtml(menu.price)}</span>
                <span class="menu-tag">${P.escapeHtml(menu.style)}</span>
              </div>

              <div class="menu-match-reason" style="text-align:left;margin-top:0.25rem;">
                <strong>Why your group loves it:</strong> ${P.escapeHtml(menu.matchReason)}
              </div>

              <!-- Participating Members Avatars -->
              <div style="margin-top:0.5rem;">
                <div class="font-caption text-muted">Selected with ${activeMembers.length} active members:</div>
                <div class="final-participants-badge">
                  ${activeMembers.map(m => `
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}" style="width:30px;height:30px;font-size:0.7rem;" title="${P.escapeHtml(m.name)}">
                      ${P.escapeHtml(m.initials)}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Next Step Notice -->
          <div class="card" style="background:var(--color-surface-subtle);margin-bottom:1.5rem;text-align:center;padding:1rem;">
            <div class="font-label text-secondary" style="margin-bottom:0.25rem;">Next: Find Great Places Nearby</div>
            <p class="font-body-small text-secondary" style="line-height:1.4;">
              FoodFighter will search for top restaurants serving <strong>${P.escapeHtml(menu.name)}</strong> within your group search radius.
            </p>
          </div>

          <!-- Bottom CTA to V4 Restaurant Boundary -->
          <div class="bottom-actions">
            <a href="#/restaurants" class="btn btn-primary btn-lg" id="btn-find-restaurants-cta">
              Find Restaurants on Map 📍 →
            </a>
            <a href="#/home" class="btn btn-secondary">
              Return to Home Dashboard
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindFinalMenuEvents() {
    const cta = document.getElementById('btn-find-restaurants-cta');
    if (cta) {
      cta.onclick = () => {
        P.showToast('Entering Restaurant Discovery (V4 Phase)', 'info');
      };
    }
  }

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
