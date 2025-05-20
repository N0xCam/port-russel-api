//* Routes concernant les reservations */
const express = require('express');

// mergeParams permet d'accéder à l'ID du catway paren dans les routes imbriquées 
const router = express.Router({ mergeParams: true });
const reservationController = require('../controllers/reservationController');
const auth = require('../middlewares/auth');

router.get('/', auth, reservationController.getReservationsByCatway); // Voir toutes les réservations liées à un catway
router.get('/:idReservation', auth, reservationController.getReservationById); // Voir une réservations spécifique par son ID
router.post('/', auth, reservationController.createReservation); // Créer une nouvelle réservation pour un catway
router.delete('/:idReservation', auth, reservationController.deleteReservation); // Supprimer une réservation



module.exports = router;
