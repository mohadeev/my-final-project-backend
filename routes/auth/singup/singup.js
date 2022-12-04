import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import createuser from "./utils/createuser.js";

router.post("/", async (req, res) => {
  createuser(req, res);
  //
  ////
});

export default router;
