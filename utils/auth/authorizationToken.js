const jwt = require('jsonwebtoken');
const { config } = require('../../config');

// Middleware to verify on each request if the user is authenticated
function verifyToken(req, res, next) {
  console.log('Verificando token...');
  console.log('Token: ', req.headers.authorization);
  console.log('Config: ', config.authJwtSecret);
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization;

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token' });
  }

  try {
    // Verificar la firma del token
    const decoded = jwt.verify(token, config.authJwtSecret);

    // Pasar los datos del token decodificado a la solicitud para uso posterior
    req.usuario = decoded;
    console.log('Usuario validado: ', req.usuario);
    // Continuar con la siguiente función de middleware o controlador
    next();
  } catch (error) {
    // Si el token es inválido o ha caducado, retornar un error
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = { verifyToken };