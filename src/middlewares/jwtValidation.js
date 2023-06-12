const { validateToken } = require('../utils/JWT');

const validateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const validation = validateToken(token);
    console.log('TOKEN MENSAGEM:', validation);    
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });    
  }

  next();
};

module.exports = {
  validateJWT,
};