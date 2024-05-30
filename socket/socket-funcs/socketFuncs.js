// import sendToReciever from "./sendToReciever.js";
// import sendToSender from "./sendToSender.js";
// import typing from "./typing.js";
var allusers = [];
const addUser = (userId, socketId) => {
  if (userId) {
    allusers.push({ userId: userId, socketId: socketId });
  }
};
const removeUser = (socketId) => {
  allusers = allusers.filter((user) => user.socketId !== socketId);
};
const socketFuncs = (io, socket) => {
  socket.on("get-id", (userid) => {
    // console.log("add added from email :", userid);
    addUser(userid, socket.id);
  });
  socket.on("typing-message", (userid) => {
    // console.log("typing", userid);
  });

  //FDg`psdv`

  socket.on(
    "send-message",
    async ({ sender, conversationId, isfirstmmessage, receiver, text }) => {
      sendToReciever(
        sender,
        conversationId,
        receiver,
        text,
        isfirstmmessage,
        allusers,
        io
      );
      sendToSender(
        sender,
        conversationId,
        receiver,
        text,
        isfirstmmessage,
        allusers,
        io
      );
    }
  );
  //fg
  socket.on("typing-message", async ({ conversationId, receiver }) => {
    typing(conversationId, receiver, allusers, io);
  });
  const uniq = {};
  const FilteredUsers = allusers.filter(
    (obj) => !uniq[obj.userId] && (uniq[obj.userId] = true)
  );
  io.emit("get-online-users", FilteredUsers);
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("get-online-users", allusers);
  });
};

export default socketFuncs;
