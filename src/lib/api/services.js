// import { z } from "zod";
// import { db } from "../db/schema";

// const ServiceSchema = z.object({
//   car_id: z.number(),
//   service_type: z.string(),
//   service_date: z.string(),
//   cost: z.number().positive(),
//   notes: z.string().optional(),
// });

// export const servicesApi = {
//   getAll: () => {
//     return db
//       .prepare(
//         `
//       SELECT services.*,
//              cars.make, cars.model, cars.registration_number,
//              customers.name as owner_name
//       FROM services
//       JOIN cars ON services.car_id = cars.id
//       JOIN customers ON cars.customer_id = customers.id
//       ORDER BY services.service_date DESC
//     `
//       )
//       .all();
//   },

//   getById: (id) => {
//     return db
//       .prepare(
//         `
//       SELECT services.*,
//              cars.make, cars.model, cars.registration_number,
//              customers.name as owner_name
//       FROM services
//       JOIN cars ON services.car_id = cars.id
//       JOIN customers ON cars.customer_id = customers.id
//       WHERE services.id = ?
//     `
//       )
//       .get(id);
//   },

//   getByCarId: (carId) => {
//     return db.prepare("SELECT * FROM services WHERE car_id = ?").all(carId);
//   },

//   create: (service) => {
//     const validated = ServiceSchema.parse(service);
//     const { lastInsertRowid } = db
//       .prepare(
//         `
//       INSERT INTO services (car_id, service_type, service_date, cost, notes)
//       VALUES (@car_id, @service_type, @service_date, @cost, @notes)
//     `
//       )
//       .run(validated);
//     return db
//       .prepare("SELECT * FROM services WHERE id = ?")
//       .get(lastInsertRowid);
//   },

//   update: (id, service) => {
//     const validated = ServiceSchema.partial().parse(service);
//     const sets = Object.entries(validated)
//       .map(([key]) => `${key} = @${key}`)
//       .join(", ");

//     db.prepare(
//       `
//       UPDATE services
//       SET ${sets}
//       WHERE id = @id
//     `
//     ).run({ ...validated, id });

//     return db.prepare("SELECT * FROM services WHERE id = ?").get(id);
//   },

//   delete: (id) => {
//     return db.prepare("DELETE FROM services WHERE id = ?").run(id);
//   },

//   getStatistics: () => {
//     const totalCustomers = db
//       .prepare("SELECT COUNT(*) as count FROM customers")
//       .get();
//     const totalRevenue = db
//       .prepare("SELECT SUM(cost) as total FROM services")
//       .get();
//     const mostCommonService = db
//       .prepare(
//         `
//       SELECT service_type, COUNT(*) as count
//       FROM services
//       GROUP BY service_type
//       ORDER BY count DESC
//       LIMIT 1
//     `
//       )
//       .get();
//     const mostFrequentCustomer = db
//       .prepare(
//         `
//       SELECT customers.name, COUNT(*) as visit_count
//       FROM services
//       JOIN cars ON services.car_id = cars.id
//       JOIN customers ON cars.customer_id = customers.id
//       GROUP BY customers.id
//       ORDER BY visit_count DESC
//       LIMIT 1
//     `
//       )
//       .get();
//     const mostServicedCar = db
//       .prepare(
//         `
//       SELECT cars.make, cars.model, COUNT(*) as service_count
//       FROM services
//       JOIN cars ON services.car_id = cars.id
//       GROUP BY cars.id
//       ORDER BY service_count DESC
//       LIMIT 1
//     `
//       )
//       .get();

//     return {
//       totalCustomers,
//       totalRevenue,
//       mostCommonService,
//       mostFrequentCustomer,
//       mostServicedCar,
//     };
//   },
// };
