import jwt from 'jsonwebtoken';

// Your JWT secret key, you should store this in a secure environment
const jwtSecret = 'your-secret-key';

const authMiddleware = (req, res, next) => {
    
  const token = req.header('x-auth-token');

  // Check if a token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Add the user object to the request for use in subsequent middleware or routes
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
