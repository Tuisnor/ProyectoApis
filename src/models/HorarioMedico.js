const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const HorarioMedico = sequelize.define('HorarioMedico', {
  id_horario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ID_Horario'
  },
  dia_semana: {
    type: DataTypes.DATE,
    field: 'Dia_Semana'
  },
  hora_inicio: {
    type: DataTypes.TIME,
    field: 'Hora_Inicio'
  },
  hora_fin: {
    type: DataTypes.TIME,
    field: 'Hora_Fin'
  },
  id_medico: {
    type: DataTypes.INTEGER,
    field: 'ID_Medico'
  }
}, {
  tableName: 'HORARIO_MEDICO',
  timestamps: false
});

module.exports = HorarioMedico;
