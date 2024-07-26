const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Especialidad = require('./Especialidad');
const MedicoEspecialidad = require('./MedicoEspecialidad');

const Medico = sequelize.define('Medico', {
  id_medico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'ID_Medico'
  }
}, {
  tableName: 'MEDICO',
  timestamps: false
});

Medico.belongsTo(User, { foreignKey: 'id_medico', as: 'usuario' });
User.hasOne(Medico, { foreignKey: 'id_medico', as: 'medico' });

Medico.belongsToMany(Especialidad, { through: MedicoEspecialidad, foreignKey: 'id_medico', as: 'especialidades' });
Especialidad.belongsToMany(Medico, { through: MedicoEspecialidad, foreignKey: 'id_especialidad', as: 'medicos' });


module.exports = Medico;
