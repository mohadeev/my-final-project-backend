import express from "express";
import userGetRoutes from "./get/userGetRoutes.js";
import routerSignIn from "./post/signin/signInRouter.js";
// import signUpRouter from "./signup/signUpRouter.js";
import authRouterPost from "./post/authRouterPost.js";
import signUpRouter from "./post/signup/signUpRouter.js";

const routesAuth = express.Router();

routesAuth.use("/auth/sign-in", routerSignIn);
routesAuth.use("/auth/sign-up", signUpRouter);
routesAuth.use("/auth/", authRouterPost);
routesAuth.use("/", userGetRoutes);

export default routesAuth;
