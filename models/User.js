//* Modèle Mongoose concernant les utilisateurs */

const mongoose = require('mongoose');


//* Modèle permettant de s'identifier par nom, mail et mot de passe chiffré */
const userSchema = new mongoose.Schema({
    name: { type: String, required:true}, // prénom ou nom affiché dans l'app
    email: { type: String, required:true, unique:true}, // un seul compte par adresse mail
    password: { type: String, required: true} // mot de passe crypté avec bcrypt
}, 
    {
        timestamps: true // ajoute createdAt et updatedAt automatiquement
    }
);

module.exports = mongoose.model('User', userSchema);