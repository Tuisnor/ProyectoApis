require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');

// Importar modelos
const User = require('./models/User');
const Role = require('./models/Role');
const UserRole = require('./models/UserRole');
const Cita = require('./models/Cita');
const HorarioMedico = require('./models/HorarioMedico');
const Medico = require('./models/Medico');
const Especialidad = require('./models/Especialidad');
const MedicoEspecialidad = require('./models/MedicoEspecialidad');

// Importar rutas
const authRoutes = require('./routes/auth');
const citaRoutes = require('./routes/CitaRoutes');
const pacienteRoutes = require('./routes/paciente');
const medicoRoutes = require('./routes/medicoRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');
const horarioRoutes = require('./routes/horarioRoutes');

// Definir asociaciones
User.belongsToMany(Role, { through: UserRole, foreignKey: 'id_usuario', as: 'roles' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'id_rol', as: 'usuarios' });


// Asociación entre Medico y Cita
Cita.belongsTo(Medico, { foreignKey: 'id_medico', as: 'cita_medico' });
Medico.hasMany(Cita, { foreignKey: 'id_medico', as: 'medico_citas' });

// Asociación entre Medico y HorarioMedico
HorarioMedico.belongsTo(Medico, { foreignKey: 'id_medico', as: 'horario_medico' });
Medico.hasMany(HorarioMedico, { foreignKey: 'id_medico', as: 'medico_horarios' });



const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', citaRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/horarios', horarioRoutes);

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
