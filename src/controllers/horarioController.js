const HorarioMedico = require('../models/HorarioMedico');

exports.getHorarios = async (req, res) => {
  try {
    const horarios = await HorarioMedico.findAll();
    res.status(200).json(horarios);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving schedules', error: err });
  }
};
