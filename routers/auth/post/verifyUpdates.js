import mongoose from "mongoose";
import userModel from "../../../db/schema/userModel.js";
import bcrypt from "bcrypt";

const verifyUpdates = async (res, userId, bodyData, docadded) => {
  // const filter = { _id: channelId };
  const userIdObj = mongoose.Types.ObjectId(userId);
  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function isNotRepeating(str) {
    // Create a new string by repeating the first character of the original string
    const repeatedStr = str.charAt(0).repeat(str.length);

    // Compare the two strings
    if (repeatedStr === str) {
      // The original string is composed of repeating characters only
      return false;
    } else {
      // The original string contains more than one unique character
      return true;
    }
  }

  const email = bodyData.email?.trim();
  let password = bodyData.password;
  const confirmpassword = bodyData.confirmpassword;
  const username = bodyData.username;
  let error = false;
  let message = "";

  if (email) {
    const countOfVideosNeedToUplaodTAws = await userModel.countDocuments({
      email: email,
      _id: { $ne: userIdObj },
    });
    if (countOfVideosNeedToUplaodTAws >= 1) {
      error = true;
      console.log("text not email");
      message = "AvalibleEmail";
    } else if (countOfVideosNeedToUplaodTAws <= 0) {
      console.log("isValidEmail", isValidEmail);
      if (isValidEmail(email)) {
        console.log("change email here", email, isValidEmail(email));
        error = false;
      } else {
        error = true;
        console.log("text not email");
        message = "RandomTextNotEmailAdress";
      }
    }
  } else {
    console.log("email not added");
    // message = "RandomTextNotEmailAdress";
  }

  if (username) {
    if (username.length > 30) {
      message = "LongUserName";
      error = true;
    }
  }
  if (password || confirmpassword) {
    if (password != confirmpassword) {
      message = "PasswordNotMatch";
      error = true;
    } else if (!isNotRepeating(password)) {
      message = "ChooseStrongPassword";
      error = true;
    }
    if (password?.length <= 7) {
      error = true;
      message = "ShortPassWord";
    }
  }

  if (email || password || username || confirmpassword) {
    if (error) {
      console.log("error finded here", message);
      res.json({
        responseData: { error: error, data: "yes error", message: message },
      });
    } else {
      console.log("no error");
      if (email) {
        docadded.email = email;
      }
      if (username) {
        docadded.username = username;
      }
      console.log("befor", docadded.password);

      if (password) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        password = hashPassword;
        docadded.password = hashPassword;
      }
      console.log("email", docadded.email);
      const filter = { _id: docadded._id };
      console.log("filter", filter);
      try {
        await userModel.updateOne(filter, docadded);
        //User.findOne({ _id: userId }).then(async (docadded) => {
      } catch (error) {
        console.log("error", error);
      }

      res.json({ responseData: { error: false } });
    }
  } else {
    res.json({ error: error, data: "nothing added" });
  }
};
export default verifyUpdates;

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
