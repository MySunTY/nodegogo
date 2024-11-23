const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const mainLayout = "../views/layouts/main";

router.get("/",asyncHandler(async(req,res)=>{
    const titles = {
        title: "Main Page"
    }
    res.render("index",{titles, layout: mainLayout});
}));

router.get("/register",(req,res)=>{
    const titles= {
        title : "회원등록페이지"
    }
    res.render("register",{titles, layout:mainLayout});
})

module.exports = router;