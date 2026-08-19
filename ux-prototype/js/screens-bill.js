/**
 * FoodFighter UX Prototype — Split Bill, Receipt OCR & Payment Screens (V5)
 * 
 * Implements:
 *   - Split Bill Overview & Step Journey
 *   - Simulated Receipt Scanner Viewfinder (Fast, deterministic, zero camera/OCR API)
 *   - Thermal Paper Receipt Styled Container & Line Item Editor
 *   - Member Item Assignment Matrix (Single, Multi, and Everyone shortcuts)
 *   - Deterministic Split Math & Exact Zero-Satang Reconciliation
 *   - Bill Summary Breakdown Accordions
 *   - Real-Time Group Payment Status & All Settled Celebration
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Pure Calculation Helpers & Context Resolvers
     ========================================================================== */

  function getBillContext() {
    const state = P.getState();
    const finalMenuId = state.recommendation?.finalWinnerMenuId || 'menu-a';
    const finalMenu = P.CANDIDATE_MENUS[finalMenuId] || P.CANDIDATE_MENUS['menu-a'];

    const restList = P.RESTAURANT_CATALOGUE[finalMenu.id] || P.RESTAURANT_CATALOGUE['menu-a'];
    const restId = state.restaurant?.selectedRestaurantId || restList[0]?.id;
    const restaurant = restList.find(r => r.id === restId) || restList[0];

    let members = (state.room.members || []).filter(m => m.isActive);
    if (!members || members.length === 0) {
      members = (state.room.members || []).slice(0, 4);
    }
    if (members.length === 0) {
      members = [
        { id: 'user', name: 'Alex Johnson (You)', initials: 'AJ', colorClass: 'avatar-petal' },
        { id: 'maya', name: 'Maya Lin', initials: 'ML', colorClass: 'avatar-apricot' },
        { id: 'nina', name: 'Nina Patel', initials: 'NP', colorClass: 'avatar-custard' },
        { id: 'ken', name: 'Ken Tanaka', initials: 'KT', colorClass: 'avatar-mauve' }
      ];
    }

    return { restaurant, finalMenu, members };
  }

  function calculateItemLineTotal(item) {
    const qty = parseInt(item.quantity, 10) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return Math.max(0, Math.round(qty * price));
  }

  function calculateReceiptTotal(items) {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + calculateItemLineTotal(item), 0);
  }

  function calculateMemberTotals(items, assignments, members) {
    const memberTotals = {};
    const memberItemDetails = {};

    members.forEach(m => {
      memberTotals[m.id] = 0;
      memberItemDetails[m.id] = [];
    });

    let totalAllocated = 0;

    (items || []).forEach(item => {
      const lineTotal = calculateItemLineTotal(item);
      const assignedIds = (assignments[item.id] || []).filter(id => members.some(m => m.id === id));
      const N = assignedIds.length;

      if (N > 0) {
        const baseShare = Math.floor(lineTotal / N);
        const remainder = lineTotal - (baseShare * N);

        assignedIds.forEach((memId, idx) => {
          const share = baseShare + (idx < remainder ? 1 : 0);
          memberTotals[memId] = (memberTotals[memId] || 0) + share;
          totalAllocated += share;

          if (memberItemDetails[memId]) {
            memberItemDetails[memId].push({
              itemId: item.id,
              name: item.name,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              lineTotal: lineTotal,
              splitCount: N,
              memberShare: share
            });
          }
        });
      }
    });

    return { memberTotals, memberItemDetails, totalAllocated };
  }

  function calculatePaymentProgress(members, paymentStatuses, memberTotals) {
    const totalCount = members.length;
    let paidCount = 0;
    let paidAmount = 0;
    let totalBillAmount = 0;

    members.forEach(m => {
      const share = memberTotals[m.id] || 0;
      totalBillAmount += share;
      if (paymentStatuses[m.id] === 'paid') {
        paidCount++;
        paidAmount += share;
      }
    });

    const isAllPaid = totalCount > 0 && paidCount === totalCount;
    const progressPercent = totalBillAmount > 0 ? Math.round((paidAmount / totalBillAmount) * 100) : 0;

    return { totalCount, paidCount, paidAmount, totalBillAmount, isAllPaid, progressPercent };
  }

  /* ==========================================================================
     2. Screen: Split Bill Overview
     ========================================================================== */

  function renderSplitBill() {
    const { restaurant, finalMenu, members } = getBillContext();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const restName = isTH ? restaurant.thaiName : restaurant.name;

    return `
      <main class="app-shell" aria-labelledby="split-bill-overview-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/restaurants/selected" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('bill.overview.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- Venue & Final Dish Context -->
          <div class="card card-hero" style="margin-bottom:1.25rem;">
            <span class="step-badge" style="background:var(--color-surface-subtle);color:var(--color-brand-primary);">
              🧾 ${t('bill.overview.title')}
            </span>
            <h2 class="font-heading-2" style="margin-top:0.4rem;">${P.escapeHtml(restName)}</h2>
            <div class="font-caption text-secondary" style="margin-top:0.15rem;">
              ${P.escapeHtml(restaurant.address.split(',')[0])} • ${members.length} ${t('common.member')}
            </div>
          </div>

          <!-- 3-Step Journey Box -->
          <div class="card" style="background:#FFFFFF;border:1.5px solid var(--color-border);border-radius:var(--radius-xl);padding:1.25rem;margin-bottom:1.25rem;">
            <h3 class="font-heading-3" style="margin-bottom:0.75rem;">3 Easy Steps</h3>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div style="width:32px;height:32px;border-radius:50%;background:var(--color-surface-subtle);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;color:var(--color-brand-primary);">1</div>
                <div>
                  <div style="font-weight:700;font-size:0.9rem;">${t('bill.scanner.title')}</div>
                  <div class="font-caption text-secondary">${t('bill.scanner.instruction')}</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div style="width:32px;height:32px;border-radius:50%;background:var(--color-surface-subtle);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;color:var(--color-brand-primary);">2</div>
                <div>
                  <div style="font-weight:700;font-size:0.9rem;">${t('bill.assign.title')}</div>
                  <div class="font-caption text-secondary">${t('bill.assign.instruction')}</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div style="width:32px;height:32px;border-radius:50%;background:var(--color-surface-subtle);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;color:var(--color-brand-primary);">3</div>
                <div>
                  <div style="font-weight:700;font-size:0.9rem;">${t('bill.payment.title')}</div>
                  <div class="font-caption text-secondary">${t('bill.summary.reconciledBadge')}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Acquisition Options -->
          <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
            <a href="#/bill/receipt" class="btn btn-primary btn-lg">
              ${t('bill.overview.scanReceipt')}
            </a>
            <button type="button" id="btn-load-sample-receipt" class="btn btn-secondary btn-lg">
              ${t('bill.overview.loadSample')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindSplitBillEvents() {
    const sampleBtn = document.getElementById('btn-load-sample-receipt');
    if (sampleBtn) {
      sampleBtn.onclick = () => {
        const state = P.getState();
        state.bill.receiptItems = JSON.parse(JSON.stringify(P.DEFAULT_RECEIPT_ITEMS));
        state.bill.receiptSource = 'sample';
        P.saveState();
        P.showToast(P.t('bill.items.title') + ' ✓', 'success');
        P.navigateTo('#/bill/items');
      };
    }
  }

  /* ==========================================================================
     3. Screen: Scan / Upload Receipt (Simulated Viewfinder)
     ========================================================================== */

  function renderBillReceipt() {
    const t = P.t;
    return `
      <main class="app-shell" aria-labelledby="scanner-title">
        <header class="top-bar">
          <a href="#/bill" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('bill.scanner.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions" style="text-align:center;">
          <section class="screen-header">
            <h2 id="scanner-title" class="font-heading-1">${t('bill.scanner.title')}</h2>
            <p class="screen-subtitle">${t('bill.scanner.instruction')}</p>
          </section>

          <!-- Simulated Laser Scanner Viewfinder -->
          <div class="receipt-viewfinder-canvas" style="position:relative;width:260px;height:320px;background:#1A131C;border-radius:20px;margin:1.5rem auto;overflow:hidden;box-shadow:var(--shadow-md);">
            <div style="position:absolute;top:14px;left:14px;width:28px;height:28px;border-top:3px solid #FFC6D9;border-left:3px solid #FFC6D9;"></div>
            <div style="position:absolute;top:14px;right:14px;width:28px;height:28px;border-top:3px solid #FFC6D9;border-right:3px solid #FFC6D9;"></div>
            <div style="position:absolute;bottom:14px;left:14px;width:28px;height:28px;border-bottom:3px solid #FFC6D9;border-left:3px solid #FFC6D9;"></div>
            <div style="position:absolute;bottom:14px;right:14px;width:28px;height:28px;border-bottom:3px solid #FFC6D9;border-right:3px solid #FFC6D9;"></div>

            <!-- Animated Laser Scanning Line -->
            <div class="laser-scanner" style="position:absolute;width:100%;height:3px;background:linear-gradient(90deg, transparent, #FFC6D9, #FFE1C6, transparent);top:35%;"></div>

            <div style="color:rgba(255,255,255,0.75);font-size:0.8rem;padding:2rem 1rem;">
              <div>📸 Scanning Receipt...</div>
              <div style="font-size:0.7rem;margin-top:0.5rem;color:rgba(255,255,255,0.5);">Detecting line items</div>
            </div>
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-skip-scan" class="btn btn-primary btn-lg">
              ${t('bill.scanner.instantSkip')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindBillReceiptEvents() {
    const skipBtn = document.getElementById('btn-skip-scan');
    const state = P.getState();

    const finishScan = () => {
      state.bill.receiptItems = JSON.parse(JSON.stringify(P.DEFAULT_RECEIPT_ITEMS));
      state.bill.scanStatus = 'done';
      P.saveState();
      P.navigateTo('#/bill/items');
    };

    if (skipBtn) skipBtn.onclick = finishScan;
    setTimeout(() => {
      if (window.location.hash === '#/bill/receipt') finishScan();
    }, 1200);
  }

  /* ==========================================================================
     4. Screen: Review & Edit Receipt Items
     ========================================================================== */

  function renderBillItems() {
    const state = P.getState();
    const t = P.t;
    const items = state.bill.receiptItems || [];
    const total = calculateReceiptTotal(items);

    return `
      <main class="app-shell" aria-labelledby="review-items-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/bill" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('bill.items.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="review-items-title" class="font-heading-1">${t('bill.items.title')}</h2>
            <p class="screen-subtitle">Adjust item names, quantities, or prices before assigning.</p>
          </section>

          <!-- Thermal Receipt Container -->
          <div class="thermal-receipt-paper" style="background:#FCFCFA;border:1px dashed #D5D1C5;border-radius:var(--radius-lg);padding:1.25rem 1rem;margin-bottom:1.25rem;box-shadow:0 4px 12px rgba(0,0,0,0.03);">
            
            <div style="text-align:center;padding-bottom:0.75rem;border-bottom:1px dashed #D5D1C5;margin-bottom:1rem;">
              <div style="font-weight:800;font-size:1.05rem;color:var(--color-brand-primary);">RECEIPT #4827</div>
              <div class="font-caption text-secondary">Siam Ember Kitchen</div>
            </div>

            <!-- Items List -->
            <div id="receipt-items-container" style="display:flex;flex-direction:column;gap:0.85rem;">
              ${items.map((item, idx) => `
                <div class="receipt-item-row" data-item-id="${item.id}" style="padding-bottom:0.75rem;border-bottom:1px dashed #E5E2D9;">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-bottom:0.35rem;">
                    <input 
                      type="text" 
                      class="form-input item-name-input" 
                      value="${P.escapeHtml(item.name)}" 
                      style="font-size:0.85rem;padding:0.35rem 0.5rem;font-weight:600;" 
                    />
                    <button type="button" class="btn-delete-item top-bar-action" data-item-id="${item.id}" aria-label="Delete Item" style="color:#D32F2F;">✕</button>
                  </div>

                  <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;align-items:center;gap:0.35rem;">
                      <span class="font-caption text-secondary">Qty:</span>
                      <input 
                        type="number" 
                        class="form-input item-qty-input" 
                        value="${item.quantity}" 
                        min="1" 
                        style="width:50px;padding:0.25rem;text-align:center;font-size:0.85rem;" 
                      />
                      <span class="font-caption text-secondary">× ฿</span>
                      <input 
                        type="number" 
                        class="form-input item-price-input" 
                        value="${item.unitPrice}" 
                        min="0" 
                        style="width:70px;padding:0.25rem;text-align:right;font-size:0.85rem;" 
                      />
                    </div>

                    <div style="font-family:monospace;font-weight:800;font-size:0.95rem;color:var(--color-brand-primary);">
                      ฿${calculateItemLineTotal(item).toLocaleString()}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Add Item Button -->
            <div style="margin-top:1rem;text-align:center;">
              <button type="button" id="btn-add-receipt-item" class="btn btn-outline btn-sm" style="border-radius:var(--radius-full);">
                ${t('bill.items.addItem')}
              </button>
            </div>

            <!-- Receipt Total -->
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:1.25rem;padding-top:0.85rem;border-top:2px solid #333;">
              <span style="font-weight:800;font-size:1.05rem;">${t('bill.items.total')}</span>
              <span id="receipt-total-display" style="font-family:monospace;font-size:1.35rem;font-weight:800;color:var(--color-brand-primary);">
                ฿${total.toLocaleString()}
              </span>
            </div>
          </div>

          <!-- Bottom Action: Proceed to Assign -->
          <div class="bottom-actions">
            <a href="#/bill/assign" class="btn btn-primary btn-lg">
              ${t('bill.items.proceedAssign')}
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindBillItemsEvents() {
    const state = P.getState();
    state.bill.receiptItems = state.bill.receiptItems || [];

    const updateTotals = () => {
      const total = calculateReceiptTotal(state.bill.receiptItems);
      const totalDisplay = document.getElementById('receipt-total-display');
      if (totalDisplay) totalDisplay.textContent = `฿${total.toLocaleString()}`;
      P.saveState();
    };

    const rows = document.querySelectorAll('.receipt-item-row');
    rows.forEach(row => {
      const id = row.getAttribute('data-item-id');
      const item = state.bill.receiptItems.find(x => x.id === id);
      if (!item) return;

      const nameInput = row.querySelector('.item-name-input');
      const qtyInput = row.querySelector('.item-qty-input');
      const priceInput = row.querySelector('.item-price-input');
      const delBtn = row.querySelector('.btn-delete-item');

      if (nameInput) nameInput.onchange = () => { item.name = nameInput.value.trim(); P.saveState(); };
      if (qtyInput) qtyInput.onchange = () => { item.quantity = parseInt(qtyInput.value, 10) || 1; updateTotals(); };
      if (priceInput) priceInput.onchange = () => { item.unitPrice = parseFloat(priceInput.value) || 0; updateTotals(); };
      if (delBtn) delBtn.onclick = () => {
        state.bill.receiptItems = state.bill.receiptItems.filter(x => x.id !== id);
        updateTotals();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    const addBtn = document.getElementById('btn-add-receipt-item');
    if (addBtn) {
      addBtn.onclick = () => {
        const newId = `item-${Date.now()}`;
        state.bill.receiptItems.push({ id: newId, name: 'New Item', quantity: 1, unitPrice: 100 });
        state.bill.assignments[newId] = ['user'];
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }
  }

  /* ==========================================================================
     5. Screen: Select Who Ate What (Assignment)
     ========================================================================== */

  function renderBillAssign() {
    const { members } = getBillContext();
    const state = P.getState();
    const t = P.t;
    const items = state.bill.receiptItems || [];
    const assignments = state.bill.assignments || {};
    const { memberTotals, totalAllocated } = calculateMemberTotals(items, assignments, members);
    const totalBill = calculateReceiptTotal(items);

    return `
      <main class="app-shell" aria-labelledby="assign-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/bill/items" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('bill.assign.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="assign-title" class="font-heading-1">${t('bill.assign.title')}</h2>
            <p class="screen-subtitle">${t('bill.assign.instruction')}</p>
          </section>

          <div id="assign-alert-area"></div>

          <!-- Items Assignment List -->
          <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:1.5rem;">
            ${items.map(item => {
              const assigned = assignments[item.id] || [];
              const lineTotal = calculateItemLineTotal(item);
              const isUnassigned = assigned.length === 0;

              return `
                <article class="card ${isUnassigned ? 'unassigned-warning' : ''}" style="padding:1rem;background:#FFFFFF;border-radius:var(--radius-xl);border:1.5px solid ${isUnassigned ? '#E05D5D' : 'var(--color-border)'};">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.6rem;">
                    <div>
                      <h3 class="font-heading-3" style="font-size:0.95rem;">${P.escapeHtml(item.name)}</h3>
                      <div class="font-caption text-secondary">
                        ${item.quantity} × ฿${item.unitPrice.toLocaleString()}
                      </div>
                    </div>
                    <div style="font-family:monospace;font-weight:800;font-size:1.05rem;color:var(--color-brand-primary);">
                      ฿${lineTotal.toLocaleString()}
                    </div>
                  </div>

                  <!-- Member Chips & Everyone Shortcut -->
                  <div style="display:flex;flex-wrap:wrap;gap:0.35rem;align-items:center;padding-top:0.6rem;border-top:1px dashed var(--color-border);">
                    <button 
                      type="button" 
                      class="btn-everyone-chip edit-pill-btn ${assigned.length === members.length ? 'selected-restriction' : ''}" 
                      data-item-id="${item.id}"
                    >
                      ${t('common.everyone')}
                    </button>

                    ${members.map(m => {
                      const isMemSelected = assigned.includes(m.id);
                      return `
                        <button 
                          type="button" 
                          class="btn-assign-member edit-pill-btn ${isMemSelected ? 'selected-allergy' : ''}" 
                          data-item-id="${item.id}"
                          data-member-id="${m.id}"
                          aria-pressed="${isMemSelected}"
                        >
                          <span>${isMemSelected ? '✓' : '＋'}</span>
                          <span>${P.escapeHtml(m.name.split(' ')[0])}</span>
                        </button>
                      `;
                    }).join('')}
                  </div>
                </article>
              `;
            }).join('')}
          </div>

          <!-- Running Totals Preview Box -->
          <div class="card" style="background:var(--color-surface-subtle);border-radius:var(--radius-xl);padding:1rem;margin-bottom:1.5rem;">
            <div class="font-label" style="margin-bottom:0.5rem;color:var(--color-brand-primary);">Live Shares Preview</div>
            <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:0.5rem;">
              ${members.map(m => `
                <div style="display:flex;justify-content:space-between;background:#fff;padding:0.4rem 0.6rem;border-radius:var(--radius-md);border:1px solid var(--color-border);font-size:0.8rem;">
                  <span>${P.escapeHtml(m.name.split(' ')[0])}</span>
                  <span style="font-family:monospace;font-weight:700;">฿${(memberTotals[m.id] || 0).toLocaleString()}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Action: Review Summary -->
          <div class="bottom-actions">
            <button type="button" id="btn-proceed-summary" class="btn btn-primary btn-lg">
              ${t('bill.assign.viewSummary')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindBillAssignEvents() {
    const { members } = getBillContext();
    const state = P.getState();
    state.bill.assignments = state.bill.assignments || {};

    const everyoneBtns = document.querySelectorAll('.btn-everyone-chip');
    const memberBtns = document.querySelectorAll('.btn-assign-member');
    const summaryBtn = document.getElementById('btn-proceed-summary');
    const alertArea = document.getElementById('assign-alert-area');

    everyoneBtns.forEach(btn => {
      btn.onclick = () => {
        const itemId = btn.getAttribute('data-item-id');
        const cur = state.bill.assignments[itemId] || [];
        if (cur.length === members.length) {
          state.bill.assignments[itemId] = ['user'];
        } else {
          state.bill.assignments[itemId] = members.map(m => m.id);
        }
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    memberBtns.forEach(btn => {
      btn.onclick = () => {
        const itemId = btn.getAttribute('data-item-id');
        const memId = btn.getAttribute('data-member-id');
        let cur = state.bill.assignments[itemId] || [];
        if (cur.includes(memId)) {
          cur = cur.filter(x => x !== memId);
        } else {
          cur = [...cur, memId];
        }
        state.bill.assignments[itemId] = cur;
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    if (summaryBtn) {
      summaryBtn.onclick = () => {
        const items = state.bill.receiptItems || [];
        const unassigned = items.some(item => (state.bill.assignments[item.id] || []).length === 0);
        if (unassigned) {
          if (alertArea) {
            alertArea.innerHTML = `<div class="card" style="background:#FFF0F0;color:#8E1F1F;padding:0.75rem;margin-bottom:1rem;font-size:0.85rem;">⚠️ ${P.t('bill.assign.errorUnassigned')}</div>`;
          }
          return;
        }
        P.navigateTo('#/bill/summary');
      };
    }
  }

  /* ==========================================================================
     6. Screen: Bill Summary Breakdown
     ========================================================================== */

  function renderBillSummary() {
    const { restaurant, members } = getBillContext();
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const items = state.bill.receiptItems || [];
    const assignments = state.bill.assignments || {};
    const { memberTotals, memberItemDetails } = calculateMemberTotals(items, assignments, members);
    const totalBill = calculateReceiptTotal(items);

    return `
      <main class="app-shell" aria-labelledby="summary-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/bill/assign" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('bill.summary.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- Total Summary Hero -->
          <div class="card card-hero" style="margin-bottom:1.25rem;text-align:center;">
            <span class="step-badge" style="background:#EDF9F0;color:#165E2A;font-weight:700;">
              ${t('bill.summary.reconciledBadge')}
            </span>
            <div style="font-family:monospace;font-size:2.2rem;font-weight:800;color:var(--color-brand-primary);margin-top:0.4rem;">
              ฿${totalBill.toLocaleString()}
            </div>
            <div class="font-caption text-secondary">
              ${P.escapeHtml(isTH ? restaurant.thaiName : restaurant.name)} • ${members.length} ${t('common.member')}
            </div>
          </div>

          <!-- Per-Member Breakdown Cards -->
          <section aria-label="Member Breakdown">
            <div style="display:flex;flex-direction:column;gap:0.85rem;margin-bottom:1.5rem;">
              ${members.map(m => {
                const shareTotal = memberTotals[m.id] || 0;
                const details = memberItemDetails[m.id] || [];

                return `
                  <div class="card" style="padding:1rem;background:#FFFFFF;border-radius:var(--radius-xl);border:1.5px solid var(--color-border);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                      <div style="display:flex;align-items:center;gap:0.6rem;">
                        <div class="member-avatar ${m.colorClass || 'avatar-petal'}" style="width:34px;height:34px;font-size:0.8rem;">${m.initials}</div>
                        <div style="font-weight:700;font-size:0.95rem;">${P.escapeHtml(m.name)}</div>
                      </div>
                      <div style="font-family:monospace;font-size:1.15rem;font-weight:800;color:var(--color-brand-primary);">
                        ฿${shareTotal.toLocaleString()}
                      </div>
                    </div>

                    <!-- Itemized Breakdown Accordion -->
                    <div style="padding-top:0.5rem;border-top:1px dashed var(--color-border);font-size:0.8rem;color:var(--color-text-secondary);">
                      ${details.map(d => `
                        <div style="display:flex;justify-content:space-between;margin-top:0.25rem;">
                          <span>${P.escapeHtml(d.name)} (${d.splitCount > 1 ? `1/${d.splitCount}` : 'all'})</span>
                          <span style="font-family:monospace;font-weight:600;">฿${d.memberShare.toLocaleString()}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>

          <!-- Bottom Action: Confirm Split & Go to Payment -->
          <div class="bottom-actions">
            <button type="button" id="btn-confirm-split" class="btn btn-primary btn-lg">
              ${t('bill.summary.confirm')}
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindBillSummaryEvents() {
    const confirmBtn = document.getElementById('btn-confirm-split');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const state = P.getState();
        const { restaurant, members } = getBillContext();
        const items = state.bill.receiptItems || [];
        const total = calculateReceiptTotal(items);

        state.bill.finalized = true;
        state.bill.completedRecord = {
          restaurantName: restaurant.name,
          dateLabel: 'Today • 20:30',
          totalBill: total,
          participantsCount: members.length,
          paymentComplete: false
        };
        P.saveState();
        P.navigateTo('#/bill/payment');
      };
    }
  }

  /* ==========================================================================
     7. Screen: Payment Status & Settlement
     ========================================================================== */

  function renderBillPayment() {
    const { restaurant, members } = getBillContext();
    const state = P.getState();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const items = state.bill.receiptItems || [];
    const assignments = state.bill.assignments || {};
    const { memberTotals } = calculateMemberTotals(items, assignments, members);
    const paymentStatuses = state.bill.paymentStatuses || {};
    const { totalCount, paidCount, paidAmount, totalBillAmount, isAllPaid, progressPercent } = calculatePaymentProgress(members, paymentStatuses, memberTotals);

    return `
      <main class="app-shell" aria-labelledby="payment-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/bill/summary" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('bill.payment.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell">
          <!-- All Settled Celebration Banner -->
          ${isAllPaid ? `
            <div class="card" style="background:#EDF9F0;border:1.5px solid #A6DEB4;text-align:center;padding:1.25rem;margin-bottom:1.25rem;">
              <div style="font-size:42px;margin-bottom:0.25rem;">🎉</div>
              <h2 class="font-heading-2" style="color:#165E2A;">${t('bill.payment.allSettled')}</h2>
              <p class="font-body-small" style="color:#165E2A;margin-top:0.25rem;">
                Total ฿${totalBillAmount.toLocaleString()} collected
              </p>
            </div>
          ` : ''}

          <!-- Payment Progress Hero -->
          <div class="card card-hero" style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <span class="step-badge" style="background:var(--color-surface-subtle);color:var(--color-brand-primary);">
                  ${paidCount} of ${totalCount} Paid
                </span>
                <div style="font-family:monospace;font-size:1.8rem;font-weight:800;color:var(--color-brand-primary);margin-top:0.4rem;">
                  ฿${paidAmount.toLocaleString()} / ฿${totalBillAmount.toLocaleString()}
                </div>
              </div>
              <span style="font-family:monospace;font-weight:800;font-size:1.2rem;color:var(--color-brand-secondary);">
                ${progressPercent}%
              </span>
            </div>

            <!-- Progress Bar -->
            <div style="width:100%;height:8px;background:rgba(0,0,0,0.06);border-radius:var(--radius-full);margin-top:0.75rem;overflow:hidden;">
              <div style="width:${progressPercent}%;height:100%;background:var(--color-brand-primary);border-radius:var(--radius-full);transition:width 0.3s ease;"></div>
            </div>
          </div>

          <!-- Members Payment Roster -->
          <section aria-label="Member Payments">
            <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
              ${members.map(m => {
                const isPaid = paymentStatuses[m.id] === 'paid';
                const isUser = m.id === 'user';
                const share = memberTotals[m.id] || 0;

                return `
                  <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:0.85rem 1rem;background:#FFFFFF;border:1.5px solid ${isPaid ? '#A6DEB4' : 'var(--color-border)'};">
                    <div style="display:flex;align-items:center;gap:0.65rem;">
                      <div class="member-avatar ${m.colorClass || 'avatar-petal'}">${m.initials}</div>
                      <div>
                        <div style="font-weight:700;font-size:0.9rem;">${P.escapeHtml(m.name)}</div>
                        <div style="font-family:monospace;font-weight:700;font-size:0.85rem;color:var(--color-brand-primary);">
                          ฿${share.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    ${isUser ? `
                      <button 
                        type="button" 
                        id="btn-toggle-user-payment" 
                        class="btn btn-sm ${isPaid ? 'btn-secondary' : 'btn-primary'}"
                        style="border-radius:var(--radius-full);"
                      >
                        ${isPaid ? `✓ ${t('bill.payment.paid')}` : t('bill.payment.markAsPaid')}
                      </button>
                    ` : `
                      <span class="payment-status-badge ${isPaid ? 'status-paid' : 'status-unpaid'}">
                        ${isPaid ? `✓ ${t('bill.payment.paid')}` : t('bill.payment.unpaid')}
                      </span>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          </section>

          <!-- Bottom Action -->
          <div class="bottom-actions">
            <a href="#/home" class="btn btn-primary btn-lg">
              ${t('bill.payment.returnHome')}
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindBillPaymentEvents() {
    const toggleBtn = document.getElementById('btn-toggle-user-payment');
    const state = P.getState();

    if (toggleBtn) {
      toggleBtn.onclick = () => {
        state.bill.paymentStatuses = state.bill.paymentStatuses || {};
        const cur = state.bill.paymentStatuses['user'];
        state.bill.paymentStatuses['user'] = cur === 'paid' ? 'unpaid' : 'paid';
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }
  }

  // Expose to Prototype Namespace
  P.getBillContext = getBillContext;
  P.calculateItemLineTotal = calculateItemLineTotal;
  P.calculateReceiptTotal = calculateReceiptTotal;
  P.calculateMemberTotals = calculateMemberTotals;
  P.calculatePaymentProgress = calculatePaymentProgress;
  P.renderSplitBill = renderSplitBill;
  P.bindSplitBillEvents = bindSplitBillEvents;
  P.renderBillReceipt = renderBillReceipt;
  P.bindBillReceiptEvents = bindBillReceiptEvents;
  P.renderBillItems = renderBillItems;
  P.bindBillItemsEvents = bindBillItemsEvents;
  P.renderBillAssign = renderBillAssign;
  P.bindBillAssignEvents = bindBillAssignEvents;
  P.renderBillSummary = renderBillSummary;
  P.bindBillSummaryEvents = bindBillSummaryEvents;
  P.renderBillPayment = renderBillPayment;
  P.bindBillPaymentEvents = bindBillPaymentEvents;

})();
