import React, { Fragment } from 'react'
import {Button} from '../../components/ui/button'
import { Sheet,SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { useState } from 'react';
import CommonForm from '../../components/common/form';
import { addProductFormElements } from '../../config';
import ProductImageUpload from '../../components/admin-view/image-upload';

const initialFormData = {
  image:null,
  title:'',
  description:'',
  category:'',
  brand :'',
  price:'',
  salePrice :'',
  totalStock :''
}


function AdminProducts() {

  const [openCreateProductsDialog,setopenCreateProductsDialog] = useState(false);

  const [formData,setformData] = useState(initialFormData);
  const [imageFile, setimageFile] = useState(null);
   const [uploadedImageUrl, setuploadedImageUrl] = useState('');

  const [imageLoadingState, setimageLoadingState] = useState(false);

  function onSubmit(){

  }
  
  return (
    <Fragment>
       <div className='mb-5 w-full flex justify-end'>
        
        <Button onClick={()=> setopenCreateProductsDialog(true)}>Add New Product</Button>
       </div>
       <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
       <Sheet open={openCreateProductsDialog} onOpenChange = {()=>{
        setopenCreateProductsDialog(false)
        }}>
          <SheetContent side="right" className='overflow-auto'>
            <SheetHeader>
              <SheetTitle className='text-2xl font-bold'>Add New Product</SheetTitle>
            </SheetHeader>
             <ProductImageUpload
              imageFile={imageFile} setimageFile={setimageFile} 
              uploadedImageUrl={uploadedImageUrl}  setuploadedImageUrl={setuploadedImageUrl}
              imageLoadingState = {imageLoadingState}  setimageLoadingState = {setimageLoadingState}
              />
            <div className='py-3 px-3'>
              <CommonForm 
              formControls={addProductFormElements}
              formData ={formData}
              setFormData={setformData}
              buttonText = 'Add'
              onSubmit={onSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
    </Fragment>
  )
}

export default AdminProducts
