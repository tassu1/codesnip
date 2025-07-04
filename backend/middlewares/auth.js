const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from either header
  const token = req.header('x-auth-token') || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ 
      msg: 'Token is not valid',
      error: err.message 
    });
  }
};