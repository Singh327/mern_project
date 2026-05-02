const paypal = require('../../helpers/paypal');
const Order = require('../../models/Order');
const Cart =  require('../../models/Cart')
const Product = require('../../models/Product');
const createOrder = async (req,res)=>{
    try{
        const {userId,cartItems,addressInfo,orderStatus ,
    paymentMethod ,
    paymentStatus ,
    totalAmount ,
    orderDate,
    orderUpdateDate,
    paymentId ,
    payerId,cartId } = req.body;
    
    // payment json : to create paypal payment instance
    const create_payment_json = {
        intent : 'sale',
        payer :{
            payment_method : 'paypal'
        },
       redirect_urls :{
          return_url :`${process.env.CLIENT_URL}/shop/paypal-return` ,
          cancel_url : `${process.env.CLIENT_URL}/shop/paypal-cancel`
       },
       transactions : [
        {
            item_list : {
                items : cartItems.map(item=> ({
                    name :item.title,
                    sku : item.productId,
                    price : item.price.toFixed(2),
                    currency : 'USD',
                    quantity : item.quantity
                }))
            },
            amount : {
                currency : 'USD',
                total : totalAmount.toFixed(2)
            },
            description : 'description'
        }
       ]
    }
    // creating paypal payment instance
        console.log('Creating PayPal payment with:', JSON.stringify(create_payment_json, null, 2));
    paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
        if(error){
            console.log("PAYPAL ERROR:", JSON.stringify(error, null, 2));
            return res.status(500).json({
                success:false,
                message : 'Error while creating paypal payments'
            })
        }
        else{
            const newlyCreatedOrder = new Order({
                userId,
                cartItems,
                addressInfo,
                orderStatus ,
                 paymentMethod ,
                paymentStatus ,
                totalAmount ,
                orderDate,
                orderUpdateDate,
                paymentId ,
                payerId ,cartId
            })

            await newlyCreatedOrder.save();
            // paymentInfo consist of approval url
            const approvalURL = paymentInfo.links.find(link=> link.rel === 'approval_url').href;
            res.status(201).json({
                success :true,
                approvalURL,
                orderId : newlyCreatedOrder._id
            })
        }
    })
    }
    catch(e){
        console.log("PAYPAL ERROR:", JSON.stringify(error, null, 2));
        res.status(500).json({
            success:false,
            message:"some error occurred"
        })
    }
}

const capturePayment = async (req,res)=>{
    try{
        const {paymentId,payerId,orderId}  = req.body;

        let order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                success : false,
                message : 'Order cannot be found'
            })
        }
      order.paymentStatus = 'paid',
      order.orderStatus = 'confirmed',
      order.paymentId = paymentId,
      order.payerId = payerId

      for(let item of order.cartItems){
        let product = await Product.findById(item.productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message :`Not enough stock for this product ${product.title}`
            })
        }
        product.totalStock -= item.quantity;
        await product.save();
      }

     const getCartId = order.cartId;
     await Cart.findByIdAndDelete(getCartId);
    
      await order.save();

      res.status(200).json({
        success:true,
        message : 'Order confirmed',
        data : order
      })

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred"
        })
    }
}

const getAllOrdersByUser = async(req,res)=>{
    try{
      const {userId} = req.params;
      const orders = await Order.find({userId});
      if(!orders.length){
        return res.status(404).json({
            success:false,
            message : 'No orders found'
        })
      }
      res.status(200).json({
        success:true,
        data:orders
      })
    }
    catch(e){
       console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred"
        })
    }
}

const getOrderDetails = async(req,res)=>{
    try{
        const {id} = req.params;
         const order = await Order.findById(id);
         if(!order){
            return res.status(404).json({
            success:false,
            message : 'No order found'
        })
         }
          res.status(200).json({
        success:true,
        data:order
      })
    }
    catch(e){
       console.log(e);
        res.status(500).json({
            success:false,
            message:"some error occurred"
        })
    }
}

module.exports = {createOrder,capturePayment,getAllOrdersByUser,getOrderDetails}