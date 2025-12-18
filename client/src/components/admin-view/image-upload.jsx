
import {Label} from '../ui/label'
import { Input } from '../ui/input'
import { useRef } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

function ProductImageUpload({imageFile, setimageFile,uploadedImageUrl, setuploadedImageUrl,imageLoadingState,setimageLoadingState}) {
  
    const inputRef = useRef(null);

    function handleImageFileChange(event){
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setimageFile(selectedFile);
    }

    function handleDragOver(event){
       event.preventDefault();
    }

    function handledrop(event){
       event.preventDefault();
       const droppedFile = event.dataTransfer.files?.[0];
       if(droppedFile) setimageFile(droppedFile);
    }

    function handleRemoveImage(){
        setimageFile(null);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }
    console.log(imageFile);

    async function uploadImageToCloudinary(){
        setimageLoadingState(true);
        const data = new FormData();
        data.append('my_file',imageFile);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',data);
        console.log(response,"response");
        if(response?.data?.success){
            setuploadedImageUrl(response.data.result.url);
            setimageLoadingState(false);
        }
    }

    useEffect(() => {
     if(imageFile!==null) uploadImageToCloudinary();
     
    
      
    }, [imageFile])
    

  return (
    <div className="w-full max-w-md mx-auto p-">
       <Label className="text-lg font-semibold mb-2 block ml-3">Upload Image</Label>
       <div onDragOver={handleDragOver} onDrop={handledrop} className='border-2 border-dashed rounded-lg p-4'>
        <Input id="image-upload" type="file" className="hidden ml-3" ref={inputRef}
         onChange = {handleImageFileChange}
        />
         {
            !imageFile ?
            <Label htmlFor="image-upload" className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                <span>Drag & drop or click to upload image</span>
            </Label> : <div className='flex items-center justify-between'>
                <div className='flex item-center '>
                    <FileIcon className='w-8 text-primary mr-2 h-8'/> 
                </div>
                <p className='text-sm font-medium'>{imageFile.name}</p>
                <Button variant='ghost' size="icon" className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                    <XIcon className='w-4 h-4'/>
                    <span className='sr-only'>Remove File</span>
                </Button>
            </div>
         }
       </div>
    </div>
  )
}

export default ProductImageUpload
