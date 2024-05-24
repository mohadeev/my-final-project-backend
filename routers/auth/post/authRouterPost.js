import express from "express";
import verifyUser from "../../../utils/verify-user/verifyUser.js";
import updateAccountData from "./updateAccountData.js";
const authRouterPost = express.Router();

const allRoutes = [
  {
    name: updateAccountData,
    auth: true,
    rout: "/create-conversation",
  },

];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout.length >= 2) {
      authRouterPost.use(`/post/message${rout}/:token`, verifyUser, name);
    } else {
      authRouterPost.use("/", verifyUser, name);
    }
  } else {
    if (rout.length >= 2) {
      authRouterPost.use(`/post/message/${rout}/`, name);
    } else {
      authRouterPost.use("/", name);
    }
  }
});

export default authRouterPost;
