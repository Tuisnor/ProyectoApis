const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/MedicoController');


router.get('/especialidad/:id', medicoController.getMedicosByEspecialidad);

module.exports = router;
