const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    uuid: { 
      type: String, 
      required: true, 
      unique: true 
    },
    userId: { 
      type: String, 
      required: true,
      index: true // Adding index for faster queries by userId
    },
    productName: { 
      type: String, 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true 
    },
    unit: { 
      type: String, 
      required: true,
      enum: ['kg', 'g', 'lb'] // Restrict to valid units
    },
    size: { 
      type: String, 
      required: true,
      enum: ['small', 'medium', 'large'] // Restrict to valid sizes
    },
    sellingPrice: { 
      type: Number, 
      required: true 
    },
    specialNotes: { 
      type: String 
    },
    sellTo: { 
      type: String, 
      required: true 
    },
    // New fields for image support
    image: {
      url: { type: String }, // Cloud storage URL
      publicId: { type: String }, // For cloud service reference (like Cloudinary ID)
      alt: { type: String }
    },
    // Added status field for tracking product lifecycle
    status: {
      type: String,
      enum: ['active', 'sold', 'removed'],
      default: 'active'
    },
    // Additional metadata fields
    tags: [String], // For categorization and searching
    views: { type: Number, default: 0 },
    createdBy: { type: String } // For audit purposes
  },
  { 
    timestamps: true 
  }
);

// Create indexes for common query patterns
productSchema.index({ productName: 1 });
productSchema.index({ status: 1 });

// Ensure the model is only registered once
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
