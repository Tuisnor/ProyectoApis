const User = require('./User');
const Role = require('./Role');
const UserRole = require('./UserRole');
const Cita = require('./Cita');
const HorarioMedico = require('./HorarioMedico');
const Medico = require('./Medico');
const Especialidad = require('./Especialidad');
const MedicoEspecialidad = require('./MedicoEspecialidad');

// Definir asociaciones
User.belongsToMany(Role, { through: UserRole, foreignKey: 'id_usuario', as: 'roles' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'id_rol', as: 'usuarios' });

Medico.belongsTo(User, { foreignKey: 'id_medico', as: 'usuario' });
User.hasOne(Medico, { foreignKey: 'id_medico', as: 'medico' });

Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
Medico.hasMany(Cita, { foreignKey: 'id_medico', as: 'citas' });

HorarioMedico.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
Medico.hasMany(HorarioMedico, { foreignKey: 'id_medico', as: 'horarios' });

MedicoEspecialidad.belongsTo(Medico, { foreignKey: 'id_medico', as: 'medico' });
Medico.belongsToMany(Especialidad, { through: MedicoEspecialidad, foreignKey: 'id_medico', as: 'especialidades' });

Especialidad.belongsToMany(Medico, { through: MedicoEspecialidad, foreignKey: 'id_especialidad', as: 'medicos' });

module.exports = { User, Role, UserRole, Cita, HorarioMedico, Medico, Especialidad, MedicoEspecialidad };
