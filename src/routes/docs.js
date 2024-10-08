import express from "express";
import { __dirname } from "../config.js";

const router = express.Router();

// Define a route
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

export default router;