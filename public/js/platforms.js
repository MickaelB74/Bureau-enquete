/**
 * RENDU DES PLATEFORMES (mode "RP" / réaliste).
 *
 * Chaque fonction transforme les données d'une source en un mockup HTML qui
 * imite l'interface réelle de la plateforme (TikTok, site web dans un
 * navigateur, journal, WhatsApp, Instagram, X/Twitter, YouTube, Facebook).
 *
 * L'objectif pédagogique : l'élève reconnaît l'allure d'un vrai contenu et
 * apprend à repérer les indices DANS son contexte d'origine.
 *
 * Toutes les valeurs venant des données sont échappées (escapeHtml) pour
 * éviter toute injection HTML accidentelle.
 */

// Échappe les caractères HTML dangereux.
function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Petit badge "certifié" (coche), réutilisé par plusieurs plateformes.
function verifiedBadge(isVerified) {
  return isVerified ? '<span class="verified-badge" title="Compte certifié">✔</span>' : '';
}

/* ── SITE WEB : fenêtre de navigateur + article ── */
function renderWebsite(d) {
  return `
    <article class="mock mock-website">
      <div class="browser-bar">
        <span class="browser-dots"><i></i><i></i><i></i></span>
        <span class="browser-url">🔒 ${escapeHtml(d.url)}</span>
      </div>
      <div class="website-body">
        <div class="website-masthead">${escapeHtml(d.siteName)}</div>
        <div class="website-meta">${escapeHtml(d.publishedAt)}</div>
        <h2 class="website-headline">${escapeHtml(d.headline)}</h2>
        ${d.imageCaption ? `<div class="mock-image">${escapeHtml(d.imageCaption)}</div>` : ''}
        <p class="website-text">${escapeHtml(d.body)}</p>
        <div class="website-share">${escapeHtml(d.shareInfo)}</div>
      </div>
    </article>`;
}

/* ── TIKTOK : téléphone vertical + barre d'actions latérale ── */
function renderTiktok(d) {
  return `
    <article class="mock mock-tiktok">
      <div class="tiktok-phone">
        <div class="tiktok-video">
          <span class="tiktok-topbar">Abonnement &nbsp; <b>Pour toi</b></span>
          <span class="tiktok-videohint">▶ ${escapeHtml(d.videoCaption)}</span>
          <div class="tiktok-bottom">
            <div class="tiktok-user">${escapeHtml(d.handle)}</div>
            <div class="tiktok-caption">${escapeHtml(d.caption)}</div>
            <div class="tiktok-sound">${escapeHtml(d.sound)}</div>
          </div>
        </div>
        <div class="tiktok-actions">
          <span class="tt-avatar">👤</span>
          <span class="tt-act">❤️<b>${escapeHtml(d.likes)}</b></span>
          <span class="tt-act">💬<b>${escapeHtml(d.comments)}</b></span>
          <span class="tt-act">↪️<b>${escapeHtml(d.shares)}</b></span>
        </div>
      </div>
      <div class="tiktok-profile">${escapeHtml(d.displayName)} · ${escapeHtml(d.followers)} abonnés</div>
    </article>`;
}

/* ── JOURNAL : une de presse, typographie sérieuse ── */
function renderNewspaper(d) {
  return `
    <article class="mock mock-newspaper">
      <div class="paper-top">
        <span class="paper-name">${escapeHtml(d.name)}</span>
        <span class="paper-section">${escapeHtml(d.section)}</span>
      </div>
      <div class="paper-date">${escapeHtml(d.publishedAt)}</div>
      <h2 class="paper-headline">${escapeHtml(d.headline)}</h2>
      <div class="paper-byline">${escapeHtml(d.byline)}</div>
      ${d.imageCaption ? `<div class="mock-image paper-photo">${escapeHtml(d.imageCaption)}</div>` : ''}
      <p class="paper-body">${escapeHtml(d.body)}</p>
      <div class="paper-source">${escapeHtml(d.sourceNote)}</div>
    </article>`;
}

/* ── WHATSAPP : conversation, bulle "transféré" ── */
function renderWhatsapp(d) {
  return `
    <article class="mock mock-whatsapp">
      <div class="wa-header">
        <span class="wa-avatar">👥</span>
        <span class="wa-group">${escapeHtml(d.groupName)}</span>
      </div>
      <div class="wa-body">
        <div class="wa-bubble">
          <span class="wa-forwarded">↩️ Transféré ${escapeHtml(d.forwardedCount)} fois</span>
          <span class="wa-sender">${escapeHtml(d.sender)}</span>
          <p class="wa-text">${escapeHtml(d.message)}</p>
          <span class="wa-time">${escapeHtml(d.time)} ✓✓</span>
        </div>
      </div>
    </article>`;
}

