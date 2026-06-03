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
     AFFAIRE 2 — TEMPÊTE SUR LA VILLE   (Facile · 2 fake / 2 vrai)
     ════════════════════════════════════════════════════════════════════ */
  {
    id: 'tempete',
    number: 2,
    emoji: '🌪️',
    title: 'Tempête sur la Ville',
    difficulty: 2,
    theme: 'Alerte météo : panique ou vraie information ?',
    mission:
      'Une grosse tempête est annoncée. Sur les réseaux, tout le monde partage des ' +
      'alertes… mais lesquelles sont fiables ? Attention : ici, il y a autant de ' +
      'vraies infos que de fausses. Ne tombe pas dans le piège du « tout est faux » !',
    sources: [
      {
        platform: 'twitter',
        isFake: false,
        shortLabel: '@meteofrance',
        data: {
          handle: '@meteofrance',
          displayName: 'Météo-France',
          verified: true,
          time: '8:02 · Aujourd\'hui',
          text:
            '🟠 Vigilance ORANGE vents violents pour 12 départements à partir de 18h. ' +
            'Rafales attendues jusqu\'à 110 km/h sur le littoral. Limitez vos ' +
            'déplacements. Infos officielles : vigilance.meteofrance.fr',
          comments: '1 204',
          retweets: '8 900',
          likes: '23 400',
          views: '3,1 M'
        },
        clues: [
          { text: 'Compte officiel certifié de Météo-France', suspicious: false },
          { text: 'Niveau de vigilance précis (orange) et chiffré', suspicious: false },
          { text: 'Lien vers le site officiel de vigilance', suspicious: false },
          { text: 'Ton mesuré, conseils de prudence concrets', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! Elle vient du compte officiel et certifié de ' +
          'Météo-France, donne un niveau de vigilance précis, des chiffres réalistes ' +
          'et renvoie vers le site officiel. Le ton est calme : on informe, on ne ' +
          'cherche pas à effrayer.'
      },
      {
        platform: 'facebook',
        isFake: true,
        shortLabel: 'Page virale',
        data: {
          pageName: 'Alerte Catastrophes France 🚨',
          time: 'il y a 1 h',
          text:
            '🚨🚨 OURAGAN DE FORCE 5 SUR LA FRANCE CE SOIR ! Des vents de 350 km/h vont ' +
            'TOUT détruire ! Le gouvernement vous CACHE la vérité. PARTAGEZ pour sauver ' +
            'des vies !! 😱',
          imageCaption: '🖼️ Image d\'un ouragan… prise en Floride en 2017 (réutilisée)',
          likes: '42 000',
          comments: '9 100',
          shares: '210 000'
        },
        clues: [
          { text: '350 km/h en France : impossible, irréaliste', suspicious: true },
          { text: 'Photo réutilisée d\'un autre pays et d\'une autre année', suspicious: true },
          { text: '« Le gouvernement vous cache » — complot', suspicious: true },
          { text: '« Partagez pour sauver des vies » — chantage émotionnel', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Les chiffres sont délirants (350 km/h n\'existe pas en ' +
          'France), l\'image est volée à une autre catastrophe, et on retrouve le combo ' +
          'classique : complot + appel à partager dans l\'urgence. Une vraie alerte ' +
          'météo vient de Météo-France, pas d\'une page anonyme.'
      },
      {
        platform: 'newspaper',
        isFake: false,
        shortLabel: 'Ouest-France',
        data: {
          name: 'Ouest-France',
          section: 'Météo · Région',
          publishedAt: 'Mis à jour aujourd\'hui à 12 h 10',
          headline: 'Tempête attendue ce soir : les écoles fermeront plus tôt dans 3 départements',
          byline: 'Par la rédaction régionale, avec AFP',
          body:
            'La préfecture a annoncé la fermeture anticipée des établissements scolaires ' +
            'à 16 h dans trois départements placés en vigilance orange. Les transports ' +
            'scolaires sont suspendus pour la soirée. La mesure est préventive, précise ' +
            'la préfecture.',
          imageCaption: '📷 Communiqué officiel de la préfecture',
          sourceNote: '✔️ Décision préfectorale · ✔️ Source AFP'
        },
        clues: [
          { text: 'Journal régional connu, info reprise de l\'AFP', suspicious: false },
          { text: 'Décision officielle d\'une préfecture', suspicious: false },
          { text: 'Mesure concrète et proportionnée', suspicious: false },
          { text: 'Aucune dramatisation, juste des faits', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! Un journal régional reconnu relaie une décision ' +
          'officielle de la préfecture, confirmée par l\'AFP (une agence de presse). ' +
          'La mesure est concrète et raisonnable. Pas de panique inutile : juste de ' +
          'l\'information de service.'
      },
      {
        platform: 'whatsapp',
        isFake: true,
        shortLabel: 'Message viral',
        data: {
          groupName: 'Voisins du quartier 🏘️',
          sender: 'Numéro inconnu',
          forwardedCount: '5 600',
          time: '13:22',
          message:
            'Un policier ami m\'a prévenu : la tempête va couper l\'électricité pendant ' +
            '2 SEMAINES dans toute la région. Faites des réserves d\'eau et d\'essence ' +
            'MAINTENANT avant la ruée. Ne le dites pas trop fort 🤫 Transférez vite !'
        },
        clues: [
          { text: 'Source vague : « un policier ami »', suspicious: true },
          { text: '2 semaines de coupure : invraisemblable', suspicious: true },
          { text: 'Crée une ruée (eau, essence) = comportement dangereux', suspicious: true },
          { text: '« Ne le dites pas trop fort » + « transférez » = manipulation', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! La source est invérifiable (« un policier ami »), la ' +
          'durée annoncée est absurde, et le message pousse à des achats de panique ' +
          'dangereux. Le « ne le dites pas trop fort » est une astuce pour donner ' +
          'l\'impression d\'une info secrète et précieuse. C\'est manipulateur.'
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════
     AFFAIRE 3 — LA STAR DÉMASQUÉE   (Moyen · 4 fake / 1 vrai)
     ════════════════════════════════════════════════════════════════════ */
  {
    id: 'star',
    number: 3,
    emoji: '🎤',
    title: 'La Star Démasquée',
    difficulty: 3,
    theme: 'Rumeurs autour d\'une célébrité',
    mission:
      'La chanteuse Léa Solène fait le buzz : rumeurs, fausses citations, deepfakes… ' +
      'Tout circule très vite. Sauras-tu retrouver la seule information réellement ' +
      'fiable au milieu des intox ?',
    sources: [
      {
        platform: 'instagram',
        isFake: true,
        shortLabel: 'Faux compte',
        data: {
          handle: '@lea.solene.officiel.real',
          displayName: 'Léa Solène 💎 (FAN compte)',
          verified: false,
          imageCaption: '🖼️ Photo de Léa visiblement retouchée (montage)',
          caption:
            'Léa annonce qu\'elle ARRÊTE la musique pour toujours 😭💔 Likez si vous êtes ' +
            'triste ! (compte non officiel mais infos sûres à 100%)',
          likes: '320 000',
          comments: '54 000',
          time: 'il y a 4 h'
        },
        clues: [
          { text: 'Pseudo douteux avec « real » et « officiel » en trop', suspicious: true },
          { text: 'Pas de badge de certification', suspicious: true },
          { text: '« Compte non officiel mais infos sûres à 100% » = contradiction', suspicious: true },
          { text: 'Photo retouchée / montage', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Un pseudo qui empile « officiel », « real »… est ' +
          'justement le signe d\'un FAUX compte. Aucun badge de certification, et la ' +
          'phrase « non officiel mais sûr à 100% » se contredit elle-même. Les vraies ' +
          'annonces d\'une star passent par son compte certifié.'
      },
      {
        platform: 'youtube',
        isFake: true,
        shortLabel: 'Vidéo « scoop »',
        data: {
          channel: 'BUZZ PEOPLE TV',
          subscribers: '890 k abonnés',
          title: 'Léa Solène AVOUE TOUT en larmes ?! (la vidéo qu\'on veut SUPPRIMER)',
          views: '1,9 M vues',
          uploadedAt: 'il y a 1 jour',
          thumbnailCaption: '🎬 Miniature : visage choqué + flèches rouges + « CHOC »',
          description:
            'Selon nos sources exclusives (qu\'on ne peut pas révéler), Léa aurait tout ' +
            'avoué. La vidéo utilise des extraits sortis de leur contexte et une voix ' +
            'qui ressemble à la sienne…'
        },
        clues: [
          { text: 'Titre racoleur (« CHOC », « qu\'on veut SUPPRIMER »)', suspicious: true },
          { text: 'Miniature exagérée typique des chaînes à clics', suspicious: true },
          { text: '« Sources qu\'on ne peut pas révéler »', suspicious: true },
          { text: 'Extraits sortis de leur contexte, voix imitée', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Titre à clics, miniature exagérée, « sources ' +
          'secrètes » invérifiables et extraits manipulés : tout est conçu pour faire ' +
          'cliquer, pas pour informer. Une voix « qui ressemble » peut être imitée ou ' +
          'générée. Méfie-toi des chaînes qui vivent du buzz.'
      },
      {
        platform: 'twitter',
        isFake: true,
        shortLabel: 'Fausse citation',
        data: {
          handle: '@news_people_fr',
          displayName: 'People News',
          verified: false,
          time: '23:14 · hier',
          text:
            '🚨 CITATION EXCLUSIVE de Léa Solène : « Je déteste mes fans, ils sont ' +
            'pathétiques. » 😱 Le monde de la musique sous le choc. RT pour qu\'elle ' +
            's\'excuse !',
          comments: '12 000',
          retweets: '34 000',
          likes: '21 000',
          views: '5,4 M'
        },
        clues: [
          { text: 'Citation choc sans aucune source ni date d\'interview', suspicious: true },
          { text: 'Compte non certifié au nom générique', suspicious: true },
          { text: '« RT pour qu\'elle s\'excuse » — incite au harcèlement', suspicious: true },
          { text: 'Propos invraisemblables, conçus pour indigner', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Une « citation exclusive » sans interview, sans date, ' +
          'sans média identifié, c\'est presque toujours inventé. Le but est de te ' +
          'faire réagir sous le coup de la colère et de relayer. C\'est une fausse ' +
          'citation, une technique très courante.'
      },
      {
        platform: 'website',
        isFake: true,
        shortLabel: 'Site clone',
        data: {
          url: 'lemondé-people.com',
          siteName: 'LE MONDÉ PEOPLE',
          publishedAt: 'Publié il y a 30 min · Auteur : « La Rédac »',
          headline: 'Léa Solène hospitalisée d\'urgence : son entourage très inquiet',
          body:
            'Selon des informations que nous sommes seuls à détenir, la chanteuse ' +
            'aurait été hospitalisée. Aucun hôpital, aucun proche n\'a confirmé, mais ' +
            'tout le monde en parle. Cliquez pour voir les photos exclusives !',
          imageCaption: '📸 Photo d\'ambulance générique (banque d\'images)',
          shareInfo: '⚠️ Adresse imitant un vrai journal · Aucune confirmation'
        },
        clues: [
          { text: 'Adresse qui imite un vrai média (« lemondé » avec accent)', suspicious: true },
          { text: 'Auteur anonyme (« La Rédac »)', suspicious: true },
          { text: '« Nous sommes seuls à détenir » + aucune confirmation', suspicious: true },
          { text: 'Photo générique sans rapport, appât à clics', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! C\'est un site « clone » : son adresse imite celle ' +
          'd\'un vrai journal pour tromper. Aucune source ne confirme, l\'auteur est ' +
          'anonyme et la photo vient d\'une banque d\'images. Vérifie toujours ' +
          'l\'adresse exacte du site (l\'orthographe du nom de domaine).'
      },
      {
        platform: 'instagram',
        isFake: false,
        shortLabel: 'Compte certifié',
        data: {
          handle: '@leasolene',
          displayName: 'Léa Solène',
          verified: true,
          imageCaption: '🖼️ Photo nette de Léa en studio, postée par elle-même',
          caption:
            'Coucou tout le monde 💙 Je vais très bien ! J\'ignore ces fausses rumeurs. ' +
            'Mon nouvel album sort le 14 juin, je vous prépare une surprise. Prenez ' +
            'soin de vous et vérifiez vos sources 😉',
          likes: '2,4 M',
          comments: '180 000',
          time: 'il y a 1 h'
        },
        clues: [
          { text: 'Compte certifié (badge bleu) de l\'artiste', suspicious: false },
          { text: 'Message direct, calme, qui dément les rumeurs', suspicious: false },
          { text: 'Information concrète et vérifiable (date d\'album)', suspicious: false },
          { text: 'Invite justement à vérifier ses sources', suspicious: false }
        ],
        explanation:
          'C\'est une vraie info ! C\'est le compte officiel et certifié de l\'artiste ' +
          'elle-même. Elle dément calmement, donne une info concrète et vérifiable ' +
          '(la date de son album) et encourage à vérifier les sources. Quand une star ' +
          's\'exprime, fie-toi à son compte certifié, pas aux rumeurs.'
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════
     AFFAIRE 4 — LE REMÈDE MIRACLE   (Difficile · 3 vrai / 2 fake)
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
        isFake: true,
        shortLabel: '@docteur_secret',
        data: {
          handle: '@docteur_secret',
          displayName: 'Le Docteur Que La Médecine Cache 🤫',
          followers: '670 k',
          videoCaption: 'Un homme en blouse blanche mélange du citron et du bicarbonate',
          caption:
            'Buvez CECI chaque matin et vous ne serez PLUS JAMAIS malade ! Les médecins ' +
            'ne veulent pas que vous le sachiez 💊🚫 #santé #remedenaturel',
          sound: '🎵 musique angoissante',
          likes: '980 k',
          comments: '45 000',
          shares: '320 000'
        },
        clues: [
          { text: '« Plus JAMAIS malade » — promesse impossible', suspicious: true },
          { text: '« Les médecins vous cachent ça » — complot', suspicious: true },
          { text: 'Aucun diplôme ni étude scientifique montré', suspicious: true },
          { text: 'Vend une recette miracle universelle', suspicious: true }
        ],
        explanation:
          'C\'est une fake news ! Aucun aliment ne rend « plus jamais malade » : c\'est ' +
          'une promesse impossible. Le « les médecins vous cachent ça » est un ' +
          'classique du complot santé. Une vraie information médicale s\'appuie sur des ' +
          'études, pas sur une recette secrète vendue sur TikTok.'
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
