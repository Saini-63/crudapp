const mongoose=require('mongoose');

const connectDB=async (DB_URL)=>{
    try{
        // const DB_OPTION={
        //     dbName:'studentdb'
        // }
    //await mongoose.connect(DATABASE_URL, DB_OPTION);
    await mongoose.connect(DB_URL);
    console.log("connected Database Successfully");
    }
    catch(err){
        console.log(err);
    }

}

module.exports=connectDB;