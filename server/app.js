require('dotenv').config();
const express=require('express');
const user=require('./models/userSchema');
const cors=require('cors');
const router=require('./routes/router');
const connectDB=require('./db/connection');
const DB_URL="mongodb://localhost:27017/crud_MERN";



const app=express();

const port=8000;
//cors package is used to connect client to server folder 
app.use(cors());
app.use(express.json());
connectDB(DB_URL);
app.use(router);

app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
})