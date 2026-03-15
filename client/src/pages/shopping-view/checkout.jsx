import React, { useState,useEffect } from 'react'
import accountImg from '../../assets/account.jpg'
import Address from '../../components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import CartItemsContent from '../../components/shopping-view/cartItemsContent'
import { Button } from '../../components/ui/button'
import {createNewOrder} from '../../store/shop/order-slice'
import { toast } from 'sonner'
import { getFeatureImages } from '../../store/common-Slice/index.js'
function ShoppingCheckout() {
   
  const {cartItems} = useSelector(state=>state.shoppingCart);
  const {user} = useSelector(state=>state.auth);
  const {approvalURL} = useSelector(state=>state.shopOrder);
  const { featureImageList } = useSelector(state => state.commonFeature);
  const dispatch = useDispatch();
  const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null);
  

  const [isPaymentStart,setIspaymentStart] = useState(false);
   const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
      cartItems.items.reduce((sum,currentItem)=> sum + (
        currentItem?.salePrice > 0? currentItem?.salePrice : currentItem?.price 
      )* currentItem?.quantity,0
      ) : 0

      console.log(currentSelectedAddress,'setCurrentSelectedAddress');
     
   function handleInitiatePaypalPayment(){

    if(cartItems.items.length === 0 ){
      toast.warning("Your cart is empty,please add items to proced")
    }
     if (!currentSelectedAddress) {
      toast.warning('Please select address first')
    return;
  }
     const orderData = {
                userId : user?.id,
                cartId : cartItems?._id,
                cartItems : cartItems.items.map(singleItem=>({
                   productId : singleItem?.productId,
                   image : singleItem?.image,
                   title : singleItem?.title,
                   price : singleItem?.salePrice > 0 ? singleItem?.salePrice : singleItem?.price,
                   quantity : singleItem?.quantity
                })
                  
                ),
                addressInfo : {
                  addressId :currentSelectedAddress?._id,
                   address : currentSelectedAddress?.address,
                   city : currentSelectedAddress?.city,
                   phone : currentSelectedAddress?.phone,
                   pincode:currentSelectedAddress?.pincode,
                   notes : currentSelectedAddress?.notes
                },
                orderStatus :'pending' ,
                 paymentMethod : 'paypal' ,
                paymentStatus : 'pending' ,
                totalAmount : totalCartAmount ,
                orderDate : new Date(),
                orderUpdateDate : new Date(),
                paymentId : '' ,
                payerId : '' 
     }
     console.log(orderData);

     dispatch(createNewOrder(orderData)).then(data=>{
      console.log(data);
      if(data?.payload?.success){
         setIspaymentStart(true);
      }
      else{
        setIspaymentStart(false);
      }
     }
      
     )
   }
   useEffect(()=>{
    if(approvalURL){
    window.location.href = approvalURL;
   }
   },[approvalURL]);

   useEffect(() => {
    dispatch(getFeatureImages());
   }, [dispatch]);
 
  return (
    <div className='flex flex-col '>
        <div className='relative h-[300px] overflow-hidden'>
          <img src={featureImageList && featureImageList.length > 0 ? featureImageList[0]?.image : null} className='h-full w-full object-cover object-center' alt="" />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
            <Address setCurrentSelectedAddress= {setCurrentSelectedAddress} selectedId={currentSelectedAddress?._id}/>
            <div className='flex flex-col'>
               {
                cartItems && cartItems.items && cartItems.items.length > 0 ?
                cartItems.items.map(item=> <CartItemsContent cartItem={item}/>) : null
               }
               <div className='mt-4 space-y-4 mx-5'>
    <div className='flex justify-between '>
        <span className='font-bold'>Total</span>
        <span className='font-bold'>${totalCartAmount}</span>
    </div>
   </div>
      <div className='mt-4'>
        <Button onClick = {handleInitiatePaypalPayment} className=" w-full" >
          {
            isPaymentStart ? 'Processing Paypal Payment...' : 'Checkpout With Paypal'
          }
        </Button>
      </div>
            </div>
            
        </div>
    </div>
  )
}

export default ShoppingCheckout
