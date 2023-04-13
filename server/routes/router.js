const express = require('express');
const user = require('../models/userSchema');
const router = express.Router();


// router.get("/",(req,res)=>{
//     res.send({result:"data"});
// })
// register User
router.post("/register", async (req, res) => {
    const { name, age, work, email, mobile, address, desc } = req.body;
    //console.log(req.body);
    if (!name || !age || !work || !email || !mobile || !address || !desc) {
        res.status(404).json("Please Fill The data");
    }

    try {

        const data = await user.findOne({ email: email });

        if (data) {
            res.status(404).json("This User is already Present");
        }
        else {

            const adduser = user({
                name: name,
                age: age,
                work: work,
                email: email,
                mobile: mobile,
                address: address,
                desc: desc
            });


            const result = await adduser.save();
            console.log(result);
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(404).json(error);
    }
})

// Get User Data

router.get("/getdata", async (req, res) => {
    try {
        const data = await user.find();
        res.status(200).json(data);
        //console.log(data);
    }
    catch (err) {
        res.status(404).json(err);
    }
})

// get individual user data

router.get("/getuser/:id", async (req, res) => {
    try {
        //console.log(req.params);
        const { id } = req.params;
        const individualUser = await user.find({ _id:id });
        res.status(200).json(individualUser);
    } catch (err) {
        res.status(404).json(err);
    }
})

//Update user
// put is update all data but patch is only update that data what we want to update
router.patch("/updateuser/:id", async(req,res)=>{
   try{
    const updateduser = await user.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    });
    //console.log(updateduser);
    res.status(201).json(updateduser);
   } catch(err){
    res.status(422).json(err);
   }
})

// Delet User 

router.delete("/deleteuser/:id", async (req,res) =>{
    try{
         const deleteuser = await user.findByIdAndDelete({_id:req.params.id});
         console.log(deleteuser);
         res.status(201).json(deleteuser);
    }catch (err){
        res.status(422).json(err);
    }
})



module.exports = router;