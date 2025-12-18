require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDB = require('./database/db.js')
const authRoutes = require('./routes/auth-routes/authRoutes.js')
const adminProductsRouter = require('./routes/admin/products-routes.js')
const app = express();

// Establishing connection to DB

connectToDB();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5174",
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

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})