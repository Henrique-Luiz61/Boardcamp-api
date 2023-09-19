import { db } from "../database/db.connection.js";

export function createCustomerDB(name, phone, cpf, birthday) {
  return db.query(
    `
    INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4);
    `,
    [name, phone, cpf, birthday]
  );
}

export function getCustomerByCpfDB(cpf) {
  return db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
}

export function getCustomerByIdDB(userId) {
  return db.query(
    `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday 
      FROM customers WHERE id = $1;`,
    [userId]
  );
}

export function getCustomersDB() {
  return db.query(
    `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') 
      AS birthday FROM customers;`
  );
}
