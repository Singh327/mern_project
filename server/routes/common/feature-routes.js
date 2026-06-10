const express  = require('express');

const {addFeatureImage,getFeatureImages} = require('../../controllers/common/feature-controller');
const authMiddleware = require('../../middleware/authUser');

const router = express.Router();

router.get("/get",authMiddleware  ,getFeatureImages);
router.post("/add",authMiddleware,addFeatureImage);


module.exports = router;