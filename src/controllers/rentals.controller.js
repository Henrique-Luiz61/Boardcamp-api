import { getCustomerByIdDB } from "../repositories/customers.repository.js";
import { getGameByIdDB } from "../repositories/games.repository.js";
import {
  getAllRentalsDB,
  getAvailableRentalsDB,
  createRentalDB,
  getRentalByIdDB,
  finishRentalDB,
  deleteRentalDB,
} from "../repositories/rentals.repository.js";
import dayjs from "dayjs";

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

export async function getRentals(req, res) {
  try {
    const rentals = await getAllRentalsDB();

    if (rentals.rowCount === 0)
      return res.status(404).send({ message: "No rentals yet!" });

    res.send(rentals.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function finishRentals(req, res) {
  const { id } = req.params;
  let delayfee = null;

  try {
    const rentalCheck = await getRentalByIdDB(id);

    if (rentalCheck.rowCount === 0)
      return res.status(404).send({ message: "Rental not found!" });

    if (rentalCheck.rows[0].returnDate !== null)
      return res.status(400).send({ message: "Rental already finished!" });

    const dateStart = dayjs(rentalCheck.rows[0].rentDate);
    const dateFinal = dayjs().format("YYYY-MM-DD");

    const diffDays = dayjs(dateFinal).diff(dateStart, "day");

    const daysRented = rentalCheck.rows[0].daysRented;
    const pricePerDay = rentalCheck.rows[0].originalPrice / daysRented;

    if (diffDays > daysRented) {
      delayfee = (diffDays - daysRented) * pricePerDay;
    }

    await finishRentalDB(dateFinal, delayfee, id);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRentals(req, res) {
  const { id } = req.params;

  try {
    const rentalCheck = await getRentalByIdDB(id);

    if (rentalCheck.rowCount === 0)
      return res.status(404).send({ message: "Rental not found!" });

    if (rentalCheck.rows[0].returnDate === null)
      return res.status(400).send({ message: "Rental still in progress!" });

    await deleteRentalDB(id);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
