const express = require('express');

const {addProductReview,getProductReviews} = require('../../controllers/shop/product-review-controller');
const authMiddleware = require('../../middleware/authUser');


const router = express.Router();
 
router.post('/add',authMiddleware,addProductReview);

router.get('/:productId',authMiddleware,getProductReviews);

module.exports = router;