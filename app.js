(function () {
  'use strict';

  // === Config ===
  const STORAGE_KEY_PREFIX = 'guia_semanal_';
  const STREAK_KEY = STORAGE_KEY_PREFIX + 'streak';
  const LAST_DAILY_KEY = STORAGE_KEY_PREFIX + 'last_daily';
  const ACHIEVEMENTS_KEY = STORAGE_KEY_PREFIX + 'achievements';
  const THEME_KEY = STORAGE_KEY_PREFIX + 'theme';
  const TOTAL_WEEKLY_TASKS = 34;

  // === Helpers ===
  function getWeekKey(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNum = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return d.getFullYear() + '-W' + String(weekNum).padStart(2, '0');
  }

  function getWeekLabel(weekKey) {
    const parts = weekKey.replace('W', '').split('-');
    return 'Semana ' + parts[1] + ' de ' + parts[0];
  }

  function loadWeekData(weekKey) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PREFIX + weekKey);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  }

  function saveWeekData(weekKey, data) {
    localStorage.setItem(STORAGE_KEY_PREFIX + weekKey, JSON.stringify(data));
  }

  function getStreak() {
    try { return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10); }
    catch { return 0; }
  }

  function setStreak(n) {
    localStorage.setItem(STREAK_KEY, String(n));
  }

  function getLastDailyDate() {
    return localStorage.getItem(LAST_DAILY_KEY) || null;
  }

  function setLastDailyDate(dateStr) {
    localStorage.setItem(LAST_DAILY_KEY, dateStr);
  }

  function getAchievements() {
    try { return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '{}'); }
    catch { return {}; }
  }

  function setAchievement(id, unlocked) {
    const a = getAchievements();
    a[id] = unlocked;
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(a));
    return a;
  }

  // === State ===
  let currentWeekKey = getWeekKey(new Date());

  // === DOM refs ===
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.panel');
  const prevWeekBtn = document.getElementById('prevWeek');
  const nextWeekBtn = document.getElementById('nextWeek');
  const weekLabel = document.getElementById('weekLabel');
  const progressFill = document.getElementById('progressFill');
  const progressCount = document.getElementById('progressCount');
  const streakDisplay = document.getElementById('streakDisplay');
  const achievementsPreview = document.getElementById('achievementsPreview');
  const achievementsList = document.getElementById('achievementsList');
  const dailyStreakEl = document.getElementById('dailyStreak');
  const themeToggle = document.getElementById('themeToggle');
  const checkboxes = document.querySelectorAll('input[data-task]');

  // Guide cards DOM
  const guidesGrid = document.getElementById('guidesGrid');
  const guideDetail = document.getElementById('guideDetail');
  const guideBack = document.getElementById('guideBack');
  const guideDetailContent = document.getElementById('guideDetailContent');
  const guideContents = document.getElementById('guideContents');
  const docsRefGrid = document.getElementById('docsRefGrid');
  const docsRefError = document.getElementById('docsRefError');
  const docDetail = document.getElementById('docDetail');
  const docBack = document.getElementById('docBack');
  const docDetailContent = document.getElementById('docDetailContent');

  // === Sidebar toggle (mobile) ===
  function openSidebar() {
    sidebar?.classList.add('open');
    sidebarOverlay?.classList.add('active');
  }
  function closeSidebar() {
    sidebar?.classList.remove('open');
    sidebarOverlay?.classList.remove('active');
  }

  sidebarToggle?.addEventListener('click', () => {
    if (sidebar?.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
  sidebarOverlay?.addEventListener('click', closeSidebar);

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        sidebar?.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !sidebarToggle?.contains(e.target)) {
      closeSidebar();
    }
  });

  // === Navigation ===
  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      navItems.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + section)?.classList.add('active');
      if (window.innerWidth <= 768) closeSidebar();

      // Reset guide detail when navigating to guides; load docs index when navigating to documents
      if (section === 'guias') showGuidesGrid();
      if (section === 'documentos') {
        showDocsGrid();
        loadDocsIndex();
      }
    });
  });

  // === Week selector ===
  function renderWeek() {
    if (weekLabel) weekLabel.textContent = getWeekLabel(currentWeekKey);
    const data = loadWeekData(currentWeekKey);
    checkboxes.forEach((cb) => {
      cb.checked = !!data[cb.dataset.task];
    });
    updateProgress();
  }

  function shiftWeek(delta) {
    const parts = currentWeekKey.replace('W', '').split('-');
    let y = parseInt(parts[0], 10);
    let w = parseInt(parts[1], 10) + delta;
    if (w < 1) { w = 52; y--; }
    if (w > 52) { w = 1; y++; }
    currentWeekKey = y + '-W' + String(w).padStart(2, '0');
    renderWeek();
  }

  prevWeekBtn?.addEventListener('click', () => shiftWeek(-1));
  nextWeekBtn?.addEventListener('click', () => shiftWeek(1));

  // === Checkbox persistence ===
  function saveCheckbox(taskId, checked) {
    const data = loadWeekData(currentWeekKey);
    data[taskId] = checked;
    saveWeekData(currentWeekKey, data);
    updateProgress();
    updateStreak(taskId, checked);
    checkAchievements();
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      saveCheckbox(cb.dataset.task, cb.checked);
    });
  });

  // === Progress ===
  function updateProgress() {
    const data = loadWeekData(currentWeekKey);
    const completed = Object.values(data).filter(Boolean).length;
    const total = checkboxes.length;
    const pct = total > 0 ? (completed / total) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressCount) progressCount.textContent = completed + '/' + total;
  }

  // === Streak ===
  const DAILY_TASK_IDS = ['daily-1', 'daily-2', 'eng-1', 'eng-2'];

  function updateStreak(taskId, checked) {
    if (!DAILY_TASK_IDS.includes(taskId) || !checked) return;
    const today = new Date().toISOString().slice(0, 10);
    const last = getLastDailyDate();
    let streak = getStreak();
    if (last === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    if (last === yesterdayStr) {
      streak++;
    } else if (last !== today) {
      streak = 1;
    }
    setStreak(streak);
    setLastDailyDate(today);
    renderStreak();
  }

  function renderStreak() {
    const streak = getStreak();
    if (streakDisplay) streakDisplay.textContent = streak + ' días seguidos con rutina';
    if (dailyStreakEl) dailyStreakEl.textContent = streak;
  }

  // === Achievements ===
  const ACHIEVEMENT_DEFS = [
    { id: 'first_week', label: 'Primera semana completa', check: () => isWeekComplete() },
    { id: 'streak_3', label: '3 días seguidos', check: () => getStreak() >= 3 },
    { id: 'streak_7', label: '1 semana de racha', check: () => getStreak() >= 7 },
    { id: 'half_week', label: 'Mitad de tareas completadas', check: () => getCompletedCount() >= Math.ceil(TOTAL_WEEKLY_TASKS / 2) },
  ];

  function getCompletedCount() {
    return Object.values(loadWeekData(currentWeekKey)).filter(Boolean).length;
  }

  function isWeekComplete() {
    return getCompletedCount() >= TOTAL_WEEKLY_TASKS * 0.8;
  }

  function checkAchievements() {
    const a = getAchievements();
    ACHIEVEMENT_DEFS.forEach(({ id, check }) => {
      if (!a[id] && check()) setAchievement(id, true);
    });
    renderAchievements();
  }

  function renderAchievements() {
    const a = getAchievements();
    const unlocked = ACHIEVEMENT_DEFS.filter((d) => a[d.id]);
    if (achievementsPreview) {
      achievementsPreview.textContent = unlocked.length
        ? 'Logros: ' + unlocked.map((d) => d.label).join(', ')
        : 'Completa tareas para desbloquear logros';
    }
    if (achievementsList) {
      achievementsList.innerHTML = ACHIEVEMENT_DEFS.map(
        (d) =>
          '<span class="achievement-badge ' +
          (a[d.id] ? 'unlocked' : '') +
          '" title="' +
          (a[d.id] ? 'Desbloqueado' : 'Bloqueado') +
          '">' +
          (a[d.id] ? '✓ ' : '○ ') +
          d.label +
          '</span>'
      ).join('');
    }
  }

  // === Guide Cards System ===
  const GUIDE_NAME_MAP = {
    'captions': 0,
    'reels': 1,
    'calendario': 2,
    'historias': 3,
    'carruseles': 4,
    'prompts': 5,
    'metricas': 6,
  };

  function showGuidesGrid() {
    if (guidesGrid) guidesGrid.hidden = false;
    if (guideDetail) guideDetail.hidden = true;
  }

  function showGuideDetail(idx) {
    if (!guideContents) return;
    const source = guideContents.querySelector('[data-guide-content="' + idx + '"]');
    if (!source || !guideDetailContent) return;

    guideDetailContent.innerHTML = '';
    const clone = source.cloneNode(true);

    // Inject h3 outside guide-content wrapper for styling
    const h3 = clone.querySelector('h3');
    if (h3) {
      guideDetailContent.appendChild(h3.cloneNode(true));
      h3.remove();
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'guide-content';
    wrapper.innerHTML = clone.innerHTML;
    guideDetailContent.appendChild(wrapper);

    if (guidesGrid) guidesGrid.hidden = true;
    if (guideDetail) guideDetail.hidden = false;

    // Re-bind copy buttons in the detail view
    bindCopyButtons(guideDetailContent);
  }

  // Card click (inline guides 0-6)
  if (guidesGrid) {
    guidesGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.guide-card');
      if (!card || card.hasAttribute('data-doc-file')) return;
      const idx = parseInt(card.dataset.guideIdx, 10);
      if (Number.isNaN(idx)) return;
      showGuideDetail(idx);
    });
  }

  // Back button
  guideBack?.addEventListener('click', showGuidesGrid);

  // === Documentos de referencia (guias/index.json + .md) ===
  const TYPE_ICONS = { estrategia: '📋', ia: '🤖', herramientas: '🔧', workflow: '📅', practicas: '✨', recursos: '📚', metricas: '📈', ejemplo: '📄' };
  let docsIndexLoaded = false;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function loadDocsIndex() {
    if (docsIndexLoaded || !docsRefGrid) return;
    fetch('guias/index.json')
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => {
        docsIndexLoaded = true;
        if (docsRefError) docsRefError.hidden = true;
        const fragment = document.createDocumentFragment();
        (data.docs || []).forEach((doc) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'guide-card doc-ref-card';
          btn.dataset.docFile = doc.file;
          btn.dataset.docTitle = doc.title;
          btn.setAttribute('role', 'listitem');
          const icon = TYPE_ICONS[doc.type] || '📄';
          btn.innerHTML = '<span class="guide-card__icon">' + icon + '</span><h3 class="guide-card__title">' + escapeHtml(doc.title) + '</h3><p class="guide-card__desc">' + escapeHtml(doc.type || '') + '</p>';
          fragment.appendChild(btn);
        });
        (data.ejemplos || []).forEach((ej) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'guide-card doc-ref-card';
          btn.dataset.docFile = ej.file;
          btn.dataset.docTitle = ej.title;
          btn.setAttribute('role', 'listitem');
          btn.innerHTML = '<span class="guide-card__icon">📄</span><h3 class="guide-card__title">' + escapeHtml(ej.title) + '</h3><p class="guide-card__desc">Ejemplo</p>';
          fragment.appendChild(btn);
        });
        docsRefGrid.appendChild(fragment);
      })
      .catch(() => {
        if (docsRefError) docsRefError.hidden = false;
      });
  }

  function showDocsGrid() {
    if (docsRefGrid) docsRefGrid.hidden = false;
    if (docDetail) docDetail.hidden = true;
  }

  function showDocViewer(file, title) {
    if (!docDetailContent || !docDetail) return;
    docDetailContent.innerHTML = '<p class="guide-content">Cargando…</p>';
    if (docsRefGrid) docsRefGrid.hidden = true;
    docDetail.hidden = false;

    fetch('guias/' + file)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then((md) => {
        const html = typeof marked !== 'undefined' && marked.parse ? marked.parse(md) : md.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        docDetailContent.innerHTML = '<h3>' + escapeHtml(title) + '</h3><div class="guide-content markdown-body">' + html + '</div>';
        bindCopyButtons(docDetailContent);
      })
      .catch(() => {
        docDetailContent.innerHTML = '<h3>' + escapeHtml(title) + '</h3><div class="guide-content"><p class="docs-ref-error">No se pudo cargar el documento.</p><button type="button" class="guide-detail__back" id="docBackBtn">Volver a documentos</button></div>';
        document.getElementById('docBackBtn')?.addEventListener('click', showDocsGrid);
      });
  }

  if (docsRefGrid) {
    docsRefGrid.addEventListener('click', (e) => {
      const card = e.target.closest('[data-doc-file]');
      if (!card) return;
      showDocViewer(card.dataset.docFile, card.dataset.docTitle || 'Documento');
    });
  }

  docBack?.addEventListener('click', showDocsGrid);
  if (document.getElementById('panel-documentos')?.classList.contains('active')) loadDocsIndex();

  // === Link to guides (from tasks) ===
  document.querySelectorAll('.link-guide').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      document.querySelector('.nav-item[data-section="guias"]')?.classList.add('active');
      document.getElementById('panel-guias')?.classList.add('active');

      const guideId = (a.dataset.guide || '').toLowerCase();
      if (guideId && GUIDE_NAME_MAP[guideId] !== undefined) {
        showGuideDetail(GUIDE_NAME_MAP[guideId]);
      } else {
        showGuidesGrid();
      }
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // === Copy to clipboard ===
  function copyToClipboard(text, el) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        el.classList.add('copied');
        setTimeout(() => el.classList.remove('copied'), 2000);
      });
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      el.classList.add('copied');
      setTimeout(() => el.classList.remove('copied'), 2000);
    }
  }

  function bindCopyButtons(container) {
    const root = container || document;
    root.querySelectorAll('[data-copyable]').forEach((el) => {
      if (el._copyBound) return;
      el._copyBound = true;
      el.addEventListener('click', () => {
        const text = el.textContent.replace(/^Prompt copiable\s*/, '').replace(/Copiar$/, '').trim();
        copyToClipboard(text, el);
      });
    });
  }

  // Bind copy on bento prompts and any initial prompt-cards
  bindCopyButtons(document);

  // === Theme ===
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const dark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    if (themeToggle) {
      themeToggle.textContent = dark ? 'Modo claro' : 'Modo oscuro';
    }
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? 'Modo oscuro' : 'Modo claro';
  });

  // === Brand filter ===
  document.querySelectorAll('input[name="brand"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const v = radio.value;
      document.querySelectorAll('.task-day--marca').forEach((el) => {
        const day = el.dataset.day;
        const show =
          v === 'ambas' ||
          (v === 'olumi' && day === 'olumi') ||
          (v === 'billicactus' && day === 'billicactus');
        el.style.display = show ? '' : 'none';
      });
    });
  });

  // === Gema brand tabs ===
  const gemaTabs = document.querySelectorAll('.gema-tab');
  const gemaContents = document.querySelectorAll('.gema-brand-content');

  gemaTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const brand = tab.dataset.gemaBrand;
      gemaTabs.forEach((t) => t.classList.remove('active'));
      gemaContents.forEach((c) => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('gema-' + brand)?.classList.add('active');
    });
  });

  // === Gema copy-all button ===
  document.querySelectorAll('.gema-copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const brand = btn.dataset.copyBrand;
      const container = document.getElementById('gema-' + brand);
      if (!container) return;
      const sections = container.querySelectorAll('.gema-section');
      let text = '';
      sections.forEach((sec) => {
        const summary = sec.querySelector('summary');
        if (summary) {
          const title = summary.textContent.replace(/Propuesta|Completa|Revisa/g, '').trim();
          text += '## ' + title + '\n\n';
        }
        const fields = sec.querySelectorAll('.gema-field');
        fields.forEach((field) => {
          const label = field.querySelector('label');
          const prefill = field.querySelector('.gema-prefill, .gema-prefill--block');
          const list = field.querySelector('.gema-prefill-list');
          const table = field.querySelector('.gema-table');
          const placeholder = field.querySelector('.gema-placeholder');
          if (label) text += '### ' + label.textContent.replace(/Propuesta|Completa|Revisa/g, '').trim() + '\n';
          if (prefill) {
            text += prefill.innerText.trim() + '\n\n';
          } else if (list) {
            const items = list.querySelectorAll('li');
            items.forEach((li) => { text += '- ' + li.innerText.trim() + '\n'; });
            text += '\n';
          } else if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach((row, i) => {
              const cells = row.querySelectorAll('th, td');
              const vals = [];
              cells.forEach((c) => vals.push(c.innerText.trim()));
              text += '| ' + vals.join(' | ') + ' |\n';
              if (i === 0) {
                text += '|' + vals.map(() => '---').join('|') + '|\n';
              }
            });
            text += '\n';
          } else if (placeholder) {
            text += '[POR COMPLETAR]: ' + placeholder.innerText.trim() + '\n\n';
          }
        });
      });
      navigator.clipboard.writeText(text.trim()).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'Copiado!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = brand === 'billicactus'
            ? 'Copiar todo para la Gema de BilliCactus'
            : 'Copiar todo para la Gema de Olumi';
        }, 2500);
      });
    });
  });

  // === Service Worker (PWA) ===
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // === Init ===
  initTheme();
  renderWeek();
  renderStreak();
  renderAchievements();
})();
