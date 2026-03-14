import React from 'react'
import {DialogContent} from '../ui/dialog'
import {Label} from '../ui/label'
import {Separator} from '../ui/separator'
import {Badge} from '../ui/badge'
import { useSelector } from 'react-redux'
function ShoppingOrderDetailsView({item}) {
    const {user} = useSelector(state=>state.auth);
    return (
    <DialogContent className="sm:max-w-[600px] ">
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>Order ID</p>
                    <Label>{item?._id}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Date</p>
                    <Label>{item?.orderDate.split('T')[0]}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Price</p>
                    <Label>{item?.totalAmount}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Payment Method</p>
                    <Label>{item?.paymentMethod}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Payment Status</p>
                    <Label>{item?.paymentStatus}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Order Status</p>
                    <Label>
                        <Badge className={`px-3 py-1 ${item?.orderStatus === 'confirmed' ?'bg-green-500' :  item?.orderStatus==='rejected' ? ' bg-red-500' :'bg-black' }`}>
                    {item?.orderStatus}
                  </Badge>
                  </Label>
                </div>
                
            </div>
            <Separator/>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <div className='font-medium'>Order Details</div>
                <ul className='grid gap-3'>
                    {
                        item?.cartItems && item?.cartItems.length > 0 ?
                        item?.cartItems.map(cartItem=><li className='flex items-center justify-between'>
                        <span>Title : {cartItem.title}</span>
                        <span>Quantity :{cartItem.quantity}</span>
                        <span>Price : ${cartItem.price}</span>
                    </li>) : null
                    }
                    
                </ul>
              </div>
            </div>
            <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>
                        ShippingInfo
                    </div>
                    <div className='grid gap-0.5 text-muted-foreground'>
                        <span>{user?.userName}</span>
                       
                        <span>{item?.addressInfo?.address}</span>
                        <span>{item?.addressInfo?.city}</span>
                        <span>{item?.addressInfo?.pincode}</span>
                        <span>{item?.addressInfo?.phone}</span>
                        <span>{item?.addressInfo?.notes}</span>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    </DialogContent>
  )
}

export default ShoppingOrderDetailsView
