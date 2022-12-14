import express from "express";
import mongoose from "mongoose";
import converstionsModal from "../../../../db/schema/converstionsModal.js";
import messageModal from "../../../../db/schema/messageModal.js";
import userModal from "../../../../db/schema/userModal.js";
import findUserDataById from "../../../../utils/mogoose/findUserDataById.js";
const createMessage = express.Router();

createMessage.post("/", async (req, res) => {
  const reqUserId = req.userId;
  let reqReceiverId;
  const { message, conversationId, receiver } = req.body;

  if (mongoose.Types.ObjectId.isValid(conversationId)) {
    await userModal.findOne({ _id: reqUserId }).then(async (minUserData) => {
      if (minUserData) {
        let friendData = await findUserDataById("email", receiver).then(
          (data) => data
        );
        console.log(req.body);
        reqReceiverId = friendData._id.valueOf();
        console.log(reqReceiverId, reqUserId);
        await converstionsModal
          .findOne({
            _id: conversationId,
            members: { $all: [reqUserId, reqReceiverId] },
          })
          .then(async (Coversion) => {
            if (Coversion) {
              try {
                await messageModal
                  .create({
                    message: message,
                    sender: reqUserId,
                    receiver: reqReceiverId,
                    unread: false,
                    conversationId: conversationId,
                  })
                  .then((messageCreated) => {
                    console.log("message created", messageCreated);
                    res.status(200).json({
                      // isfirstmessage: isFirstMessage,
                      responseData: messageCreated,
                    });
                  });
              } catch (err) {
                res.status(500).json(err?.message);
              }
            }
          });
      }
    });
  }
});

export default createMessage;
