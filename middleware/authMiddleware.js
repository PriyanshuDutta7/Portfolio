const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET   // ✅ use env secret
    );

    req.user = verified;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};

module.exports = authMiddleware;