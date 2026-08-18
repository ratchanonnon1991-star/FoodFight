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
 *   - Transition to V6 Boundary (Home & Bill History Shell)
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

    // Use active participating members, fallback to demo 4 members
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

  /**
   * Deterministic Split Math & Exact Zero-Satang Reconciliation
   * Distributes remainder evenly so that sum of member totals ALWAYS equals bill total.
   */
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

      if (N > 0 && lineTotal > 0) {
        const baseShare = Math.floor(lineTotal / N);
        const remainder = lineTotal - (baseShare * N);

        assignedIds.forEach((mId, index) => {
          const share = baseShare + (index < remainder ? 1 : 0);
          if (memberTotals[mId] !== undefined) {
            memberTotals[mId] += share;
            memberItemDetails[mId].push({
              itemId: item.id,
              name: item.name,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              lineTotal: lineTotal,
              shareAmount: share,
              isShared: N > 1,
              totalMembers: N
            });
            totalAllocated += share;
          }
        });
      }
    });

    return { memberTotals, memberItemDetails, totalAllocated };
  }

  function calculatePaymentProgress(members, memberTotals, paymentStatuses) {
    let paidCount = 0;
    let collectedAmount = 0;
    let totalBill = 0;

    members.forEach(m => {
      const amount = memberTotals[m.id] || 0;
      totalBill += amount;
      const status = paymentStatuses[m.id] || 'unpaid';
      if (status === 'paid') {
        paidCount++;
        collectedAmount += amount;
      }
    });

    const totalCount = members.length;
    const isAllPaid = totalCount > 0 && paidCount === totalCount;
    const percentage = totalBill > 0 ? Math.round((collectedAmount / totalBill) * 100) : 0;

    return { paidCount, totalCount, collectedAmount, totalBill, isAllPaid, percentage };
  }

  /* ==========================================================================
     2. Split Bill Overview Screen (#/bill)
     ========================================================================== */

  function renderSplitBill() {
    const { restaurant, finalMenu, members } = getBillContext();

    return `
      <main class="app-shell" aria-labelledby="split-bill-title">
        <header class="top-bar">
          <a href="#/restaurants/selected" class="top-bar-action" aria-label="Back to Selected Destination">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Split the Bill</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Venue & Order Context Card -->
          <div class="bill-context-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <div class="font-caption text-secondary" style="font-weight:600;">Dining Destination</div>
                <div style="font-size:1.1rem;font-weight:800;color:var(--color-brand-primary);">${P.escapeHtml(restaurant.name)}</div>
                <div class="font-caption text-muted">${P.escapeHtml(restaurant.thaiName)}</div>
              </div>
              <div style="font-size:32px;">🧾</div>
            </div>

            <div style="margin-top:0.75rem;padding-top:0.65rem;border-top:1px dashed var(--color-border);display:flex;justify-content:space-between;align-items:center;">
              <div class="font-caption text-secondary">
                Winning Dish: <strong>${P.escapeHtml(finalMenu.name.split('&')[0])}</strong>
              </div>
              <div class="font-caption text-secondary">
                <strong>${members.length} Members</strong>
              </div>
            </div>
          </div>

          <!-- 3-Step Journey Cards -->
          <div class="bill-step-grid">
            <div class="bill-step-card">
              <div class="bill-step-num">1</div>
              <div>
                <div style="font-weight:700;font-size:0.875rem;color:var(--color-brand-primary);">Scan Paper Receipt</div>
                <div class="font-caption text-secondary">AI instantly detects items and itemized prices.</div>
              </div>
            </div>

            <div class="bill-step-card">
              <div class="bill-step-num">2</div>
              <div>
                <div style="font-weight:700;font-size:0.875rem;color:var(--color-brand-primary);">Select Who Ate What</div>
                <div class="font-caption text-secondary">Assign individual or shared dishes with 1 tap.</div>
              </div>
            </div>

            <div class="bill-step-card">
              <div class="bill-step-num">3</div>
              <div>
                <div style="font-weight:700;font-size:0.875rem;color:var(--color-brand-primary);">Settle Fair Payouts</div>
                <div class="font-caption text-secondary">Exact zero-satang math with live payment status.</div>
              </div>
            </div>
          </div>

          <!-- Bottom Actions: Acquisition Choices -->
          <div class="bottom-actions">
            <a href="#/bill/receipt" class="btn btn-primary btn-lg" id="btn-start-scan">
              Scan Receipt Camera 📸 →
            </a>
            <button type="button" class="btn btn-secondary" id="btn-upload-sample">
              Load Sample Receipt 📄
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindSplitBillEvents() {
    const uploadBtn = document.getElementById('btn-upload-sample');
    if (uploadBtn) {
      uploadBtn.onclick = () => {
        const state = P.getState();
        state.bill.receiptSource = 'sample';
        state.bill.receiptItems = JSON.parse(JSON.stringify(P.DEFAULT_RECEIPT_ITEMS));
        P.saveState();
        P.showToast('Sample receipt loaded successfully!', 'success');
        P.navigateTo('#/bill/items');
      };
    }
  }

  /* ==========================================================================
     3. Simulated Receipt Scanner Viewfinder (#/bill/receipt)
     ========================================================================== */

  function renderBillReceipt() {
    return `
      <main class="app-shell" aria-labelledby="receipt-scanner-title">
        <header class="top-bar">
          <a href="#/bill" class="top-bar-action" aria-label="Back to Bill Overview">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title" id="receipt-scanner-title">Scanning Receipt</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Scanner Viewfinder Simulation -->
          <div class="scanner-viewport" role="region" aria-label="Receipt Camera Scanner">
            
            <div class="scanner-receipt-frame">
              <div class="scanner-corner scanner-corner-tl"></div>
              <div class="scanner-corner scanner-corner-tr"></div>
              <div class="scanner-corner scanner-corner-bl"></div>
              <div class="scanner-corner scanner-corner-br"></div>

              <div class="scanner-laser-line"></div>

              <div style="opacity:0.3;text-align:center;font-size:11px;line-height:1.6;font-family:monospace;">
                ===================<br>
                SIAM EMBER KITCHEN<br>
                -------------------<br>
                WAGYU KRAPOW x2<br>
                FRIED DUCK EGG x2<br>
                LEMONGRASS WINGS x1<br>
                THAI MILK TEA x3<br>
                PANDAN PUDDING x1<br>
                ===================
              </div>
            </div>

            <div class="scanner-status-pill" id="scanner-status-text" aria-live="polite">
              <span class="loading-spinner" style="width:14px;height:14px;border-width:2px;"></span>
              <span>Reading receipt…</span>
            </div>

          </div>

          <div style="text-align:center;margin-bottom:1.25rem;">
            <p class="font-body-small text-secondary">
              Hold the receipt flat within the frame. AI parses items and totals automatically.
            </p>
          </div>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            <button type="button" id="btn-skip-scan" class="btn btn-primary btn-lg">
              Proceed to Review Items →
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindBillReceiptEvents() {
    const statusText = document.getElementById('scanner-status-text');
    const skipBtn = document.getElementById('btn-skip-scan');

    const state = P.getState();
    state.bill.receiptItems = JSON.parse(JSON.stringify(P.DEFAULT_RECEIPT_ITEMS));
    P.saveState();

    // Sequence stages: Reading -> Finding -> Done -> Navigate
    const t1 = setTimeout(() => {
      if (statusText) statusText.innerHTML = `<span>⚡ Finding items & prices…</span>`;
    }, 600);

    const t2 = setTimeout(() => {
      if (statusText) statusText.innerHTML = `<span>✓ 6 items detected!</span>`;
    }, 1100);

    const t3 = setTimeout(() => {
      P.navigateTo('#/bill/items');
    }, 1500);

    if (skipBtn) {
      skipBtn.onclick = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        P.navigateTo('#/bill/items');
      };
    }
  }

  /* ==========================================================================
     4. Review Receipt Items Screen (#/bill/items)
     ========================================================================== */

  function renderBillItems() {
    const state = P.getState();
    const { restaurant } = getBillContext();
    const items = state.bill.receiptItems || [];
    const totalBill = calculateReceiptTotal(items);

    return `
      <main class="app-shell" aria-labelledby="receipt-items-title">
        <header class="top-bar">
          <a href="#/bill" class="top-bar-action" aria-label="Back to Bill Options">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title" id="receipt-items-title">Review Receipt</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Thermal Paper Styled Receipt Container -->
          <div class="receipt-paper">
            <div class="receipt-paper-header">
              <div style="font-weight:800;font-size:1.05rem;color:var(--color-brand-primary);">${P.escapeHtml(restaurant.name)}</div>
              <div class="font-caption text-muted">Table 04 • Sukhumvit Branch • Today</div>
              <div class="font-caption text-secondary" style="margin-top:0.25rem;">Scanned Line Items (${items.length})</div>
            </div>

            <!-- Itemized List with Inline Inputs -->
            <div class="receipt-item-list" id="receipt-item-rows">
              ${items.map((item, index) => {
                const lineTotal = calculateItemLineTotal(item);
                return `
                  <div class="receipt-item-row" data-item-id="${item.id}">
                    <input 
                      type="text" 
                      class="receipt-input-name input-item-name" 
                      value="${P.escapeHtml(item.name)}" 
                      placeholder="Item name"
                      aria-label="Item name"
                    />
                    <input 
                      type="number" 
                      class="receipt-input-qty input-item-qty" 
                      value="${item.quantity}" 
                      min="1" 
                      max="99"
                      aria-label="Quantity"
                    />
                    <span class="font-caption text-muted">×</span>
                    <input 
                      type="number" 
                      class="receipt-input-price input-item-price" 
                      value="${item.unitPrice}" 
                      min="0" 
                      step="1"
                      aria-label="Unit Price"
                    />
                    <div style="font-weight:700;font-size:0.85rem;font-family:monospace;width:60px;text-align:right;">
                      ฿${lineTotal}
                    </div>
                    <button type="button" class="receipt-btn-delete btn-delete-item" title="Delete item" aria-label="Delete item">
                      ✕
                    </button>
                  </div>
                `;
              }).join('')}
            </div>

            <button type="button" id="btn-add-receipt-item" class="btn btn-outline btn-sm" style="width:100%;margin-bottom:1rem;border-style:dashed;">
              ＋ Add Receipt Item
            </button>

            <!-- Derived Receipt Totals -->
            <div class="receipt-summary-box">
              <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--color-text-secondary);">
                <span>Item Subtotal (${items.length} items)</span>
                <span style="font-family:monospace;font-weight:600;">฿${totalBill}</span>
              </div>
              <div class="receipt-total-row">
                <span>Total Bill</span>
                <span id="receipt-total-display">฿${totalBill.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            <button type="button" id="btn-continue-to-assign" class="btn btn-primary btn-lg">
              Continue to Assign Members →
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindBillItemsEvents() {
    const state = P.getState();
    const items = state.bill.receiptItems || [];

    function syncAndRecalculate() {
      const rows = document.querySelectorAll('.receipt-item-row');
      rows.forEach(row => {
        const itemId = row.getAttribute('data-item-id');
        const item = items.find(i => i.id === itemId);
        if (item) {
          const nameInput = row.querySelector('.input-item-name');
          const qtyInput = row.querySelector('.input-item-qty');
          const priceInput = row.querySelector('.input-item-price');

          item.name = nameInput.value.trim();
          item.quantity = parseInt(qtyInput.value, 10) || 1;
          item.unitPrice = parseFloat(priceInput.value) || 0;
        }
      });
      P.saveState();
      const total = calculateReceiptTotal(items);
      const totalDisplay = document.getElementById('receipt-total-display');
      if (totalDisplay) totalDisplay.textContent = `฿${total.toLocaleString()}`;
    }

    // Attach listeners to input fields
    const rows = document.querySelectorAll('.receipt-item-row');
    rows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      inputs.forEach(input => {
        input.oninput = syncAndRecalculate;
      });

      const delBtn = row.querySelector('.btn-delete-item');
      if (delBtn) {
        delBtn.onclick = () => {
          const itemId = row.getAttribute('data-item-id');
          state.bill.receiptItems = state.bill.receiptItems.filter(i => i.id !== itemId);
          delete state.bill.assignments[itemId];
          P.saveState();
          P.showToast('Item removed.', 'info');
          if (P.renderCurrentRoute) P.renderCurrentRoute();
        };
      }
    });

    // Add item button
    const addBtn = document.getElementById('btn-add-receipt-item');
    if (addBtn) {
      addBtn.onclick = () => {
        syncAndRecalculate();
        const newId = `item-${Date.now()}`;
        state.bill.receiptItems.push({
          id: newId,
          name: 'Extra Dish / Beverage',
          quantity: 1,
          unitPrice: 100
        });
        state.bill.assignments[newId] = [];
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    // Continue to Assignment
    const continueBtn = document.getElementById('btn-continue-to-assign');
    if (continueBtn) {
      continueBtn.onclick = () => {
        syncAndRecalculate();
        if (items.length === 0) {
          P.showToast('Receipt must have at least 1 item.', 'error');
          return;
        }
        const hasInvalid = items.some(i => !i.name || i.quantity <= 0 || i.unitPrice < 0);
        if (hasInvalid) {
          P.showToast('Please provide valid name and prices for all items.', 'error');
          return;
        }
        P.navigateTo('#/bill/assign');
      };
    }
  }

  /* ==========================================================================
     5. Select Who Ate What Screen (#/bill/assign)
     ========================================================================== */

  function renderBillAssign() {
    const state = P.getState();
    const { members } = getBillContext();
    const items = state.bill.receiptItems || [];
    const assignments = state.bill.assignments || {};

    const { memberTotals, totalAllocated } = calculateMemberTotals(items, assignments, members);
    const totalBill = calculateReceiptTotal(items);

    return `
      <main class="app-shell" aria-labelledby="assign-title">
        <header class="top-bar">
          <a href="#/bill/items" class="top-bar-action" aria-label="Back to Review Items">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title" id="assign-title">Who Ate What?</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <div style="margin-bottom:0.85rem;">
            <p class="font-body-small text-secondary">
              Tap members who shared each dish. Tap <strong>Everyone</strong> to split shared items equally.
            </p>
          </div>

          <!-- Running Member Totals Drawer -->
          <div class="running-totals-drawer">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="font-label" style="color:var(--color-brand-primary);">Running Share Breakdown</span>
              <span class="font-caption text-secondary">Total: ฿${totalBill}</span>
            </div>
            <div class="running-totals-grid">
              ${members.map(m => `
                <div class="running-total-pill">
                  <div style="font-weight:700;color:var(--color-brand-primary);">${P.escapeHtml(m.name.split(' ')[0])}</div>
                  <div style="font-family:monospace;font-weight:800;color:var(--color-brand-secondary);">฿${memberTotals[m.id] || 0}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Per-Item Assignment Cards -->
          <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
            ${items.map(item => {
              const lineTotal = calculateItemLineTotal(item);
              const assigned = assignments[item.id] || [];
              const isUnassigned = assigned.length === 0;
              const isEveryone = members.length > 0 && members.every(m => assigned.includes(m.id));

              return `
                <div class="assign-item-card ${isUnassigned ? 'unassigned' : ''}" data-item-id="${item.id}">
                  <div class="assign-item-header">
                    <div>
                      <div class="assign-item-name">${P.escapeHtml(item.name)}</div>
                      <div class="font-caption text-secondary">Qty: ${item.quantity} × ฿${item.unitPrice}</div>
                    </div>
                    <div class="assign-item-price">฿${lineTotal}</div>
                  </div>

                  <div class="assign-members-wrap" role="group" aria-label="Assign members to ${P.escapeHtml(item.name)}">
                    <!-- Everyone Shortcut Chip -->
                    <button 
                      type="button" 
                      class="assign-chip assign-chip-everyone ${isEveryone ? 'selected' : ''}" 
                      data-action="everyone"
                      data-item-id="${item.id}"
                      aria-pressed="${isEveryone}"
                    >
                      <span>👥 Everyone</span>
                    </button>

                    <!-- Individual Member Chips -->
                    ${members.map(m => {
                      const isSelected = assigned.includes(m.id);
                      return `
                        <button 
                          type="button" 
                          class="assign-chip ${isSelected ? 'selected' : ''}" 
                          data-action="member"
                          data-item-id="${item.id}"
                          data-member-id="${m.id}"
                          aria-pressed="${isSelected}"
                        >
                          <span style="width:18px;height:18px;border-radius:var(--radius-full);background:var(--color-brand-secondary);color:#fff;font-size:9px;display:inline-flex;align-items:center;justify-content:center;">
                            ${P.escapeHtml(m.initials || m.name.charAt(0))}
                          </span>
                          <span>${P.escapeHtml(m.name.split(' ')[0])}</span>
                        </button>
                      `;
                    }).join('')}
                  </div>

                  ${isUnassigned ? `
                    <div class="font-caption" style="color:#C05621;font-weight:600;">
                      ⚠️ Not assigned yet. Tap members above to allocate.
                    </div>
                  ` : `
                    <div class="font-caption text-muted">
                      Split between ${assigned.length} member${assigned.length > 1 ? 's' : ''} (฿${Math.round(lineTotal / assigned.length)} each)
                    </div>
                  `}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            <button type="button" id="btn-to-summary" class="btn btn-primary btn-lg">
              Review Bill Summary →
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindBillAssignEvents() {
    const state = P.getState();
    const { members } = getBillContext();
    const items = state.bill.receiptItems || [];
    state.bill.assignments = state.bill.assignments || {};

    // Individual member chip toggle
    const memberChips = document.querySelectorAll('.assign-chip[data-action="member"]');
    memberChips.forEach(chip => {
      chip.onclick = () => {
        const itemId = chip.getAttribute('data-item-id');
        const memberId = chip.getAttribute('data-member-id');
        
        let currentList = state.bill.assignments[itemId] || [];
        if (currentList.includes(memberId)) {
          state.bill.assignments[itemId] = currentList.filter(id => id !== memberId);
        } else {
          state.bill.assignments[itemId] = [...currentList, memberId];
        }
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    // Everyone shortcut chip toggle
    const everyoneChips = document.querySelectorAll('.assign-chip[data-action="everyone"]');
    everyoneChips.forEach(chip => {
      chip.onclick = () => {
        const itemId = chip.getAttribute('data-item-id');
        const allIds = members.map(m => m.id);
        const currentList = state.bill.assignments[itemId] || [];
        const isAlreadyEveryone = members.every(m => currentList.includes(m.id));

        if (isAlreadyEveryone) {
          state.bill.assignments[itemId] = [];
        } else {
          state.bill.assignments[itemId] = [...allIds];
        }
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    // Summary validation & proceed
    const summaryBtn = document.getElementById('btn-to-summary');
    if (summaryBtn) {
      summaryBtn.onclick = () => {
        const unassigned = items.some(item => {
          const assigned = state.bill.assignments[item.id] || [];
          return assigned.length === 0;
        });

        if (unassigned) {
          P.showToast('Please assign all items before continuing.', 'error');
          return;
        }

        P.navigateTo('#/bill/summary');
      };
    }
  }

  /* ==========================================================================
     6. Bill Summary & Reconciliation Screen (#/bill/summary)
     ========================================================================== */

  function renderBillSummary() {
    const state = P.getState();
    const { restaurant, members } = getBillContext();
    const items = state.bill.receiptItems || [];
    const assignments = state.bill.assignments || {};

    const { memberTotals, memberItemDetails, totalAllocated } = calculateMemberTotals(items, assignments, members);
    const totalBill = calculateReceiptTotal(items);
    const isReconciled = totalAllocated === totalBill;

    return `
      <main class="app-shell" aria-labelledby="bill-summary-title">
        <header class="top-bar">
          <a href="#/bill/assign" class="top-bar-action" aria-label="Back to Assignment">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title" id="bill-summary-title">Bill Summary</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Summary Hero Banner -->
          <div class="bill-summary-hero">
            <span class="reconciliation-badge">
              ✓ 100% Reconciled
            </span>

            <div class="font-caption text-secondary" style="margin-top:0.5rem;font-weight:600;">Total Bill Amount</div>
            <div style="font-size:1.85rem;font-weight:800;color:var(--color-brand-primary);font-family:monospace;margin:0.25rem 0;">
              ฿${totalBill.toLocaleString()}
            </div>
            <div class="font-caption text-muted">${P.escapeHtml(restaurant.name)} • ${members.length} Members</div>
          </div>

          <!-- Expandable Member Total Cards -->
          <div style="margin-bottom:1.5rem;">
            <div class="font-label text-secondary" style="margin-bottom:0.65rem;">Individual Shares</div>

            ${members.map(m => {
              const amount = memberTotals[m.id] || 0;
              const details = memberItemDetails[m.id] || [];

              return `
                <div class="summary-member-card">
                  <div class="summary-member-header">
                    <div style="display:flex;align-items:center;gap:0.65rem;">
                      <div class="avatar-badge ${m.colorClass || 'avatar-petal'}" style="width:36px;height:36px;font-size:0.8rem;">
                        ${P.escapeHtml(m.initials || m.name.charAt(0))}
                      </div>
                      <div>
                        <div style="font-weight:700;font-size:0.925rem;color:var(--color-brand-primary);">
                          ${P.escapeHtml(m.name)}
                        </div>
                        <div class="font-caption text-secondary">${details.length} dish${details.length > 1 ? 'es' : ''}</div>
                      </div>
                    </div>
                    <div style="font-family:monospace;font-size:1.1rem;font-weight:800;color:var(--color-brand-primary);">
                      ฿${amount.toLocaleString()}
                    </div>
                  </div>

                  <!-- Itemized Share Breakdown -->
                  <div class="summary-member-breakdown">
                    ${details.map(d => `
                      <div style="display:flex;justify-content:space-between;color:var(--color-text-secondary);">
                        <span>${P.escapeHtml(d.name)} ${d.isShared ? `<small style="color:#8E8A85;">(Shared ×${d.totalMembers})</small>` : ''}</span>
                        <span style="font-family:monospace;font-weight:600;">฿${d.shareAmount}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            <button type="button" id="btn-confirm-split" class="btn btn-primary btn-lg">
              Confirm Split & Request Payments 💸 →
            </button>
            <a href="#/bill/assign" class="btn btn-secondary">
              Edit Item Assignments
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindBillSummaryEvents() {
    const confirmBtn = document.getElementById('btn-confirm-split');
    const state = P.getState();

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        state.bill.finalized = true;
        P.saveState();
        P.showToast('Split bill confirmed! Payment tracker opened.', 'success');
        P.navigateTo('#/bill/payment');
      };
    }
  }

  /* ==========================================================================
     7. Real-Time Payment Status Screen (#/bill/payment)
     ========================================================================== */

  function renderBillPayment() {
    const state = P.getState();
    const { restaurant, members } = getBillContext();
    const items = state.bill.receiptItems || [];
    const assignments = state.bill.assignments || {};
    const paymentStatuses = state.bill.paymentStatuses || {};

    const { memberTotals } = calculateMemberTotals(items, assignments, members);
    const progress = calculatePaymentProgress(members, memberTotals, paymentStatuses);

    // Save completed history-ready record
    if (progress.isAllPaid) {
      state.bill.completedRecord = {
        restaurantName: restaurant.name,
        dateLabel: 'Today',
        totalBill: progress.totalBill,
        participantsCount: members.length,
        paymentComplete: true
      };
      P.saveState();
    }

    return `
      <main class="app-shell" aria-labelledby="payment-status-title">
        <header class="top-bar">
          <a href="#/bill/summary" class="top-bar-action" aria-label="Back to Summary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title" id="payment-status-title">Payment Status</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- All Settled Celebration Banner if completed -->
          ${progress.isAllPaid ? `
            <div class="all-settled-card">
              <span class="payment-status-badge status-paid" style="margin-bottom:0.5rem;">
                ✓ Settled Complete
              </span>
              <div style="font-size:40px;margin:0.25rem 0;">🎉</div>
              <h2 class="font-heading-1" style="font-size:1.4rem;">All Settled!</h2>
              <p class="font-body-small text-secondary" style="margin-top:0.25rem;">
                Everyone in the group has completed their payment for ${P.escapeHtml(restaurant.name)}.
              </p>
            </div>
          ` : `
            <!-- Live Progress Hero -->
            <div class="payment-progress-hero">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                <span class="font-label" style="color:var(--color-brand-primary);">Collected Progress</span>
                <span class="payment-status-badge status-unpaid">${progress.paidCount} of ${progress.totalCount} Paid</span>
              </div>

              <div style="font-size:1.5rem;font-weight:800;color:var(--color-brand-primary);font-family:monospace;margin-bottom:0.5rem;">
                ฿${progress.collectedAmount.toLocaleString()} <span style="font-size:0.95rem;font-weight:500;color:var(--color-text-secondary);">/ ฿${progress.totalBill.toLocaleString()}</span>
              </div>

              <!-- Visual Progress Bar -->
              <div style="height:8px;background:var(--color-surface-subtle);border-radius:var(--radius-full);overflow:hidden;border:1px solid var(--color-border);">
                <div style="width:${progress.percentage}%;height:100%;background:linear-gradient(90deg, #D96B4F, #165E2A);transition:width var(--transition-normal);"></div>
              </div>
            </div>
          `}

          <!-- Member Payment Status List -->
          <div style="margin-bottom:1.5rem;">
            <div class="font-label text-secondary" style="margin-bottom:0.65rem;">Member Payment Roster</div>

            ${members.map(m => {
              const amount = memberTotals[m.id] || 0;
              const isPaid = paymentStatuses[m.id] === 'paid';
              const isUser = m.id === 'user';

              return `
                <div class="payment-member-row">
                  <div style="display:flex;align-items:center;gap:0.65rem;">
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}" style="width:36px;height:36px;font-size:0.8rem;">
                      ${P.escapeHtml(m.initials || m.name.charAt(0))}
                    </div>
                    <div>
                      <div style="font-weight:700;font-size:0.925rem;color:var(--color-brand-primary);">
                        ${P.escapeHtml(m.name)}
                      </div>
                      <div style="font-family:monospace;font-size:0.85rem;font-weight:700;color:var(--color-text-secondary);">
                        ฿${amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    ${isUser ? `
                      <button 
                        type="button" 
                        id="btn-toggle-user-payment"
                        class="btn btn-sm ${isPaid ? 'btn-outline' : 'btn-primary'} btn-toggle-user-payment" 
                        style="${isPaid ? 'color:#165E2A;border-color:#A6DEB4;background:#EDF9F0;' : ''}"
                      >
                        ${isPaid ? '✓ Paid' : 'Mark as Paid'}
                      </button>
                    ` : `
                      <span class="payment-status-badge ${isPaid ? 'status-paid' : 'status-unpaid'}">
                        ${isPaid ? '✓ Paid' : 'Pending'}
                      </span>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Bottom Actions (V6 Boundary) -->
          <div class="bottom-actions">
            <a href="#/home" class="btn btn-primary btn-lg">
              Return to Home Dashboard 🏠
            </a>
            <a href="#/bill-history" class="btn btn-secondary">
              View in Bill History 📜
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindBillPaymentEvents() {
    const userToggleBtn = document.getElementById('btn-toggle-user-payment');
    const state = P.getState();

    if (userToggleBtn) {
      userToggleBtn.onclick = () => {
        const current = state.bill.paymentStatuses['user'] || 'unpaid';
        const next = current === 'paid' ? 'unpaid' : 'paid';
        state.bill.paymentStatuses['user'] = next;
        P.saveState();
        P.showToast(next === 'paid' ? 'Your share marked as Paid ✓' : 'Status marked as Unpaid.', 'info');
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }
  }

  // Expose to Prototype Namespace
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
