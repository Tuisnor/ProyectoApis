const express = require('express');
const router = express.Router();
const citaController = require('../controllers/CitaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/citas', authMiddleware, citaController.createCita);

router.get('/citas', authMiddleware, citaController.getCitasByUsuario);

module.exports = router;
