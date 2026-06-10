import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    approvalURL : null,
    isLoading:false,
    orderId : null,
    orderList:[],
    orderDetails : null
}


export const createNewOrder = createAsyncThunk('/order/createNewOrder',
    async(orderData, thunkAPI) => {
        const token = thunkAPI.getState().auth.token;
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
            }
        );
        return response.data;
    }
)

export const capturePayment = createAsyncThunk('/order/capture',
    async({payerId,paymentId,orderId},thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
          const response  = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/capture`,{
            payerId,paymentId,orderId
          },
        {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        });
        return response.data
    }
)

export const getAllOrdersByUserId = createAsyncThunk('/order/list',
    async(userId,thunkAPI)=>{
        const token = thunkAPI.getState().auth.token;
          const response  = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`,
            {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
           );
        return response.data
    }
)

export const getOrderDetails = createAsyncThunk('/order/details',
    async(id,thunkAPI)=>{
          const token  = thunkAPI.getState().auth.token;
          const response  = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`,
            {
            
            headers : {
                Authorization : `Bearer ${token}`,
            'Cache-Control' : 'no-store, no-cache, must-revalidate , proxy-revalidate',
          
           }
        }
          );
        return response.data
    }
)

const shoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {
        resetOrderDetails : (state)=>{
              state.orderDetails = null
        }
    },
    extraReducers : (builder)=>{
       builder.addCase(createNewOrder.pending,(state)=>{
        state.isLoading=true
 
       }).addCase(createNewOrder.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId));
       }).addCase(createNewOrder.rejected,(state)=>{
        state.isLoading = false,
        state.approvalURL = null,
        state.orderId = null
       }).addCase(getAllOrdersByUserId.pending,(state)=>{
        state.isLoading = true;
       }).addCase(getAllOrdersByUserId.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.orderList = action.payload.data
       }).addCase(getAllOrdersByUserId.rejected,(state)=>{
        state.isLoading = false;
        state.orderList = [];
       }).addCase(getOrderDetails.pending,(state)=>{
        state.isLoading = true;
       }).addCase(getOrderDetails.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.orderDetails = action.payload.data
       }).addCase(getOrderDetails.rejected,(state)=>{
        state.isLoading = false;
        state.orderDetails = null;
       })
    }
})
export default shoppingOrderSlice.reducer;
export const {resetOrderDetails} = shoppingOrderSlice.actions