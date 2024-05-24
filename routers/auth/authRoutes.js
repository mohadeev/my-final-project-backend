import express from "express";
import userGetRoutes from "./get/userGetRoutes.js";
import routerSignIn from "./signin/signin.js";
import routerSignUp from "./signup/signup.js";
import authRouterPost from "./post/authRouterPost.js";

const routesAuth = express.Router();

routesAuth.use("/auth/sign-in", routerSignIn);
routesAuth.use("/auth/sign-up", routerSignUp);
routesAuth.use("/auth/", authRouterPost);

routesAuth.use("/", userGetRoutes);

export default routesAuth;
