import jwt from "jsonwebtoken";
import cookie from "cookie";
const verifyUserLocalReqCookie = async (req, res, next) => {
  const usertoken = req.headers.usertoken;
  const userId = usertoken?.replace("Bearer ", "");
  const userCookie =
    userId && userId !== "undefined" && typeof userId !== undefined
      ? JSON.parse(userId)
      : {};
  const userAccessToken = userCookie?.accessToken || "Guest";
  if (userAccessToken !== "undefined" && userAccessToken.length > 20) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(userAccessToken, accessTokenSecret, function (err, decoded) {
      if (!err) {
        // console.log("user id", decoded);
        req.userId = decoded;
        next();
        return decoded;
      } else if (err) {
        console.log("user not finded", decoded);
        next();
        return null;
      }
    });
  } else {
    console.log("user is not finded");
    next();
  }
};

export default verifyUserLocalReqCookie;
