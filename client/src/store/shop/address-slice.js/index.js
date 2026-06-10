import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    isLoading:false,
    addressList : []
}

export const addAddress  = createAsyncThunk('/addresses/add',
    async(formdata,thunkAPI)=>{
        console.log(formdata);
        const token = thunkAPI.getState().auth.token;
        const response  = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add`,formdata,
           {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
        );
        return response?.data;
    }
    
)

export const fetchAllAddress = createAsyncThunk('/fetchAllAddress',
    async(userId,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
         const response  = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`,
            {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
         );
         return response?.data;
    }
)

export const editAddress = createAsyncThunk('/editaddress',
    async({userId,addressId,formdata},thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
         const response  = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,formdata,
            {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
         );
         return response?.data;
    }
)

export const deleteAddress = createAsyncThunk('/deleteAddress',
    async({userId,addressId,thunkAPI})=>{
        const token = thunkAPI.getState().auth.token;
         const response  = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`,
            {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
         );
         return response?.data;
    }
)

const addressSlice = createSlice({
    name : 'address',
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder.addCase(fetchAllAddress.pending,(state)=>{
           state.isLoading = true;
        }).addCase(fetchAllAddress.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.addressList = action.payload.data;
        }).addCase(fetchAllAddress.rejected,(state)=>{
            state.isLoading=false;
            state.addressList =[]
        })
    }
});

export default addressSlice.reducer;