import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth-Slice/index.js'
import adminProductsSlice from './admin/products-slice/index.js'
import shoppingProductsSlice from './shop/products-slice'
import shoppingCartSlice from './shop/cart-slice.js'
import shopAddressSlice from './shop/address-slice.js'
import shopOrderSlice from './shop/order-slice'
import adminOrderSlice from './admin/order-slice'
import shopSearchSlice from './shop/search-slice'
import shopReviewSlice from './shop/review-Slice'
import commonFeatureSlice from './common-Slice/index.js'
const store = configureStore({
   reducer : {
     auth : authReducer,
     adminProducts  : adminProductsSlice,
     shopProducts : shoppingProductsSlice,
     shoppingCart : shoppingCartSlice,
     shopAddress : shopAddressSlice,
     shopOrder : shopOrderSlice,
     adminOrder : adminOrderSlice,
     shopSearch : shopSearchSlice,
     shopReview: shopReviewSlice,
     commonFeature : commonFeatureSlice
   }
});

export default store; 