import express from "express";
import mongoose from "mongoose";
import userModel from "../../../db/schema/userModel.js";
// import userModel from "../../../../db/schema/userModel.js";
const getAvailableUsers = express.Router();

getAvailableUsers.get("/", async (req, res) => {
  userModel.find({}).then((users) => {
    res.json({ data: users });
  });
});

export default getAvailableUsers;
