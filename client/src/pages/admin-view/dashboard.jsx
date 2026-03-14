import React,{useState,useEffect} from 'react'
import ProductImageUpload from '../../components/admin-view/image-upload';
import { Button } from '../../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addFeatureImage, getFeatureImages } from '../../store/common-Slice';


function AdminDashBoard() {
   const [imageFile, setimageFile] = useState(null);
     const [uploadedImageUrl, setuploadedImageUrl] = useState('');
  
    const [imageLoadingState, setimageLoadingState] = useState(false);

    const {featureImageList} = useSelector(state=>state.commonFeature);
    const dispatch = useDispatch();
    function handleUploadfeatureImage(){
      dispatch(addFeatureImage(uploadedImageUrl)).then(data=>{
        if(data?.payload?.success){
             dispatch(getFeatureImages());
             setimageFile(null);
             setuploadedImageUrl("");
        }
      });
    }
  useEffect(()=>{
    dispatch(getFeatureImages());
  },[dispatch])
  console.log(featureImageList,'featureImageList');
  return (
    <div>
     
       <ProductImageUpload
              imageFile={imageFile} setimageFile={setimageFile} 
              uploadedImageUrl={uploadedImageUrl}  setuploadedImageUrl={setuploadedImageUrl}
              imageLoadingState = {imageLoadingState}  setimageLoadingState = {setimageLoadingState}
              isCustomStyling = {true}
              />
              <Button
               onClick = {handleUploadfeatureImage}
              className="mt-5 w-full">Upload</Button>
              <div className='flex flex-col mt-5 gap-4'>
                {
                  featureImageList && featureImageList.length > 0 ? 
                  featureImageList.map(item => <div className='relative'> 
                    <img src={item?.image} alt=""
                     className='w-full h-[300px] object-cover rounded-t-lg ' />
                  </div> ) : null 
                }
              </div>
    </div>
  )
}

export default AdminDashBoard
