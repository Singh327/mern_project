const express = require('express');

const {addToCart,fetchCartItems,deleteCartItem,updateCartItemQuantity} = require('../../controllers/shop/Cart-controller');
const authMiddleware = require('../../middleware/authUser');

const router = express.Router();

router.post('/add',authMiddleware,addToCart);
router.get('/get/:userId',authMiddleware,fetchCartItems);
router.put('/update-cart',authMiddleware,updateCartItemQuantity);
router.delete('/:userId/:productId',authMiddleware,deleteCartItem);

module.exports = router;