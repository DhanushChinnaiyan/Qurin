const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  // Get token from header, cookie, etc.
  const token = req.headers['authorization'];

  // Verify token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.Secret_KEY);
    if (decoded.userType !== 'user' && decoded.userType !== 'merchant') {
      return res.status(403).json({ message: 'Forbidden: Invalid user type' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth error :", error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = userAuth;
