const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Paciente = sequelize.define('Paciente', {
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'User', 
      key: 'id_usuario'
    },
    field: 'ID_Paciente'
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'Fecha_Nacimiento'
  },
  genero: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    field: 'Genero'
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Direccion'
  }
}, {
  tableName: 'PACIENTE',
  timestamps: false
});

module.exports = Paciente;
