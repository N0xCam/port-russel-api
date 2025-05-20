//* Modèle Mongoose concernant les catways */

const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true,
    unique: true // chaque catway doit avoir un numéro distinct
  },
  type: {
    type: String,
    enum: ['short', 'long'],
    required: true // préciser la longueur de chaque catway
  },
  catwayState: {
    type: String,
    required: true // exemple : "bon état", "endommagé"...
  }
});

module.exports = mongoose.model('Catway', catwaySchema);
