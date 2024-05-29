const sendToReciever = async (conversationId, receiver, allusers, io) => {
  let receiverid = allusers.filter((send) => send?.userId === receiver);
  receiverid.reverse();
  if (receiverid.length >= 1) {
    receiverid.map((user) => {
      io.to(user?.socketId).emit("typing", {
        typing: true,
        conversationId: conversationId,
      });
    });
  }
};

export default sendToReciever;
