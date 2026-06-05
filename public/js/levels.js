/**
 * DONNÉES DU JEU — Les affaires (niveaux) du Bureau d'Enquête Numérique.
 *
 * Chaque niveau contient une enquête (mission) et une liste de "sources".
 * Chaque source est un contenu à analyser, rendu de façon réaliste selon sa
 * plateforme (TikTok, site web, journal, WhatsApp, Instagram, X, YouTube...).
 *
 * Modèle d'une source :
 * {
 *   platform: 'website' | 'tiktok' | 'newspaper' | 'whatsapp' |
 *             'instagram' | 'twitter' | 'youtube' | 'facebook',
 *   isFake:   true | false,            // la bonne réponse
 *   shortLabel: 'Texte court pour la barre latérale des appareils',
 *   data:     { ... },                 // champs propres à la plateforme (voir platforms.js)
 *   clues:    [{ text, suspicious }],  // indices révélés APRÈS le verdict
 *   explanation: 'Explication pédagogique affichée après la réponse'
 * }
 *
 * Astuce pédagogie : les ratios fake/vrai varient d'un niveau à l'autre pour
 * éviter le réflexe "tout est faux". Certains niveaux contiennent plus de
 * vraies infos que de fausses.
 */

const LEVELS = [
  /* ════════════════════════════════════════════════════════════════════
     AFFAIRE 1 — LE DAUPHIN DE LA SEINE   (Débutant · 3 fake / 1 vrai)
     ════════════════════════════════════════════════════════════════════ */
  {
    id: 'dauphin',
    number: 1,
    emoji: '🐬',
    title: 'Le Dauphin de la Seine',
    difficulty: 1,
    theme: 'Une créature géante dans le fleuve ?',
    mission:
      'Une rumeur enflamme les réseaux : « Un dauphin géant de 8 mètres a été ' +
      'découvert dans la Seine à Paris ! » Consulte chaque source, repère les ' +
      'indices et décide à chaque fois : vraie info ou fake news ?',
    sources: [
      {
        platform: 'website',
        isFake: true,
        shortLabel: 'Site d\'info',
        data: {
          url: 'infoschoc24.fr',
          siteName: 'INFOS CHOC 24',
          publishedAt: 'Publié il y a 2 h · Rédaction anonyme',
          headline: 'EXCLUSIF : Un DAUPHIN GÉANT de 8 mètres terrorise Paris !',
          body:
            'Des témoins auraient aperçu hier soir un cétacé de taille monstrueuse ' +
            'dans la Seine. Les autorités restent silencieuses… Pourquoi ? ' +
            'Partagez AVANT QUE ÇA SOIT CENSURÉ !!!',
          imageCaption: '📸 Photo floue — source inconnue',
          shareInfo: '🔥 845 000 partages · Aucune source citée'
        },
        clues: [
          { text: 'Majuscules et !!! pour créer la panique', suspicious: true },
          { text: '« Partagez avant censure » — appel au complot', suspicious: true },
          { text: 'Aucun journaliste identifié', suspicious: true },
          { text: 'Photo floue non vérifiable', suspicious: true },
          { text: 'Aucune source officielle citée', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Ce site utilise des techniques classiques : ' +
          'majuscules pour créer la panique, appel au complot (« censure »), photo ' +
          'floue impossible à vérifier, aucun journaliste nommé et aucune source ' +
          'officielle. Le nom du site « infoschoc » doit déjà alerter !'
      },
      {
        platform: 'tiktok',
        isFake: true,
        shortLabel: '@misterzozo77',
        data: {
          handle: '@misterzozo77',
          displayName: 'Mister Zozo 🐬',
          followers: '2,3 M',
          videoCaption: 'Ombre sombre dans l\'eau, filmée de nuit · qualité très basse',
          caption: 'J\'ai VU le dauphin de mes propres yeux !!! 🐬🐬🐬 #seine #ovni #réel',
          sound: '🎵 son original - misterzozo77',
          likes: '4,2 M',
          comments: '89 000',
          shares: '1,1 M'
        },
        clues: [
          { text: 'Vidéo floue filmée de nuit — rien n\'est identifiable', suspicious: true },
          { text: '« Je vous jure » n\'est pas une preuve', suspicious: true },
          { text: 'Beaucoup de likes ≠ information vraie', suspicious: true },
          { text: 'Aucun expert ou scientifique consulté', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Une vidéo floue de nuit ne prouve rien. ' +
          '« Je vous jure » n\'est pas une source fiable. Le nombre de likes ne rend ' +
          'pas une info vraie — n\'importe qui peut filmer une ombre et raconter ce ' +
          'qu\'il veut. Il faut des preuves vérifiables par des experts.'
      },
      {
        platform: 'newspaper',
        isFake: false,
        shortLabel: 'Le Monde',
        data: {
          name: 'Le Monde',
          section: 'Sciences',
          publishedAt: 'Publié aujourd\'hui à 14 h 30',
          headline: 'Un grand dauphin commun observé dans la Seine près de Paris',
          byline: 'Par Sophie Marchand, journaliste scientifique',
          body:
            'Un dauphin commun adulte (environ 2 mètres) a été observé ce matin près ' +
            'de Conflans-Sainte-Honorine. L\'Office Français de la Biodiversité (OFB) a ' +
            'confirmé l\'information et dépêché une équipe sur place. Ces intrusions ' +
            'restent rares mais connues, selon le Dr Arnaud Binet, cétologue à ' +
            'l\'Université de Brest.',
          imageCaption: '📷 Photo officielle OFB — dauphin mesurant ~2 m',
          sourceNote: '✔️ Source OFB confirmée · ✔️ Expert cité avec son titre'
        },
        clues: [
          { text: 'Journaliste identifiée avec son domaine', suspicious: false },
          { text: 'Source officielle (OFB) confirmée', suspicious: false },
          { text: 'Expert scientifique cité avec son titre', suspicious: false },
          { text: 'Taille réelle précisée : 2 m (pas 8 m)', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! On connaît le nom de la journaliste, une source ' +
          'officielle (l\'OFB) confirme l\'info, un expert est cité avec son titre ' +
          'universitaire. La taille indiquée (2 m) est réaliste. L\'info est ' +
          'vérifiable et s\'appuie sur des faits.'
      },
      {
        platform: 'whatsapp',
        isFake: true,
        shortLabel: 'Groupe famille',
        data: {
          groupName: 'Famille Durand 🏠',
          sender: 'Tante Michèle',
          forwardedCount: '1 248',
          time: '21:47',
          message:
            '⚠️ URGENT ! Mon ami docteur (il ne veut pas être nommé) confirme que le ' +
            'dauphin fait 9 mètres. Les autorités veulent éviter la panique. NE BUVEZ ' +
            'PAS L\'EAU DU ROBINET pendant 48 h. Transmettez ce message à tous vos ' +
            'contacts !'
        },
        clues: [
          { text: 'Source anonyme — « un ami qui ne veut pas être nommé »', suspicious: true },
          { text: '« Transmettez à tous » — appel à la viralité', suspicious: true },
          { text: 'Théorie du complot sur les autorités', suspicious: true },
          { text: 'Conseil de santé sans aucune preuve', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Ce message cumule tous les signaux d\'alerte : source ' +
          'anonyme, appel urgent à retransférer, théorie du complot sur les autorités, ' +
          'et un conseil alarmiste sans preuve. Un vrai médecin ne diffuse jamais des ' +
          'conseils non vérifiés via WhatsApp !'
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════
     AFFAIRE 2 — L'ALIMENT MIRACLE   (Facile · 2 fake / 2 vrai)
     ════════════════════════════════════════════════════════════════════ */
  {
    id: 'alimentation',
    number: 2,
    emoji: '🥦',
    title: 'L\'Aliment Miracle',
    difficulty: 2,
    theme: 'Bien manger : info fiable ou intox ?',
    mission:
      'Sur les réseaux, on parle beaucoup d\'alimentation : aliments « miracles », ' +
      'jus « détox », aliments soi-disant « dangereux »… Mais lesquelles de ces infos ' +
      'sont fiables ? Attention : ici, il y a autant de vraies infos que de fausses. ' +
      'Ne tombe pas dans le piège du « tout est faux » !',
    sources: [
      {
        platform: 'tiktok',
        isFake: true,
        shortLabel: '@miss.detox',
        data: {
          handle: '@miss.detox',
          displayName: 'Miss Détox ✨',
          followers: '780 k',
          videoCaption: 'Une influenceuse prépare un jus vert et pose à côté d\'une balance',
          caption:
            'Buvez CE jus détox chaque matin et éliminez TOUTES vos toxines ! -5 kg en ' +
            '1 semaine SANS effort 🥤🔥 Lien de ma boutique en bio ! #detox #mincir',
          sound: '🎵 musique motivante',
          likes: '610 k',
          comments: '23 000',
          shares: '88 000'
        },
        clues: [
          { text: '« Éliminer toutes les toxines » : le corps le fait déjà (foie, reins)', suspicious: true },
          { text: '« -5 kg en 1 semaine sans effort » — promesse irréaliste', suspicious: true },
          { text: 'Vend un produit (« lien boutique en bio »)', suspicious: true },
          { text: 'Aucun diététicien ni étude scientifique cité', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Le mot « détox » est surtout un argument marketing : ' +
          'le corps élimine déjà naturellement ses déchets grâce au foie et aux reins. ' +
          'Perdre « 5 kg en une semaine sans effort » est irréaliste, et le vrai but est ' +
          'de te vendre un produit. Une info nutrition fiable vient d\'un diététicien ou ' +
          'd\'une source officielle, pas d\'une boutique en ligne.'
      },
      {
        platform: 'twitter',
        isFake: false,
        shortLabel: '@MangerBouger',
        data: {
          handle: '@MangerBouger',
          displayName: 'Manger Bouger (Santé publique France)',
          verified: true,
          time: '9:30 · Aujourd\'hui',
          text:
            'Rappel 🍎🥕 Pas besoin d\'aliment « miracle » : l\'équilibre vient de la ' +
            'variété. Visez au moins 5 fruits et légumes par jour, limitez le sucre et ' +
            'bougez un peu chaque jour. Conseils officiels : mangerbouger.fr',
          comments: '420',
          retweets: '3 100',
          likes: '12 800',
          views: '1,4 M'
        },
        clues: [
          { text: 'Compte officiel et certifié de Santé publique France', suspicious: false },
          { text: 'Conseils mesurés, sans promesse miracle', suspicious: false },
          { text: 'Renvoie vers le site officiel mangerbouger.fr', suspicious: false },
          { text: 'Met en avant la variété, pas un produit à vendre', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! « Manger Bouger » est le programme officiel de Santé ' +
          'publique France. Le message est prudent, ne vend rien et renvoie vers un site ' +
          'officiel. La nutrition fiable parle d\'équilibre et de variété, jamais ' +
          'd\'aliment « magique ».'
      },
      {
        platform: 'newspaper',
        isFake: false,
        shortLabel: '60 Millions',
        data: {
          name: '60 Millions de consommateurs',
          section: 'Alimentation',
          publishedAt: 'Publié cette semaine',
          headline: 'Aliments ultra-transformés : pourquoi mieux vaut en limiter la consommation',
          byline: 'Par la rédaction, avec des nutritionnistes',
          body:
            'Plusieurs études convergent : manger beaucoup d\'aliments ultra-transformés ' +
            '(plats préparés, sodas, biscuits industriels) est associé à des risques pour ' +
            'la santé. Les experts recommandent d\'en réduire la part, sans diaboliser un ' +
            'aliment en particulier. Cuisiner des produits bruts reste un bon réflexe.',
          imageCaption: '📷 Comparaison d\'étiquettes de produits alimentaires',
          sourceNote: '✔️ Magazine de consommateurs · ✔️ Nutritionnistes cités'
        },
        clues: [
          { text: 'Magazine de consommateurs reconnu et indépendant', suspicious: false },
          { text: 'S\'appuie sur plusieurs études qui concordent', suspicious: false },
          { text: 'Reste nuancé : « sans diaboliser un aliment »', suspicious: false },
          { text: 'Donne un conseil concret et raisonnable', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! Un magazine reconnu s\'appuie sur plusieurs études qui ' +
          'vont dans le même sens et reste nuancé : il conseille de limiter, sans affoler ' +
          'ni interdire. Cette prudence (« sans diaboliser ») est la marque d\'une ' +
          'information sérieuse.'
      },
      {
        platform: 'facebook',
        isFake: true,
        shortLabel: 'Page virale',
        data: {
          pageName: 'Santé Naturelle & Vérité 🌿',
          time: 'il y a 3 h',
          text:
            '⚠️ ATTENTION ! Le four à micro-ondes DÉTRUIT 100% des nutriments et rend ' +
            'votre nourriture CANCÉRIGÈNE ! L\'industrie vous le cache. Jetez-le ' +
            'aujourd\'hui et PARTAGEZ pour sauver vos proches !! 😱',
          imageCaption: '🖼️ Image d\'un micro-ondes barré d\'une grosse croix rouge',
          likes: '15 000',
          comments: '3 200',
          shares: '47 000'
        },
        clues: [
          { text: '« Détruit 100% des nutriments » — faux et exagéré', suspicious: true },
          { text: '« Rend la nourriture cancérigène » — affirmation sans preuve', suspicious: true },
          { text: '« L\'industrie vous le cache » — théorie du complot', suspicious: true },
          { text: '« Partagez pour sauver vos proches » — chantage émotionnel', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Le micro-ondes chauffe les aliments, il ne les rend pas ' +
          '« cancérigènes » et ne détruit pas tous les nutriments (toute cuisson en ' +
          'modifie un peu, même la casserole). Le combo « l\'industrie vous le cache » + ' +
          '« partagez pour sauver vos proches » est typique de l\'intox. Les agences ' +
          'sanitaires confirment que le micro-ondes est sûr.'
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════
     AFFAIRE 3 — ÉLAN DE SOLIDARITÉ   (Moyen · 4 fake / 1 vrai)
     ════════════════════════════════════════════════════════════════════ */
  {
    id: 'solidarite',
    number: 3,
    emoji: '🤝',
    title: 'Élan de Solidarité',
    difficulty: 3,
    theme: 'Vivre ensemble : la force de l\'entraide',
    mission:
      'Après de fortes inondations, un magnifique élan de solidarité se met en place ' +
      'pour aider les habitants touchés. Mais des arnaqueurs profitent de la générosité ' +
      'de tous pour piéger les gens. Protège l\'entraide : repère les fausses ' +
      'sollicitations et retrouve le seul appel vraiment fiable.',
    sources: [
      {
        platform: 'facebook',
        isFake: true,
        shortLabel: 'Fausse cagnotte',
        data: {
          pageName: 'Solidarité Inondations 💔',
          time: 'il y a 1 h',
          text:
            '😢 La petite Léna a TOUT perdu dans les inondations ! Aidez-la : envoyez ' +
            'votre don directement sur notre compte personnel (RIB en message privé). ' +
            'Chaque minute compte, ne réfléchissez pas, DONNEZ MAINTENANT !',
          imageCaption: '🖼️ Photo d\'une maison inondée (déjà vue ailleurs sur le web)',
          likes: '6 300',
          comments: '410',
          shares: '12 000'
        },
        clues: [
          { text: 'Demande d\'envoyer l\'argent sur un « compte personnel »', suspicious: true },
          { text: 'Aucune association identifiée, aucune transparence', suspicious: true },
          { text: 'Histoire très émouvante pour court-circuiter la réflexion', suspicious: true },
          { text: '« Ne réfléchissez pas, donnez maintenant » — fausse urgence', suspicious: true }
        ],
        explanation:
          'C\'est une fake news (et une arnaque) ! La vraie générosité mérite mieux : ici, ' +
          'on te pousse à virer de l\'argent sur un compte personnel, sans association ' +
          'identifiée ni transparence, en jouant sur l\'émotion et l\'urgence. Pour aider ' +
          'vraiment, on passe par un organisme connu qui rend des comptes.'
      },
      {
        platform: 'whatsapp',
        isFake: true,
        shortLabel: 'Chaîne virale',
        data: {
          groupName: 'On s\'entraide 💛',
          sender: 'Numéro inconnu',
          forwardedCount: '8 700',
          time: '19:48',
          message:
            'Pour CHAQUE partage de ce message, un repas chaud sera offert aux sinistrés ' +
            '🙏 Transférez à 10 personnes minimum ! Ceux qui ignorent ce message n\'ont ' +
            'pas de cœur… 💔'
        },
        clues: [
          { text: 'Partager un message ne donne aucun repas à personne', suspicious: true },
          { text: 'Aucune organisation derrière la promesse', suspicious: true },
          { text: '« Pas de cœur » — chantage affectif pour culpabiliser', suspicious: true },
          { text: 'Chaîne à transférer « à 10 personnes » = viralité', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Un simple partage ne se transforme jamais en repas ou ' +
          'en don : aucune organisation n\'est derrière. Ces chaînes utilisent la ' +
          'culpabilité (« pas de cœur ») pour se propager. Aider, ce n\'est pas cliquer ' +
          'sur « transférer » : c\'est passer par une vraie action solidaire.'
      },
      {
        platform: 'instagram',
        isFake: true,
        shortLabel: 'Fausse asso',
        data: {
          handle: '@coeurs.solidaires.dons',
          displayName: 'Cœurs Solidaires',
          verified: false,
          imageCaption: '🖼️ Gros plan sur une liasse de billets',
          caption:
            'On récolte des ESPÈCES pour les sinistrés 💸 Donnez en main propre à nos ' +
            'bénévoles en gilet jaune dans la rue. On ne donne pas de reçu, on va vite, ' +
            'faites confiance !',
          likes: '2 800',
          comments: '160',
          time: 'il y a 5 h'
        },
        clues: [
          { text: 'Association non identifiée (ni numéro, ni site officiel)', suspicious: true },
          { text: 'Collecte d\'espèces en main propre, sans reçu', suspicious: true },
          { text: '« Faites confiance » à la place de toute preuve', suspicious: true },
          { text: 'Profite de l\'urgence pour éviter les vérifications', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Une vraie association est déclarée, possède un site ' +
          'officiel et remet un reçu pour tes dons. Demander des espèces en main propre, ' +
          'sans reçu et « vite », est un signal d\'alarme. La solidarité est précieuse : ' +
          'ne la confie qu\'à des structures identifiables et transparentes.'
      },
      {
        platform: 'website',
        isFake: true,
        shortLabel: 'Site clone',
        data: {
          url: 'croix-rouge-dons-urgence.net',
          siteName: 'CROIX-ROUGE — DONS URGENCE',
          publishedAt: 'Publié il y a 2 h · Site non officiel',
          headline: 'Don d\'urgence inondations : aidez en 1 minute',
          body:
            'Pour faire un don « sécurisé », saisissez tout de suite votre numéro de ' +
            'carte bancaire, sa date, le code à 3 chiffres ET votre mot de passe ' +
            'bancaire. Dépêchez-vous, l\'opération expire dans 10 minutes !',
          imageCaption: '📸 Logo imité d\'une grande association',
          shareInfo: '⚠️ Adresse qui imite le vrai site · Demande des codes secrets'
        },
        clues: [
          { text: 'Adresse qui imite la vraie (…-dons-urgence.net)', suspicious: true },
          { text: 'Demande le mot de passe bancaire : jamais légitime', suspicious: true },
          { text: 'Minuteur « expire dans 10 minutes » — pression', suspicious: true },
          { text: 'Logo copié pour paraître officiel', suspicious: true }
        ],
        explanation:
          'C\'est une fake news (et de l\'hameçonnage) ! C\'est un site « clone » qui imite ' +
          'une vraie association pour voler tes données bancaires. Aucun site sérieux ne ' +
          'demande ton mot de passe bancaire ni ne te met un minuteur. Pour donner, va ' +
          'toi-même sur le site officiel exact de l\'association.'
      },
      {
        platform: 'twitter',
        isFake: false,
        shortLabel: '@CroixRouge',
        data: {
          handle: '@CroixRouge',
          displayName: 'Croix-Rouge française',
          verified: true,
          time: '10:20 · Aujourd\'hui',
          text:
            '🔴 Inondations : nos équipes sont sur le terrain. Pour aider, deux moyens ' +
            'sûrs : faire un don sur notre site officiel croix-rouge.fr, ou devenir ' +
            'bénévole près de chez vous. Merci pour votre solidarité 🤝',
          comments: '540',
          retweets: '4 800',
          likes: '19 000',
          views: '2,3 M'
        },
        clues: [
          { text: 'Compte officiel et certifié d\'une association reconnue', suspicious: false },
          { text: 'Renvoie vers le site officiel exact (croix-rouge.fr)', suspicious: false },
          { text: 'Propose des moyens concrets : don sécurisé, bénévolat', suspicious: false },
          { text: 'Ton mesuré, remercie sans culpabiliser ni presser', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! C\'est le compte officiel et certifié d\'une grande ' +
          'association. Elle propose des moyens d\'aider clairs et sûrs (don sur le site ' +
          'officiel, bénévolat) sans pression ni culpabilité. C\'est ça, la vraie force ' +
          'de l\'entraide : une solidarité organisée, transparente et vérifiable, où ' +
          'chacun peut agir en confiance.'
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════
     AFFAIRE 4 — LE REMÈDE MIRACLE   (Difficile · 4 vrai / 1 fake)
     ════════════════════════════════════════════════════════════════════ */
  {
    id: 'sante',
    number: 4,
    emoji: '🧪',
    title: 'Le Remède Miracle',
    difficulty: 4,
    theme: 'Santé : démêler la science des arnaques',
    mission:
      'Un « remède miracle » contre tous les rhumes circule. Mais la santé est un ' +
      'domaine sérieux ! Ici, la majorité des sources sont fiables : ton défi est de ' +
      'repérer les rares intox sans accuser à tort les vraies infos scientifiques.',
    sources: [
      {
        platform: 'tiktok',
        isFake: false,
        shortLabel: '@dr.lina.sante',
        data: {
          handle: '@dr.lina.sante',
          displayName: 'Dr Lina · Médecin ✔ (compte certifié)',
          followers: '540 k',
          videoCaption: 'Une médecin en blouse explique calmement, ses sources affichées à l\'écran',
          caption:
            'Non, aucun aliment ne « soigne » le rhume 🙂 Le mieux : repos, hydratation ' +
            'et se laver les mains. Les antibiotiques sont inutiles contre un virus. ' +
            'Sources officielles en commentaire (ameli.fr). #santé #médecine',
          sound: '🎵 son original',
          likes: '210 k',
          comments: '6 800',
          shares: '34 000'
        },
        clues: [
          { text: 'Compte certifié d\'une professionnelle de santé', suspicious: false },
          { text: 'Aucune promesse miracle, conseils prudents', suspicious: false },
          { text: 'Cite ses sources officielles (ameli.fr)', suspicious: false },
          { text: 'Explique simplement, sans chercher à faire peur', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! Même sur TikTok, une information peut être fiable : ' +
          'ici, c\'est une médecin sur un compte certifié, qui ne promet aucun miracle, ' +
          'donne des conseils prudents et cite ses sources officielles. La plateforme ne ' +
          'fait pas la fiabilité : ce sont la source, les preuves et le ton mesuré qui ' +
          'comptent.'
      },
      {
        platform: 'website',
        isFake: false,
        shortLabel: 'Ameli.fr',
        data: {
          url: 'ameli.fr',
          siteName: 'ameli.fr — Assurance Maladie',
          publishedAt: 'Page mise à jour le mois dernier · Source officielle',
          headline: 'Rhume : que faire et quand consulter ?',
          body:
            'Le rhume est une infection virale bénigne qui guérit seule en une semaine. ' +
            'Reposez-vous, buvez de l\'eau et lavez-vous le nez. Les antibiotiques sont ' +
            'inutiles contre un virus. Consultez si la fièvre dure plus de 3 jours. ' +
            'Contenu validé par des professionnels de santé.',
          imageCaption: '🏥 Site officiel de l\'Assurance Maladie',
          shareInfo: '✔️ Source institutionnelle · ✔️ Contenu validé médicalement'
        },
        clues: [
          { text: 'Site officiel de l\'Assurance Maladie (ameli.fr)', suspicious: false },
          { text: 'Conseils prudents, validés par des professionnels', suspicious: false },
          { text: 'Pas de promesse miracle, juste des faits', suspicious: false },
          { text: 'Indique quand consulter un médecin', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! ameli.fr est le site officiel de l\'Assurance ' +
          'Maladie. Le contenu est validé par des professionnels de santé, prudent et ' +
          'sans promesse exagérée. Pour la santé, les sources institutionnelles ' +
          '(ameli, l\'OMS, ton médecin) sont les plus fiables.'
      },
      {
        platform: 'newspaper',
        isFake: false,
        shortLabel: 'Sciences & Avenir',
        data: {
          name: 'Sciences et Avenir',
          section: 'Santé',
          publishedAt: 'Publié hier',
          headline: 'Pourquoi attrape-t-on plus de rhumes en hiver ? Une étude apporte des réponses',
          byline: 'Par Camille Roux, rédactrice scientifique',
          body:
            'Une étude publiée dans une revue scientifique à comité de lecture montre ' +
            'que le froid réduit en partie les défenses du nez. Les chercheurs précisent ' +
            'que d\'autres facteurs jouent aussi (on reste plus à l\'intérieur). ' +
            'L\'étude reste à confirmer par d\'autres travaux.',
          imageCaption: '🔬 Illustration : cellules du nez au microscope',
          sourceNote: '✔️ Étude à comité de lecture · ✔️ Nuances précisées'
        },
        clues: [
          { text: 'Magazine scientifique sérieux, autrice identifiée', suspicious: false },
          { text: 'S\'appuie sur une étude à comité de lecture', suspicious: false },
          { text: 'Reste prudent : « à confirmer par d\'autres travaux »', suspicious: false },
          { text: 'Explique les nuances au lieu de tout simplifier', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! Un magazine scientifique reconnu cite une étude ' +
          '« à comité de lecture » (vérifiée par d\'autres scientifiques) et reste ' +
          'prudent : il précise que c\'est « à confirmer ». Cette honnêteté sur les ' +
          'limites est justement la marque d\'une information scientifique sérieuse.'
      },
      {
        platform: 'facebook',
        isFake: true,
        shortLabel: 'Témoignage pub',
        data: {
          pageName: 'Bien-Être & Nature Pure ✨',
          time: 'sponsorisé · il y a 5 h',
          text:
            'Marie, 52 ans : « J\'ai arrêté TOUS mes médicaments grâce à ces gélules ' +
            'naturelles ! Mon médecin n\'en revient pas 😍 » 👉 -70% aujourd\'hui ' +
            'seulement, cliquez vite, stock limité !',
          imageCaption: '🖼️ Flacon doré + « 100% NATUREL » + avant/après',
          likes: '8 700',
          comments: '430',
          shares: '2 100'
        },
        clues: [
          { text: 'Publicité déguisée en témoignage', suspicious: true },
          { text: '« Arrêté tous mes médicaments » = conseil dangereux', suspicious: true },
          { text: '« -70% aujourd\'hui, stock limité » = pression à l\'achat', suspicious: true },
          { text: '« Naturel » ne veut pas dire « efficace » ni « sans risque »', suspicious: true }
        ],
        explanation:
          'C\'est une fake news (et une arnaque) ! C\'est une publicité déguisée en ' +
          'témoignage. Pousser à arrêter ses médicaments est dangereux. La pression ' +
          '(« -70% aujourd\'hui, stock limité ») sert à te faire acheter sans réfléchir. ' +
          '« Naturel » ne signifie ni efficace ni sans danger. On ne se soigne pas avec ' +
          'une pub.'
      },
      {
        platform: 'twitter',
        isFake: false,
        shortLabel: '@OMS',
        data: {
          handle: '@OMS',
          displayName: 'Organisation mondiale de la Santé',
          verified: true,
          time: '10:30 · il y a 2 jours',
          text:
            'Rappel : les antibiotiques ne soignent PAS les infections virales comme le ' +
            'rhume ou la grippe. Les utiliser sans raison favorise l\'antibiorésistance. ' +
            'En savoir plus sur notre site officiel. 🧵',
          comments: '900',
          retweets: '15 000',
          likes: '47 000',
          views: '6,2 M'
        },
        clues: [
          { text: 'Compte officiel et certifié de l\'OMS', suspicious: false },
          { text: 'Information médicale exacte et reconnue', suspicious: false },
          { text: 'Explique le « pourquoi » (antibiorésistance)', suspicious: false },
          { text: 'Renvoie vers une source officielle détaillée', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! C\'est le compte certifié de l\'Organisation mondiale ' +
          'de la Santé, une référence internationale. Le message est exact, explique ' +
          'la raison scientifique et renvoie vers plus de détails. Sur la santé, l\'OMS ' +
          'est une source de confiance.'
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════
     AFFAIRE 5 — OBJECTIF LUNE   (Expert · 4 fake / 2 vrai)
     ════════════════════════════════════════════════════════════════════ */
  {
    id: 'espace',
    number: 5,
    emoji: '🚀',
    title: 'Objectif Lune',
    difficulty: 5,
    theme: 'Espace, science et théories du complot',
    mission:
      'Une mission spatiale fait l\'actualité, et avec elle son lot de complots : ' +
      'photos truquées, fausses « preuves », deepfakes… Niveau expert : sépare la ' +
      'science vérifiée de la désinformation la plus sournoise.',
    sources: [
      {
        platform: 'youtube',
        isFake: true,
        shortLabel: 'Complot lunaire',
        data: {
          channel: 'VÉRITÉ CACHÉE 🌍',
          subscribers: '1,2 M abonnés',
          title: 'La PREUVE que la mission lunaire est TRUQUÉE (ils nous mentent depuis 50 ans)',
          views: '4,5 M vues',
          uploadedAt: 'il y a 3 jours',
          thumbnailCaption: '🎬 Photo entourée de cercles rouges + « FAKE ! »',
          description:
            'Regardez cette ombre « impossible » sur la photo : selon nous, c\'est la ' +
            'preuve d\'un studio. (Les scientifiques expliquent pourtant ces ombres par ' +
            'le relief du sol, mais on ne va pas vous embêter avec ça.)'
        },
        clues: [
          { text: '« La PREUVE que c\'est truqué » — affirmation sensationnaliste', suspicious: true },
          { text: 'Ignore volontairement l\'explication scientifique connue', suspicious: true },
          { text: 'Cercles rouges et « FAKE ! » pour impressionner', suspicious: true },
          { text: 'Joue sur la méfiance (« ils nous mentent »)', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Cette vidéo présente des détails déjà expliqués par ' +
          'la science (les ombres viennent du relief) comme des « preuves » de complot, ' +
          'tout en écartant l\'explication réelle. Sélectionner ce qui arrange et ' +
          'ignorer le reste, c\'est de la désinformation.'
      },
      {
        platform: 'newspaper',
        isFake: false,
        shortLabel: 'CNRS Le Journal',
        data: {
          name: 'CNRS Le Journal',
          section: 'Espace',
          publishedAt: 'Publié ce matin',
          headline: 'Mission lunaire : ce que les nouvelles données vont permettre d\'étudier',
          byline: 'Par Julien Faure, avec l\'équipe scientifique de la mission',
          body:
            'Les instruments embarqués vont mesurer la composition du sol lunaire. ' +
            'Les données seront rendues publiques et accessibles aux chercheurs du ' +
            'monde entier pour être vérifiées. « La transparence des données est ' +
            'essentielle », souligne la responsable scientifique.',
          imageCaption: '🛰️ Schéma annoté des instruments de la sonde',
          sourceNote: '✔️ Organisme de recherche public · ✔️ Données vérifiables'
        },
        clues: [
          { text: 'Publié par un organisme de recherche public (CNRS)', suspicious: false },
          { text: 'Données « rendues publiques » et vérifiables par tous', suspicious: false },
          { text: 'Cite la responsable scientifique de la mission', suspicious: false },
          { text: 'Met en avant la transparence, pas le secret', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! Elle vient d\'un organisme de recherche public, cite ' +
          'des responsables identifiés et insiste sur un point clé de la science : les ' +
          'données sont rendues publiques pour que d\'autres puissent les vérifier. La ' +
          'science avance par la transparence, l\'inverse du secret.'
      },
      {
        platform: 'tiktok',
        isFake: true,
        shortLabel: 'Deepfake',
        data: {
          handle: '@space.leaks',
          displayName: 'Space Leaks 👽',
          followers: '510 k',
          videoCaption: 'Une « astronaute » avoue face caméra — image au rendu étrange',
          caption:
            'FUITE 🔴 Une astronaute AVOUE que tout est faux ! Partagez avant ' +
            'suppression !! #espace #complot #leak',
          sound: '🎵 son original',
          likes: '1,3 M',
          comments: '76 000',
          shares: '410 000'
        },
        clues: [
          { text: 'Visage au rendu étrange : possible deepfake (IA)', suspicious: true },
          { text: '« Aveu » spectaculaire sans aucun contexte', suspicious: true },
          { text: '« Partagez avant suppression » — urgence + complot', suspicious: true },
          { text: 'Aucune source, aucun nom, aucune date vérifiable', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Une vidéo où le visage semble « bizarre » peut être un ' +
          'deepfake (vidéo truquée par IA). Un « aveu » sans contexte, sans nom et avec ' +
          '« partagez avant suppression », c\'est le scénario type de l\'intox. ' +
          'Aujourd\'hui, l\'image et la voix peuvent être fabriquées : doute toujours.'
      },
      {
        platform: 'twitter',
        isFake: false,
        shortLabel: '@CNES',
        data: {
          handle: '@CNES',
          displayName: 'CNES (Agence spatiale française)',
          verified: true,
          time: '9:15 · aujourd\'hui',
          text:
            '🛰️ La sonde a transmis ses premières images ! Elles sont en libre accès ' +
            'sur notre site et déjà analysées par plusieurs laboratoires partenaires. ' +
            'Fil d\'explications par notre équipe juste en dessous 👇',
          comments: '2 100',
          retweets: '11 000',
          likes: '58 000',
          views: '4,8 M'
        },
        clues: [
          { text: 'Compte officiel certifié de l\'agence spatiale', suspicious: false },
          { text: 'Images « en libre accès » et donc vérifiables', suspicious: false },
          { text: 'Analysées par plusieurs laboratoires indépendants', suspicious: false },
          { text: 'Propose un fil d\'explications détaillé', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! Le compte officiel et certifié de l\'agence spatiale ' +
          'publie des images en libre accès, vérifiées par plusieurs laboratoires. ' +
          'Quand plusieurs sources indépendantes peuvent contrôler une information, ' +
          'sa fiabilité est bien plus grande.'
      },
      {
        platform: 'website',
        isFake: true,
        shortLabel: 'Faux « média »',
        data: {
          url: 'la-verite-libre.net',
          siteName: 'LA VÉRITÉ LIBRE — Le média qu\'on censure',
          publishedAt: 'Publié il y a 1 h · « Un lanceur d\'alerte »',
          headline: 'SCANDALE : un ingénieur révèle que les photos de l\'espace sont générées par ordinateur',
          body:
            'Un ingénieur anonyme nous a confié que TOUTES les images seraient des ' +
            'images de synthèse. Aucune agence ne confirme, aucun document n\'est ' +
            'fourni, mais « nous savons que c\'est vrai ». Faites vos propres recherches !',
          imageCaption: '📸 Capture d\'écran d\'un logiciel 3D sans rapport',
          shareInfo: '⚠️ Site militant · Source unique et anonyme'
        },
        clues: [
          { text: '« Le média qu\'on censure » se pose en victime', suspicious: true },
          { text: 'Source unique, anonyme, aucun document', suspicious: true },
          { text: '« Nous savons que c\'est vrai » = croyance, pas preuve', suspicious: true },
          { text: '« Faites vos propres recherches » détourne du fait-checking sérieux', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Se présenter comme « le média censuré » est une ' +
          'posture pour paraître crédible. Une seule source anonyme, sans aucun ' +
          'document, ne prouve rien. « Nous savons que c\'est vrai » relève de la ' +
          'croyance. Et « faites vos recherches » sert souvent à t\'envoyer vers ' +
          'd\'autres sites complotistes, pas vers des faits vérifiés.'
      },
      {
        platform: 'whatsapp',
        isFake: true,
        shortLabel: 'Audio viral',
        data: {
          groupName: 'Les curieux du cosmos 🔭',
          sender: 'Numéro inconnu',
          forwardedCount: '3 902',
          time: '00:12',
          message:
            '🎙️ Écoutez cet audio d\'un « employé de l\'agence » : il dit que la mission ' +
            'n\'a jamais eu lieu. On ne sait pas qui parle, mais ça a l\'air sérieux. ' +
            'Partagez à un max de gens avant que ça disparaisse !'
        },
        clues: [
          { text: 'Locuteur inconnu : « on ne sait pas qui parle »', suspicious: true },
          { text: 'Un audio peut être imité ou généré par IA', suspicious: true },
          { text: '« Ça a l\'air sérieux » = impression, pas vérification', suspicious: true },
          { text: '« Partagez avant que ça disparaisse » = urgence artificielle', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Un audio dont on « ne sait pas qui parle » n\'a aucune ' +
          'valeur de preuve, surtout qu\'une voix peut être imitée ou générée par IA. ' +
          'Se fier à « ça a l\'air sérieux » est un piège. L\'urgence à partager sert ' +
          'justement à t\'empêcher de vérifier. On ne relaie pas un audio anonyme.'
      }
    ]
  }
];

// Expose les niveaux globalement pour les autres scripts (game.js, platforms.js).
window.LEVELS = LEVELS;
