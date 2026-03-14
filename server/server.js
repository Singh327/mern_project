require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDB = require('./database/db.js')
const authRoutes = require('./routes/auth-routes/authRoutes.js')
const adminProductsRouter = require('./routes/admin/products-routes.js')
const shopProductsRouter = require('./routes/shop/products-routes.js')
const shopReviewRouter = require('./routes/shop/review-routes.js')
const searchProductRouter = require('./routes/shop/search-routes.js')
const shopCartRouter = require('./routes/shop/cart-routes.js')
const shopAddressRouter = require('./routes/shop/address-routes.js');
const shopOrderRouter= require('./routes/shop/order-routes.js');
const adminOrderRouter = require('./routes/admin/order-routes.js')
const commonFeatureRouter = require('./routes/common/feature-routes.js')
const app = express();

// Establishing connection to DB

connectToDB();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL ,
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials:true
    })
)

app.use(cookieParser());



app.use('/api/auth',authRoutes);
app.use('/api/admin/products',adminProductsRouter);
app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter);
app.use('/api/shop/address',shopAddressRouter);
app.use('/api/shop/order',shopOrderRouter);
app.use('/api/admin/orders',adminOrderRouter);
app.use('/api/shop/search',searchProductRouter);
app.use('/api/shop/review',shopReviewRouter);
app.use('/api/common/feature',commonFeatureRouter);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})