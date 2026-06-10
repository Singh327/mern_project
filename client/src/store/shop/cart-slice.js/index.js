import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    cartItems : [],
    isLoading : false
}

export const addToCart = createAsyncThunk('cart/addToCart',
    async({userId,productId,quantity},thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
        {userId,productId,quantity},
        {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
       );
       return response?.data
    }
)


export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',
    async(userId,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`,
        {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
  
       );
       return response?.data
    }
)

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem',
    async({userId,productId},thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
       const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`,
        {userId,productId},
        {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
       );
       return response?.data
    }
)

export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity',
    async({userId,productId,quantity},thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
       const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
          {userId,productId,quantity},
          {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
       );
       return response?.data
    }
)



const shoppingCartSlice = createSlice({
    name : 'shoppingCart',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading = true;
            
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
            
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading = false;
            state.cartItems = []
        }).addCase(fetchCartItems.pending,(state)=>{
            state.isLoading = true;
            
        }).addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
            
        }).addCase(fetchCartItems.rejected,(state)=>{
            state.isLoading = false;
            state.cartItems = []
        }).addCase(updateCartItemQuantity.pending,(state)=>{
            state.isLoading = true;
            
        }).addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
            
        }).addCase(updateCartItemQuantity.rejected,(state)=>{
            state.isLoading = false;
            state.cartItems = []
        }).addCase(deleteCartItem.pending,(state)=>{
            state.isLoading = true;
            
        }).addCase(deleteCartItem.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
            
        }).addCase(deleteCartItem.rejected,(state)=>{
            state.isLoading = false;
            state.cartItems = []
        })

       
    }
})

 export default shoppingCartSlice.reducer;