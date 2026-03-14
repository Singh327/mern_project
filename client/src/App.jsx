import {Routes,Route} from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import Adminlayout from './components/admin-view/layout'
import AdminDashBoard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/Orders'
import ShoppignLayout from './components/shopping-view/layout'
import NotFound from './pages/notFound'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingListing from './pages/shopping-view/listing'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaypalCancelPage from './pages/shopping-view/paypal-cancel'
import PaymentSuccessPage from './pages/shopping-view/paymnet-success'
import { checkAuth } from './store/auth-Slice'
import { useEffect } from 'react'
import Search from './pages/shopping-view/search'

function App() {
    const {isAuthenticated,user,isLoading} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
      
     dispatch(checkAuth());
     
    }, [dispatch])
    
  return (
    <div className="flex flex-col overflow-hidden bg-white">
        {/* common components */}
         
         <Routes>
          <Route path="/"  element = {
            <CheckAuth isAuthenticated={isAuthenticated} user = {user} isLoading={isLoading}><AuthLayout/></CheckAuth>
           } />
           <Route path="/auth" element = {
            <CheckAuth isAuthenticated={isAuthenticated} user = {user} isLoading={isLoading}><AuthLayout/></CheckAuth>
           }>
              <Route path="login" element = {<AuthLogin/>}/>
              <Route path= "register" element = {<AuthRegister/>}/>
              
           </Route>
           <Route  path= "/admin" element = {
            <CheckAuth isAuthenticated={isAuthenticated} user = {user} isLoading={isLoading}><Adminlayout/></CheckAuth>
          }>
               <Route path = "dashboard" element = {<AdminDashBoard/>}/>
                <Route  path = "products" element = {<AdminProducts/>}/>
                <Route  path = "orders" element = {<AdminOrders/>}/>
           </Route>
           <Route path="/shop" element= {
            <CheckAuth isAuthenticated={isAuthenticated} user = {user} isLoading={isLoading}><ShoppignLayout/></CheckAuth>
          }>
              <Route path = "home" element = {<ShoppingHome/>}/>
              <Route path = "checkout" element = {<ShoppingCheckout/>}/>
              <Route path = "account" element = {<ShoppingAccount/>}/>
              <Route path = "listing" element = {<ShoppingListing/>}/>
              <Route path = "search" element = {<Search/>}/>
                <Route path = "paypal-return" element = {<PaypalReturnPage/>}/>
            <Route path = "paypal-cancel" element = {<PaypalCancelPage/>}/>
             <Route path ="payment-success" element = {<PaymentSuccessPage/>}/>


           </Route>
         
           <Route path="*" element = {<NotFound/>}/>
           <Route path = "/unauth-page" element = {<UnauthPage/>}/>
         </Routes>
    </div>
  )
}

export default App