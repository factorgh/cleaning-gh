// import Database from 'better-sqlite3';

// const db = new Database('car-service.db');

// // Create tables
// db.exec(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     role TEXT NOT NULL DEFAULT 'admin',
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS customers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     phone TEXT,
//     address TEXT,
//     type TEXT CHECK(type IN ('individual', 'company')) NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   );

//   CREATE TABLE IF NOT EXISTS cars (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     customer_id INTEGER NOT NULL,
//     make TEXT NOT NULL,
//     model TEXT NOT NULL,
//     year INTEGER NOT NULL,
//     fuel_type TEXT NOT NULL,
//     registration_number TEXT UNIQUE NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
//   );

//   CREATE TABLE IF NOT EXISTS services (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     car_id INTEGER NOT NULL,
//     service_type TEXT NOT NULL,
//     service_date DATE NOT NULL,
//     cost DECIMAL(10,2) NOT NULL,
//     notes TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
//   );
// `);

// export { db };
