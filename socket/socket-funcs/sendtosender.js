import conversionsModal from "../../db/schema/converstionsModal.js";
import userModel from "../../db/schema/userModel.js";

let newRoomData = {};

const newRoom = async (conversationId, receiver, sender, text) => {
  await userModel.findOne({ email: receiver }).then(async (userdoc) => {
    if (userdoc) {
      const friendPersonaldata = await userdoc;
      let friendData = await userdoc;
      const username = friendData.username;
      let avatar = friendData.avatar;
      let name = friendPersonaldata.name;
      const Convers = await conversionsModal.findOne({
        _id: conversationId,
      });
      Convers.members = [];
      if (Convers.members.length < 1) {
        Convers.members = [receiver, sender];
      }

      newRoomData = {
        conversation: Convers,
        lastmessage: text,
        frienddata: { name: name, avatar: avatar, username: username },
      };
    }
  });
};

const sendtosender = async (
  sender,
  conversationId,
  receiver,
  text,
  isfirstmmessage,
  allusers,
  io
) => {
  let senderId = allusers.filter((send) => send?.userId === sender);
  await newRoom(conversationId, receiver, sender, text);
  senderId.reverse();
  if (senderId.length >= 1) {
    senderId.map((user) => {
      if (isfirstmmessage) {
        io.to(user?.socketId).emit("get-message", {
          sender,
          text: text,
          conversationId,
          isfirstmmessage,
          roomdate: newRoomData,
        });
      } else {
        io.to(user?.socketId).emit("get-message", {
          sender,
          text: text,
          conversationId,
          isfirstmmessage,
        });
      }
    });
  }
};

export default sendtosender;
