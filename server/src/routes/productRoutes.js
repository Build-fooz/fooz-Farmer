const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const { createProduct, saveDraft, getDrafts,listDraft, deleteDraft } = productController;

router.post("/products", createProduct);
router.post("/products/draft", saveDraft);
router.get('/products/draft/:userId', getDrafts);
router.post('/products/list/:uuid', listDraft);
router.delete('/products/draft/:uuid', deleteDraft); // ✅ Fixed path

module.exports = router;
