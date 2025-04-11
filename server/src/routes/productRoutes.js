const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticateToken } = require("../middleware/auth");

const { createProduct, saveDraft, getDrafts, listDraft, deleteDraft } = productController;

// Protected routes
router.post("/products", authenticateToken, createProduct);
router.post("/products/draft", authenticateToken, saveDraft);
router.get('/products/draft/:userId', authenticateToken, getDrafts);
router.post('/products/list/:uuid', authenticateToken, listDraft);
router.delete('/products/draft/:uuid', authenticateToken, deleteDraft);

module.exports = router;