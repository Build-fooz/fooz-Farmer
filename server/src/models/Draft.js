const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const draftSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    userId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    size: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    specialNotes: { type: String },
    sellTo: { type: String, required: true },
    isDraft: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ Prevent re-registration using mongoose.models
const Draft = mongoose.models.Draft || mongoose.model("Draft", draftSchema);

module.exports = Draft;
