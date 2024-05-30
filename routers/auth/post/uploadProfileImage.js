import express from "express";
const uploadProfileImage = express.Router();
import verifyUser from "../../../utils/verify-user/verifyUser.js";
import mongoose from "mongoose";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import cloudinaryMain from "../../../utils/cloudinary/cloudinaryMain.js";
import userModel from "../../../db/schema/userModel.js";
import fs from "fs";
const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "./uploads"));
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
uploadProfileImage.post(
  "/",
  verifyUser,
  upload.single("image"),
  async (req, res) => {
    const File = req.file;
    const userId = req.userId;
    if (userId) {
      const name = req.body.name;
      if (File) {
        const mimetype = File.mimetype;
        const filePath = File.path;
        if (
          mimetype === "image/png" ||
          mimetype === "image/gif" ||
          mimetype === "image/jpg" ||
          mimetype === "image/jpeg" ||
          mimetype === "image/jfif" ||
          mimetype === "image/svg"
        ) {
          try {
            const result = await cloudinaryMain.v2.uploader.upload(filePath);
            // console.log("result", result);
            fs.unlinkSync(filePath);
            const updatedUser = await userModel.findByIdAndUpdate(userId, {
              profileImage: result,
            });
            // res.json({ file: File, result, uploaded: true });
            res.json({ user: updatedUser, uploaded: true });
          } catch (error) {
            console.log("error:", error);
          }
        }
      } else {
        res.json({});
      }
    }
  }
);

export default uploadProfileImage;
