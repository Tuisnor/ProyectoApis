const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Especialidad = sequelize.define('Especialidad', {
  id_especialidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ID_Especialidad'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'ESPECIALIDAD',
  timestamps: false
});

module.exports = Especialidad;
