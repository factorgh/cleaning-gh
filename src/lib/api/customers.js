// import { db } from "../db/schema";

// export const customersApi = {
//   getAll: () => {
//     return db.prepare("SELECT * FROM customers ORDER BY created_at DESC").all();
//   },

//   getById: (id) => {
//     return db.prepare("SELECT * FROM customers WHERE id = ?").get(id);
//   },

//   create: async (customer) => {
//     const validated = customer;
//     const { lastInsertRowid } = db
//       .prepare(
//         `
//       INSERT INTO customers (name, email, phone, address, type)
//       VALUES (@name, @email, @phone, @address, @type)
//     `
//       )
//       .run(validated);

//     // Return the newly created customer, wrapped in a resolved Promise
//     return db
//       .prepare("SELECT * FROM customers WHERE id = ?")
//       .get(lastInsertRowid);
//   },

//   update: (id, customer) => {
//     const validated = customer; // Removed Zod validation
//     const sets = Object.entries(validated)
//       .map(([key]) => `${key} = @${key}`)
//       .join(", ");

//     db.prepare(
//       `
//       UPDATE customers 
//       SET ${sets}
//       WHERE id = @id
//     `
//     ).run({ ...validated, id });

//     return db.prepare("SELECT * FROM customers WHERE id = ?").get(id);
//   },

//   delete: (id) => {
//     return db.prepare("DELETE FROM customers WHERE id = ?").run(id);
//   },
// };
