const express = require('express');

const {getFilteredProducts,getProductDetails} = require('../../controllers/shop/products-controller');
const authMiddleware = require('../../middleware/authUser');


const router = express.Router();
 
router.get('/get',authMiddleware,getFilteredProducts);

router.get('/get/:id',authMiddleware,getProductDetails);

module.exports = router;