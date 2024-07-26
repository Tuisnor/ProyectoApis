const Especialidad = require('../models/Especialidad');

exports.getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.status(200).json(especialidades);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving specialties', error: err });
  }
};
