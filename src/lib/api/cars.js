// import { db } from "../db/schema";

// export const carsApi = {
//   getAll: () => {
//     return db
//       .prepare(
//         `
//       SELECT cars.*, customers.name as owner_name
//       FROM cars
//       JOIN customers ON cars.customer_id = customers.id
//       ORDER BY cars.created_at DESC
//     `
//       )
//       .all();
//   },

//   getById: (id) => {
//     return db
//       .prepare(
//         `
//       SELECT cars.*, customers.name as owner_name
//       FROM cars
//       JOIN customers ON cars.customer_id = customers.id
//       WHERE cars.id = ?
//     `
//       )
//       .get(id);
//   },

//   getByCustomerId: (customerId) => {
//     return db
//       .prepare("SELECT * FROM cars WHERE customer_id = ?")
//       .all(customerId);
//   },

//   create: (car) => {
//     const validated = car; // Removed validation schema
//     const { lastInsertRowid } = db
//       .prepare(
//         `
//       INSERT INTO cars (customer_id, make, model, year, fuel_type, registration_number)
//       VALUES (@customer_id, @make, @model, @year, @fuel_type, @registration_number)
//     `
//       )
//       .run(validated);
//     return db.prepare("SELECT * FROM cars WHERE id = ?").get(lastInsertRowid);
//   },

//   update: (id, car) => {
//     const validated = car; // Removed validation schema
//     const sets = Object.entries(validated)
//       .map(([key]) => `${key} = @${key}`)
//       .join(", ");

//     db.prepare(
//       `
//       UPDATE cars
//       SET ${sets}
//       WHERE id = @id
//     `
//     ).run({ ...validated, id });

//     return db.prepare("SELECT * FROM cars WHERE id = ?").get(id);
//   },

//   delete: (id) => {
//     return db.prepare("DELETE FROM cars WHERE id = ?").run(id);
//   },
// };
