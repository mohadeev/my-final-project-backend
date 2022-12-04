import express from "express";
// import messageGets from "./get/messageGets.js";
// import messagePosts from "./post/messagePosts.js";
const messageRoutes = express.Router();

// messageRoutes.use("/", messageGets);
// messageRoutes.use("/", messagePosts);

messageRoutes.get("/api/msg", (req, res) => {
  res.json("sdpo");
});

export default messageRoutes;
