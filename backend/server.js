import express from "express";
import "dotenv/config";
import cors from "cors";
import flightRoutes from "./routes/flightRoutes.js";

const app = express();
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true
}))
app.use(express.json());

app.use("/api", flightRoutes);
app.get('/', (req, res) => {
    res.json("Application started")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
