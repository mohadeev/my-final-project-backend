import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import http from "http";
import { Server, Socket } from "socket.io";
import Router from "./socket/routers/Router.js";
import socketFuncs from "./socket/socket-funcs/socketFuncs.js";
import userModal from "./db/schema/userModal.js";

dotenv.config();
const ORIGIN = process.env.ORIGIN;
app.use(express.json());
dbConnect();
const server = http.createServer(app);
//
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const io = new Server(server, {
  cors: {
    origins: [`${ORIGIN}`],
  },
});

io.on("connection", (socket) => {
  socketFuncs(io, socket);
  console.log("new user connected");
});

// app.use(
//   bodyParser.json({
//     limit: "50mb",
//   })
// );

app.use("/", Router);
app.get("/api/user/senduser", (req, res) => {
  console.log("users");
  userModal.find({}).then((users) => {
    console.log("users", users);
    res.json({ data: users });
  });
});

//
app.get("/", (req, res) => {
  console.log("users");
  res.json({ data: "DF" });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
