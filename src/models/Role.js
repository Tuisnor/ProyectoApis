const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Role = sequelize.define('rol', {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID_Rol' 
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Nombre'
  }
}, {
  tableName: 'ROL',
  timestamps: false
});

module.exports = Role;
