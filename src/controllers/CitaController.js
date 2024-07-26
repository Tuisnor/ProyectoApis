const { Op } = require('sequelize');
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken
const Cita = require('../models/Cita');
const HorarioMedico = require('../models/HorarioMedico');
const Medico = require('../models/Medico');
const Especialidad = require('../models/Especialidad')
const User = require('../models/User')

exports.createCita = async (req, res) => {
  try {
    const { fecha, hora, id_medico } = req.body;
    // Obtener el token de los encabezados de autorización
    const token = req.headers.authorization.split(' ')[1];
    // Decodificar el token para obtener el id_paciente
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id_paciente = decodedToken.userId;

    // Convertir la fecha a formato DATE y la hora a formato TIME
    const fechaDate = new Date(fecha);
    const horaTime = hora; // Asume que la hora es en formato HH:MM

    // Verificar la disponibilidad del médico
    const horario = await HorarioMedico.findOne({
      where: {
        id_medico,
        dia_semana: fechaDate,
        hora_inicio: {
          [Op.lte]: horaTime
        },
        hora_fin: {
          [Op.gte]: horaTime
        }
      }
    });

    if (!horario) {
      return res.status(400).json({ message: 'El médico no está disponible en el horario seleccionado' });
    }

    // Crear la cita si el médico está disponible
    const newCita = await Cita.create({ fecha, hora, estado: 'Pendiente', id_paciente, id_medico });
    res.status(201).json(newCita);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ message: 'Error creating appointment', error: err.message });
  }
};


exports.getCitasByUsuario = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      where: {
        id_paciente: req.user.userId 
      },
      include: [
        {
          model: Medico,
          as: 'cita_medico',
          include: [
            {
              model: User,
              as: 'usuario', 
              attributes: ['nombre', 'apellido'] 
            },
            {
              model: Especialidad,
              as: 'especialidades',
              attributes: ['id_especialidad', 'nombre'] 
            }
          ]
        }
      ]
    });
    res.json(citas);
  } catch (error) {
    console.error('Error retrieving appointments:', error);
    res.status(500).json({ message: 'Error retrieving appointments' });
  }
};