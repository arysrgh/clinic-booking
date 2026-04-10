const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Ambil header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: {
          code: "NO_TOKEN",
          message: "Authorization token required",
          correlation_id: req.id || null
        }
      });
    }

    // Format: Bearer TOKEN
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: {
          code: "INVALID_TOKEN_FORMAT",
          message: "Invalid token format",
          correlation_id: req.id || null
        }
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Inject user ke request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "Token is invalid or expired",
        correlation_id: req.id || null
      }
    });
  }
};

module.exports = authMiddleware;