//** Modèle Mongoose concernant les réservations **//

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true // identifiant du catway concerné
  },
  clientName: {
    type: String,
    required: true // nom du client qui réserve
  },
  boatName: {
    type: String,
    required: true // nom du bateau réservé
  },
  checkIn: {
    type: Date,
    required: true // date d'arrivée prévue
  },
  checkOut: {
    type: Date,
    required: true // date de départ prévue
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
