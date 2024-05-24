import express from "express";
import mongoose from "mongoose";
import converstionsModal from "../../../db/schema/converstionsModal.js";
import userModel from "../../../db/schema/userModel.js";
const createConversation = express.Router();

createConversation.post("/", async (req, res) => {
  const { receiver } = req.body;
  const reqUserId = req.userId;
  console.log("receiver", receiver);
  console.log("reqUserId", reqUserId);
  await userModel.findOne({ _id: reqUserId }).then(async (useDoc) => {
    const findReceiverData = await userModel
      .findOne({ email: receiver })
      .then((recieverData) => {
        if (recieverData) {
          return recieverData;
        } else {
          return null;
        }
      });
    if (useDoc && findReceiverData) {
      converstionsModal
        .findOne({
          members: { $all: [findReceiverData?._id.toString("hex"), reqUserId] },
        })
        .then(async (conversation) => {
          if (conversation) {
            console.log("conversation", conversation);
            res.json({ responseData: { conversation } });
          } else if (!conversation) {
            console.log("sorry no conversation", conversation);
            try {
              await converstionsModal
                .create({
                  members: [reqUserId, findReceiverData?._id.toString("hex")],
                })
                .then((newConversation) => {
                  console.log("new conv", newConversation);
                  res.json({
                    responseData: {
                      newConversation: true,
                      conversation: newConversation,
                      userData: findReceiverData,
                    },
                  });
                });
            } catch (error) {}
          }
        });
    } else {
      res.json({ errormessage: "NO-USER-FOUNDED" });
    }
  });
});

// createConversation.get("/conversion", function (req, res) {
//   res.json("here");
// });
export default createConversation;
