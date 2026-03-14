const Address = require('../../models/Address');

const addAddress = async(req,res)=>{
    try{
       const {userId,address,city,pincode,phone,notes} = req.body;
      if(!userId || !address || !city || !pincode || !phone || !notes ){
        return res.json({
            success:false,
            message : "Invalid data provided"
        })
      }

      const newlyCreatedAddress = new Address({
        userId,address,city,pincode,notes,phone
      });
      newlyCreatedAddress.save();
      res.status(201).json({
        success:true,
        data : newlyCreatedAddress
      })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error ocurred"
        })
    }
}

const fetchAllAddress = async(req,res)=>{
    try{
      const {userId} = req.params;
      if(!userId){
        return res.status(400).json({
            success:false,
            message : "User not found"
        })
      }
      const addressList = await Address.find({userId});
      res.status(200).json({
        success:true,
        data : addressList
      })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error ocurred"
        })
    }
}
const editAddress = async(req,res)=>{
    try{
       const {userId,addressId} = req.params;
       const formData = req.body
       if(!userId || !addressId){
        return res.status(400).json({
            success:false,
            message : "User and Address Id are required"
        })
      }
      const address = await Address.findOneAndUpdate({
        _id : addressId,userId},formData,{new:true})

        if(!address){
            return res.status(404).json({
                success:false,
                message : "address not found"
            })
        }
        res.status(200).json({
            success:true,
            data : address
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error ocurred"
        })
    }
}
const deleteAddress = async(req,res)=>{
    try{
       const {userId,addressId} = req.params;
        if(!userId || !addressId){
        return res.status(400).json({
            success:false,
            message : "User and Address Id are required"
        })
      }
      const address = await Address.findOneAndDelete({
        _id : addressId,userId
      })
      if(!address){
            res.status(404).json({
                success:false,
                message : "address not found"
            })
        }
        res.status(200).json({
            success:true,
           message : "address deleted successfully"
        })
      
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error ocurred"
        })
    }
}
module.exports = {addAddress,fetchAllAddress,deleteAddress,editAddress}