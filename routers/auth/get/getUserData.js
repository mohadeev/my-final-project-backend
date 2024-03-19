import express from "express";
import mongoose from "mongoose";
import userModal from "../../../db/schema/userModal.js";
// import userModal from "../../../../db/schema/userModal.js";
const getUserData = express.Router();

getUserData.get("/", async (req, res) => {
  const reqUserId = req.userId;
  var converData = [];
  console.log(reqUserId);
  console.log("user here from user data");
  if (mongoose.Types.ObjectId.isValid(reqUserId)) {
    await userModal.findOne({ _id: reqUserId }).then(async (userVerfied) => {
      res.json({ responseData: { userData: userVerfied } });
      console.log("here");
      if (userVerfied) {
      }
    });
  }
});

// converData.sort(
//   (x, y) =>
//     -new Date(x.lastmessage.createdAt) -
//     -new Date(y.lastmessage.createdAt)
// );
export default getUserData;
