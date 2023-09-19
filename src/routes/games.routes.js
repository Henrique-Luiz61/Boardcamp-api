import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gamesSchema } from "../schemas/games.schema.js";
import { postGame, getGames } from "../controllers/games.controller.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchema(gamesSchema), postGame);
gamesRouter.get("/games", getGames);

export default gamesRouter;
