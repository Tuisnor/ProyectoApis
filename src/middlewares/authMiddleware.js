const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extrae el token del encabezado Authorization
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); 
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  console.log('Token:', token); 

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); 
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error Verifying Token:', err); // Verifica errores de verificación
    res.status(400).json({ message: 'Invalid token' });
  }
};
