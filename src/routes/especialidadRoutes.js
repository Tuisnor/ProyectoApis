const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especialidadController');

router.get('/', especialidadController.getEspecialidades); 
module.exports = router;
