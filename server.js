const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🛢️ Connexion MongoDB OK'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Hello Port Russell !'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Serveur lancé sur http://localhost:${PORT}`));