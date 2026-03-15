import React, { useState,useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {HousePlug, Menu, ShoppingCart,UserCog,LogOut} from 'lucide-react'
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet'
import {Button} from '../ui/button'
import {useSelector,useDispatch} from 'react-redux'
import {shoppingViewHeaderMenuItems} from '../../config/index'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '../ui/dropdown-menu'
import { logoutUser, resetTokenAndCredentials } from '../../store/auth-Slice';
import {Avatar,AvatarFallback} from '../ui/avatar'
import UserCartWrapper from './cart-wrapper'
import { fetchCartItems } from '../../store/shop/cart-slice.js'
import { Label } from '@radix-ui/react-dropdown-menu'


function MenuItems(){

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams,setSearchParams] = useSearchParams();
   function handlenavigateToListPage(getCurrentItem){
     sessionStorage.removeItem('filters');
     const currentFilter = getCurrentItem.id !== 'home' && getCurrentItem.id !== 'products' && getCurrentItem.id !== 'search' ? {
      ['category'] : [getCurrentItem.id] 
     } : null;
     sessionStorage.setItem('filters',JSON.stringify(currentFilter));
     location.pathname.includes('listing') && currentFilter !== null ? 
     setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`)) : 
     navigate(getCurrentItem.path);
   }

   return (
     <nav className='flex flex-col mb-3  lg:mb-0 lg:items-center gap-2 lg:flex-row  lg:p-4 bg-white dark:bg-slate-900 rounded-md lg:bg-transparent lg:rounded-none shadow-sm lg:shadow-none'>
       {
         shoppingViewHeaderMenuItems.map(item => (
           <Label
            onClick={()=>handlenavigateToListPage(item)}
             className='w-full lg:w-auto block cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors'
             key={item.id}
            
           >
             {item.label}
           </Label>
         ))
       }
     </nav>
   )
}

function HeaderRightContent(){
   const {user} = useSelector(state=>state.auth)
   const [openCartSheet,setOpenCartSheet] = useState(false);
     const {cartItems} = useSelector(state=>state.shoppingCart);
   const navigate = useNavigate();
   const dispatch = useDispatch();

function handleLogout(){
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
}
useEffect(() => {
  
   dispatch(fetchCartItems(user?.id))

}, [user?.id,dispatch])


   return <div className='flex lg:items-center lg:flex-row pt-4  flex-col gap-4'>
       <Sheet open={openCartSheet} onOpenChange = {()=>setOpenCartSheet(false)} >
          <Button onClick = {()=>setOpenCartSheet(true)}  variant='outline' size = 'icon'
            className=  "relative"
            >
          <ShoppingCart className='w-6 h-6'/>
          <span className='absolute top-[-4px] right-[2px] text-sm font-bold'>{cartItems?.items?.length || 0}</span>
          <span className='sr-only'>User cart</span>
          
      </Button>
       <UserCartWrapper
        setOpenCartSheet = {setOpenCartSheet}
        cartItems={cartItems &&  cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}/>
       </Sheet>
     
      <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Avatar className='bg-black'>
                <AvatarFallback className='bg-black text-white font-extrabold'>
                  {user?.userName[0].toUpperCase()}
                  </AvatarFallback>
             </Avatar>
           </DropdownMenuTrigger>
           <DropdownMenuContent side='right' className='w-56'>
             <DropdownMenuLabel>
                Logged in as {user?.userName}
             </DropdownMenuLabel>
             <DropdownMenuSeparator/>
             <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
                 <UserCog className='mr-2 h-4 w-4'/>
                 Account
             </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick = {handleLogout}>
                 <LogOut className='mr-2 w-4 h-4'/>
                 Logout
             </DropdownMenuItem>
           </DropdownMenuContent>

      </DropdownMenu>
   </div>
}
function ShoppingHeader() {
  
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
     <div className='flex h-16 item-center justify-between px-4 md:px-6'>
        <Link to = '/shop/home' className='flex items-center gap-2'>
           <HousePlug className='h-6 w-6'/>
           <span className='font-bold'>Ecommerce</span>
        </Link>
        <Sheet>
           <SheetTrigger asChild>
              <Button variant= 'outline' size="icon" className='lg:hidden'>
                <Menu className='h-6 w-6'/>
                 <span className='sr-only'>Toggle header menu</span>
              </Button>
           </SheetTrigger>
           <SheetContent side="left" className="w-full max-w-xs ">
               <MenuItems/>
               <HeaderRightContent/>
           </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems/>
        </div>
           
   <div className='hidden lg:block'> <HeaderRightContent/></div>
           
       

     </div>

    </header>
  )
}

export default ShoppingHeader
