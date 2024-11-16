const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log('Authorization successful:', decoded); 
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message); 
    return res.status(403).json({ message: 'Invalid or expired token', error: err.message });
  }
};
