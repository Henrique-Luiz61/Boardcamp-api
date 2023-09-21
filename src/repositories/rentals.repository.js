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

export function getAvailableRentalsDB(gameId) {
  return db.query(
    `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`,
    [gameId]
  );
}
