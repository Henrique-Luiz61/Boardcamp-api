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

export function getCustomerByIdDB(customerId) {
  return db.query(
    `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday 
      FROM customers WHERE id = $1;`,
    [customerId]
  );
}

export function getCustomersDB() {
  return db.query(
    `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') 
      AS birthday FROM customers;`
  );
}

export function verificCpfConflictDB(id, cpf) {
  return db.query(
    `SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') 
    AS birthday FROM customers WHERE cpf = $1 AND id <> $2;`,
    [cpf, id]
  );
}

export function putCustomerInfoDB(id, name, phone, cpf, birthday) {
  return db.query(
    `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4
        WHERE id = $5;`,
    [name, phone, cpf, birthday, id]
  );
}
