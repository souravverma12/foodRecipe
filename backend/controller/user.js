const  Users=require("../models/user")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//define all the routers here
const userSignUp=async(req,res)=>{
const{email,password}=req.body;
if(!email || !password){
    return res.status(400).json({message:'Email and password is required.'})
}
let user=await Users.findOne({email});

//if the user already exists
if(user){
    return res.status(400).json({error:"email already exists."})
}
//if the user doesn't exist then create it
const hashPwd=await bcrypt.hash(password,10)//hash the password
const newUser=await Users.create({email,password:hashPwd})
let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)// create jwt token
return res.status(200).json({token,user:newUser})

}




const userLogin=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
    return res.status(400).json({message:'Email and password is required.'})
}
let user=await Users.findOne({email});

//if theh user exists and the psswrd is same
if(email && await bcrypt.compare(password,user.password)){
    let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY)// create jwt token
    return res.status(200).json({token,user})

}
else{
    //if the user doesn't exists
    return res.status(400).json({error:"Invalid credentials"})
}

}
const getUser=async(req,res)=>{
    const user=await Users.findById(req.params.id);
    res.json({email:user.email})

}


module.exports={userSignUp,userLogin,getUser};