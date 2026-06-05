/**
 * LOGIQUE DU JEU — Bureau d'Enquête Numérique.
 *
 * Gère trois écrans :
 *   1. Le menu (choix de l'affaire) avec scoreboard global et déblocage progressif
 *   2. Le jeu (analyse des sources et verdicts)
 *   3. L'écran de fin (score + récapitulatif des pièges + suite)
 *
 * Dépend de :
 *   - window.LEVELS         (levels.js)    → les données des niveaux
 *   - window.renderSource   (platforms.js) → le rendu réaliste d'une source
 *   - window.PLATFORM_META  (platforms.js) → icône + libellé par plateforme
 *
 * La progression (meilleurs scores + affaires terminées) est sauvegardée dans
 * le localStorage, ce qui permet le déblocage des affaires dans l'ordre et le
 * scoreboard global d'une session à l'autre.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ben_progress_v1';

  // ── État de la partie en cours ──
  const state = {
    level: null,      // affaire en cours
    source: null,     // source en cours d'analyse
    answered: [],     // index des sources déjà traitées
    given: {},        // index → verdict donné ('real' | 'fake'), pour la relecture
    score: 0,         // bonnes réponses de l'affaire en cours
    misses: []        // sources sur lesquelles le joueur s'est trompé (les "pièges")
  };

  const $ = (id) => document.getElementById(id);

  /* ════════════════ PROGRESSION (localStorage) ════════════════ */

  // Cache mémoire : garantit la continuité même si le localStorage est bloqué
  // (ex. ouverture du fichier en local sous certains navigateurs).
  let progressCache = null;

  function loadProgress() {
    if (progressCache) return progressCache;
    let p = { scores: {}, completed: [], traps: [] };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const o = JSON.parse(raw);
        p = { scores: o.scores || {}, completed: o.completed || [], traps: o.traps || [] };
      }
    } catch (e) { /* stockage indisponible : on reste en mémoire */ }
    progressCache = p;
    return p;
  }

  function saveProgress(p) {
    progressCache = p;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) { /* ignore */ }
  }

  // Enregistre le résultat d'une affaire : score, statut terminé, et points-pièges.
  // Les affaires ne se jouant qu'une fois, on n'enregistre les pièges qu'à la
  // première (et unique) complétion.
  function recordResult(levelId, score, traps) {
    const p = loadProgress();
    const firstTime = !p.completed.includes(levelId);
    p.scores[levelId] = score;
    if (firstTime) {
      p.completed.push(levelId);
      if (traps && traps.length) p.traps = p.traps.concat(traps);
    }
    saveProgress(p);
    return p;
  }

  // Une affaire est débloquée si c'est la première, ou si la précédente est terminée.
  function isUnlocked(index, progress) {
    if (index === 0) return true;
    return progress.completed.includes(window.LEVELS[index - 1].id);
  }

  /* ════════════════ ÉCRAN 1 — MENU ════════════════ */

  function renderMenu() {
    const progress = loadProgress();
    renderGlobalScoreboard(progress);

    const grid = $('level-grid');
    grid.innerHTML = '';

    window.LEVELS.forEach((level, i) => {
      const unlocked = isUnlocked(i, progress);
      const done = progress.completed.includes(level.id);
      const score = progress.scores[level.id];
      const total = level.sources.length;
      const stars = '★'.repeat(level.difficulty) + '☆'.repeat(5 - level.difficulty);

      // Une affaire ne se joue qu'une fois : elle est cliquable seulement si
      // débloquée ET pas encore résolue.
      const playable = unlocked && !done;
      const card = document.createElement(playable ? 'button' : 'div');
      card.className =
        'level-card' + (playable ? '' : ' locked') + (done ? ' done' : '');
      if (playable) card.type = 'button';

      let emoji, theme, footer;
      if (done) {
        emoji = '✓';
        theme = level.theme;
        footer = `<span class="level-best">Résolue · score ${score} / ${total}</span>`;
      } else if (unlocked) {
        emoji = level.emoji;
        theme = level.theme;
        // NB : on n'affiche JAMAIS le nombre de vraies/fausses sources (ce serait un indice).
        footer = `<span class="level-ratio">${total} sources à analyser</span>`;
      } else {
        emoji = '🔒';
        theme = 'Termine l\'affaire précédente pour la débloquer';
        footer = '<span class="level-ratio">Verrouillée</span>';
      }

      card.innerHTML = `
        <span class="level-num">Affaire n°${level.number}</span>
        <span class="level-emoji">${emoji}</span>
        <span class="level-title">${escapeHtml(level.title)}</span>
        <span class="level-theme">${escapeHtml(theme)}</span>
        <span class="level-meta">
          <span class="level-stars" title="Difficulté">${stars}</span>
          ${footer}
        </span>
      `;
      if (playable) card.addEventListener('click', () => startLevel(level.id));
      grid.appendChild(card);
    });
  }

  // Scoreboard global : somme des meilleurs scores sur l'ensemble des affaires.
  function renderGlobalScoreboard(progress) {
    const totalAll = window.LEVELS.reduce((a, l) => a + l.sources.length, 0);
    const earned = window.LEVELS.reduce((a, l) => a + (progress.scores[l.id] || 0), 0);
    const solved = window.LEVELS.filter((l) => progress.completed.includes(l.id)).length;
    const pct = totalAll ? Math.round((earned / totalAll) * 100) : 0;

    $('gs-score').textContent = `${earned} / ${totalAll}`;
    $('gs-solved').textContent = `${solved} / ${window.LEVELS.length}`;
    $('gs-bar-fill').style.width = pct + '%';

    // Le bouton "bilan final" n'apparaît que lorsque toutes les affaires sont résolues.
    $('view-bilan').style.display = solved === window.LEVELS.length ? '' : 'none';
  }

  function showScreen(name) {
    ['menu', 'game', 'final', 'complete'].forEach((s) => {
      $('screen-' + s).classList.toggle('visible', s === name);
    });
    window.scrollTo(0, 0);
  }

  /* ════════════════ ÉCRAN 2 — JEU ════════════════ */

  function startLevel(levelId) {
    state.level = window.LEVELS.find((l) => l.id === levelId);
    state.source = null;
    state.answered = [];
    state.given = {};
    state.score = 0;
    state.misses = [];

    $('affaire-title').textContent =
      `Affaire n°${state.level.number} — ${state.level.title}`;
    $('mission-text').textContent = state.level.mission;
    $('total').textContent = state.level.sources.length;
    $('score').textContent = '0';

    resetPanelToWelcome(true);
    renderDevices();
    renderDots();
    showScreen('game');
  }

  function renderDots() {
    const container = $('progress-dots');
    container.innerHTML = '';
    state.level.sources.forEach((s, i) => {
      const dot = document.createElement('div');
      let cls = 'dot';
      if (state.answered.includes(i)) cls += ' done';
      else if (state.source && state.source._index === i) cls += ' current';
      dot.className = cls;
      container.appendChild(dot);
    });
  }

  function renderDevices() {
    const sidebar = $('devices-sidebar');
    sidebar.innerHTML = '';
    state.level.sources.forEach((s, i) => {
      const meta = window.PLATFORM_META[s.platform] || { icon: '❓', label: s.platform };
      const isDone = state.answered.includes(i);
      const isActive = state.source && state.source._index === i;

      const card = document.createElement('div');
      card.className = 'device-card' + (isActive ? ' active' : '') + (isDone ? ' done' : '');
      // Une source déjà traitée reste consultable (relecture seule, choix figé).
      card.title = isDone ? 'Revoir cette source' : '';
      card.innerHTML = `
        <span class="device-emoji">${meta.icon}</span>
        <div class="device-name">${escapeHtml(meta.label)}</div>
        <div class="device-source">${escapeHtml(s.shortLabel)}</div>
        ${isDone ? '<div class="done-badge">✓</div>' : ''}
      `;
      // Toutes les cartes sont cliquables : non traitée → on répond ; traitée → on revoit.
      card.addEventListener('click', () => openSource(i));
      sidebar.appendChild(card);
    });
  }

  function openSource(idx) {
    const source = state.level.sources[idx];
    source._index = idx;
    state.source = source;

    renderDevices();
    renderDots();

    // Rendu de la source seule : aucun indice, aucune explication n'est montré.
    $('source-content').innerHTML = window.renderSource(source);

    $('welcome-state').style.display = 'none';
    $('source-content').style.display = 'block';
    $('verdict-zone').className = 'verdict-zone visible';

    if (state.answered.includes(idx)) {
      // Source déjà traitée : relecture seule, le choix ne peut plus changer.
      showResult(source, state.given[idx], true);
    } else {
      $('result-banner').style.display = 'none';
      $('btn-real').disabled = false;
      $('btn-fake').disabled = false;
      $('btn-real').className = 'verdict-btn real';
      $('btn-fake').className = 'verdict-btn fake';
    }
  }

  // Affiche le bandeau de résultat : juste « juste/faux », sans aucune explication.
  // En relecture (review = true), on n'affiche pas le bouton « source suivante ».
  function showResult(source, verdict, review) {
    const isCorrect = (verdict === 'fake') === source.isFake;

    $('btn-real').disabled = true;
    $('btn-fake').disabled = true;
    $('btn-real').className = 'verdict-btn real' + (verdict === 'real' ? ' selected-real' : '');
    $('btn-fake').className = 'verdict-btn fake' + (verdict === 'fake' ? ' selected-fake' : '');

    const banner = $('result-banner');
    banner.style.display = 'block';
    banner.className = 'result-banner ' + (isCorrect ? 'correct' : 'wrong');

    $('result-title').textContent = isCorrect ? '✅ Bonne réponse !' : '❌ Mauvaise réponse';
    // Plus aucune indication du « pourquoi » : on ne montre que juste/faux.
    $('result-explanation').textContent = '';
    $('result-explanation').style.display = 'none';

    const nextBtn = $('next-btn');
    if (review) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = '';
      nextBtn.textContent =
        state.answered.length >= state.level.sources.length
          ? 'Voir mon résultat final →'
          : 'Source suivante →';
    }
  }

  function submitVerdict(verdict) {
    if (!state.source) return;
    // Une source déjà traitée est en relecture seule : on ne peut plus répondre.
    if (state.answered.includes(state.source._index)) return;

    const isCorrect = (verdict === 'fake') === state.source.isFake;
    if (isCorrect) {
      state.score++;
    } else {
      // On mémorise la source-piège pour le récapitulatif final.
      state.misses.push({ source: state.source, given: verdict });
    }
    state.answered.push(state.source._index);
    state.given[state.source._index] = verdict;
    $('score').textContent = state.score;

    showResult(state.source, verdict, false);

    renderDevices();
    renderDots();
  }

  function nextSource() {
    if (state.answered.length >= state.level.sources.length) {
      showFinal();
      return;
    }
    state.source = null;
    resetPanelToWelcome(false);
    renderDevices();
    renderDots();
  }

  function resetPanelToWelcome(first) {
    $('verdict-zone').className = 'verdict-zone';
    $('result-banner').style.display = 'none';
    $('source-content').style.display = 'none';
    const welcome = $('welcome-state');
    welcome.style.display = 'flex';
    welcome.querySelector('.welcome-title').textContent = first
      ? 'Commence l\'enquête !'
      : 'Continue l\'enquête !';
    welcome.querySelector('.welcome-desc').textContent = first
      ? 'Clique sur une source à gauche pour l\'examiner et décider : vraie info ou fake news ?'
      : 'Clique sur une autre source pour analyser le prochain contenu.';
  }

  /* ════════════════ ÉCRAN 3 — FIN D'AFFAIRE ════════════════ */

  function showFinal() {
    const total = state.level.sources.length;
    const ratio = state.score / total;

    // Sérialise les sources-pièges de cette affaire pour le bilan final global.
    const traps = state.misses.map(({ source }) => ({
      levelNumber: state.level.number,
      levelTitle: state.level.title,
      platform: source.platform,
      shortLabel: source.shortLabel,
      isFake: source.isFake,
      explanation: source.explanation,
      clues: source.clues.filter((c) => c.suspicious === source.isFake).map((c) => c.text)
    }));

    // Sauvegarde la progression : score, déblocage de la suite, et points-pièges.
    recordResult(state.level.id, state.score, traps);

    let icon, title, msg;
    if (ratio === 1) {
      icon = '🏆';
      title = 'Détective en chef !';
      msg = 'Sans-faute ! Tu as démêlé chaque source sans te laisser piéger. ' +
            'Tu maîtrises l\'art de l\'enquête numérique.';
    } else if (ratio >= 0.7) {
      icon = '🎖️';
      title = 'Excellente enquête';
      msg = 'Tu as l\'œil pour repérer les fausses infos. Encore un petit effort pour ' +
            'viser le sans-faute !';
    } else if (ratio >= 0.4) {
      icon = '🔍';
      title = 'Sur la bonne piste';
      msg = 'Pas mal ! Continue à t\'entraîner pour démêler le vrai du faux.';
    } else {
      icon = '📚';
      title = 'À l\'entraînement, détective !';
      msg = 'Les intox sont rusées. Rejoue pour améliorer ton score.';
    }

    $('final-icon').textContent = icon;
    $('final-title').textContent = title;
    $('final-score').textContent = `${state.score} / ${total}`;
    $('final-msg').textContent = msg;

    renderTrapRecap();

    // Bouton principal : affaire suivante, ou bilan final si c'était la dernière.
    const idx = window.LEVELS.findIndex((l) => l.id === state.level.id);
    const next = window.LEVELS[idx + 1];
    const nextBtn = $('next-level-btn');
    nextBtn.style.display = '';
    if (next) {
      nextBtn.textContent = `Affaire suivante : ${next.emoji} ${next.title} →`;
      nextBtn.onclick = () => startLevel(next.id);
    } else {
      nextBtn.textContent = '🏁 Voir le bilan final →';
      nextBtn.onclick = showComplete;
    }

    showScreen('final');
  }

  /* ════════════════ ÉCRAN 4 — BILAN FINAL ════════════════ */

  function showComplete() {
    const progress = loadProgress();
    const totalAll = window.LEVELS.reduce((a, l) => a + l.sources.length, 0);
    const earned = window.LEVELS.reduce((a, l) => a + (progress.scores[l.id] || 0), 0);

    $('bilan-score').textContent = `${earned} / ${totalAll}`;

    const traps = progress.traps || [];
    const missed = traps.length;
    $('bilan-msg').textContent = missed === 0
      ? 'Sans-faute absolu sur l\'ensemble des affaires ! Tu es un véritable détective ' +
        'de l\'information : aucune intox ne t\'a échappé.'
      : `Tu as résolu toutes les affaires. ${missed} réponse${missed > 1 ? 's' : ''} ` +
        `manquée${missed > 1 ? 's' : ''} en chemin : les voici ci-dessous.`;

    renderBilanRecap(traps);
    showScreen('complete');
  }

  // Liste consolidée de tous les points-pièges qui ont affaibli le score.
  function renderBilanRecap(traps) {
    const box = $('bilan-recap');

    if (!traps.length) {
      box.innerHTML =
        '<div class="recap-clean">🏆 Aucun piège sur toute l\'enquête : score parfait !</div>';
      return;
    }

    const items = traps
      .map((t) => {
        const meta = window.PLATFORM_META[t.platform] || { icon: '❓', label: t.platform };
        const verdictLabel = t.isFake ? 'C\'était une fake news.' : 'C\'était une vraie info.';

        return `
          <div class="recap-item ${t.isFake ? 'is-fake' : 'is-real'}">
            <div class="recap-head">
              <span class="recap-icon">${meta.icon}</span>
              <span class="recap-source">${escapeHtml(meta.label)} · ${escapeHtml(t.shortLabel)}</span>
            </div>
            <div class="recap-affaire">Affaire n°${t.levelNumber} — ${escapeHtml(t.levelTitle)}</div>
            <div class="recap-verdict">${verdictLabel}</div>
          </div>`;
      })
      .join('');

    box.innerHTML =
      '<div class="recap-title">🎯 Réponses manquées</div>' + items;
  }

  // Récapitulatif des sources qui ont piégé le joueur (réponses fausses).
  function renderTrapRecap() {
    const box = $('trap-recap');

    if (!state.misses.length) {
      box.innerHTML =
        '<div class="recap-clean">🎉 Sans-faute sur cette affaire : aucune erreur !</div>';
      return;
    }

    const items = state.misses
      .map(({ source }) => {
        const meta = window.PLATFORM_META[source.platform] || { icon: '❓', label: source.platform };
        const verdictLabel = source.isFake ? 'C\'était une fake news.' : 'C\'était une vraie info.';

        return `
          <div class="recap-item ${source.isFake ? 'is-fake' : 'is-real'}">
            <div class="recap-head">
              <span class="recap-icon">${meta.icon}</span>
              <span class="recap-source">${escapeHtml(meta.label)} · ${escapeHtml(source.shortLabel)}</span>
            </div>
            <div class="recap-verdict">${verdictLabel}</div>
          </div>`;
      })
      .join('');

    box.innerHTML =
      '<div class="recap-title">🔎 Réponses manquées</div>' + items;
  }

  /* ════════════════ INITIALISATION ════════════════ */

  function resetProgress() {
    if (!window.confirm('Réinitialiser toute la progression (scores, déblocages et bilan) ?')) return;
    progressCache = { scores: {}, completed: [], traps: [] };
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    renderMenu();
  }

  const goMenu = () => { renderMenu(); showScreen('menu'); };

  function init() {
    renderMenu();

    $('btn-real').addEventListener('click', () => submitVerdict('real'));
    $('btn-fake').addEventListener('click', () => submitVerdict('fake'));
    $('next-btn').addEventListener('click', nextSource);
    $('back-to-menu').addEventListener('click', goMenu);
    $('to-menu-btn').addEventListener('click', goMenu);
    $('bilan-menu-btn').addEventListener('click', goMenu);
    $('view-bilan').addEventListener('click', showComplete);
    $('reset-progress').addEventListener('click', resetProgress);

    showScreen('menu');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
