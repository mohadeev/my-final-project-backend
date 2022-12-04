import express from "express";
import mongoose from "mongoose";
import dbConnect from "../../../../db/dbConnect.js";
import User from "../../../../db/schema/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createuser = async (req, res) => {
  dbConnect();
  //cheking password is not spam
  const { email, password, conifrmpassword, username } = req.body;
  if (
    !email.includes("@") ||
    email.length <= 0 ||
    email.length > 40 ||
    email.includes("http:") ||
    email.includes("https:")
  ) {
    res.json({
      error:
        "this does not seems to email addres please enter your correct email addrres",
    });
  } else if (password != conifrmpassword) {
    res.json({ error: "password does not match" , error1 : password +"" + conifrmpassword });
  } else if (password.length <= 7) {
    res.json({
      error:
        "password is too short, password should cotain at less 8 characters",
    });
  } else {
    await User.findOne({ email: email }).then((doc) => {
      if (doc) {
        res.json({
          error: "Sorry this email is arlady avalible",
        });

      } else if (!doc) {
        const CreateUser = async () => {
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(password, salt);
          User.create({ email: email, password: hashPassword, username }).then(
            (docadded) => {
              const id = docadded._id.toString("hex");
              let auth = true;
              let userdata = { email, auth, id, username };
              const user = { user: id };
              const accesTokken = jwt.sign(
                user,
                process.env.ACCCES_TOKKEN_SECRET
              );
              res.json({
                message: "user created successfully",
                user: userdata,
                accesToken: accesTokken,
              });
            }
          );
        };
        CreateUser();
      }
    });
  }
};

export default createuser;
