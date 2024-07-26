const Medico = require('../models/Medico');
const Especialidad = require('../models/Especialidad');
const User = require('../models/User');

exports.getMedicosByEspecialidad = async (req, res) => {
  try {
    const idEspecialidad = parseInt(req.params.id, 10);

    // Verifica si se ha proporcionado el ID
    if (isNaN(idEspecialidad)) {
      return res.status(400).json({ message: 'ID de especialidad inválido' });
    }

    // Encuentra los médicos asociados con la especialidad
    const medicos = await Medico.findAll({
      include: [
        {
          model: Especialidad,
          through: { attributes: [] }, 
          as: 'especialidades',
          required: true
        },
        {
          model: User,
          as: 'usuario', 
          attributes: ['nombre', 'apellido'] 
        }
      ],
      where: {
        '$especialidades.id_especialidad$': idEspecialidad
      }
    });

    // Formatea la respuesta para incluir el nombre y apellido del médico
    const formattedMedicos = medicos.map(medico => ({
      id_medico: medico.id_medico,
      nombre_medico: medico.usuario.nombre, 
      apellido_medico: medico.usuario.apellido,
      especialidades: medico.especialidades.map(especialidad => ({
        id_especialidad: especialidad.id_especialidad,
        nombre: especialidad.nombre
      }))
    }));

    // Envía los resultados al cliente
    res.json(formattedMedicos);
  } catch (error) {
    console.error('Error al obtener médicos por especialidad:', error);
    res.status(500).json({ message: 'Error al obtener médicos por especialidad' });
  }
};
