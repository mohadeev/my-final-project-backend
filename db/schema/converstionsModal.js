import mongoose from "mongoose";

const conversionSchema = mongoose.Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

const conversionsModal = mongoose.model("conversion", conversionSchema);
export default conversionsModal;
