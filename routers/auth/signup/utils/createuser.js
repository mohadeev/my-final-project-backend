import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModal from "../../../../db/schema/userModal.js";

const createuser = async (req, res) => {
  console.log(req.body);
  const { email, password, conifirmpassword, username } = req.body;
  if (
    !email.includes("@") ||
    email.length <= 0 ||
    email.length > 40 ||
    email.includes("http:") ||
    email.includes("https:")
  ) {
    res.json({
      message: "RandomTextNotEmailAdress",
    });
  } else if (password.length <= 7) {
    res.json({
      message: "ShortPassWord",
    });
  } else if (password != conifirmpassword) {
    res.json({
      message: "PasswordNotMatch",
    });
  } else {
    await userModal.findOne({ email: email }).then((doc) => {
      console.log("SDDDDDDDDDDDDDDDDdsd");
      if (doc) {
        res.json({
          message: "AvalibleEmail",
        });
      } else if (!doc) {
        console.log("SDDDDDDDDDDDDDDDDdsd");
        const CreateUser = async () => {
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(password, salt);
          userModal
            .create({ email: email, password: hashPassword, username })
            .then((docadded) => {
              const id = docadded._id.toString("hex");
              const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
              const user = { email: email, accessToken: accessToken };
              if (!req.user) {
                req.user = { email, userId: id };
              }
              res.json({
                message: "user created successfully",
                user: user,
              });
            });
        };
        CreateUser();
      }
    });
  }
};

export default createuser;
