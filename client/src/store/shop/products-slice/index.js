import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState  ={
    isLoading : false,
    productList : [],
    productDetails : null
}

export const fetchAllFilteredProducts = createAsyncThunk(
    '/products/fetchAllProducts',
    async ({filterParams,sortParams},thunkAPI)=>{

        const query =  new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        })
         const token  = thunkAPI.getState().auth.token;
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`,
            {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
           
        )
        return result?.data;
    }
)

export const fetchProductDetails = createAsyncThunk(
    '/products/fetchProductDetails',
    async (id,thunkAPI)=>{

         const token  = thunkAPI.getState().auth.token;
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`,
            {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
           
        )
        return result?.data;
    }
)



const ShoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {
        setProductDetails : (state)=>{
            state.productDetails = null;
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending,(state,action)=>{
            state.isLoading = true
            
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
             state.isLoading = false
             state.productList = action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading = false,
            state.productList = []
        }).addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading = true;

        }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.productDetails = action.payload.data;
        }).addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading = false,
            state.productDetails =null;
        })
        
    }
})

export const {setProductDetails} = ShoppingProductSlice.actions;
export default ShoppingProductSlice.reducer