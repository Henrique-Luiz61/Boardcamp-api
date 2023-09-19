import {
  createGameDB,
  verificGameDB,
  getGamesDB,
} from "../repositories/games.repository.js";

export async function postGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const gameExists = await verificGameDB(name);

    if (gameExists.rowCount > 0)
      return res.status(409).send({ message: "Existing game!" });

    await createGameDB(name, image, stockTotal, pricePerDay);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getGames(req, res) {
  try {
    const games = await getGamesDB();

    if (games.rowCount === 0)
      return res.status(404).send({ message: "No games available!" });

    res.send(games.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
