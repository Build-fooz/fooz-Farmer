const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const draftSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    userId: { 
      type: String, 
      required: true,
      index: true // Adding index for faster queries by userId
    },
    productName: { 
      type: String
    },
    quantity: { 
      type: Number
    },
    unit: { 
      type: String,
      enum: ['kg', 'g', 'lb'] // Restrict to valid units
    },
    size: { 
      type: String,
      enum: ['small', 'medium', 'large'] // Restrict to valid sizes
    },
    sellingPrice: { 
      type: Number
    },
    specialNotes: { 
      type: String 
    },
    sellTo: { 
      type: String
    },
    // New fields for image support
    image: {
      url: { type: String }, // Cloud storage URL
      publicId: { type: String }, // For cloud service reference (like Cloudinary ID)
      alt: { type: String }
    },
    // Draft specific fields
    isDraft: { 
      type: Boolean, 
      default: true 
    },
    lastEdited: {
      type: Date,
      default: Date.now
    }
  },
  { 
    timestamps: true 
  }
);

// Create indexes for common query patterns
draftSchema.index({ userId: 1, isDraft: 1 });

// Ensure the model is only registered once
const Draft = mongoose.models.Draft || mongoose.model("Draft", draftSchema);

module.exports = Draft;