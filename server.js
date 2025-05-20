import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import catwayRoutes from './routes/catwayRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';



dotenv.config();
const app = express();
app.use(express.json());

// Connexion à la base MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion MongoDB OK'))
  .catch(err => console.error(err));

// Déclaration des routes
app.use('/api/users', userRoutes);
app.use('/api/catways', catwayRoutes);
app.use(express.static('public'));

// Route de test
app.get('/', (req, res) => res.send('Hello Port Russell !'));

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));

// Export de l'app pour les tests
export default app;
