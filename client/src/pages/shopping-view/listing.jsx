import React from 'react'
import ProductFilter from '../../components/shopping-view/filter'
import {DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger} from '../../components/ui/dropdown-menu'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '../../config'
import {Button} from '../../components/ui/button'
import { useSelector ,useDispatch} from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails, setProductDetails } from '../../store/shop/products-slice'
import ShoppingProductTile from '../../components/shopping-view/product-tile'
import { useEffect,useState } from 'react'
import { useSearchParams} from 'react-router-dom'
import ProductDetailsDialog from '../../components/shopping-view/product-details'
import { addToCart, fetchCartItems } from '../../store/shop/cart-slice.js'
import { toast } from 'sonner';



function createSearchParamsHelper(filterparams){
  const queryParams = [];

  for(const [key,value] of Object.entries(filterparams)){
     if(Array.isArray(value) && value.length > 0 ){
      const paramValue = value.join(',')

      queryParams.push(`${key}=${encodeURIComponent(paramValue)} `)
     }
  }
  return queryParams.join('&')
}


function ShoppingListing() {
  //fetch list of products on page load
  const {productList,productDetails} = useSelector(state=>state.shopProducts);
  const {user} = useSelector(state=>state.auth);
  const {cartItems} = useSelector(state=>state.shoppingCart);
  const [filters, setfilters] = useState({});
  const [sort, setsort] = useState(null);
  const [searchParams,setSearchParams] = useSearchParams();
  const [open,setopen] = useState(false);

  const categorySearchParam = searchParams.get('category');
  function handleSort(value){
     setsort(value);
  }

  function handleFilter(getSectionId,getCurrentOption){
      console.log(getSectionId,getCurrentOption);

      let cpyFilters = {...filters};
      const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
      if(indexOfCurrentSection === -1){
        cpyFilters = {
          ...cpyFilters,
          [getSectionId] : [getCurrentOption]
        }
      }
      else{
        const indexOfcurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
        if(indexOfcurrentOption === -1){
             cpyFilters[getSectionId].push(getCurrentOption);
        }
        else{
          cpyFilters[getSectionId].splice(indexOfcurrentOption,1);
        }
       
      }
      console.log(cpyFilters);
      setfilters(cpyFilters);
      sessionStorage.setItem('filters',JSON.stringify(cpyFilters));
  }

   useEffect(() => {
      setsort('price lowtohigh');
      setfilters(JSON.parse(sessionStorage.getItem('filters')) || {})
   }, [categorySearchParam])
   

   const dispatch = useDispatch();

   useEffect(()=>{
     if(filters && Object.keys(filters).length > 0){
       const createQueryString = createSearchParamsHelper(filters);
       setSearchParams(new URLSearchParams(createQueryString))
     }
   },[filters])

   function handleGetProductDetails(getCurrentProductId){
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
    console.log(productDetails);
   }


   // cart function
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
  
   useEffect(() => {
     if(filters !== null && sort !== null){
    dispatch(fetchAllFilteredProducts({filterParams: filters,sortParams : sort}));
     }
     
   }, [dispatch,sort,filters])

   useEffect(() => {
     
    if(productDetails !== null){
       setopen(true)
      
    }
     
   }, [productDetails])
   
   console.log(cartItems,'CartImes')
  console.log(productList,'productList')
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr]  p-4 md:p-6'>
       <ProductFilter  filters = {filters} handleFilter={handleFilter}/>
       <div className='bg-background w-full rounded-lg shadow-sm'>

          <div className='p-4 border-b flex  items-center justify-between'>
            <h2 className='text-lg font-extrabold mr-2'>All Products</h2>
            <div className='flex items-center gap-3'>
              <span className='text-muted-foreground'>{productList?.length}</span>
              <DropdownMenu>
               <DropdownMenuTrigger asChild>
                   <Button variant = "outline" size = "sm" className='flex items-center gap-1'>
                      <ArrowUpDownIcon className='h-4 w-4'/>
                      <span>Sort by</span>
                   </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className='w-[200px]'>
                  <DropdownMenuRadioGroup value ={sort} onValueChange = {handleSort}>
                    {
                      sortOptions.map(sortItem=> <DropdownMenuRadioItem key={sortItem.id} value = {sortItem.id}>
                         {sortItem.label}
                      </DropdownMenuRadioItem>)
                    }
                    </DropdownMenuRadioGroup> 
               </DropdownMenuContent>
            </DropdownMenu>
            </div>
            
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {
              productList && productList.length > 0 ?
              productList.map(productItem=><ShoppingProductTile
                 product = {productItem} 
                 
                 handleGetProductDetails={handleGetProductDetails} 
                 handleAddToCart={handleAddToCart}/>)
              : null
            }
              
            
          </div>
       </div>
       <ProductDetailsDialog productDetails={productDetails}
       open = {open} setopen = {setopen}/>
    </div>
  )
}

export default ShoppingListing
