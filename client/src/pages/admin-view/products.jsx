import React, { Fragment } from 'react'
import {Button} from '../../components/ui/button'
import { Sheet,SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { useState } from 'react';
import CommonForm from '../../components/common/form';
import { addProductFormElements } from '../../config';
import ProductImageUpload from '../../components/admin-view/image-upload';
import {useDispatch, useSelector} from 'react-redux'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '../../store/admin/products-slice';
import { toast } from 'sonner';
import { useEffect } from 'react';
import AdminProductTile from '../../components/admin-view/product-tile';


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
  
   const {productList} = useSelector(state=>state.adminProducts);
  const [currentEditedId,setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  function onSubmit(event){
       event.preventDefault();
       currentEditedId !==null ? 
       dispatch(editProduct({
        id: currentEditedId,
        formData 
       })).then((data)=>{
          if(data?.payload?.success){
             dispatch(fetchAllProducts());
             setformData(initialFormData);
             toast.success('Product edited successfully');
             setopenCreateProductsDialog(false);
             setCurrentEditedId(null);
          }
       }) : 
       dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
       })).then((data)=>{
          if(data?.payload?.success){
            dispatch(fetchAllProducts());
             setimageFile(null);
             setformData(initialFormData);
             toast.success("Product added successfully");
             setopenCreateProductsDialog(false);
          }
       })
  }

  useEffect(() => {
    
   dispatch(fetchAllProducts())
   
  }, [dispatch]);

  function isFormValid(){
    return Object.keys(formData).map(key=> formData[key]!=='').every((item)=>item);
  }

function handleDelete(id){
  console.log(id);
  dispatch(deleteProduct(id)).then((data)=>{
    console.log(data);
    if(data?.payload?.success){
        dispatch(fetchAllProducts());
        toast.success(data.payload.message);
    }
    else{
      toast.warning(data.payload.message);
    }
  })
} 

  console.log(productList,"formData");
  
  
  return (
    <Fragment>
       <div className='mb-5 w-full flex justify-end'>
        
        <Button onClick={()=> setopenCreateProductsDialog(true)}>Add New Product</Button>
       </div>
       <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList  && productList.length > 0 ?
          productList.map(productItem => <AdminProductTile
            setCurrentEditedId={setCurrentEditedId}
            setopenCreateProductsDialog = {setopenCreateProductsDialog}
            setformData = {setformData}
             handleDelete = {handleDelete}
             product = {productItem}/>): null
        }
       </div>
       <Sheet open={openCreateProductsDialog} onOpenChange = {()=>{
        setopenCreateProductsDialog(false)
        setCurrentEditedId(null);
        setformData(initialFormData);
        }}>
          <SheetContent side="right" className='overflow-auto'>
            <SheetHeader>
              <SheetTitle className='text-2xl font-bold'>
                {
                  currentEditedId !==null ? 'Edit the Product' : 'Add new product'
                }
                </SheetTitle>
            </SheetHeader>
             <ProductImageUpload
              imageFile={imageFile} setimageFile={setimageFile} 
              uploadedImageUrl={uploadedImageUrl}  setuploadedImageUrl={setuploadedImageUrl}
              imageLoadingState = {imageLoadingState}  setimageLoadingState = {setimageLoadingState}
              isEditMode = {currentEditedId!==null}
              />
            <div className='py-3 px-3'>
              <CommonForm 
              formControls={addProductFormElements}
              formData ={formData}
              setFormData={setformData}
              buttonText = {currentEditedId!==null ? 'Edit' : 'Add'}
              onSubmit={onSubmit}
              // if isFormValid() is false, it means some of the fileds are missing
              isBtnDisabled = {!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
    </Fragment>
  )
}

export default AdminProducts
