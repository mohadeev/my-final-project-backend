import dotenv from "dotenv";
import cloudinaryMain from "cloudinary";

dotenv.config();
cloudinaryMain.config({
  cloud_name: "dz1jnfe0r",
  api_key: "459441233673351",
  api_secret: "NWdwzzsaQmGla7my6PYA_R6rNrY",
  cloudinary_url:
    "cloudinary://459441233673351:NWdwzzsaQmGla7my6PYA_R6rNrY@dz1jnfe0r",
});

export default cloudinaryMain;

// async function someAsyncFunction() {
//   try {
//     // Your async code here
//   } catch (error) {
//     // Handle the error
//   }
// }
