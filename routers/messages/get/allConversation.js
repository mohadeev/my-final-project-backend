// import express from "express";
// import mongoose from "mongoose";
// import converstionsModal from "../../../db/schema/converstionsModal.js";
// import findUserDataById from "../../../utils/mogoose/findUserDataById.js";
// import userModel from "../../../db/schema/userModel.js";
// import messageModel from "../../../db/schema/messageModel.js";
// const allConversation = express.Router();

// allConversation.get("/", async (req, res) => {
//   const reqUserId = req.userId;
//   var converData = [];
//   // console.log("this is the use Id", reqUserId);
//   if (mongoose.Types.ObjectId.isValid(reqUserId)) {
//     converstionsModal.find({}).then((docs) => {
//       // console.log("docs", docs);
//     });
//     await userModel.findOne({ _id: reqUserId }).then(async (userVerfied) => {
//       // console.log("this is the user doc", userVerfied);
//       if (userVerfied) {
//         try {
//           await converstionsModal
//             .find({
//               members: { $all: [reqUserId] },
//             })
//             .then(async (document) => {
//               // console.log("convers", document);
//               await Promise.all(
//                 document.map(async (conv) => {
//                   const conversId = conv._id;
//                   const friendIdFind = conv.members.filter(
//                     (userId) => userId !== reqUserId
//                   );
//                   const fiendId = friendIdFind[0];
//                   let friendData = await findUserDataById("_id", fiendId).then(
//                     (data) => data
//                   );
//                   messageModel
//                     .findOne({ conversationId: conversId })
//                     .sort({ createdAt: -1 })
//                     .exec((err, doc) => {
//                       if (err) {
//                         console.error(err);
//                       } else {
//                         converData.push({
//                           conversationData: conv,
//                           userData: friendData,
//                           // lastMessage: doc,
//                         });
//                         // console.log('Latest document:', doc);
//                       }
//                     });
//                   // const latestDoc = await messageModel
//                   //   .findOne({ conversationId: conversId })
//                   //   .sort({ createdAt: -1 })
//                   //   .exec();
//                   // console.log("latestDoc", latestDoc);
//                 })
//               );
//               // converData.sort(
//               //   (x, y) =>
//               //     -new Date(x.lastMessage.createdAt) -
//               //     -new Date(y.lastMessage.createdAt)
//               // );
//               console.log("converData", converData.length);
//               res.status(200).json({
//                 responseData: { allConversation: converData },
//               });
//             });
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       }
//     });
//   }
// });

// // converData.sort(
// //   (x, y) =>
// //     -new Date(x.lastmessage.createdAt) -
// //     -new Date(y.lastmessage.createdAt)
// // );
// export default allConversation;

import express from "express";
import mongoose from "mongoose";
import converstionsModal from "../../../db/schema/converstionsModal.js";
import findUserDataById from "../../../utils/mogoose/findUserDataById.js";
import userModel from "../../../db/schema/userModel.js";
import messageModel from "../../../db/schema/messageModel.js";

const allConversation = express.Router();

allConversation.get("/", async (req, res) => {
  const reqUserId = req.userId;
  const converData = [];

  if (mongoose.Types.ObjectId.isValid(reqUserId)) {
    try {
      const userVerified = await userModel.findOne({ _id: reqUserId });

      if (userVerified) {
        const documents = await converstionsModal.find({
          members: { $all: [reqUserId] },
        });

        await Promise.all(
          documents.map(async (conv) => {
            const conversId = conv._id;
            const friendIdFind = conv.members.filter(
              (userId) => userId !== reqUserId
            );
            const friendId = friendIdFind[0];
            const friendData = await findUserDataById("_id", friendId);

            const lastMessage = await messageModel
              .findOne({ conversationId: conversId })
              .sort({ createdAt: -1 })
              .exec();

            converData.push({
              conversationData: conv,
              userData: friendData,
              lastMessage: lastMessage,
            });
          })
        );

        // converData.sort(
        //   (x, y) => y?.lastMessage?.createdAt - x?.lastMessage?.createdAt
        // );
        converData.sort((x, y) => {
          const dateX = x.lastMessage?.createdAt;
          const dateY = y.lastMessage?.createdAt;
          if (!dateX) return 1; // x should be placed at the end
          if (!dateY) return -1; // y should be placed at the end
          return new Date(dateY) - new Date(dateX);
        });

        res.status(200).json({
          responseData: { allConversation: converData },
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid user ID" });
  }
});

export default allConversation;
