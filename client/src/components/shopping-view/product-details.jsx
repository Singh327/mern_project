

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StarIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Avatar,AvatarFallback } from '../ui/avatar'
import { Input } from '../ui/input'
import { toast } from 'sonner';
import { useDispatch,useSelector } from 'react-redux'
import { addToCart,fetchCartItems } from '../../store/shop/cart-slice.js'
import { setProductDetails } from '../../store/shop/products-slice/index.js'
import StarRatingComponent from '../common/star-rating.jsx'
import { addReview, getProductReviews } from '../../store/shop/review-Slice/index.js'

function ProductDetailsDialog({open,setopen,productDetails}) {

    const [reviewMsg,setReviewMsg] = useState("");
     const [rating,setRating] = useState(0);
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const {reviews} = useSelector(state=>state.shopReview);
   const {cartItems} = useSelector(state=>state.shoppingCart)
    function handleAddToCart(getCurrentProductId,getTotalStock){
    console.log(getCurrentProductId);
    
        let getCartItems = cartItems.items || [];
        if(getCartItems.length){
          const indexOfCurrentItem = getCartItems.findIndex(item=> item.productId === getCurrentProductId);
          if(indexOfCurrentItem > -1){
              const getQuantity = getCartItems[indexOfCurrentItem].quantity;
              if(getQuantity + 1 > getTotalStock ){
                 toast.warning(`Only ${getQuantity} can be added`);
                 return;
              }
          }
          
        }
    dispatch(addToCart({
       userId : user?.id,
       productId : getCurrentProductId,
       quantity : 1
    })).then(data=>{
      console.log(data);
      if(data?.payload?.success){
        toast.success("Product is added to cart")
        dispatch(fetchCartItems(user?.id));
        console.log("data fetched")
      }
    });
   }
   function handleDialogClose(){
    setopen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg('');
   }

 function handleRatingChange(getRating){
    setRating(getRating)
 }
 function handleAddReview(){
    dispatch(addReview({
        productId : productDetails?._id,
        userId : user?.id,
        userName : user?.userName,
        reviewMessage : reviewMsg,
        reviewValue : rating
    })).then(data=>{
        if(data?.payload?.success){
            dispatch(getProductReviews(productDetails?._id));
            toast("Review added successfully");
            setRating(0);
            reviewMsg('');
        }
        console.log(data)
    })
 }
 useEffect(()=>{
   if(productDetails !== null){
    dispatch(getProductReviews(productDetails?._id));
   }
 },[productDetails])

 console.log(reviews,'reviews')
   const averageReview = reviews && reviews.length > 0 ? reviews.reduce((sum,reviewItem)=> sum + reviewItem.reviewValue,0) / reviews.length : 0;
   
  return (
     <Dialog open={open} onOpenChange = {handleDialogClose}>
         <DialogContent className = "grid grid-cols-2 gap-9 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
             <div className="relative overflow-hidden rounded-lg">
                <img src={productDetails?.image} 
                alt={productDetails?.title}
                width = {600}
                height = {600}
                className='aspect-square w-full object-cover'
                 />
             </div>
             <div className=''>
                <div>
                  <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
                  <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>
                 </div>
                  <div className='flex items-center justify-between'>
                    <p className={`${productDetails?.salePrice > 0 ? 'line-through ' : ''} text-3xl font-bold text-primary`}>${productDetails?.price}</p>
                    {
                        productDetails?.salePrice > 0 ? <p className='text-2xl font-bold text-muted-foreground'>${productDetails?.salePrice} </p> : null
                    }
                  </div>
                   
                                <div className='flex items-center gap-2 mt-2'>
                                     <div className='flex items-center gap-0.5'>
                                     <StarRatingComponent rating  = {averageReview}/>
                                    </div>
                                <span className='text-muted-foreground'>({averageReview.toFixed(2)})</span>
                                </div>
                  <div className='mt-5 mb-5'>
                    <Button disabled={productDetails?.totalStock===0} className='w-full' onClick={()=>handleAddToCart(productDetails?._id,productDetails?.totalStock)}>Add to cart</Button>
                  </div>
                 <Separator/>
                 <div className='max-h-[300px] overflow-auto' >
                    <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                    <div className='grid gap-6'>
                        {
                            reviews && reviews.length > 0? 
                            reviews.map(reviewItem=>(
                                <div className='flex gap-4'>
                            <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <div className='flex items-center gap-2'>
                                    <h3 className='font-bold'>{reviewItem?.userName}</h3>
                                </div>
                                <div className='flex items-center gap-0.5'>
                                    <StarRatingComponent rating = {reviewItem?.reviewValue}/>
                                   
                                        
                                </div>
                           
                                <p className='text-muted-foreground'>{reviewItem?.reviewMessage }</p>
                            </div>
                        </div>
                            )

                            ) : <h2>No Reviews</h2>
                        }
                        
                    </div>
                    <div className='mt-10 flex-col flex gap-2'>
                        <Label>Write a Review</Label>
                        <div className='flex gap-1'>
                             <StarRatingComponent
                             rating = {rating}
                              handleRatingChange={handleRatingChange}/>
                        </div>
                       <Input name="reviewMsg" value ={reviewMsg} onChange ={(event)=>setReviewMsg(event.target.value)} placeholder="Write a review..."/>
                       <Button disabled ={reviewMsg.trim() === ''}
                        onClick = {handleAddReview}
                       >Submit</Button>
                    </div>
                 </div>
             </div>
          
         </DialogContent>
     </Dialog> 
  )
}

export default ProductDetailsDialog
