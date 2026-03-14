

import {useState,useEffect} from 'react'
import { Input } from '../../components/ui/input'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, resetSeachResults } from '../../store/shop/search-slice';
import ShoppingProductTile from '../../components/shopping-view/product-tile'
import {toast} from 'sonner';
import { addToCart, fetchCartItems } from '../../store/shop/cart-slice.js';
import ProductDetailsDialog from '../../components/shopping-view/product-details.jsx';
import { fetchProductDetails } from '../../store/shop/products-slice';

const Search = () => {

    const [keyword,setKeyword] = useState('');
    const [searchParams,setSearchParams] = useSearchParams();
    const [open,setopen] = useState(false);
    const {searchResults} = useSelector(state=>state.shopSearch)
    const {cartItems} = useSelector(state=>state.shoppingCart);
    const {productDetails} = useSelector(state=>state.shopProducts);
     const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        }
        else{
             setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
             dispatch(resetSeachResults());
        }
    },[keyword])
    

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
        dispatch(fetchCartItems(user.id));
        console.log("data fetched")
      }
    });
   }

   function handleGetProductDetails(getCurrentProductId){
       console.log(getCurrentProductId);
       dispatch(fetchProductDetails(getCurrentProductId));
       console.log(productDetails);
      }

   useEffect(() => {
        
       if(productDetails !== null){
          setopen(true)
         
       }
        
      }, [productDetails])
  
    console.log(searchResults,'searchResults');
  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className='flex justify-center mb-8'>
            <div className='w-full flex items-center'>
               <Input value= {keyword} 
                onChange = {(event)=> setKeyword(event.target.value)}
               name="keyword" className="py-6" placeholder = "Search products..." />
            </div>
        </div>
        {
            !searchResults.length ?  <h1 className='text-2xl font-extrabold'>No Result Found</h1> : null
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          
            {
           
            searchResults.map(item=> <ShoppingProductTile product = {item}
                 handleAddToCart={handleAddToCart}
                 handleGetProductDetails={handleGetProductDetails}
                />) 
            
            }
            
        </div>
        <ProductDetailsDialog productDetails={productDetails}
       open = {open} setopen = {setopen}/>
    </div>
  )
}

export default Search
