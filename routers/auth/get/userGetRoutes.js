import express from "express";
import verifyUser from "../../../utils/verify-user/verifyUser.js";
import getUserData from "./getUserData.js";

const userGetRoutes = express.Router();

const allRoutes = [
  {
    name: getUserData,
    auth: true,
    rout: "/user-data",
  },
];

allRoutes.map(({ name, auth, rout }) => {
  if (auth) {
    if (rout.length >= 2) {
      userGetRoutes.use(`/get/user${rout}/:token`, verifyUser, name);
    } else {
      userGetRoutes.use("/", verifyUser, name);
    }
  } else {
    if (rout.length >= 2) {
      userGetRoutes.use(`/get/user/${rout}`, name);
    } else {
      userGetRoutes.use("/", name);
    }
  }
});

export default userGetRoutes;
