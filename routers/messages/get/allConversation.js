import express from "express";
import mongoose from "mongoose";
// import converstionsModal from "../../../db/schema/converstionsModal.js";
// import messageModal from "../../../../db/schema/messageModal.js";
// import userModal from "../../../../db/schema/userModal.js";
// import findUserDataById from "../../../../utils/mogoose/findUserDataById.js";
import converstionsModal from "../../../db/schema/converstionsModal.js";
import findUserDataById from "../../../utils/mogoose/findUserDataById.js";
import userModal from "../../../db/schema/userModal.js";
// import userModal from "../../../db/schema/userModal.js";
const allConversation = express.Router();

allConversation.get("/", async (req, res) => {
  const reqUserId = req.userId;
  var converData = [];
  console.log(reqUserId);
  if (mongoose.Types.ObjectId.isValid(reqUserId)) {
    await userModal.findOne({ _id: reqUserId }).then(async (userVerfied) => {
      console.log("here");
      if (userVerfied) {
        try {
          await converstionsModal
            .find({
              members: { $all: [reqUserId] },
            })
            .then(async (document) => {
              await Promise.all(
                document.map(async (conv) => {
                  const friendIdFind = conv.members.filter(
                    (userId) => userId !== reqUserId
                  );
                  const fiendId = friendIdFind[0];
                  let friendData = await findUserDataById("_id", fiendId).then(
                    (data) => data
                  );
                  converData.push({
                    conversationData: conv,
                    userData: friendData,
                  });
                })
              );
              res.status(200).json({
                responseData: { allConversation: converData },
              });
            });
        } catch (err) {
          res.status(500).json(err);
        }
      }
    });
  }
});

// converData.sort(
//   (x, y) =>
//     -new Date(x.lastmessage.createdAt) -
//     -new Date(y.lastmessage.createdAt)
// );
export default allConversation;
