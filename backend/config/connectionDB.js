const mongoose=require('mongoose');


const connectDB=async()=>{
    mongoose.connect(process.env.CONNECTION_STRING)//connect method is used to connect the DB
    .then(()=>console.log('connected to database.'))
}
module.exports=connectDB;