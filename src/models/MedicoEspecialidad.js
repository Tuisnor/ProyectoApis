const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const MedicoEspecialidad = sequelize.define('MedicoEspecialidad', {
  id_medico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'MEDICO',
      key: 'ID_Medico'
    }
  },
  id_especialidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'ESPECIALIDAD',
      key: 'ID_Especialidad'
    }
  }
}, {
  tableName: 'MEDICO_ESPECIALIDAD',
  timestamps: false
});

module.exports = MedicoEspecialidad;
