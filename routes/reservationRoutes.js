const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationController = require('../controllers/reservationController');
const auth = require('../middlewares/auth');

router.get('/', auth, reservationController.getReservationsByCatway);
router.get('/:idReservation', auth, reservationController.getReservationById);
router.post('/', auth, reservationController.createReservation);
router.delete('/:idReservation', auth, reservationController.deleteReservation);



module.exports = router;
