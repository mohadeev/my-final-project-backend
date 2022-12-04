import express from "express";
import authRoutes from "./auth/authRoutes.js";
// import messageRoutes from "./messages/messageRoutes.js";
const Router = express.Router();

// Router.use("/api", messageRoutes);
Router.use("/api", authRoutes);
Router.get("/api", (req, res) => {
  res.json("sdpo");
});
export default Router;
