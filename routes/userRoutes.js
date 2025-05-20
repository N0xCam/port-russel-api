//* Routes concernant les utilisateurs */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Inscription d'un nouvel utilisateur
router.post('/register', userController.register);

// Connexion utilisateur 
router.post('/login', userController.login);

// Voir son propre profil (protégé par token)
router.get('/me', auth, (req, res) => {
  res.json({ message: `Bienvenue, utilisateur ${req.user.id}` });
});

// Modifier un utilisateur existant
router.put('/:id', auth, userController.updateUser);

// Supprimer un utilisateur existant
router.delete('/:id', auth, userController.deleteUser);


module.exports = router;
