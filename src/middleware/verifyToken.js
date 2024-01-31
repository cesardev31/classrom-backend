const jwt = require('jsonwebtoken');

// Middleware para validar token (esquemático)
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']; // O el lugar donde estés enviando el token

  if (!token) {
    return res.status(403).send('Se requiere un token para la autenticación');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega la información del usuario decodificada a la solicitud
  } catch (error) {
    return res.status(401).send('Token inválido');
  }

  return next(); // Si el token es válido, continúa con la siguiente función en la cadena
};

module.exports = verificarToken;
