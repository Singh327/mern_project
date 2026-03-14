import React, { useEffect } from 'react'
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import levi from '../../assets/levipng.png'
import nike from '../../assets/nike.jpg'
import hm from '../../assets/hm.png'
import zara from '../../assets/zarapng.png'
import puma from '../../assets/puma.png'
import adidas from '../../assets/adidas.png' 
import {Button} from '../../components/ui/button'
import {Card,CardContent} from '../../components/ui/card'
import { useState } from 'react'
import {BabyIcon, ChevronLeftIcon,ChevronRightIcon, CloudLightning, ShirtIcon,  UmbrellaIcon, WatchIcon} from 'lucide-react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails, setProductDetails } from '../../store/shop/products-slice'
import ShoppingProductTile from '../../components/shopping-view/product-tile'
import {useNavigate}  from 'react-router-dom'
import { addToCart,fetchCartItems } from '../../store/shop/cart-slice.js'
import {toast} from 'sonner'
import ProductDetailsDialog from '../../components/shopping-view/product-details.jsx'
import { getFeatureImages } from '../../store/common-Slice/index.js'
  const categoriesWithIcon =  [
      {id : "men",label:"Men",icon : ShirtIcon},
       {id : "women",label:"Women",icon:CloudLightning},
        {id : "kids",label:"Kids",icon:BabyIcon},
         {id : "accesssories",label:"Accessories",icon:WatchIcon},
          {id : "footwear",label:"Footwear",icon:UmbrellaIcon},
    ]
    
    const brandWithIcon =[
      {id:'nike',label : "Nike",icon : nike },
      {id:'adidas',label : "Adidas",icon : adidas },
      {id:'puma',label : "Puma",icon : puma },
      {id:'levi',label : "Levi",icon : levi },
      {id:'h&m',label : "H&M",icon : hm },
      {id:'zara',label: 'Zara',icon : zara }
    ]

    
function ShoppingHome() {
  const slides = [bannerOne,bannerTwo,bannerThree];
    const [open,setopen] = useState(false);
  const [currentSlide, setcurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {productList,productDetails} = useSelector(state=>state.shopProducts)
  const {user} = useSelector(state=>state.auth)
  
      const {featureImageList} = useSelector(state=>state.commonFeature);

  function handleNavigateTOListingPage(getCurrentItem,section){
     sessionStorage.removeItem('filters');
     const currentFilter = {
      [section]:[getCurrentItem.id]
     }
     sessionStorage.setItem('filters',JSON.stringify(currentFilter));
     navigate('/shop/listing');
    }

    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId));
        // console.log(productDetails);
       }

     function handleAddToCart(getCurrentProductId){
    console.log(getCurrentProductId);
    dispatch(addToCart({
       userId : user?.id,
       productId : getCurrentProductId,
       quantity : 1
    })).then(data=>{
      console.log(data);
      if(data?.payload?.success){
        toast.success("Product is added to cart")
        dispatch(fetchCartItems(user.id));
        console.log("data fetched")
      }
    });
   }
  useEffect(() => {
       
      if(productDetails !== null){
         setopen(true)
        
      }
       
     }, [productDetails])


    useEffect(()=>{
      
        const timer = setInterval(()=>{
           setcurrentSlide(previousSlide=>(previousSlide+1)%featureImageList.length)
        },3000)

        return ()=>clearInterval(timer);
      }
    ,[featureImageList.length])

    useEffect(()=>{
      dispatch(fetchAllFilteredProducts({filterParams:{},sortParams:'price-lowtohigh'}))
    },[dispatch])

   useEffect(()=>{
       dispatch(getFeatureImages());
     },[dispatch])
     console.log(featureImageList,"Featugjjge")

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
      {
        featureImageList && featureImageList.length > 0 ? featureImageList.map((item,index)=>
          
           <img src={item?.image} 
           key = {index}  
           className= {`${index===currentSlide? "opacity-100" :"opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
           alt="bannerOne" />
        ) : null
      }
      <Button variant = "outline" size = "icon"
       onClick = {()=>setcurrentSlide(previousSlide => (previousSlide-1+featureImageList.length)%featureImageList.length)}
      className="absolute top-1/2 left-4 transform translate-y-0.5 bg-white/80">
        <ChevronLeftIcon className='w-4 h-4'/>
       
      </Button>
       <Button variant = "outline" size = "icon"
        onClick = {()=>setcurrentSlide(previousSlide => (previousSlide+1)%featureImageList.length)}
      className="absolute top-1/2 right-4 transform translate-y-0.5 bg-white/80">
        <ChevronRightIcon className='w-4 h-4'/>
        
      </Button>
      </div>
      <section className='py-6 bg-gray-50 '>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8 '>Shop by Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
            {
              categoriesWithIcon.map(item=> 
              <Card 
              onClick ={()=>handleNavigateTOListingPage(item,'category')}
              className="cursor-pointer hover:shadow-lg transition-shadow">
                   <CardContent className="flex flex-col items-center justify-center p-6">
                         <item.icon className='w-12 h-12 mb-4 text-primary'/>
                         <span className='font-bold'>{item.label}</span>
                   </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
       <section className='py-6 bg-gray-50 '>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8 '>Shop by Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 '>
            {
              brandWithIcon.map(item=> <Card
                onClick ={()=>handleNavigateTOListingPage(item,'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                   <CardContent className="flex flex-col items-center justify-center p-6">
                          <img src={item.icon} alt="" className='w-20 h-12 mb-2' />
                         <span className='font-bold mt-2 '>{item.label}</span>
                   </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8 '>Featured Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0 ? 
               productList.map(item=><ShoppingProductTile handleGetProductDetails={handleGetProductDetails} 
                handleAddToCart={handleAddToCart}
                product= {item}/>)
              : null
            }
          </div>
          </div>
      </section>
       <ProductDetailsDialog productDetails={productDetails}
       open = {open} setopen = {setopen}/>
    </div>
    
  )
}

export default ShoppingHome
