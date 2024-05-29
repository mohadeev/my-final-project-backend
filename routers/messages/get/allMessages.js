import mongoose from "mongoose";
import express, { response } from "express";
// import converstionsModal from "../../../../db/schema/converstionsModal.js";
import converstionsModal from "../../../db/schema/converstionsModal.js";
import messageModel from "../../../db/schema/messageModel.js";
import userModel from "../../../db/schema/userModel.js";
import verifyUser from "../../../utils/verify-user/verifyUser.js";
const allMessages = express.Router();
allMessages.get(
  "/get/message/all-messages/:convid",
  verifyUser,
  async (req, res) => {
    //import verifyUser from "../../../../utils/verify-user/verifyUser.js";

    const convId = req.params.convid;
    const reqUserId = req.userId;
    console.log("all message");
    if (mongoose.Types.ObjectId.isValid(convId)) {
      await userModel.findOne({ _id: reqUserId }).then(async (userdoc) => {
        const Id = userdoc?._id;
        let myAvatar = userdoc?.accountDetails?.avatar;
        if (Id == reqUserId) {
          const FetchData = async () => {
            await converstionsModal
              .findOne({ _id: convId })
              .then(async (convers) => {
                if (convers) {
                  if (convers.members.includes(reqUserId)) {
                    try {
                      await messageModel
                        .find({ conversationId: convId })
                        .then(async (messages) => {
                          const messagedata = messages;
                          res.status(200).json({
                            responseData: {
                              allMessages: {
                                myAvatar: myAvatar,
                                messageData: messagedata,
                              },
                            },
                          });
                        });
                    } catch (err) {
                      res.status(500).json(err?.message);
                    }
                  }
                }
              });
          };
          FetchData();
        }
      });
    }
  }
);
export default allMessages;
