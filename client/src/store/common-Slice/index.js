import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading:false,
    featureImageList : []
}

export const getFeatureImages = createAsyncThunk(
    '/order/getFeatureImages',
    async (_,thunkAPI)=>{

         const token = thunkAPI.getState().auth.token;
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/common/feature/get`,
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



export const addFeatureImage = createAsyncThunk(
    '/order/addFeatureImage',
    async (image,thunkAPI)=>{
       const token = thunkAPI.getState().auth.token;

        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/common/feature/add`,{image},
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


const commonSlice = createSlice({
    name : 'commonSlice',
    initialState,
    reducers : {
       
    },
    extraReducers : (builder)=>{
        builder.addCase(getFeatureImages.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getFeatureImages.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.featureImageList = action.payload.data;
        }).addCase(getFeatureImages.rejected,(state)=>{
            state.isLoading = true;
            state.featureImageList = []
        })
    }
})


export default commonSlice.reducer