import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemsContent from './cartItemsContent'
import {useNavigate} from 'react-router-dom'

const UserCartWrapper = ({cartItems,setOpenCartSheet}) => {
  const navigate = useNavigate();
  const totalCartAmount = cartItems && cartItems.length > 0 ?
      cartItems.reduce((sum,currentItem)=> sum + (
        currentItem?.salePrice > 0? currentItem?.salePrice : currentItem?.price 
      )* currentItem?.quantity,0
    )
      : 0
  return (
<SheetContent className="sm:max-w-md">
   <SheetHeader>
    <SheetTitle>Your Cart</SheetTitle>
   </SheetHeader>
   <div className='mt-4 space-y-4'>
     {
      cartItems && cartItems.length > 0 ?
      cartItems.map(item => <CartItemsContent cartItem={item}/>) : null
     }
   </div>
   <div className='mt-4 space-y-4 mx-5'>
    <div className='flex justify-between '>
        <span className='font-bold'>Total</span>
        <span className='font-bold'>${totalCartAmount}</span>
    </div>
   </div>
   <Button onClick= {()=>{
    navigate('/shop/checkout')
    setOpenCartSheet(false)
   }} className="w-[90%] mt-5 mx-auto cursor-pointer ">Checkout</Button>
</SheetContent>
  )
}

export default UserCartWrapper
