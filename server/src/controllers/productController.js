const Product = require("../models/Product");
const Draft = require("../models/Draft");
const Analytics = require("../models/Analytics");

const { v4: uuidv4 } = require('uuid');
const { uploadProductImage } = require("../utils/fileUpload");

// Helper function to update user analytics
const updateUserAnalytics = async (userId) => {
  try {
    // Count user's products and drafts
    const productsCount = await Product.countDocuments({ userId });
    const draftsCount = await Draft.countDocuments({ userId });
    
    // Update or create analytics document
    await Analytics.findOneAndUpdate(
      { userId },
      { 
        productsListed: productsCount,
        draftListings: draftsCount,
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );
    
    console.log(`Analytics updated for user ${userId}: Products=${productsCount}, Drafts=${draftsCount}`);
  } catch (error) {
    console.error(`Error updating analytics for user ${userId}:`, error);
    // Don't throw to prevent interrupting the main operation
  }
};

// Authentication middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(' ')[1];
  try {
    // In a real implementation, you would verify the token here
    // For example: const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // For now we'll just check if it exists
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    // Set userId from token payload in a real implementation
    // For now, we'll use the one from the request body
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};

/**
 * Create a new product
 * @route POST /api/products
 */
exports.createProduct = [
  verifyToken,
  async (req, res) => {
    try {
      // Extract data from request body
      const { 
        productName, 
        quantity, 
        unit, 
        size, 
        sellingPrice, 
        specialNotes, 
        sellTo, 
        userId,
        image
      } = req.body;

      // Validate required fields
      if (!productName || !quantity || !sellingPrice || !userId) {
        return res.status(400).json({ 
          message: "Missing required fields", 
          required: ["productName", "quantity", "sellingPrice", "userId"] 
        });
      }

      // Generate a new product UUID
      const productUuid = uuidv4();
      
      // Handle image upload if provided
      let imageData = null;
      if (image) {
        try {
          // Upload the image and get the URL
          const imageUrl = await uploadProductImage(image, productUuid);
          imageData = {
            url: imageUrl,
            alt: productName
          };
          console.log("Product image uploaded:", imageUrl);
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          // Continue without image if upload fails
        }
      }

      // Create a new product instance
      const product = new Product({
        uuid: productUuid,
        userId,
        productName,
        quantity: Number(quantity),
        unit,
        size,
        sellingPrice: Number(sellingPrice),
        specialNotes,
        sellTo,
        image: imageData,
        createdBy: userId,
        status: 'active'
      });

      // Save the product to the database
      const savedProduct = await product.save();
      
      // Update analytics
      await updateUserAnalytics(userId);

      // Return success response
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: savedProduct
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create product", 
        error: error.message 
      });
    }
  }
];

/**
 * Save product as draft
 * @route POST /api/products/draft
 */
exports.saveDraft = [
  verifyToken,
  async (req, res) => {
    try {
      // Extract data from request body
      const { 
        userId, 
        productName, 
        quantity, 
        unit, 
        size, 
        sellingPrice, 
        specialNotes, 
        sellTo,
        image
      } = req.body;

      // Validate userId is provided
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      // Generate a new draft UUID
      const draftUuid = uuidv4();
      
      // Handle image upload if provided
      let imageData = null;
      if (image) {
        try {
          // Upload the image and get the URL - using draft prefix
          const imageUrl = await uploadProductImage(image, `draft-${draftUuid}`);
          imageData = {
            url: imageUrl,
            alt: productName || 'Draft product'
          };
          console.log("Draft image uploaded:", imageUrl);
        } catch (uploadError) {
          console.error("Error uploading draft image:", uploadError);
          // Continue without image if upload fails
        }
      }

      // Create a new draft object
      const draft = new Draft({
        uuid: draftUuid,
        userId,
        productName,
        quantity: quantity ? Number(quantity) : null,
        unit,
        size,
        sellingPrice: sellingPrice ? Number(sellingPrice) : null,
        specialNotes,
        sellTo,
        image: imageData,
        isDraft: true,
        lastEdited: new Date()
      });

      // Save the draft to the database
      const savedDraft = await draft.save();
      
      // Update analytics
      await updateUserAnalytics(userId);

      // Return success response
      res.status(201).json({
        success: true,
        message: "Draft saved successfully",
        draft: savedDraft
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to save draft", 
        error: error.message 
      });
    }
  }
];

/**
 * Get all drafts for a user
 * @route GET /api/products/drafts/:userId
 */
exports.getDrafts = [
  verifyToken,
  async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      // Find all drafts for the user
      const drafts = await Draft.find({ 
        userId, 
        isDraft: true 
      }).sort({ lastEdited: -1 });

      // If no drafts found, return empty array
      if (!drafts || drafts.length === 0) {
        return res.status(200).json({
          success: true, 
          message: "No drafts found", 
          drafts: []
        });
      }

      // Return success response with drafts
      res.status(200).json({
        success: true,
        count: drafts.length,
        drafts
      });
    } catch (error) {
      console.error("Error fetching drafts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch drafts", 
        error: error.message 
      });
    }
  }
];

