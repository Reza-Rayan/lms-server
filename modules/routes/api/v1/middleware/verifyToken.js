const jwt = require("jsonwebtoken");

class AuthMiddleware {
  static verifyToken(role) {
    return (req, res, next) => {
      // Get the token from the request headers
      const token = req.headers["authorization"] || req.query.token;
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Not Find Token" });
      }

      // Verify the token
      jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized Not Token" });
        }

        // Check if the required role is provided and if it matches the user's role
        if (role && decoded.role !== role) {
          console.log(decoded);
          return res.status(403).json({
            success: false,
            message: "این سطح دسترسی برای شما تعریف نشده است",
          });
        }

        // If token is valid, save decoded user information to the request object
        req.user = decoded;
        next();
      });
    };
  }
}

module.exports = AuthMiddleware;
