import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import http from "http";
import { Server, Socket } from "socket.io";
import Router from "./routers/Router.js";
import socketFuncs from "./socket/socket-funcs/socketFuncs.js";

dotenv.config();
const ORIGIN = process.env.ORIGIN;
app.use(express.json());
dbConnect();
const server = http.createServer(app);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, X-Requested-With, Authorization, Content-Type, Accept, UserToken"
  );
  next();
});
const io = new Server(server, {
  cors: {
    origins: "*",
  },
});

io.on("connection", (socket) => {
  socketFuncs(io, socket);
});

app.use("/", Router);
app.get("/", (req, res) => {
  res.json("Hello world!");
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});

// import express from "express";
// const app = express();
// const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
