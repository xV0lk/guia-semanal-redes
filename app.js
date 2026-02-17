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
    return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
  }

  function getWeekLabel(weekKey) {
    const [y, w] = weekKey.replace('W', '').split('-');
    return `Semana ${w} de ${y}`;
  }

  function loadWeekData(weekKey) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PREFIX + weekKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveWeekData(weekKey, data) {
    localStorage.setItem(STORAGE_KEY_PREFIX + weekKey, JSON.stringify(data));
  }

  function getStreak() {
    try {
      return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
    } catch {
      return 0;
    }
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
    try {
      return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '{}');
    } catch {
      return {};
    }
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

  // === Navigation ===
  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      navItems.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + section).classList.add('active');
      if (sidebar && window.innerWidth <= 768) sidebar.classList.remove('open');
    });
  });

  sidebarToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !sidebarToggle?.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // === Week selector ===
  function renderWeek() {
    weekLabel.textContent = getWeekLabel(currentWeekKey);
    const data = loadWeekData(currentWeekKey);
    checkboxes.forEach((cb) => {
      const taskId = cb.dataset.task;
      cb.checked = !!data[taskId];
    });
    updateProgress();
  }

  function goPrevWeek() {
    const [y, w] = currentWeekKey.replace('W', '').split('-');
    let ny = parseInt(y, 10);
    let nw = parseInt(w, 10) - 1;
    if (nw < 1) {
      nw = 52;
      ny--;
    }
    currentWeekKey = `${ny}-W${String(nw).padStart(2, '0')}`;
    renderWeek();
  }

  function goNextWeek() {
    const [y, w] = currentWeekKey.replace('W', '').split('-');
    let ny = parseInt(y, 10);
    let nw = parseInt(w, 10) + 1;
    if (nw > 52) {
      nw = 1;
      ny++;
    }
    currentWeekKey = `${ny}-W${String(nw).padStart(2, '0')}`;
    renderWeek();
  }

  prevWeekBtn?.addEventListener('click', goPrevWeek);
  nextWeekBtn?.addEventListener('click', goNextWeek);

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

  // === Streak (rutina diaria) ===
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

  // === Link to guides ===
  document.querySelectorAll('.link-guide').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      document.querySelector('.nav-item[data-section="guias"]')?.classList.add('active');
      document.getElementById('panel-guias').classList.add('active');
      const guideId = (a.dataset.guide || '').toLowerCase();
      if (guideId) {
        document.querySelectorAll('.guide').forEach((g) => {
          g.open = g.querySelector('summary').textContent.toLowerCase().includes(guideId);
        });
      }
      if (sidebar && window.innerWidth <= 768) sidebar.classList.remove('open');
    });
  });

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

  // === Brand filter (show/hide marca tasks) ===
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
