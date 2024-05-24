import express from "express";
import mongoose from "mongoose";
const routerSignIn = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../../db/schema/userModel.js";
// import userModel from "../../../../db/schema/userModel.js";

routerSignIn.post("/", async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  await userModel.findOne({ email: email }).then((docadded) => {
    if (docadded) {
      bcrypt.compare(password, docadded.password).then((result) => {
        if (result) {
          const id = docadded._id.toString("hex");
          const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
          const user = { email: email, accessToken: accessToken };
          const reqUser = req.user;
          if (typeof reqUser === "undefined") {
            req.userId = id;
            req.userEmail = email;
            console.log(req.userId);
          }
          res.json({
            message: "you successfully log in",
            user: user,
          });
        } else {
          res.json({
            message: "WrongPassWord",
          });
        }
      });
    } else if (!docadded) {
      res.json({
        message: "EamilNotFinded",
      });
    }
  });
});

export default routerSignIn;
