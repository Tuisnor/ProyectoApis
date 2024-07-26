const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserRole = sequelize.define('usuario_rol', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ID_Usuario' 
  },
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ID_Rol' 
  }
}, {
  tableName: 'USUARIO_ROL',
  timestamps: false
});

module.exports = UserRole;
