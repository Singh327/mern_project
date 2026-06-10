import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    productList : []
}


export const addNewProduct = createAsyncThunk(
    '/products/addnewproduct',
    async (formData,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`,formData,
            {
                headers : {
                    'Content-Type' : 'application/json',
                     Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
                }
            }
        )
        return result?.data;
    }
)
export const fetchAllProducts = createAsyncThunk(
    '/products/fetchAllProducts',
    async (_,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`,
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

export const editProduct = createAsyncThunk(
    '/products/editProduct',
    async ({id,formData},thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,formData,
            {
                headers : {
                    'Content-Type' : 'application/json',
                     Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
                }
            }
        )
        return result?.data;
    }
)


export const deleteProduct = createAsyncThunk(
    '/products/deleteProduct',
    async (id,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
             {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }

        );
        return result?.data;
    }
)



const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
       builder.addCase(fetchAllProducts.pending,(state)=>{
        state.isLoading = true
       }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
       
        state.isLoading = false,
        state.productList = action.payload.data;
       }).addCase(fetchAllProducts.rejected,(state,action)=>{
        state.isLoading = false,
        state.productList = []
       })
    }


})
export default AdminProductsSlice.reducer;