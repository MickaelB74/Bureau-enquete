# 🕵️ Bureau d'Enquête Numérique

Jeu éducatif d'**éducation aux médias et à l'information (EMI)**. Le joueur incarne
un détective qui analyse des sources réalistes (TikTok, site web, journal, WhatsApp,
Instagram, X, YouTube, Facebook) et décide, pour chacune : **vraie info** ou
**fake news** ? Chaque verdict est suivi d'indices et d'une explication pédagogique.

## ✨ Fonctionnalités

- **5 affaires (niveaux)** de difficulté croissante, sur des thèmes variés
  (animal mystère, météo, célébrité, santé, espace/complot).
- **Ratios fake/vrai variés** d'un niveau à l'autre, pour casser le réflexe
  « tout est faux » et apprendre à reconnaître aussi les vraies sources fiables.
- **Rendu réaliste (RP)** : chaque source imite l'interface de sa plateforme
  d'origine (fenêtre de navigateur, téléphone TikTok, bulle WhatsApp, tweet…).
- **Indices et explications** révélés après chaque réponse.
- 100 % **statique** (HTML/CSS/JS), sans dépendance pour jouer.

## 📁 Structure du projet

```
.
├── public/                 ← Site (dossier publié sur Render)
│   ├── index.html          ← Page unique, assemble les écrans
│   ├── css/
│   │   ├── theme.css        ← Variables, fond "bureau", écrans
│   │   ├── layout.css       ← Menu, en-têtes, grille de jeu
│   │   ├── platforms.css    ← Mockups réalistes par plateforme (RP)
│   │   └── components.css   ← Verdict, résultat, écran final
│   └── js/
│       ├── levels.js        ← Données : les affaires et leurs sources
│       ├── platforms.js     ← Rendu HTML d'une source selon sa plateforme
│       └── game.js          ← Logique de jeu (menu, verdicts, score, fin)
├── render.yaml             ← Blueprint de déploiement Render (site statique)
├── server.js               ← Serveur Express optionnel (dev local / web service)
├── package.json
└── .gitignore
```

## 🚀 Déploiement sur Render.com

### Option A — Site statique (recommandé)

C'est le plus simple : aucun serveur, aucune compilation.

1. Pousse ce dépôt sur GitHub / GitLab.
2. Sur [dashboard.render.com](https://dashboard.render.com), clique **New → Blueprint**
   et sélectionne ce dépôt. Render lit automatiquement [`render.yaml`](render.yaml).
   - *(Sans Blueprint)* : **New → Static Site**, puis renseigne :
     - **Build Command** : *(laisser vide)*
     - **Publish Directory** : `public`
3. Valide. Render publie le site et fournit une URL `https://<nom>.onrender.com`.

### Option B — Web Service (Node + Express)

Utile si tu préfères un service Node (ou pour ajouter une API plus tard).

- **Build Command** : `npm install`
- **Start Command** : `npm start`

Le serveur [`server.js`](server.js) sert le dossier `public/` sur le port fourni
par Render (variable d'environnement `PORT`).

## 💻 Lancer en local

Sans rien installer (Option A), ouvre simplement `public/index.html` dans un
navigateur. Pour reproduire le mode serveur (Option B) :

```bash
npm install
npm start
# → http://localhost:3000
```

## ✏️ Ajouter ou modifier une affaire

Tout le contenu pédagogique est dans [`public/js/levels.js`](public/js/levels.js).
Pour créer une nouvelle affaire, ajoute un objet au tableau `LEVELS` avec ses
`sources`. Chaque source précise sa `platform`, si elle est `isFake`, ses données
d'affichage, ses `clues` (indices) et son `explanation`. Aucune autre modification
n'est nécessaire : le menu, les scores et le rendu s'adaptent automatiquement.

Les plateformes disponibles (`platform`) : `website`, `tiktok`, `newspaper`,
`whatsapp`, `instagram`, `twitter`, `youtube`, `facebook`. Pour en ajouter une,
crée son renderer dans [`public/js/platforms.js`](public/js/platforms.js) et son
style dans [`public/css/platforms.css`](public/css/platforms.css).

## 📝 Note pédagogique

Les contenus « fake » sont volontairement caricaturaux pour illustrer les signaux
d'alerte (source anonyme, urgence, complot, promesses miracles…). Les exemples sont
fictifs ; les noms de marques de plateformes servent uniquement à reproduire un
contexte réaliste à des fins éducatives.
