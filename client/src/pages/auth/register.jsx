import React from 'react'
import CommonForm from '../../components/common/form';
import {registerFormControls} from '../../config/index'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { registerUser } from '../../store/auth-Slice';
import { toast } from "sonner"

function AuthRegister() {
     const initialState = {
        userName:'',
        email :'',
        password :''
     }
     const [formData, setFormData] = useState(initialState);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     function onSubmit(e){
      console.log(formData)
       e.preventDefault();  
       dispatch(registerUser(formData)).then((data)=>{
         if(data?.payload?.success===true){
          toast.success(data?.payload?.message)
           navigate('/auth/login');
         }
         else{
          toast.warning(data?.payload?.message);
         }
       })
     }
  
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
       <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
          <p className='mt-2'>Already have an account ?
            <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/login'>Login</Link>
          </p>
       </div>
       <CommonForm 
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData} 
        setFormData={setFormData}
        onSubmit={onSubmit}
       />
    </div>
  )
}

export default AuthRegister
