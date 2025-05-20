//* Middleware permettant l'authentification via un token JWT */

const jwt = require('jsonwebtoken');


//* Vérifier le token présent dans le header Authorization */
module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On stocke l'utilisateur déchiffré dans la requête
     next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};