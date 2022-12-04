import express from "express";
import verifyUser from "../../../../utils/verify-user/verifyUser.js";
import createConversation from "./createConversation.js";
// import createMessage from "./createMessage.js";
const messagePosts = express.Router();

messagePosts.use("/", verifyUser, createConversation);
// messagePosts.use("/", verifyUser, createMessage);

// const allRoutes = [
//   {
//     name: createConversation,
//     auth: true,
//     rout: "/create-conversation",
//   },
//   {
//     name: createMessage,
//     auth: true,
//     rout: "/create-message",
//   },
// ];

// allRoutes.map(({ name, auth, rout }) => {
//   if (auth) {
//     if (rout.length >= 2) {
//       messagePosts.use(`/post/message${rout}/:token`, verifyUser, name);
//     } else {
//       messagePosts.use("/", verifyUser, name);
//     }
//   } else {
//     if (rout.length >= 2) {
//       messagePosts.use(`/post/message/${rout}/`, name);
//     } else {
//       messagePosts.use("/", name);
//     }
//   }
// });

export default messagePosts;
