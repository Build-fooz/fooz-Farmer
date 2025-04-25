const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticateToken } = require("../middleware/auth");

const { createProduct, saveDraft, getDrafts, publishDraft, deleteDraft, getUserProducts, updateProductStatus } = productController;

// Protected routes
router.get('/products', authenticateToken, getUserProducts);
router.post("/products", authenticateToken, createProduct);
router.post("/products/draft", authenticateToken, saveDraft);
router.get('/products/draft/:userId', authenticateToken, getDrafts);
router.post('/products/draft/:uuid/publish', authenticateToken, publishDraft);
router.delete('/products/draft/:uuid', authenticateToken, deleteDraft);
router.patch('/products/:uuid/status', authenticateToken, updateProductStatus);

module.exports = router;