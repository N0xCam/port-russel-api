//* Routes concernant les catways */
import express from 'express';
import catwayController from '../controllers/catwayController.js';
import auth from '../middlewares/auth.js';
import reservationRoutes from './reservationRoutes.js';

const router = express.Router();

router.get('/', auth, catwayController.getAllCatways); // Voir tous les catways existants
router.get('/:id', auth, catwayController.getCatwayById); // Voir un catway par son ID
router.post('/', auth, catwayController.createCatway); // Créer un nouveau catway
router.put('/:id', auth, catwayController.updateCatway); // Modifier un catway existant
router.delete('/:id', auth, catwayController.deleteCatway); // Supprimer un catway
router.use('/:id/reservations', reservationRoutes); // Accéder aux réservations liées à un catway (routes imbriquées)

export default router;
