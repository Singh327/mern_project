

import React from 'react'
import { loginFormControls } from '../../config'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '../../components/common/form';
import { loginUser } from '../../store/auth-Slice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

function AuthLogin() {
 
  const dispatch = useDispatch();

function onSubmit(e){
  e.preventDefault();
  dispatch(loginUser(formData)).then((data)=>{
    if(data?.payload?.success){
      console.log(data.payload);
       toast.success(data.payload.message);
    }
    else{
       toast.warning(data.payload.message);
    }
  })
}

const initialstate = {
  email : "",
  password : ''
}

 const [formData, setFormData] = useState(initialstate);

  return (
    <div>
       
       <div className='mx-auto w-full max-w-md space-y-6'>
       <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>Login Form</h1>
          <p className='mt-2'>Don't have an account ?
            <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/register'>Sign Up</Link>
          </p>
       </div>
       <CommonForm 
        formControls={loginFormControls}
        buttonText={'Login'}
        formData={formData} 
        setFormData={setFormData}
        onSubmit={onSubmit}
       />
    </div>
    </div>
  )
}

export default AuthLogin
