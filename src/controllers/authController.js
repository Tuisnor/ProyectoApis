const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const UserRole = require('../models/UserRole');
const Patient = require('../models/Paciente');


exports.register = async (req, res) => {
  const { email, password, nombre, apellido, telefono, role, fechaNacimiento, genero, direccion } = req.body;

  try {
    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = await User.create({
      correo_electronico: email,
      contrasena: hashedPassword,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono
    });

    // Crear el paciente solo si se proporcionan los datos
    if (fechaNacimiento || genero || direccion) {
      // Verificar si todos los campos opcionales están presentes si alguno se incluye
      if (!fechaNacimiento || !genero || !direccion) {
        return res.status(400).json({ message: 'Si se proporcionan datos de paciente, deben estar completos.' });
      }
    
      await Patient.create({
        id_paciente: newUser.id_usuario, 
        fecha_nacimiento: fechaNacimiento,
        genero,
        direccion
      });
    }

    // Verificar y asignar rol
    let roleRecord;
    if (role) {
      roleRecord = await Role.findOne({ where: { nombre: role } });
      if (!roleRecord) {
        return res.status(400).json({ message: 'Invalid role' });
      }
    } else {
      // Asignar rol por defecto si no se proporciona
      roleRecord = await Role.findByPk(1); 
    }

    // Crear asociación entre usuario y rol
    await UserRole.create({
      id_usuario: newUser.id_usuario,
      id_rol: roleRecord.id_rol
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { correo_electronico: email },
      include: {
        model: Role,
        through: { attributes: [] }, 
        as: 'roles' 
      }
    });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Extraer roles
    const roles = user.roles ? user.roles.map(role => role.id_rol) : [];

    const token = jwt.sign({ userId: user.id_usuario, roleIds: roles }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error details:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
