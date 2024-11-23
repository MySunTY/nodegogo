const mongoose = require("mongoose");
const asyncHandler= require("express-async-handler");
require("dotenv").config();

const dbConnect = asyncHandler(async ()=>{
    const connect = await mongoose.connect(process.env.DB_CONNECT);
    console.log(`DB CONNECTED`);
})

module.exports=  dbConnect;



