import { db } from "../database/db.connection.js";
import dayjs from "dayjs";

export function createRentalDB(customerId, gameId, daysRented, gameCheck) {
  return db.query(
    `
    INSERT INTO rentals 
      ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee")
    VALUES ($1, $2, $3, $4, $5, NULL, NULL);`,
    [
      customerId,
      gameId,
      dayjs().format("YYYY-MM-DD"),
      daysRented,
      daysRented * gameCheck.rows[0].pricePerDay,
    ]
  );
}

export function getAllRentalsDB() {
  return db.query(`
    SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
                      json_build_object('id', games.id, 'name', games.name) AS game
      FROM customers
      JOIN rentals ON customers.id = rentals."customerId"
      JOIN games ON games.id = rentals."gameId";`);
}

export function getAvailableRentalsDB(gameId) {
  return db.query(
    `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`,
    [gameId]
  );
}

export function getRentalByIdDB(rentalId) {
  return db.query(`SELECT * FROM rentals WHERE id = $1;`, [rentalId]);
}

export function finishRentalDB(returnDate, delayFee, id) {
  return db.query(
    `
      UPDATE rentals SET "returnDate" = $1, "delayFee" = $2
        WHERE id = $3;`,
    [returnDate, delayFee, id]
  );
}

export function deleteRentalDB(rentalId) {
  return db.query(`DELETE FROM rentals WHERE id = $1;`, [rentalId]);
}
