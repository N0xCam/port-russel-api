//* Routes concernant les utilisateurs */
import express from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

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


export default router;