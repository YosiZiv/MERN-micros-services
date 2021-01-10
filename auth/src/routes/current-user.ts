import express from "express";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  ({ currentUser = null }, res) => {
    res.send({ currentUser });
  }
);
export { router as currentUserRouter };
