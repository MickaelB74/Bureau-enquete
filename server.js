// Serveur statique minimal — alternative au mode "Static Site" de Render.
// Utile pour le développement local (`npm start`) ou un déploiement en "Web Service".
// Pour un simple site statique, le fichier render.yaml suffit et ce serveur est optionnel.
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000; // Render fournit le port via la variable PORT.

// Sert tous les fichiers du dossier public/ (index.html, css/, js/...).
app.use(express.static(path.join(__dirname, 'public')));

// Repli : toute route inconnue renvoie l'index.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Bureau d'Enquête Numérique en écoute sur le port ${PORT}`);
});
