

const express = require('express');
const {addAddress,editAddress,fetchAllAddress,deleteAddress} = require('../../controllers/shop/address-controller');
const authMiddleware = require('../../middleware/authUser');
const router = express.Router();

router.get('/get/:userId',authMiddleware,fetchAllAddress);
router.post('/add',authMiddleware,addAddress);
router.put('/update/:userId/:addressId',authMiddleware,editAddress);
router.delete('/delete/:userId/:addressId',authMiddleware,deleteAddress);

module.exports = router;