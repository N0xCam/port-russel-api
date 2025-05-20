//** Contrôleurs liés aux réservations **//

import Reservation from '../models/Reservation.js';

const reservationController = {

  // Créer une nouvelle réservation pour un catway
  createReservation: async (req, res) => {
    try {
      const { clientName, boatName, checkIn, checkOut } = req.body;
      const catwayNumber = parseInt(req.params.id);

      const newReservation = await Reservation.create({
        catwayNumber,
        clientName,
        boatName,
        checkIn,
        checkOut
      });

      res.status(201).json({ message: "Réservation créée", reservation: newReservation });
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  // Obtenir toutes les réservations d’un catway
  getReservationsByCatway: async (req, res) => {
    try {
      const catwayNumber = parseInt(req.params.id);
      const reservations = await Reservation.find({ catwayNumber });

      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  // Obtenir une réservation par son ID
  getReservationById: async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.idReservation);

      if (!reservation) {
        return res.status(404).json({ message: "Réservation non trouvée." });
      }

      res.json(reservation);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  },

  // Supprimer une réservation par son ID
  deleteReservation: async (req, res) => {
    try {
      const deleted = await Reservation.findByIdAndDelete(req.params.idReservation);

      if (!deleted) {
        return res.status(404).json({ message: "Réservation non trouvée." });
      }

      res.json({ message: "Réservation supprimée." });
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  }

};

export default reservationController;
