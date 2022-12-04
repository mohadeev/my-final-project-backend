import Converstion from "../../db/schema/Converstions.js";

const sendmessage = (socket, AllUsers, io) => {
  socket.on("send-messageto-user", async (data) => {
    // const daddd = await Converstion.findOne({
    //   _id: data.conversationId,
    // });

    io.to(data.conversationId).emit("get-message", data);
    // console.log(AllUsers);
    const receiver = data.receiver.toString("");
    const sender = data.sender.toString("");
    const sendersid = AllUsers.filter((user) => (user.userid = sender));
    const revieverid = AllUsers.filter((user) => (user.userid = receiver));

    console.log("reviever:", revieverid);
    console.log("sender:", sendersid);

    revieverid.map((Reviever) => {
      console.log(" message sent to :", Reviever.socketid);
      io.to(Reviever.socketid).emit("get-message", data);
    });
    sendersid.map((Senders) => {
      console.log(" message sent to :", Senders.socketid);
      io.to(Senders.socketid).emit("get-message1", data);
    });

    // socket.to(data.conversationId).emit("get-message1", data);
    // socket.emit("get-message2", data);
    // socket.broadcast.to(data.conversationId).emit("get-message3", data);
    // // socket.broadcast.emit("get-message4", data);
    // io.in(data.conversationId).emit("get-message5", data);
    // console.log("heyyyyy:", AllUsers);
    // console.log(data.conversationId);
  });
};
export default sendmessage;
