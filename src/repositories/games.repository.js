import { db } from "../database/db.connection.js";

export async function createGameDB(name, image, stockTotal, pricePerDay) {
  return db.query(
    `INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
            VALUES ($1, $2, $3, $4);`,
    [name, image, stockTotal, pricePerDay]
  );
}

export async function verificGameDB(name) {
  return db.query(`SELECT * FROM games WHERE name = $1;`, [name]);
}

export async function getGamesDB() {
  return db.query(`SELECT * FROM games;`);
}
