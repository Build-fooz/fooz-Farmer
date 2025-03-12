const Product = require("../models/Product");

// ✅ Import Draft only once
const Draft = require("../models/Draft");

const { v4: uuidv4 } = require('uuid');

exports.createProduct = async (req, res) => {
  try {
    // ✅ Extract userId from the request body
    const { productName, quantity, unit, size, sellingPrice, specialNotes, sellTo, userId } = req.body;

    // ✅ Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const product = new Product({
      uuid: uuidv4(), // Generate UUID here
      productName,
      quantity,
      unit,
      size,
      sellingPrice,
      specialNotes,
      sellTo,
      userId, // ✅ Include userId here
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.saveDraft = async (req, res) => {
  try {
    const { userId, productName, quantity, unit, size, sellingPrice, specialNotes, sellTo } = req.body;

    const draft = new Draft({
      uuid: uuidv4(), // Generate UUID here
      userId,
      productName,
      quantity,
      unit,
      size,
      sellingPrice,
      specialNotes,
      sellTo,
      isDraft: true, // Mark as draft
    });

    const savedDraft = await draft.save();

    res.status(201).json({
      message: "Draft saved successfully",
      draft: savedDraft,
    });
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ message: "Failed to save draft" });
  }
};


// controllers/productController.js

exports.getDrafts = async (req, res) => {
  const { userId } = req.params;
  try {
    // ✅ Validate userId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // ✅ Find drafts for the user and ensure `uuid` is populated
    const drafts = await Draft.find({ userId, isDraft: true }).select('-__v'); // Exclude MongoDB metadata
    if (!drafts || drafts.length === 0) {
      return res.status(404).json({ message: "No drafts found for this user." });
    }

    // ✅ Normalize and include `uuid`
    const normalizedDrafts = drafts.map(draft => ({
      ...draft._doc,
      uuid: draft.uuid || draft._id.toString(),
    }));

    res.status(200).json(normalizedDrafts);
  } catch (error) {
    console.error("Error fetching drafts:", error);
    res.status(500).json({ message: "Failed to fetch drafts" });
  }
};




exports.deleteDraft = async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({ message: 'Invalid draft UUID' });
    }

    // ✅ Try to find and delete using `uuid`
    const deletedDraft = await Draft.findOneAndDelete({ uuid });

    if (!deletedDraft) {
      return res.status(404).json({ message: 'Draft not found' });
    }

    res.status(200).json({ message: 'Draft deleted successfully' });
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.listDraft = async (req, res) => {
  try {
    const { uuid } = req.params;
    
    if (!uuid) {
      return res.status(400).json({ message: 'Invalid draft UUID' });
    }

    // ✅ Find draft by uuid
    const draft = await Draft.findOne({ uuid });
    if (!draft) {
      return res.status(404).json({ message: 'Draft not found' });
    }

    // ✅ Create a new product using draft data
    const product = new Product({
      uuid: draft.uuid,
      userId: draft.userId,
      productName: draft.productName,
      quantity: draft.quantity,
      unit: draft.unit,
      size: draft.size,
      sellingPrice: draft.sellingPrice,
      specialNotes: draft.specialNotes,
      sellTo: draft.sellTo,
    });

    // ✅ Save product to Product collection
    await product.save();

    // ✅ Delete draft after successful save
    await Draft.deleteOne({ uuid });

    res.status(201).json({
      message: 'Draft listed successfully',
      product,
    });
  } catch (error) {
    console.error('Error listing draft:', error);
    res.status(500).json({ message: 'Failed to list draft', error: error.message });
  }
};