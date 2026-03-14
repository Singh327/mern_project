

const express = require('express');
const {addAddress,editAddress,fetchAllAddress,deleteAddress} = require('../../controllers/shop/address-controller')
const router = express.Router();

router.get('/get/:userId',fetchAllAddress);
router.post('/add',addAddress);
router.put('/update/:userId/:addressId',editAddress);
router.delete('/delete/:userId/:addressId',deleteAddress);

module.exports = router;