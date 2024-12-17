// import bcrypt from "bcryptjs";
// import { db } from "../db/schema";
// import { generateToken, verifyToken } from "../utils/jwt";

// export const authApi = {
//   register: async (userData) => {
//     const hashedPassword = await bcrypt.hash(userData.password, 10);

//     try {
//       const { lastInsertRowid } = db
//         .prepare(
//           `
//         INSERT INTO users (username, password)
//         VALUES (@username, @password)
//       `
//         )
//         .run({
//           username: userData.username,
//           password: hashedPassword,
//         });

//       const user = db
//         .prepare("SELECT id, username, role FROM users WHERE id = ?")
//         .get(lastInsertRowid);

//       return {
//         user,
//         token: generateToken(user.id),
//       };
//     } catch (error) {
//       const dbError = error;
//       if (dbError.code === "SQLITE_CONSTRAINT") {
//         throw new Error("Username already exists");
//       }
//       throw error;
//     }
//   },

//   login: async (userData) => {
//     const user = db
//       .prepare("SELECT * FROM users WHERE username = ?")
//       .get(userData.username);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const validPassword = await bcrypt.compare(
//       userData.password,
//       user.password
//     );
//     if (!validPassword) {
//       throw new Error("Invalid password");
//     }

//     const { ...userWithoutPassword } = user;
//     return {
//       user: userWithoutPassword,
//       token: generateToken(user.id),
//     };
//   },

//   verifyToken: (token) => {
//     try {
//       const decoded = verifyToken(token);
//       const user = db
//         .prepare("SELECT id, username, role FROM users WHERE id = ?")
//         .get(decoded.id);

//       if (!user) {
//         throw new Error("User not found");
//       }

//       return user;
//     } catch (error) {
//       console.log(error);
//       throw new Error("Invalid token");
//     }
//   },
// };