/**
 * Delete a draft
 * @route DELETE /api/products/draft/:uuid
 */
exports.deleteDraft = [
  verifyToken,
  async (req, res) => {
    try {
      const { uuid } = req.params;

      // Validate uuid
      if (!uuid) {
        return res.status(400).json({ message: "Draft UUID is required" });
      }

      // Find the draft to get userId before deletion
      const draft = await Draft.findOne({ uuid });
      
      // If draft not found, return error
      if (!draft) {
        return res.status(404).json({ 
          success: false, 
          message: "Draft not found" 
        });
      }
      
      const userId = draft.userId;
      
      // Delete the draft
      await Draft.deleteOne({ uuid });

      // Update analytics after deletion
      await updateUserAnalytics(userId);

      // Return success response
      res.status(200).json({
        success: true,
        message: "Draft deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting draft:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete draft", 
        error: error.message 
      });
    }
  }
];

/**
 * Convert a draft to a product
 * @route POST /api/products/draft/:uuid/publish
 */
exports.publishDraft = [
  verifyToken,
  async (req, res) => {
    try {
      const { uuid } = req.params;
      
      // Validate uuid
      if (!uuid) {
        return res.status(400).json({ message: "Draft UUID is required" });
      }

      // Find the draft
      const draft = await Draft.findOne({ uuid });
      
      // If draft not found, return error
      if (!draft) {
        return res.status(404).json({ 
          success: false, 
          message: "Draft not found" 
        });
      }

      // Validate draft has required fields for a product
      if (!draft.productName || !draft.quantity || !draft.sellingPrice) {
        return res.status(400).json({ 
          success: false, 
          message: "Draft is incomplete. Required fields: productName, quantity, sellingPrice" 
        });
      }

      // Generate a new UUID for the product
      const productUuid = uuidv4();
      
      // Process the image if present in the draft
      let productImage = null;
      if (draft.image && draft.image.url) {
        // For our mock implementation, we'll just update the URL
        // In a real implementation with cloud storage, you might need to:
        // 1. Copy the file to a new location
        // 2. Delete the draft image
        // 3. Update the URL
        
        const oldUrl = draft.image.url;
        const newUrl = oldUrl.replace('draft-', 'product-');
        
        productImage = {
          url: newUrl,
          alt: draft.image.alt || draft.productName
        };
        
        console.log(`Image URL updated from ${oldUrl} to ${newUrl}`);
      }

      // Create a new product from the draft data
      const product = new Product({
        uuid: productUuid, // Generate a new UUID for the product
        userId: draft.userId,
        productName: draft.productName,
        quantity: draft.quantity,
        unit: draft.unit,
        size: draft.size,
        sellingPrice: draft.sellingPrice,
        specialNotes: draft.specialNotes,
        sellTo: draft.sellTo,
        image: productImage,
        createdBy: draft.userId,
        status: 'active'
      });

      // Save the product
      const savedProduct = await product.save();

      // Delete the draft
      await Draft.deleteOne({ uuid });
      
      // Update analytics after publishing
      await updateUserAnalytics(draft.userId);

      // Return success response
      res.status(201).json({
        success: true,
        message: "Draft published as product successfully",
        product: savedProduct
      });
    } catch (error) {
      console.error("Error publishing draft:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to publish draft", 
        error: error.message 
      });
    }
  }
];

/**
 * Get all products for a user
 * @route GET /api/products/user/:userId
 */
exports.getUserProducts = [
  verifyToken,
  async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }

      // Find all products for the user
      const products = await Product.find({ 
        userId, 
        status: { $ne: 'removed' } 
      }).sort({ createdAt: -1 });

      // If no products found, return empty array
      if (!products || products.length === 0) {
        return res.status(200).json({
          success: true, 
          message: "No products found", 
          products: []
        });
      }

      // Return success response with products
      res.status(200).json({
        success: true,
        count: products.length,
        products
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products", 
        error: error.message 
      });
    }
  }
];

/**
 * Update product status (mark as sold or remove)
 * @route PATCH /api/products/:uuid/status
 */
exports.updateProductStatus = [
  verifyToken,
  async (req, res) => {
    try {
      const { uuid } = req.params;
      const { status } = req.body;
      
      // Validate uuid and status
      if (!uuid) {
        return res.status(400).json({ message: "Product UUID is required" });
      }
      
      if (!status || !['active', 'sold', 'removed'].includes(status)) {
        return res.status(400).json({ 
          message: "Valid status is required", 
          allowedValues: ['active', 'sold', 'removed'] 
        });
      }

      // Find the product to get userId
      const product = await Product.findOne({ uuid });
      
      // If product not found, return error
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      const userId = product.userId;

      // Update the product status
      const updatedProduct = await Product.findOneAndUpdate(
        { uuid },
        { status },
        { new: true }
      );

      // Update analytics after status change
      await updateUserAnalytics(userId);

      // Return success response
      res.status(200).json({
        success: true,
        message: `Product status updated to ${status}`,
        product: updatedProduct
      });
    } catch (error) {
      console.error("Error updating product status:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update product status", 
        error: error.message 
      });
    }
  }
];