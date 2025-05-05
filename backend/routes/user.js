const express=require('express');
const {userSignUp,userLogin,getUser} =require( "../controller/user")
const router=express.Router();

router.post("/signup",userSignUp)
router.post("/login",userLogin)
router.get("/user/:id",getUser)


module.exports=router;