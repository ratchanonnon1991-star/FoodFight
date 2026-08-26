/**
 * FoodFighter - Wave 02 local gameplay prototype
 *
 * This module continues the Wave 01 clickable journey with deterministic,
 * presentation-only preference, pick, vote, result, and restaurant states.
 * It deliberately has no network, gameplay, recommendation, or restaurant
 * runtime dependencies.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;
  const W = P.WAVE1;
  const C = P.WAVE1_COMPONENTS;
  const S = P.WAVE1_SHELL;

  const copy = {
    en: {
      prototypeLabel: 'DESIGN CANDIDATE · PROTOTYPE ONLY · TEAM-OWNED RUNTIME',
      sessionSetup: 'SESSION SETUP · FOODFIGHT',
      mealPreferenceTitle: 'What sounds good for this table?',
      mealPreferenceBody: 'Choose the feeling for this FoodFight. These choices are for this session only — your Food Profile stays separate.',
      cuisine: 'Cuisine',
      ingredients: 'Ingredients',
      cookingType: 'Cooking type',
      chooseCuisine: 'Start with one cuisine',
      chooseIngredients: 'Add ingredients the table is open to',
      chooseCookingType: 'Choose the kind of meal you want',
      sessionSummary: 'This FoodFight',
      summaryEmpty: 'Nothing selected yet',
      summaryBody: 'Your group can use these choices as a starting point for the picks.',
      selectedCount: '{count} choices selected',
      selectEnough: 'Choose at least one cuisine and one cooking type to continue.',
      preparePicks: 'Prepare our picks',
      backToLobby: 'Back to lobby',
      localChoiceNote: 'Local prototype selection · no recommendation call',
      preparingKicker: 'LOCAL PREVIEW · NO AI CALL',
      preparingTitle: 'FoodFighter is preparing your picks',
      preparingBody: 'A calm preview of the moment between preferences and the table’s choices.',
      understanding: 'Understanding your group',
      balancing: 'Balancing preferences',
      preparing: 'Preparing your picks',
      skipLoading: 'Skip loading · prototype utility',
      picksKicker: 'FOODFIGHT · DESIGN CANDIDATE',
      picksTitle: 'FoodFight Picks',
      picksBody: 'A small local candidate set for your table. Choose OK or Pass to shape the next round.',
      round: 'Round {round}',
      localCandidates: 'Local prototype candidates · not live recommendations',
      groupContext: 'Table context',
      prototypeBudget: 'Prototype context · {budget}',
      ok: 'OK',
      pass: 'Pass',
      selected: 'Selected',
      passed: 'Passed',
      chooseOne: 'Choose OK or Pass on at least one meal to continue.',
      chooseWinner: 'Choose OK on one meal to lock the final result.',
      completeRound: 'Complete round',
      processingVote: 'Saving this round',
      editPreferences: 'Edit preferences',
      showState: 'Local state preview',
      normalState: 'Normal',
      emptyState: 'No candidates',
      errorState: 'Error',
      noCandidatesTitle: 'No picks yet',
      noCandidatesBody: 'This is a local empty state for review. Try the candidate set again or return to preferences.',
      recommendationErrorTitle: 'The picks need another moment',
      recommendationErrorBody: 'This local error state keeps your preferences and gives the table a clear recovery path.',
      retryPicks: 'Try the picks again',
      voteKicker: 'GROUP DECISION · LOCAL SIMULATION',
      voteTitle: 'The table is deciding together',
      voteBody: 'This round-complete moment demonstrates progress without pretending to be real-time multiplayer.',
      roundComplete: 'Round {round} complete',
      yourDecision: 'Your decision',
      simulatedVotes: 'Other member choices · local prototype data',
      pureChose: 'Pure chose',
      markChose: 'Mark chose',
      linaChose: 'Lina chose',
      nextRound: 'Continue to Round 2',
      revealWinner: 'Reveal the winner',
      winnerKicker: 'RESULT · RARE CELEBRATION MOMENT',
      winnerTitle: 'Your group picked',
      winnerBody: 'Everyone’s choice is locked in for this local prototype.',
      groupAgreement: 'Table agreement',
      agreementBody: 'A shared result, presented with a little warmth.',
      findRestaurant: 'Find a restaurant',
      backToPicks: 'Back to picks',
      restaurantKicker: 'NEXT STEP · LOCAL DESTINATIONS',
      restaurantTitle: 'Find a place for the table',
      restaurantBody: 'Choose a destination that carries the winning meal forward. These are fictional local specimens, not live results.',
      winningMeal: 'Winning meal',
      localResults: 'LOCAL PROTOTYPE RESULTS · NOT LIVE',
      selectRestaurant: 'Choose restaurant',
      selectedRestaurant: 'Restaurant selected',
      viewDetails: 'View details',
      continueToBills: 'Continue to Bill & Payment',
      selectRestaurantFirst: 'Choose a restaurant to continue.',
      restaurantLoadingTitle: 'Finding a warm place for the table',
      restaurantLoadingBody: 'A local loading state for the next product wave.',
      noRestaurantsTitle: 'No restaurant suggestions yet',
      noRestaurantsBody: 'This local empty state keeps the winning meal visible while the table tries again.',
      retryRestaurants: 'Try restaurants again',
      restaurantDetailKicker: 'RESTAURANT DETAIL · PROTOTYPE ONLY',
      restaurantDetailBody: 'A calm handoff from the winning meal to a possible destination.',
      backToRestaurants: 'Back to restaurants',
      wave3Kicker: 'NEXT PROTOTYPE WAVE',
      wave3Title: 'Bill & Payment',
      wave3Body: 'Restaurant selection ends Wave 02. The split-bill journey belongs to the next bounded prototype wave.',
      returnToRestaurant: 'Return to restaurant selection',
      openUxLab: 'Open UX Lab',
      localOnly: 'Local prototype data · no API',
      room: 'Room',
      host: 'Host',
      member: 'Member'
    },
    th: {
      prototypeLabel: 'DESIGN CANDIDATE · PROTOTYPE ONLY · TEAM-OWNED RUNTIME',
      sessionSetup: 'ตั้งค่ามื้ออาหาร · FOODFIGHT',
      mealPreferenceTitle: 'มื้อนี้อยากกินอะไรดี?',
      mealPreferenceBody: 'เลือกความอยากของ FoodFight รอบนี้ ข้อมูลนี้ใช้เฉพาะมื้อนี้และไม่เปลี่ยน Food Profile ถาวร',
      cuisine: 'ประเภทอาหาร',
      ingredients: 'วัตถุดิบ',
      cookingType: 'สไตล์การปรุง',
      chooseCuisine: 'เลือกประเภทอาหารอย่างน้อยหนึ่งอย่าง',
      chooseIngredients: 'เพิ่มวัตถุดิบที่โต๊ะเปิดรับ',
      chooseCookingType: 'เลือกสไตล์มื้ออาหาร',
      sessionSummary: 'FoodFight รอบนี้',
      summaryEmpty: 'ยังไม่ได้เลือก',
      summaryBody: 'ตัวเลือกเหล่านี้เป็นจุดเริ่มต้นให้ทุกคนคุยกันก่อนเลือกเมนู',
      selectedCount: 'เลือกแล้ว {count} รายการ',
      selectEnough: 'เลือกประเภทอาหารและสไตล์การปรุงอย่างน้อยอย่างละหนึ่งรายการ',
      preparePicks: 'เตรียมเมนูให้เรา',
      backToLobby: 'กลับไปที่ล็อบบี้',
      localChoiceNote: 'ตัวเลือกจำลองในเครื่อง · ไม่มีการเรียกคำแนะนำจริง',
      preparingKicker: 'LOCAL PREVIEW · NO AI CALL',
      preparingTitle: 'FoodFighter กำลังเตรียมเมนู',
      preparingBody: 'ช่วงเปลี่ยนผ่านระหว่างความชอบและตัวเลือกของโต๊ะอาหาร',
      understanding: 'ทำความเข้าใจกลุ่มของคุณ',
      balancing: 'จัดสมดุลความชอบ',
      preparing: 'เตรียมเมนูให้พร้อม',
      skipLoading: 'ข้ามการโหลด · เครื่องมือจำลอง',
      picksKicker: 'FOODFIGHT · DESIGN CANDIDATE',
      picksTitle: 'เมนูสำหรับ FoodFight',
      picksBody: 'ตัวเลือกจำลองสำหรับโต๊ะของคุณ กด OK หรือ Pass เพื่อไปยังรอบถัดไป',
      round: 'รอบที่ {round}',
      localCandidates: 'ตัวเลือกจำลองในเครื่อง · ไม่ใช่คำแนะนำจริง',
      groupContext: 'บริบทของโต๊ะ',
      prototypeBudget: 'บริบทจำลอง · {budget}',
      ok: 'OK',
      pass: 'Pass',
      selected: 'เลือกแล้ว',
      passed: 'ข้ามแล้ว',
      chooseOne: 'กด OK หรือ Pass อย่างน้อยหนึ่งเมนูเพื่อไปต่อ',
      chooseWinner: 'กด OK หนึ่งเมนูเพื่อยืนยันผลลัพธ์สุดท้าย',
      completeRound: 'จบรอบนี้',
      processingVote: 'กำลังบันทึกรอบนี้',
      editPreferences: 'แก้ไขความชอบ',
      showState: 'ดูสถานะจำลอง',
      normalState: 'ปกติ',
      emptyState: 'ไม่มีเมนู',
      errorState: 'เกิดข้อผิดพลาด',
      noCandidatesTitle: 'ยังไม่มีเมนูให้เลือก',
      noCandidatesBody: 'นี่คือสถานะว่างสำหรับรีวิว ลองชุดเมนูอีกครั้งหรือย้อนกลับไปตั้งค่าความชอบ',
      recommendationErrorTitle: 'เมนูต้องลองอีกครั้ง',
      recommendationErrorBody: 'สถานะผิดพลาดจำลองนี้ยังเก็บความชอบของคุณไว้และมีทางแก้ไขที่ชัดเจน',
      retryPicks: 'ลองเมนูอีกครั้ง',
      voteKicker: 'การตัดสินใจของกลุ่ม · LOCAL SIMULATION',
      voteTitle: 'ทุกคนกำลังช่วยกันตัดสินใจ',
      voteBody: 'ช่วงจบรอบนี้เป็นภาพจำลอง ไม่ใช่การโหวตแบบเรียลไทม์',
      roundComplete: 'จบรอบที่ {round}',
      yourDecision: 'การตัดสินใจของคุณ',
      simulatedVotes: 'ตัวเลือกของสมาชิกอื่น · ข้อมูลจำลองในเครื่อง',
      pureChose: 'Pure เลือก',
      markChose: 'Mark เลือก',
      linaChose: 'Lina เลือก',
      nextRound: 'ไปต่อรอบที่ 2',
      revealWinner: 'ดูเมนูที่ชนะ',
      winnerKicker: 'ผลลัพธ์ · RARE CELEBRATION MOMENT',
      winnerTitle: 'ทุกคนเลือก',
      winnerBody: 'ตัวเลือกของทุกคนถูกล็อกไว้สำหรับต้นแบบนี้',
      groupAgreement: 'ความเห็นร่วมกันของโต๊ะ',
      agreementBody: 'ผลลัพธ์ร่วมกันที่เล่าอย่างอบอุ่น',
      findRestaurant: 'หาร้านอาหาร',
      backToPicks: 'กลับไปดูเมนู',
      restaurantKicker: 'ขั้นต่อไป · LOCAL DESTINATIONS',
      restaurantTitle: 'หาร้านสำหรับโต๊ะนี้',
      restaurantBody: 'เลือกจุดหมายเพื่อพาเมนูที่ชนะไปต่อ รายการนี้เป็นข้อมูลจำลอง ไม่ใช่ผลการค้นหาจริง',
      winningMeal: 'เมนูที่ชนะ',
      localResults: 'LOCAL PROTOTYPE RESULTS · NOT LIVE',
      selectRestaurant: 'เลือกร้านนี้',
      selectedRestaurant: 'เลือกร้านแล้ว',
      viewDetails: 'ดูรายละเอียด',
      continueToBills: 'ไปต่อที่บิลและการชำระเงิน',
      selectRestaurantFirst: 'เลือกร้านอาหารเพื่อไปต่อ',
      restaurantLoadingTitle: 'กำลังหาร้านอบอุ่นสำหรับโต๊ะนี้',
      restaurantLoadingBody: 'สถานะโหลดจำลองสำหรับโปรดักต์เวฟถัดไป',
      noRestaurantsTitle: 'ยังไม่มีร้านอาหารแนะนำ',
      noRestaurantsBody: 'สถานะว่างจำลองนี้ยังแสดงเมนูที่ชนะไว้ ให้โต๊ะลองค้นหาอีกครั้ง',
      retryRestaurants: 'ลองหาร้านอีกครั้ง',
      restaurantDetailKicker: 'รายละเอียดร้าน · PROTOTYPE ONLY',
      restaurantDetailBody: 'ช่วงส่งต่ออย่างเรียบง่ายจากเมนูที่ชนะไปยังจุดหมายที่เป็นไปได้',
      backToRestaurants: 'กลับไปร้านอาหาร',
      wave3Kicker: 'NEXT PROTOTYPE WAVE',
      wave3Title: 'บิลและการชำระเงิน',
      wave3Body: 'การเลือกร้านจบ Wave 02 ส่วนของบิลและการชำระเงินจะอยู่ในต้นแบบเวฟถัดไป',
      returnToRestaurant: 'กลับไปเลือกร้าน',
      openUxLab: 'เปิด UX Lab',
      localOnly: 'ข้อมูลจำลองในเครื่อง · ไม่มี API',
      room: 'ห้อง',
      host: 'โฮสต์',
      member: 'สมาชิก'
    }
  };

  function state() {
    return W.getState();
  }

  function language() {
    return state().ui.language === 'en' ? 'en' : 'th';
  }

  function raw(key, variables) {
    let value = copy[language()][key] || copy.en[key] || key;
    Object.entries(variables || {}).forEach(([name, replacement]) => {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(replacement));
    });
    return value;
  }

  function text(key, variables) {
    return C.esc(raw(key, variables));
  }

  function optionLabel(option) {
    return language() === 'th' ? option.thai : option.label;
  }

  function candidateLabel() {
    return `<div class="ff-w2-candidate-label" role="note"><span>${text('prototypeLabel')}</span></div>`;
  }

  function backLink(href, label) {
    return `<a class="ff-back-link ff-w2-back" href="${C.esc(href)}">${C.icon('arrowLeft', 17)}<span>${label || text('backToLobby')}</span></a>`;
  }

  function progress(active) {
    const steps = [
      ['preferences', language() === 'th' ? 'ความชอบ' : 'Preferences'],
      ['picks', language() === 'th' ? 'เมนู' : 'Picks'],
      ['vote', language() === 'th' ? 'โหวต' : 'Vote'],
      ['winner', language() === 'th' ? 'ผลลัพธ์' : 'Winner'],
      ['restaurant', language() === 'th' ? 'ร้านอาหาร' : 'Restaurant']
    ];
    const activeIndex = steps.findIndex(([id]) => id === active);
    return `<nav class="ff-w2-progress" aria-label="FoodFight progress">${steps.map(([, label], index) => `<span class="${index < activeIndex ? 'is-done' : ''} ${index === activeIndex ? 'is-active' : ''}"><i>${index < activeIndex ? C.icon('check', 12) : index + 1}</i><b>${C.esc(label)}</b></span>`).join('<em aria-hidden="true"></em>')}</nav>`;
  }

  function localNote(message) {
    return `<p class="ff-w2-local-note">${C.icon('lock', 14)}<span>${message || text('localOnly')}</span></p>`;
  }

  function statePreview(current, actions) {
    return `<div class="ff-w2-state-preview"><div><span class="ff-eyebrow">${text('showState')}</span><strong>${C.esc(current)}</strong></div><div class="ff-w2-state-buttons">${actions.map(([id, label]) => `<button type="button" class="${current === id ? 'is-active' : ''}" data-wave2-action="set-state" data-wave2-state="${C.esc(id)}">${C.esc(label)}</button>`).join('')}</div></div>`;
  }

  function preferenceSection(tone, group, title, helper, iconName) {
    const selected = state().mealPreference?.[group] || [];
    const options = W.mealPreferenceOptions[group] || [];
    return `<section class="ff-w2-preference-section ff-w2-tone-${tone}"><div class="ff-w2-section-heading">${C.iconWell(tone, 'md', iconName)}<div><span class="ff-eyebrow">${tone.toUpperCase()}</span><h2>${text(title)}</h2><p>${text(helper)}</p></div></div><div class="ff-w2-choice-grid" role="group" aria-label="${text(title)}">${options.map((option) => { const isSelected = selected.includes(option.id); return `<button type="button" class="ff-w2-choice ${isSelected ? 'is-selected' : ''}" data-wave2-action="toggle-preference" data-wave2-group="${C.esc(group)}" data-wave2-value="${C.esc(option.id)}" aria-pressed="${isSelected}">${isSelected ? C.icon('check', 15) : C.icon('plus', 15)}<span>${C.esc(optionLabel(option))}</span></button>`; }).join('')}</div></section>`;
  }

  function renderMealPreference() {
    const s = state();
    const preference = s.mealPreference || { cuisine: [], ingredients: [], cookingType: [] };
    const errors = s.ui.formErrors || {};
    const busy = W.isLoading('recommendation');
    const count = preference.cuisine.length + preference.ingredients.length + preference.cookingType.length;
    const summaryItems = Object.entries({ cuisine: preference.cuisine, ingredients: preference.ingredients, cookingType: preference.cookingType }).flatMap(([group, ids]) => (ids || []).map((id) => (W.mealPreferenceOptions[group] || []).find((option) => option.id === id))).filter(Boolean);
    const summary = summaryItems.length ? summaryItems.map((option) => `<span class="ff-w2-summary-chip">${C.icon('check', 13)}${C.esc(optionLabel(option))}</span>`).join('') : `<span class="ff-w2-summary-empty">${text('summaryEmpty')}</span>`;
    const content = `<div class="ff-w2-flow-head">${backLink('#/room/lobby')}<div class="ff-w2-flow-head-row"><div><span class="ff-eyebrow">${text('sessionSetup')}</span><h1 class="ff-w2-editorial">${text('mealPreferenceTitle')}</h1><p class="ff-w2-lede">${text('mealPreferenceBody')}</p></div>${progress('preferences')}</div>${candidateLabel()}</div><div class="ff-w2-split-layout ff-w2-preference-layout"><section class="ff-w2-main-column"><form class="ff-w2-preference-form" data-wave2-form="meal-preference" novalidate>${preferenceSection('petal', 'cuisine', 'cuisine', 'chooseCuisine', 'utensils')}${preferenceSection('apricot', 'ingredients', 'ingredients', 'chooseIngredients', 'sparkles')}${preferenceSection('custard', 'cookingType', 'cookingType', 'chooseCookingType', 'flame')}${errors.mealPreference ? `<p class="ff-w2-validation" role="alert">${C.icon('info', 15)}<span>${C.esc(errors.mealPreference)}</span></p>` : ''}<button type="submit" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" ${busy ? 'disabled aria-busy="true"' : ''}>${busy ? `${C.icon('spinner', 18, 'ff-spinner')}<span>${text('preparing')}</span>` : `<span>${text('preparePicks')}</span>${C.icon('arrowRight', 18)}`}</button></form>${localNote(text('localChoiceNote'))}</section><aside class="ff-w2-context-column"><div class="ff-w2-context-media">${C.media('meal', 'placeholder', { overlay: true })}</div><section class="ff-w2-summary-card"><div class="ff-w2-summary-heading">${C.iconWell('custard', 'sm', 'sparkles')}<div><span class="ff-eyebrow">${text('sessionSummary')}</span><h2>${text('selectedCount', { count })}</h2></div></div><div class="ff-w2-summary-list">${summary}</div><p>${text('summaryBody')}</p></section></aside></div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-meal-page', { hideMobileNav: true, includeOverlay: false });
  }

  function loadingStages() {
    const s = state();
    const stage = Number(s.recommendationProgress?.stage || 0);
    const stages = [
      ['understanding', 'understanding', 'sparkles'],
      ['balancing', 'balancing', 'users'],
      ['preparing', 'preparing', 'utensils']
    ];
    return `<ol class="ff-w2-loading-stages">${stages.map(([, key, iconName], index) => `<li class="${index + 1 < stage ? 'is-done' : ''} ${index + 1 === stage ? 'is-active' : ''}">${index + 1 < stage ? C.icon('check', 17) : C.icon(iconName, 17)}<span>${text(key)}</span></li>`).join('')}</ol>`;
  }

  function renderRecommendationLoading() {
    const s = state();
    const isBusy = W.isLoading('recommendation') || !s.recommendationProgress.started;
    const stageMessages = ['understanding', 'balancing', 'preparing'];
    const stageIndex = Math.max(0, Math.min(stageMessages.length - 1, Number(s.recommendationProgress?.stage || 1) - 1));
    const loadingMessage = raw(stageMessages[stageIndex]);
    const content = `<div class="ff-w2-centered-flow"><div class="ff-w2-flow-head"><button type="button" class="ff-back-link ff-w2-back" data-wave2-action="cancel-loading">${C.icon('arrowLeft', 17)}<span>${text('editPreferences')}</span></button><span class="ff-eyebrow">${text('preparingKicker')}</span><h1 class="ff-w2-editorial">${text('preparingTitle')}</h1><p class="ff-w2-lede">${text('preparingBody')}</p>${candidateLabel()}</div><div class="ff-w2-loading-card"><div class="ff-w2-loading-visual">${C.media('meal', isBusy ? 'loading' : 'placeholder', { overlay: true })}</div><div class="ff-w2-loading-copy">${loadingStages()}<p class="ff-w2-loading-message" aria-live="polite">${C.esc(loadingMessage)}</p>${isBusy ? `<button type="button" class="ff-text-button" data-wave2-action="skip-loading">${text('skipLoading')}</button>` : `<button type="button" class="ff-btn ff-btn-brand ff-btn-lg" data-wave2-action="skip-loading">${text('preparePicks')}${C.icon('arrowRight', 17)}</button>`}</div></div>${localNote(text('localOnly'))}</div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-loading-page', { hideMobileNav: true, includeOverlay: false });
  }

  function roundOptions(round) {
    const all = W.recommendations || [];
    if (round === 1) return all.slice(0, 2);
    const firstRoundSelection = state().voteSelections?.[1] || [];
    const chosen = firstRoundSelection.map((id) => all.find((item) => item.id === id)).filter(Boolean);
    const fallback = all.slice(0, 2);
    const options = chosen.length ? chosen : fallback;
    if (options.length === 1) {
      const other = fallback.find((item) => item.id !== options[0].id);
      if (other) options.push(other);
    }
    return options;
  }

  function roundVotes(round) {
    const s = state();
    s.voteSelections = s.voteSelections || { 1: [], 2: [] };
    s.passedOptions = s.passedOptions || { 1: [], 2: [] };
    s.voteSelections[round] = s.voteSelections[round] || [];
    s.passedOptions[round] = s.passedOptions[round] || [];
    return { selected: s.voteSelections[round], passed: s.passedOptions[round] };
  }

  function renderPickCard(option, round) {
    const votes = roundVotes(round);
    const isSelected = votes.selected.includes(option.id);
    const isPassed = votes.passed.includes(option.id);
    const tags = option.tags.map((tag) => `<span>${C.esc(tag)}</span>`).join('');
    return `<article class="ff-w2-pick-card ff-w2-card-tone-${C.esc(option.tone)} ${isSelected ? 'is-selected' : ''} ${isPassed ? 'is-passed' : ''}"><div class="ff-w2-pick-media">${C.media('meal', isPassed ? 'fallback' : 'placeholder', { overlay: isSelected })}<span class="ff-w2-rank">${option.id === 'tom-yum' ? '01' : option.id === 'korean-bbq' ? '02' : option.id === 'yaki-noodles' ? '03' : '04'}</span></div><div class="ff-w2-pick-body"><div class="ff-w2-pick-title"><div><span class="ff-eyebrow">${C.esc(option.cuisine)}</span><h2>${C.esc(language() === 'th' ? option.thai : option.name)}</h2></div>${isSelected ? C.status(text('selected'), 'success', 'check') : isPassed ? C.status(text('passed'), 'warning', 'clock') : ''}</div><div class="ff-w2-tag-row">${tags}</div><p>${C.esc(option.context)}</p><div class="ff-w2-pick-meta"><span>${C.icon('users', 14)} ${text('groupContext')}</span><span>${C.esc(raw('prototypeBudget', { budget: option.budget }))}</span></div><div class="ff-w2-pick-actions"><button type="button" class="ff-w2-vote-button ff-w2-vote-ok ${isSelected ? 'is-active' : ''}" data-wave2-action="vote" data-wave2-value="${C.esc(option.id)}" data-wave2-vote="ok" data-wave2-round="${round}" aria-pressed="${isSelected}">${C.icon('thumbsUp', 16)}<span>${text('ok')}</span></button><button type="button" class="ff-w2-vote-button ff-w2-vote-pass ${isPassed ? 'is-active' : ''}" data-wave2-action="vote" data-wave2-value="${C.esc(option.id)}" data-wave2-vote="pass" data-wave2-round="${round}" aria-pressed="${isPassed}">${C.icon('thumbsDown', 16)}<span>${text('pass')}</span></button></div></div></article>`;
  }

  function renderPicksEmptyOrError(mode) {
    const isError = mode === 'error';
    return `<section class="ff-w2-state-card ff-w2-state-card-${isError ? 'error' : 'empty'}"><div class="ff-w2-state-icon">${C.icon(isError ? 'refresh' : 'utensils', 28)}</div><span class="ff-eyebrow">${isError ? text('recommendationErrorTitle') : text('noCandidatesTitle')}</span><h2>${isError ? text('recommendationErrorTitle') : text('noCandidatesTitle')}</h2><p>${isError ? text('recommendationErrorBody') : text('noCandidatesBody')}</p><div class="ff-w2-state-actions"><button type="button" class="ff-btn ff-btn-brand ff-btn-lg" data-wave2-action="retry-picks">${text('retryPicks')}${C.icon('refresh', 17)}</button><a href="#/meal-preference" class="ff-btn ff-btn-ghost ff-btn-lg">${text('editPreferences')}</a></div></section>`;
  }

  function renderFoodPicks() {
    const s = state();
    const round = Number(s.recommendationRound || 1);
    const mode = s.ui.wave2State || 'normal';
    const votes = roundVotes(round);
    const options = roundOptions(round);
    const errors = s.ui.formErrors || {};
    const busy = W.isLoading('vote');
    const completeButton = busy ? `<button type="button" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" disabled aria-busy="true">${C.icon('spinner', 18, 'ff-spinner')}<span>${text('processingVote')}</span></button>` : `<button type="button" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" data-wave2-action="complete-round">${text('completeRound')} ${C.icon('arrowRight', 18)}</button>`;
    const content = `<div class="ff-w2-flow-head">${backLink('#/meal-preference')}<div class="ff-w2-flow-head-row"><div><span class="ff-eyebrow">${text('picksKicker')}</span><h1 class="ff-w2-editorial">${text('picksTitle')}</h1><p class="ff-w2-lede">${text('picksBody')}</p></div><div class="ff-w2-round-badge"><span>${text('round', { round })}</span><strong>${round === 1 ? '01' : '02'} <small>/ 02</small></strong></div></div>${progress('picks')}${candidateLabel()}</div><div class="ff-w2-picks-layout"><aside class="ff-w2-picks-context"><div class="ff-w2-context-stamp">${C.icon('sparkles', 17)}<span>${text('localCandidates')}</span></div><h2>${round === 1 ? (language() === 'th' ? 'เริ่มจากสองรสชาติ' : 'Start with two table moods') : (language() === 'th' ? 'รอบสุดท้ายของโต๊ะ' : 'The table’s final two')}</h2><p>${language() === 'th' ? 'กด OK ถ้าอยากให้เมนูนี้ไปต่อ หรือ Pass เพื่อเปิดพื้นที่ให้ตัวเลือกอื่น' : 'Choose OK to carry a meal forward, or Pass to make space for the other option.'}</p><div class="ff-w2-vote-tally"><span>${C.icon('check', 15)} ${text('selected')}</span><strong>${votes.selected.length}</strong><span>${C.icon('clock', 15)} ${text('passed')}</span><strong>${votes.passed.length}</strong></div>${statePreview(mode, [['normal', raw('normalState')], ['empty', raw('emptyState')], ['error', raw('errorState')]])}<a href="#/meal-preference" class="ff-btn ff-btn-ghost ff-btn-block">${text('editPreferences')}</a></aside><section class="ff-w2-picks-main">${mode === 'normal' ? `<div class="ff-w2-pick-grid">${options.map((option) => renderPickCard(option, round)).join('')}</div>${errors.vote ? `<p class="ff-w2-validation" role="alert">${C.icon('info', 15)}<span>${C.esc(errors.vote)}</span></p>` : ''}${completeButton}` : renderPicksEmptyOrError(mode)}</section></div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-picks-page', { hideMobileNav: true, includeOverlay: false });
  }

  function memberChoice(name, option) {
    return `<div class="ff-w2-member-vote"><span class="ff-w2-mini-avatar">${C.esc(name.slice(0, 1))}</span><span>${C.esc(name)}</span><strong>${C.esc(option)}</strong></div>`;
  }

  function renderVote() {
    const s = state();
    const result = s.roundResult || { round: Math.max(1, Number(s.recommendationRound || 1)), selected: [], passed: [] };
    const round = Number(result.round || 1);
    const selected = result.selected || roundVotes(round).selected;
    const currentOption = (W.recommendations || []).find((item) => item.id === selected[0]) || roundOptions(round)[0];
    const nextAction = round === 1 ? 'next-round' : 'reveal-winner';
    const nextLabel = round === 1 ? text('nextRound') : text('revealWinner');
    const content = `<div class="ff-w2-centered-flow ff-w2-vote-flow">${backLink('#/food-picks', text('backToPicks'))}<span class="ff-eyebrow">${text('voteKicker')}</span><h1 class="ff-w2-editorial">${text('voteTitle')}</h1><p class="ff-w2-lede">${text('voteBody')}</p>${progress('vote')}${candidateLabel()}<div class="ff-w2-round-result"><div class="ff-w2-result-icon">${C.icon('check', 28)}</div><span class="ff-eyebrow">${text('roundComplete', { round })}</span><h2>${C.esc(language() === 'th' ? currentOption?.thai : currentOption?.name)}</h2><p>${text('yourDecision')}: <strong>${selected.length ? text('selected') : text('passed')}</strong></p></div><section class="ff-w2-simulated-votes"><div class="ff-w2-section-heading"><div>${C.iconWell('apricot', 'sm', 'users')}</div><div><span class="ff-eyebrow">${text('simulatedVotes')}</span><h2>${text('groupContext')}</h2></div></div>${memberChoice('Pure', currentOption?.name || '—')}${memberChoice('Mark', currentOption?.name || '—')}${memberChoice('Lina', round === 1 ? (W.recommendations || [])[1]?.name || 'Korean BBQ' : currentOption?.name || '—')}</section><div class="ff-w2-vote-actions"><button type="button" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" data-wave2-action="${nextAction}">${nextLabel}${C.icon('arrowRight', 18)}</button><a href="#/food-picks" class="ff-btn ff-btn-ghost ff-btn-block">${text('backToPicks')}</a></div>${localNote(text('simulatedVotes'))}</div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-vote-page', { hideMobileNav: true, includeOverlay: false });
  }

  function renderWinner() {
    const s = state();
    const winner = s.winner || (W.recommendations || [])[0];
    const content = `<div class="ff-w2-winner-flow">${backLink('#/vote', text('backToPicks'))}<div class="ff-w2-winner-head"><span class="ff-eyebrow">${text('winnerKicker')}</span><h1 class="ff-w2-editorial">${text('winnerTitle')}</h1><p class="ff-w2-lede">${text('winnerBody')}</p>${progress('winner')}${candidateLabel()}</div><section class="ff-w2-winner-card"><div class="ff-w2-organic-accent ff-w2-accent-left" aria-hidden="true"></div><div class="ff-w2-winner-media">${C.media('meal', 'placeholder', { overlay: true })}</div><div class="ff-w2-winner-copy"><span class="ff-w2-winner-mark">${C.icon('trophy', 18)}<span>${text('selected')}</span></span><h2>${C.esc(language() === 'th' ? winner?.thai : winner?.name)}</h2><div class="ff-w2-tag-row">${(winner?.tags || []).map((tag) => `<span>${C.esc(tag)}</span>`).join('')}</div><p>${C.esc(winner?.context || '')}</p><div class="ff-w2-agreement"><span>${C.icon('users', 16)} ${text('groupAgreement')}</span><strong>${text('agreementBody')}</strong></div><div class="ff-w2-winner-actions"><a href="#/restaurant" class="ff-btn ff-btn-brand ff-btn-hero">${text('findRestaurant')}${C.icon('arrowRight', 18)}</a><a href="#/food-picks" class="ff-btn ff-btn-ghost ff-btn-lg">${text('backToPicks')}</a></div></div><div class="ff-w2-organic-accent ff-w2-accent-right" aria-hidden="true"></div></section>${localNote(text('localOnly'))}</div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-winner-page', { hideMobileNav: true, includeOverlay: false });
  }

  function renderRestaurantState(mode) {
    if (mode === 'loading') return `<section class="ff-w2-state-card ff-w2-state-card-loading"><div class="ff-w2-loading-orb"><span></span></div><span class="ff-eyebrow">${text('localResults')}</span><h2>${text('restaurantLoadingTitle')}</h2><p>${text('restaurantLoadingBody')}</p><button type="button" class="ff-btn ff-btn-brand ff-btn-lg" data-wave2-action="set-restaurant-state" data-wave2-state="normal">${text('retryRestaurants')}</button></section>`;
    if (mode === 'empty') return `<section class="ff-w2-state-card ff-w2-state-card-empty"><div class="ff-w2-state-icon">${C.icon('mapPin', 28)}</div><span class="ff-eyebrow">${text('localResults')}</span><h2>${text('noRestaurantsTitle')}</h2><p>${text('noRestaurantsBody')}</p><button type="button" class="ff-btn ff-btn-brand ff-btn-lg" data-wave2-action="set-restaurant-state" data-wave2-state="normal">${text('retryRestaurants')}</button></section>`;
    return '';
  }

  function renderRestaurantCard(restaurant) {
    const selected = state().restaurantSelection === restaurant.id;
    return `<article class="ff-w2-restaurant-card ff-w2-card-tone-${C.esc(restaurant.tone)} ${selected ? 'is-selected' : ''}"><div class="ff-w2-restaurant-media">${C.media('restaurant', selected ? 'overlay' : 'placeholder')}</div><div class="ff-w2-restaurant-copy"><div class="ff-w2-pick-title"><div><span class="ff-eyebrow">${C.esc(restaurant.category)}</span><h2>${C.esc(restaurant.name)}</h2></div>${selected ? C.status(text('selectedRestaurant'), 'success', 'check') : ''}</div><div class="ff-w2-restaurant-facts"><span>${C.icon('mapPin', 14)} ${C.esc(restaurant.location)}</span><span>${C.icon('clock', 14)} ${C.esc(restaurant.distance)}</span><strong>${C.esc(restaurant.price)}</strong></div><div class="ff-w2-restaurant-actions"><button type="button" class="ff-btn ${selected ? 'ff-btn-brand' : 'ff-btn-secondary'} ff-btn-sm" data-wave2-action="select-restaurant" data-wave2-value="${C.esc(restaurant.id)}" aria-pressed="${selected}">${selected ? C.icon('check', 15) : C.icon('mapPin', 15)}<span>${selected ? text('selectedRestaurant') : text('selectRestaurant')}</span></button><button type="button" class="ff-text-button" data-wave2-action="view-restaurant" data-wave2-value="${C.esc(restaurant.id)}">${text('viewDetails')} ${C.icon('arrowRight', 14)}</button></div></div></article>`;
  }

  function renderRestaurant() {
    const s = state();
    const mode = s.ui.restaurantState || 'normal';
    const winner = s.winner || (W.recommendations || [])[0];
    const selected = Boolean(s.restaurantSelection);
    const content = `<div class="ff-w2-flow-head">${backLink('#/winner')}<div class="ff-w2-flow-head-row"><div><span class="ff-eyebrow">${text('restaurantKicker')}</span><h1 class="ff-w2-editorial">${text('restaurantTitle')}</h1><p class="ff-w2-lede">${text('restaurantBody')}</p></div><div class="ff-w2-winning-meal"><span>${text('winningMeal')}</span><strong>${C.esc(language() === 'th' ? winner?.thai : winner?.name)}</strong></div></div>${progress('restaurant')}${candidateLabel()}</div><div class="ff-w2-restaurant-layout"><aside class="ff-w2-restaurant-context"><div class="ff-w2-context-media">${C.media('restaurant', 'placeholder', { overlay: true })}</div><div class="ff-w2-winning-copy"><span class="ff-eyebrow">${text('winningMeal')}</span><h2>${C.esc(language() === 'th' ? winner?.thai : winner?.name)}</h2><div class="ff-w2-tag-row">${(winner?.tags || []).map((tag) => `<span>${C.esc(tag)}</span>`).join('')}</div></div>${statePreview(mode, [['normal', raw('normalState')], ['loading', raw('restaurantLoadingTitle')], ['empty', raw('emptyState')]])}</aside><section class="ff-w2-restaurant-main">${mode === 'normal' ? `<div class="ff-w2-local-results-heading"><div><span class="ff-eyebrow">${text('localResults')}</span><h2>${text('restaurantTitle')}</h2></div><span class="ff-w2-result-count">${W.restaurants.length} ${language() === 'th' ? 'ตัวอย่าง' : 'local specimens'}</span></div><div class="ff-w2-restaurant-grid">${W.restaurants.map(renderRestaurantCard).join('')}</div>` : renderRestaurantState(mode)}${s.ui.formErrors?.restaurant ? `<p class="ff-w2-validation" role="alert">${C.icon('info', 15)}<span>${C.esc(s.ui.formErrors.restaurant)}</span></p>` : ''}<div class="ff-w2-restaurant-footer"><button type="button" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" data-wave2-action="continue-bills" ${selected ? '' : 'disabled'}>${text('continueToBills')}${C.icon('arrowRight', 18)}</button>${selected ? `<p class="ff-w2-success-copy" role="status">${C.icon('check', 14)} ${text('selectedRestaurant')}</p>` : `<p class="ff-w2-help-copy">${text('selectRestaurantFirst')}</p>`}</div></section></div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-restaurant-page', { hideMobileNav: true, includeOverlay: false });
  }

  function renderRestaurantDetail() {
    const s = state();
    const restaurant = W.restaurants.find((item) => item.id === s.restaurantSelection) || W.restaurants[0];
    const selected = s.restaurantSelection === restaurant.id;
    const content = `<div class="ff-w2-detail-flow">${backLink('#/restaurant', text('backToRestaurants'))}<span class="ff-eyebrow">${text('restaurantDetailKicker')}</span><h1 class="ff-w2-editorial">${C.esc(restaurant.name)}</h1><p class="ff-w2-lede">${text('restaurantDetailBody')}</p>${progress('restaurant')}${candidateLabel()}<div class="ff-w2-detail-layout"><div class="ff-w2-detail-media">${C.media('restaurant', 'placeholder', { overlay: true })}</div><section class="ff-w2-detail-card"><span class="ff-eyebrow">${C.esc(restaurant.category)}</span><h2>${C.esc(restaurant.name)}</h2><div class="ff-w2-restaurant-facts"><span>${C.icon('mapPin', 14)} ${C.esc(restaurant.location)}</span><span>${C.icon('clock', 14)} ${C.esc(restaurant.distance)}</span><strong>${C.esc(restaurant.price)}</strong></div><p>${text('localOnly')}</p><button type="button" class="ff-btn ff-btn-brand ff-btn-hero ff-btn-block" data-wave2-action="select-restaurant" data-wave2-value="${C.esc(restaurant.id)}">${selected ? C.icon('check', 17) : C.icon('mapPin', 17)}<span>${selected ? text('selectedRestaurant') : text('selectRestaurant')}</span></button><a href="#/restaurant" class="ff-btn ff-btn-ghost ff-btn-lg ff-btn-block">${text('backToRestaurants')}</a></section></div></div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-detail-page', { hideMobileNav: true, includeOverlay: false });
  }

  function renderBillsBoundary() {
    const content = `<div class="ff-w2-centered-flow ff-w2-boundary-flow">${backLink('#/restaurant', text('returnToRestaurant'))}<div class="ff-w2-boundary-card"><div class="ff-w2-boundary-icon">${C.icon('receipt', 30)}</div><span class="ff-eyebrow">${text('wave3Kicker')}</span><h1 class="ff-w2-editorial">${text('wave3Title')}</h1><p class="ff-w2-lede">${text('wave3Body')}</p>${candidateLabel()}<div class="ff-w2-boundary-actions"><a href="#/restaurant" class="ff-btn ff-btn-brand ff-btn-lg">${text('returnToRestaurant')}</a><a href="#/ux-lab" class="ff-btn ff-btn-ghost ff-btn-lg">${text('openUxLab')}</a></div></div>${localNote(text('localOnly'))}</div>`;
    return S.productPage(content, null, 'ff-gameplay-page ff-w2-boundary-page', { hideMobileNav: true, includeOverlay: false });
  }

  function ensureGameplayData() {
    const s = state();
    if (!s.mealPreference) s.mealPreference = { cuisine: [], ingredients: [], cookingType: [], submitted: false };
    if (!s.recommendationProgress) s.recommendationProgress = { stage: 0, message: '', started: false, complete: false };
    if (!s.voteSelections) s.voteSelections = { 1: [], 2: [] };
    if (!s.passedOptions) s.passedOptions = { 1: [], 2: [] };
    if (!s.recommendationRound) s.recommendationRound = 1;
    if (!s.recommendations?.length) s.recommendations = W.deepClone(W.recommendations);
  }

  function togglePreference(target) {
    const s = state();
    const group = target.getAttribute('data-wave2-group');
    const value = target.getAttribute('data-wave2-value');
    if (!['cuisine', 'ingredients', 'cookingType'].includes(group) || !value) return;
    s.mealPreference[group] = s.mealPreference[group] || [];
    const index = s.mealPreference[group].indexOf(value);
    if (index >= 0) s.mealPreference[group].splice(index, 1);
    else s.mealPreference[group].push(value);
    s.ui.formErrors = {};
    W.refresh();
  }

  function submitMealPreference() {
    const s = state();
    if (!s.mealPreference.cuisine.length || !s.mealPreference.cookingType.length) {
      s.ui.formErrors = { mealPreference: raw('selectEnough') };
      W.refresh();
      return;
    }
    s.mealPreference.submitted = true;
    s.ui.wave2State = 'normal';
    W.startRecommendationLoading();
    W.navigate('#/recommendation-loading', '#/meal-preference');
  }

  function vote(target) {
    const s = state();
    const id = target.getAttribute('data-wave2-value');
    const round = Number(target.getAttribute('data-wave2-round') || s.recommendationRound || 1);
    const type = target.getAttribute('data-wave2-vote');
    const votes = roundVotes(round);
    const collection = type === 'ok' ? votes.selected : votes.passed;
    const other = type === 'ok' ? votes.passed : votes.selected;
    const index = collection.indexOf(id);
    if (index >= 0) collection.splice(index, 1);
    else {
      collection.push(id);
      const otherIndex = other.indexOf(id);
      if (otherIndex >= 0) other.splice(otherIndex, 1);
    }
    s.ui.formErrors = {};
    W.refresh();
  }

  function completeRound() {
    const s = state();
    const round = Number(s.recommendationRound || 1);
    const votes = roundVotes(round);
    if (!votes.selected.length && !votes.passed.length) {
      s.ui.formErrors = { vote: raw('chooseOne') };
      W.refresh();
      return;
    }
    if (round === 2 && !votes.selected.length) {
      s.ui.formErrors = { vote: raw('chooseWinner') };
      W.refresh();
      return;
    }
    s.roundResult = { round, selected: [...votes.selected], passed: [...votes.passed] };
    if (round === 2) {
      const winnerId = votes.selected[0];
      s.winner = W.deepClone((s.recommendations || W.recommendations).find((item) => item.id === winnerId) || W.recommendations[0]);
    }
    W.runLoading('vote', () => W.navigate('#/vote', '#/food-picks'), 400);
  }

  function nextRound() {
    const s = state();
    s.recommendationRound = 2;
    s.roundResult = null;
    s.ui.formErrors = {};
    W.navigate('#/food-picks', '#/vote');
  }

  function revealWinner() {
    const s = state();
    if (!s.winner) {
      const selected = roundVotes(2).selected[0];
      s.winner = W.deepClone((s.recommendations || W.recommendations).find((item) => item.id === selected) || W.recommendations[0]);
    }
    W.navigate('#/winner', '#/vote');
  }

  function handleWave2Action(target) {
    ensureGameplayData();
    const action = target.getAttribute('data-wave2-action');
    const s = state();
    if (action === 'toggle-preference') return togglePreference(target);
    if (action === 'skip-loading') return W.skipRecommendationLoading();
    if (action === 'cancel-loading') {
      W.cancelRecommendationLoading();
      W.navigate('#/meal-preference', '#/recommendation-loading');
      return;
    }
    if (action === 'set-state') {
      s.ui.wave2State = target.getAttribute('data-wave2-state') || 'normal';
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'retry-picks') {
      s.ui.wave2State = 'normal';
      s.ui.formErrors = {};
      W.startRecommendationLoading();
      W.navigate('#/recommendation-loading', '#/food-picks');
      return;
    }
    if (action === 'vote') return vote(target);
    if (action === 'complete-round') return completeRound();
    if (action === 'next-round') return nextRound();
    if (action === 'reveal-winner') return revealWinner();
    if (action === 'set-restaurant-state') {
      s.ui.restaurantState = target.getAttribute('data-wave2-state') || 'normal';
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'select-restaurant') {
      s.restaurantSelection = target.getAttribute('data-wave2-value');
      s.ui.restaurantState = 'normal';
      s.ui.formErrors = {};
      W.refresh();
      return;
    }
    if (action === 'view-restaurant') {
      s.restaurantSelection = target.getAttribute('data-wave2-value');
      W.navigate('#/restaurant/detail', '#/restaurant');
      return;
    }
    if (action === 'continue-bills') {
      if (!s.restaurantSelection) {
        s.ui.formErrors = { restaurant: raw('selectRestaurantFirst') };
        W.refresh();
        return;
      }
      W.navigate('#/bills', '#/restaurant');
    }
  }

  function bindWave2Events() {
    const root = document.querySelector('.ff-wave1-root');
    if (!root) return;
    ensureGameplayData();
    if (window.location.hash === '#/recommendation-loading' && !state().recommendationProgress.started) {
      W.startRecommendationLoading(false);
    }
    if (typeof P.bindWave1Events === 'function') P.bindWave1Events();
    root.addEventListener('click', (event) => {
      const target = event.target.closest('[data-wave2-action]');
      if (!target || !root.contains(target)) return;
      event.preventDefault();
      handleWave2Action(target);
    });
    root.addEventListener('submit', (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.getAttribute('data-wave2-form') !== 'meal-preference') return;
      event.preventDefault();
      submitMealPreference();
    });
  }

  function renderWave2Route(hash) {
    ensureGameplayData();
    switch (hash) {
      case '#/meal-preference': return renderMealPreference();
      case '#/recommendation-loading': return renderRecommendationLoading();
      case '#/food-picks': return renderFoodPicks();
      case '#/vote': return renderVote();
      case '#/winner': return renderWinner();
      case '#/restaurant': return renderRestaurant();
      case '#/restaurant/detail': return renderRestaurantDetail();
      case '#/bills': return renderBillsBoundary();
      default: return renderMealPreference();
    }
  }

  P.renderWave2Route = renderWave2Route;
  P.bindWave2Events = bindWave2Events;
  P.WAVE2 = { routes: ['#/meal-preference', '#/recommendation-loading', '#/food-picks', '#/vote', '#/winner', '#/restaurant', '#/restaurant/detail', '#/bills'] };
})();
