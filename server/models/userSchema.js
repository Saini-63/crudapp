const mongoose=require('mongoose');

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})

const user = mongoose.model("users",userschema);

module.exports=user;