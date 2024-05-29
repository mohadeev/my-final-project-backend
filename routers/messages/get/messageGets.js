import express from "express";
import verifyUser from "../../../utils/verify-user/verifyUser.js";
import allConversation from "./allConversation.js";
import allMessages from "./allMessages.js";

const messageGets = express.Router();

const allRoutes = [
  {
    name: allConversation,
    auth: true,
    rout: "/all-conversation",
  },
  {
    name: allMessages,
    auth: false,
    rout: "",
  },
  ,
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout.length >= 2) {
      messageGets.use(`/get/message${rout}`, verifyUser, name);
    } else {
      messageGets.use("/", verifyUser, name);
    }
  } else {
    if (rout.length >= 2) {
      messageGets.use(`/get/message/${rout}`, name);
    } else {
      messageGets.use("/", name);
    }
  }
});

export default messageGets;
