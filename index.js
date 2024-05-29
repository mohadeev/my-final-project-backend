// import express from "express";
// const app = express();
// const PORT = process.env.PORT || 5000;
// import dotenv from "dotenv";
// import dbConnect from "./db/dbConnect.js";
// import { body, validationResult } from "express-validator";
// import http from "http";
// import { Server, Socket } from "socket.io";
// import Router from "./routers/Router.js";
// import socketFuncs from "./socket/socket-funcs/socketFuncs.js";
// import userModel from "./db/schema/userModel.js";

// dotenv.config();
// const ORIGIN = process.env.ORIGIN;
// app.use(express.json());
// dbConnect();
// const server = http.createServer(app);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization , UserToken"
//   );
//   next();
// });
// const io = new Server(server, {
//   cors: {
//     origins: [`${ORIGIN}`],
//     allowedHeaders: "Content-Type,Authorization , UserToken",
//   },
// });

// io.on("connection", (socket) => {
//   socketFuncs(io, socket);
// });

// app.post(
//   "/api/user",
//   [
//     body("username")
//       .optional()
//       .isString()
//       .withMessage("Username must be a string"),
//     body("businessDescription")
//       .optional()
//       .isString()
//       .withMessage("Business description must be a string"),
//     body("title").optional().isString().withMessage("Title must be a string"),
//     body("businessAddress")
//       .optional()
//       .isString()
//       .withMessage("Business address must be a string"),
//     body("emailAddress")
//       .optional()
//       .isEmail()
//       .withMessage("Email address must be valid"),
//     body("website")
//       .optional()
//       .isURL()
//       .withMessage("Website must be a valid URL"),
//   ],
//   async (req, res) => {
//     // Validate input
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { userId } = req; // Assuming userId is set in the req object by middleware/authentication
//     const {
//       username,
//       businessDescription,
//       title,
//       businessAddress,
//       emailAddress,
//       website,
//     } = req.body;

//     try {
//       // Find and update the user
//       const updatedUser = await userModel.findByIdAndUpdate(
//         userId,
//         {
//           username,
//           businessDescription,
//           title,
//           businessAddress,
//           emailAddress,
//           website,
//         },
//         { new: true, runValidators: true } // Return the updated document and run validators
//       );

//       if (!updatedUser) {
//         return res.status(404).send({ message: "User not found" });
//       }

//       res.status(200).send(updatedUser);
//     } catch (error) {
//       res.status(500).send({ message: "Server error", error });
//     }
//   }
// );

// app.use("/", Router);
// app.get("/api/user/senduser", (req, res) => {
//   userModel.find({}).then((users) => {
//     console.log("users", users);
//     res.json({ data: users });
//   });
// });

// //
// app.get("/", (req, res) => {
//   res.json({ data: "" });
// });

// server.listen(PORT, (err) => {
//   if (err) console.log(err);
//   console.log("Server running on Port ", PORT);
// });

import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
