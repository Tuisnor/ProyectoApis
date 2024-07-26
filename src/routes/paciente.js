const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const User = require('../models/User');

// Crear un nuevo paciente
router.post('/crear', async (req, res) => {
  const { id_usuario, fecha_nacimiento, genero, direccion } = req.body;
  
  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(id_usuario);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear paciente
    const paciente = await Paciente.create({
      id_paciente: id_usuario,
      fecha_nacimiento,
      genero,
      direccion
    });

    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear paciente', error });
  }
});

module.exports = router;
