import mongoose from "mongoose";

const conversionSchema = mongoose.Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

const converstionsModal = mongoose.model("conversion", conversionSchema);
export default converstionsModal;
