import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import dbConnect from "../../../db/dbConnect.js";
import User from "../../../db/schema/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.post("/", async (req, res) => {
  const { password, email } = req.body;
  dbConnect();
  await User.findOne({ email: email }).then((docadded) => {
    console.log(password, email);
    if (docadded) {
      bcrypt.compare(password, docadded.password).then((result) => {
        if (result) {
          const id = docadded._id.toString("hex");
          const username = docadded.username;
          let auth = true;
          let userdata = { email, auth, id, username };
          const user = { user: docadded.id };
          const accesTokken = jwt.sign(user, process.env.ACCCES_TOKKEN_SECRET);
          res.json({
            message: "you successfully log in",
            user: userdata,
            accesToken: accesTokken,
          });
        } else {
          res.json({
            error: "This is a wrong password",
          });
        }
      });
    } else if (!docadded) {
      res.json({
        error: "This email address was not founded, create account instead",
      });
    }
  });
});

export default router;
