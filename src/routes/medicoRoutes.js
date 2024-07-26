const express = require('express');
const router = express.Router();
const MedicoController = require('../controllers/MedicoController');

router.get('/especialidad/:id', MedicoController.getMedicosByEspecialidad);

module.exports = router;
