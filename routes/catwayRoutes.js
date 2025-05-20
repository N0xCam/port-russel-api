//* Routes concernant les catways */
const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const auth = require('../middlewares/auth');
const reservationRoutes = require('./reservationRoutes');

router.get('/', auth, catwayController.getAllCatways); // Voir tous les catways existants
router.get('/:id', auth, catwayController.getCatwayById); // Voir un catway par son ID
router.post('/', auth, catwayController.createCatway); // Créer un nouveau catway
router.put('/:id', auth, catwayController.updateCatway); // Modifier un catway existant
router.delete('/:id', auth, catwayController.deleteCatway); // Supprimer un catway
router.use('/:id/reservations', reservationRoutes); // Accéder aux réservations liées à un catway (routes imbriquées)

module.exports = router;
