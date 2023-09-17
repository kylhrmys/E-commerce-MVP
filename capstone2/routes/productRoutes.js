const express = require('express');
const productController = require("../controllers/productController");
const auth = require('../auth');
const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post('/', verify, verifyAdmin, productController.addProduct);

router.get('/all', productController.getAllProducts);

router.get('/', productController.activeProducts);

router.get('/:productId', productController.getSingleProduct);

router.put('/:productId', verify, verifyAdmin, productController.updateProduct);

router.put('/:productId/archive', verify, verifyAdmin, productController.archiveProduct);

router.put('/:productId/activate', verify, verifyAdmin, productController.activateProduct)

module.exports = router;