import React from 'react'
import { Button } from '../ui/button'

import {Minus,Plus, Trash} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteCartItem, updateCartItemQuantity } from '../../store/shop/cart-slice.js'
import { toast } from 'sonner'

const CartItemsContent = ({cartItem}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const {productList} = useSelector(state=>state.shopProducts);
    function handlecartItemDelete(productId){
       
       dispatch(deleteCartItem({
        userId : user?.id,
        productId 
       })).then(data=>{
            if(data.payload.success){
                toast.success("Cart item  deleted successfully")
            }
        })
    }
    function handleUpdateQuantity(getCartItem, typeOfAction){
        if(typeOfAction === 'plus'){
           const currentProduct = productList.find(item=> item._id === getCartItem?.productId);
           const getTotalStock = currentProduct?.totalStock;
           console.log(getTotalStock,'getTotalStock');
           if(getCartItem.quantity+1 > getTotalStock) {
             toast.warning(`Only ${getCartItem.quantity} can be added`);
             return;
           }
        }
        dispatch(updateCartItemQuantity({
            userId : user?.id,
            productId :getCartItem?.productId,
            quantity : typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        })).then(data=>{
            if(data.payload.success){
                toast.success("Cart item is updated successfully")
            }
        })
    }
  return (
    <div className='flex items-center space-x-4 mx-5'>
      <img src={cartItem?.image} alt={cartItem?.title}  className='w-20 h-20 rounded object-cover'/>
      <div className='flex-1'>
        <h3 className='font-bold'>{cartItem?.title}</h3>
        <div className='flex items-center gap-2  mt-1'>
            <Button onClick={()=>handleUpdateQuantity(cartItem,'minus')}  variant="outline" disabled ={cartItem?.quantity===1} className= "h-8 w-8 rounded-full" size = "icon">
                <Minus className='w-4 h-4'/>
                <span className='sr-only'>Decrease</span>
            </Button>
            <span className='font-semibold'>{cartItem?.quantity}</span>
            <Button onClick={()=>handleUpdateQuantity(cartItem,'plus')} variant="outline" className= "h-8 w-8 rounded-full" size = "icon">
                <Plus className='w-4 h-4'/>
                <span className='sr-only'>Increase</span>
            </Button>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-semibold'>${((cartItem?.salePrice > 0? cartItem?.salePrice : cartItem?.price)*cartItem?.quantity).toFixed(2)}</p>
      </div>
      <Trash onClick = {()=>handlecartItemDelete(cartItem.productId)} className = "cursor-pointer mt-1" size ={20}/>
    </div>
  )
}

export default CartItemsContent
