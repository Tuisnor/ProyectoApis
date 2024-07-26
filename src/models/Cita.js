const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Paciente = require('./Paciente'); // Asegúrate de tener un modelo Paciente definido
const Medico = require('./Medico'); // Asegúrate de tener un modelo Medico definido
const Especialidad = require('./Especialidad');

const Cita = sequelize.define('Cita', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID_Cita'
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Fecha'
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'Hora'
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Estado',
    defaultValue: 'Programada' // Estado por defecto
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ID_Paciente',
    references: {
      model: 'paciente',
      key: 'ID_Paciente'
    }
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ID_Medico',
    references: {
      model: 'medico',
      key: 'ID_Medico'
    }
  }
}, {
  tableName: 'CITA',
  timestamps: false
});

// Relación con Paciente
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' });

// Relación con Medico
Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });


module.exports = Cita;
