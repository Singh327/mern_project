import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading:false,
    reviews :[]
}


export const addReview = createAsyncThunk(
    '/review/addNewReview',
    async (data)=>{
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/add`,data,
            
        )
        return result?.data;
    }
)
export const getProductReviews = createAsyncThunk(
    '/reviews/get',
    async (id)=>{
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/${id}`)
        return result?.data;
    }
)

const reviewSlice = createSlice({
    name : 'reviewSlice',
    initialState,
    reducers : {},
    extraReducers :(builder)=>{
        builder.addCase(getProductReviews.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getProductReviews.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.reviews = action.payload.data;
        }).addCase(getProductReviews.rejected,(state)=>{
            state.isLoading = false;
            state.reviews = [];
        })
    }
})

export default reviewSlice.reducer;