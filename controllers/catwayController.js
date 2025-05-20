//** Contrôleurs liés aux catways */

const Catway = require('../models/Catway');


//* Voir tous les catways */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


//* Voir un catway spécifique (par son ID) */
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


//* Créer un nouveau catway */
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, type, catwayState } = req.body;
    const newCatway = await Catway.create({ catwayNumber, type, catwayState });
    res.status(201).json({ message: "Catway créé", catway: newCatway });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


//* Modifier un catway existant */
exports.updateCatway = async (req, res) => {
  try {
    const updated = await Catway.findByIdAndUpdate(
      req.params.id,
      {
        type: req.body.type,
        catwayState: req.body.catwayState
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Catway non trouvé." });
    }

    res.json({ message: "Catway mis à jour", catway: updated });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

//* Supprimer un catway */
exports.deleteCatway = async (req, res) => {
  try {
    const deleted = await Catway.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Catway non trouvé." });
    }
    res.json({ message: "Catway supprimé." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

