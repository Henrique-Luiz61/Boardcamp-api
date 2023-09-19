import { db } from "../database/db.connection.js";

export function getCustomerByIdDB(userId) {
  return db.query(`SELECT * FROM customers WHERE id = $1;`, [userId]);
}

export function getCustomersDB() {
  return db.query(`SELECT * FROM customers;`);
}
