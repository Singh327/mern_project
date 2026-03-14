

import React from 'react'
import { Card, CardHeader, CardTitle } from '../../components/ui/card'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { capturePayment } from '../../store/shop/order-slice';

function PaypalReturnPage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('paymentId');
  const payerId = params.get('PayerID')

  useEffect(()=>{
    if(paymentId && payerId){
      const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
      console.log("hello")
      dispatch(capturePayment({
        orderId : getCurrentOrderId,
        paymentId,
        payerId
      })).then((data)=>{
        if(data?.payload?.success){
           sessionStorage.removeItem('currentOrderId');
           window.location.href  =  '/shop/payment-success'
        }
    })
    }
  },[paymentId,payerId,dispatch])
  return (
    <Card>
       <CardHeader>
         <CardTitle>Processing Payment...Please wait!</CardTitle>
       </CardHeader>
    </Card>
  )
}

export default PaypalReturnPage
