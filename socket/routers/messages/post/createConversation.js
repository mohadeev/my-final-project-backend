import express from "express";
import mongoose from "mongoose";
import converstionsModal from "../../../../db/schema/converstionsModal.js";
import messageModal from "../../../../db/schema/messageModal.js";
import userModal from "../../../../db/schema/userModal.js";
const createConversation = express.Router();

createConversation.post("/", async (req, res) => {
  const { receiver } = req.body;
  const reqUserId = req.userId;
  console.log("receiver", receiver);
  console.log("reqUserId", reqUserId);
  await userModal.findOne({ _id: reqUserId }).then(async (useDoc) => {
    const findReceiverData = await userModal
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
            res.json({ responseData: conversation });
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
                      conversationData: { newConversation },
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

vercel logs https://sooktell.vercel.app --until 2099-09-04T07:05:43+00:00

