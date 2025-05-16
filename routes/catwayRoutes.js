const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const auth = require('../middlewares/auth');

router.get('/', auth, catwayController.getAllCatways);
router.get('/:id', auth, catwayController.getCatwayById);
router.post('/', auth, catwayController.createCatway);

module.exports = router;
