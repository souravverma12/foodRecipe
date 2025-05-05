const express=require('express');
const app=express();
const dotenv=require('dotenv').config();// used to fetch port from the .env file
const PORT=process.env.PORT||3000;//we are fetching port from .env file , if the port is not available the set it to 3000
const connectDB=require('./config/connectionDB')
const cors=require('cors');

connectDB();
app.use(express.json());
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173', // your React app URL
    credentials: true // optional: if you're sending cookies
  }));
app.use(express.static("public"))

//we need to use the routers
app.use("/",require('./routes/user'))
app.use('/recipe',require('./routes/recipe'))


app.listen(PORT,(err)=>{
    console.log(`app is listening on ${PORT}`)
})