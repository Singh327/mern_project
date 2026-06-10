const express = require('express');

const {createOrder,capturePayment,getOrderDetails,getAllOrdersByUser} = require('../../controllers/shop/order-controller');
const authMiddleware = require('../../middleware/authUser');

const router = express.Router();

router.post('/create',authMiddleware,createOrder);
router.post('/capture',authMiddleware,capturePayment);
router.get('/list/:userId',authMiddleware,getAllOrdersByUser);
router.get('/details/:id',authMiddleware,getOrderDetails);
module.exports = router;
