const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID_Usuario' 
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Nombre'
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Apellido'
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Telefono'
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'Correo_Electronico'
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Contrasena'
  }
}, {
  tableName: 'USUARIO',
  timestamps: false
});

module.exports = User;
