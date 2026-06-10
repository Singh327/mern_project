const express = require('express');

const {handleImageUpload,addProduct,fetchAllProducts,editProduct,deleteProduct} = require('../../controllers/admin/products-controller')
const {upload} = require('../../helpers/cloudinary');
const adminMiddleware = require('../../middleware/authAdmin');
const authMiddleware = require('../../middleware/authUser');

const router = express.Router();

router.post('/upload-image',upload.single('my_file'),handleImageUpload);

router.post('/add',authMiddleware,adminMiddleware,addProduct);
router.put('/edit/:id',authMiddleware,adminMiddleware,editProduct);
router.delete('/delete/:id',authMiddleware,adminMiddleware,deleteProduct);
router.get('/get',authMiddleware,adminMiddleware,fetchAllProducts);

module.exports = router;