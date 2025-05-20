//** Modèle Mongoose concernant les catways **//

import mongoose from 'mongoose';

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

const Catway = mongoose.model('Catway', catwaySchema);

export default Catway;
