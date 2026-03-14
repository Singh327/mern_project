




import React from 'react'
import { CardContent,Card, CardFooter } from '../ui/card'
import {Label} from '../ui/label'
import {Button} from '../ui/button'

const AddressCard = ({addressInfo,handleDeleteAddress,handleEditAddress,setCurrentSelectedAddress,selectedId}) => {
  return (
    <Card  onClick ={ setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo) : null}
    className={` cursor-pointer ${selectedId === addressInfo?._id ? 'border-black':""}`}>
        <CardContent className={`grid p-4 gap-4`}>
            <Label>Address : {addressInfo?.address}</Label>
              <Label>City : {addressInfo?.city}</Label>
                <Label>Pincode : {addressInfo?.pincode}</Label>
                  <Label>Phone : {addressInfo?.phone}</Label>
                    <Label>Notes : {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
           <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
           <Button onClick={()=>handleDeleteAddress(addressInfo?._id)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard
