import express from "express";
import orderRoutes from "./routes/order.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { pool } from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health/db", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "db connected" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "db connection failed", error: String(error) });
  }
});

app.use("/api", orderRoutes);

app.use(errorHandler);

export default app;
