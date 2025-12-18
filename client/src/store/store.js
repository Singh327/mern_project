import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth-Slice/index.js'

const store = configureStore({
   reducer : {
     auth : authReducer
   }
})

export default store; 