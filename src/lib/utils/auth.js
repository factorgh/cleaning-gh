import jwt from "jsonwebtoken";

const JWT_SECRET = import.meta.env.JWT_SECRET || "your-secret-key";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
};
