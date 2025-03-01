import express from "express";
import { getFlights } from "../controllers/flightcontroller.js";

const router = express.Router();

router.post("/flights", getFlights);

export default router;
