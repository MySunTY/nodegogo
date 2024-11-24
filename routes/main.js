const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const mainLayout = "../views/layouts/main";
const homeLayout = "../views/layouts/home";
const User = require("../models/user");
const Post = require("../models/post");

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
});

router.post("/register",asyncHandler(async (req,res)=>{
    const {username, password, password2} = req.body;
    if(password!= password2){
        res.send("비밀번호를 확인해주세요");
    }else{
        const user= User.create({username: username, password: password});
        res.redirect("/");
    }
    
}));

router.post("/login",asyncHandler(async(req,res)=>{
    const {username , password} = req.body;
    const user = await User.findOne({username});
    const post = await Post.find();
    const titles = {
        title: "Show Post Page"
    }
    if(!user){
        return res.send("아이디를 확인해주세요");
    }
    if(password != user.password){
        return res.send("비밀번호를 확인해주세요");
    }
    
    res.render("showPost",{titles,post,layout:homeLayout});
    
}));

router.get("/showPost",asyncHandler(async (req,res)=>{
    const titles ={
        title : "Show Post Page"
    }
    const post = await Post.find();
    res.render("showPost",{titles,post, layout:homeLayout});
}))

router.get("/createPost", (req,res)=>{
    const titles ={
        title: "게시글 작성하기" 
    }
    res.render("createPost",{titles, layout:homeLayout});
});

router.post("/createPost",asyncHandler(async(req,res)=>{
    const {title, content} = req.body;
    const post = await Post.create({
        title: title,
        content : content
    });

    res.redirect("/showPost");
}))



module.exports = router;