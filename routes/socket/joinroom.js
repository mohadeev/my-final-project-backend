import Message from "../../db/schema/Message.js";
import Converstion from "../../db/schema/Converstions.js";
import mongoose from "mongoose";

const joinroom = async (socket, AllUsers, io) => {
  socket.on("create", async (room) => {
    const roomid = room.room;
    const userid = room.userid;
    if (
      mongoose.Types.ObjectId.isValid(roomid) &&
      mongoose.Types.ObjectId.isValid(userid) &&
      roomid.length >= 12 &&
      roomid.length <= 24 &&
      typeof userid !== "undefined"
    ) {
      try {
        await Converstion.findOne({ conversationId: roomid }).then(
          (conversation) => {
            if (conversation) {
              if (conversation.members.includes(userid)) {
                // console.log("from here");
                socket.join(room.room);
              } else {
                // console.log("not from here");
              }
            } else {
              // console.log("not from here");
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    // console.log(room.room, room.userid, socket.id);
  });
};
export default joinroom;
