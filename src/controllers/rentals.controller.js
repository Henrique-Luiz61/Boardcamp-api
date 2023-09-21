import { getCustomerByIdDB } from "../repositories/customers.repository.js";
import { getGameByIdDB } from "../repositories/games.repository.js";
import {
  getAvailableRentalsDB,
  createRentalDB,
} from "../repositories/rentals.repository.js";

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customerCheck = await getCustomerByIdDB(customerId);

    const gameCheck = await getGameByIdDB(gameId);

    if (customerCheck.rowCount === 0 || gameCheck.rowCount === 0) {
      return res.status(400).send({ message: "Customer or game not found!" });
    }

    const gameStock = await getAvailableRentalsDB(gameId);

    if (gameStock.rowCount >= gameCheck.rows[0].stockTotal) {
      return res.status(400).send({ message: "Game out in stock!" });
    }

    await createRentalDB(customerId, gameId, daysRented, gameCheck);

    res.send(201);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
}
