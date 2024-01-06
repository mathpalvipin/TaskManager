import { secretKey } from "../config/config.js";
import JWT from "jsonwebtoken";
export const tokenGenerator = (user) => {
  const token = JWT.sign({ email: user.email }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  JWT.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = decoded; // Attach user information to the request object
    next();
  });
};
