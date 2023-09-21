import { db } from "../database/db.connection.js";

export function createGameDB(name, image, stockTotal, pricePerDay) {
  return db.query(
    `INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
            VALUES ($1, $2, $3, $4);`,
    [name, image, stockTotal, pricePerDay]
  );
}

export function verificGameDB(name) {
  return db.query(`SELECT * FROM games WHERE name = $1;`, [name]);
}

export function getGamesDB() {
  return db.query(`SELECT * FROM games;`);
}

export function getGameByIdDB(gameId) {
  return db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
}
