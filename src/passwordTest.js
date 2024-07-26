const User = require('./models/User');
const Role = require('./models/Role');

// Prueba de asociación en la consola
(async () => {
  try {
    const user = await User.findByPk(3); // Ajusta el ID según tu base de datos
    if (user) {
      const roles = await user.getRoles();
      console.log('Roles for user:', roles);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
