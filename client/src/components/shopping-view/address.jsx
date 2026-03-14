import React, { useState,useEffect } from 'react'
import {Card,CardHeader,CardContent, CardTitle} from '../../components\/ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from '../../store/shop/address-slice.js'
import { toast } from 'sonner'
import AddressCard from './address-card.jsx'

const initialAddressFormData = {
   
    address : '',
    pincode : '',
    city : '',
    phone : '',
    notes : ''
}
const Address = ({setCurrentSelectedAddress,selectedId}) => {

    const [formData,setformData] = useState(initialAddressFormData);
    const [currentEditedId,setcurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const {addressList} = useSelector(state=>state.shopAddress);
    const {user} = useSelector(state=>state.auth);


    function handleManageAddress(event){
        event.preventDefault();
         if(addressList.length >= 3 && currentEditedId==null){
            setformData(initialAddressFormData);
            toast.warning("You can add max 3 addresses");
            return;
        }
        currentEditedId !== null ? 
        dispatch(editAddress({
        userId : user?.id,
        addressId : currentEditedId,
         formdata : formData
       })).then((data)=>{
        if(data?.payload?.success){
            dispatch(fetchAllAddress(user?.id));
            setcurrentEditedId(null);
            setformData(initialAddressFormData);
            toast.success("Address updated successfully");
            
            
        }
       })
        
        : 
        (
       
        dispatch(addAddress({
            ...formData,
            userId: user?.id,
        }))
            .then((data) => {
                if (data?.payload?.success) {
                    toast('Address Added successfully')
                    dispatch(fetchAllAddress(user?.id))
                    setformData(initialAddressFormData)
                    console.log(addressList)
                }
            })
        ) 
}
    
    
    


        function isFormValid(){
         return Object.keys(formData).map(key=>formData[key].trim()!=='').every(item=>item)
    }


    function handleDeleteAddress(addressId){
        console.log(addressId)
        dispatch(deleteAddress({
            addressId,userId : user?.id
        })).then(data=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id));
                console.log(addressList)
                toast.success(data?.payload?.message)
            }
        })
    }

    function handleEditAddress(getCurrentAddress){
        setcurrentEditedId(getCurrentAddress?._id);
        setformData({
            ...formData,
            address : getCurrentAddress?.address,
            pincode : getCurrentAddress?.pincode,
            city : getCurrentAddress?.city,
            phone : getCurrentAddress?.phone,
            notes : getCurrentAddress?.notes
        });
    }
    useEffect(() => {
      dispatch(fetchAllAddress(user?.id))
    }, [dispatch])
    
    console.log(addressList,'addresslist')
    return (
    <Card>
        <div className='mb-5 p-3 grid grid-cols-1 sm:gid-cols-2 md:grid-cols-2 gap-2 '>
            {
                addressList && addressList.length>0 ? 
            addressList.map(address=> <AddressCard key={address._id} addressInfo={address}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            setCurrentSelectedAddress = {setCurrentSelectedAddress}
            selectedId={selectedId}
           />)
             : null
            } 
            
            </div>
        <CardHeader>
            <CardTitle>{

                currentEditedId!==null  ? "Edit Address" : "Add New Address"
}
</CardTitle>
        </CardHeader>
        <CardContent className = "space-y-3">
           <CommonForm
           formControls = {addressFormControls}
           formData={formData}
           setFormData={setformData}
           onSubmit = {handleManageAddress}
           buttonText= {currentEditedId ? "Edit Address" : "Add Address"}
           isBtnDisabled={!isFormValid()}
           />
        </CardContent>
    </Card>
  )
}

export default Address