/* ── INSTAGRAM : post avec avatar, image, likes, légende ── */
function renderInstagram(d) {
  return `
    <article class="mock mock-instagram">
      <div class="ig-header">
        <span class="ig-avatar">👤</span>
        <span class="ig-user">${escapeHtml(d.handle)} ${verifiedBadge(d.verified)}</span>
        <span class="ig-dots">⋯</span>
      </div>
      <div class="mock-image ig-image">${escapeHtml(d.imageCaption)}</div>
      <div class="ig-actions"><span>❤️</span><span>💬</span><span>✈️</span><span class="ig-save">🔖</span></div>
      <div class="ig-likes">${escapeHtml(d.likes)} J'aime</div>
      <div class="ig-caption"><b>${escapeHtml(d.displayName)}</b> ${escapeHtml(d.caption)}</div>
      <div class="ig-meta">Voir les ${escapeHtml(d.comments)} commentaires · ${escapeHtml(d.time)}</div>
    </article>`;
}

/* ── X / TWITTER : carte de tweet + statistiques ── */
function renderTwitter(d) {
  return `
    <article class="mock mock-twitter">
      <div class="tw-header">
        <span class="tw-avatar">👤</span>
        <span class="tw-names">
          <span class="tw-name">${escapeHtml(d.displayName)} ${verifiedBadge(d.verified)}</span>
          <span class="tw-handle">${escapeHtml(d.handle)} · ${escapeHtml(d.time)}</span>
        </span>
        <span class="tw-logo">𝕏</span>
      </div>
      <p class="tw-text">${escapeHtml(d.text)}</p>
      <div class="tw-stats">
        <span>💬 ${escapeHtml(d.comments)}</span>
        <span>🔁 ${escapeHtml(d.retweets)}</span>
        <span>❤️ ${escapeHtml(d.likes)}</span>
        <span>📊 ${escapeHtml(d.views)}</span>
      </div>
    </article>`;
}

/* ── YOUTUBE : miniature + titre + chaîne ── */
function renderYoutube(d) {
  return `
    <article class="mock mock-youtube">
      <div class="mock-image yt-thumb">
        ${escapeHtml(d.thumbnailCaption)}
        <span class="yt-play">▶</span>
      </div>
      <div class="yt-info">
        <span class="yt-chan-avatar">📺</span>
        <div>
          <h2 class="yt-title">${escapeHtml(d.title)}</h2>
          <div class="yt-meta">${escapeHtml(d.channel)} · ${escapeHtml(d.subscribers)}</div>
          <div class="yt-meta">${escapeHtml(d.views)} · ${escapeHtml(d.uploadedAt)}</div>
        </div>
      </div>
      <p class="yt-desc">${escapeHtml(d.description)}</p>
    </article>`;
}

/* ── FACEBOOK : post de page + barre de réactions ── */
function renderFacebook(d) {
  return `
    <article class="mock mock-facebook">
      <div class="fb-header">
        <span class="fb-avatar">📘</span>
        <span class="fb-names">
          <span class="fb-page">${escapeHtml(d.pageName)}</span>
          <span class="fb-time">${escapeHtml(d.time)} · 🌐</span>
        </span>
      </div>
      <p class="fb-text">${escapeHtml(d.text)}</p>
      ${d.imageCaption ? `<div class="mock-image fb-image">${escapeHtml(d.imageCaption)}</div>` : ''}
      <div class="fb-counts">👍❤️😮 ${escapeHtml(d.likes)} · ${escapeHtml(d.comments)} commentaires · ${escapeHtml(d.shares)} partages</div>
      <div class="fb-actions"><span>👍 J'aime</span><span>💬 Commenter</span><span>↪️ Partager</span></div>
    </article>`;
}

// Table de correspondance plateforme → fonction de rendu.
const PLATFORM_RENDERERS = {
  website: renderWebsite,
  tiktok: renderTiktok,
  newspaper: renderNewspaper,
  whatsapp: renderWhatsapp,
  instagram: renderInstagram,
  twitter: renderTwitter,
  youtube: renderYoutube,
  facebook: renderFacebook
};

// Métadonnées d'affichage (icône + libellé) par plateforme,
// utilisées pour la barre latérale des "appareils/sources".
const PLATFORM_META = {
  website: { icon: '🌐', label: 'Site web' },
  tiktok: { icon: '🎵', label: 'TikTok' },
  newspaper: { icon: '🗞️', label: 'Journal' },
  whatsapp: { icon: '💬', label: 'WhatsApp' },
  instagram: { icon: '📷', label: 'Instagram' },
  twitter: { icon: '𝕏', label: 'X (Twitter)' },
  youtube: { icon: '▶️', label: 'YouTube' },
  facebook: { icon: '📘', label: 'Facebook' }
};

// Point d'entrée : rend une source selon sa plateforme.
function renderSource(source) {
  const renderer = PLATFORM_RENDERERS[source.platform];
  if (!renderer) {
    return `<div class="mock">Plateforme inconnue : ${escapeHtml(source.platform)}</div>`;
  }
  return renderer(source.data);
}

// Exposition globale.
window.renderSource = renderSource;
window.PLATFORM_META = PLATFORM_META;
window.escapeHtml = escapeHtml;
