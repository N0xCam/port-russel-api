//** Configuration de base du serveur Express + Connexion MongoDB **/

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import des routes
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();
const app = express();

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion MongoDB OK'))
  .catch(err => console.error(err));

// Déclaration des routes principales de l’API
app.use('/api/users', userRoutes);
app.use('/api/catways', catwayRoutes);

// Importer les fichiers HTML/CSS depuis le dossier public
app.use(express.static('public'));

// Route de test (racine)
app.get('/', (req, res) => res.send('Hello Port Russell !'));

// Lancer le serveur sur le port défini
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Serveur lancé sur http://localhost:${PORT}`));