import express from "express";
const signUpRouter = express.Router();
import createuser from "./utils/createUser.js";

signUpRouter.post("/", async (req, res) => {
  createuser(req, res);
});

export default signUpRouter;
