const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const mainLayout = "../views/layouts/main";
const homeLayout = "../views/layouts/home";
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

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
    const token = jwt.sign({id : user._id},jwtSecret,()=>{console.log("토큰이 발급되었습니다")});
    res.cookie("token",token,{httpOnly:true});
    
    //res.render("showPost",{titles,post,layout:homeLayout});
    res.redirect("/showPost");
    
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
}));

router.get("/showOne/:id",asyncHandler(async(req,res)=>{
    const titles = {
        title: "선택된 게시글 보기"
    }
    const post = await Post.findById(req.params.id);
    res.render("showOne",{titles,post,layout:homeLayout});
}))

router.get("/updateOne/:id",asyncHandler(async(req,res)=>{
    const titles = {
        title: "게시글 수정 페이지"
    }
    const post = await Post.findById(req.params.id);
    res.render("updateOne", {titles,post, layout:homeLayout});
}))

router.put("/updateOne/:id",asyncHandler(async(req,res)=>{
    
    await Post.findByIdAndUpdate(req.params.id,{title: req.body.title, content: req.body.content, createTime: Date.now()});
    res.redirect("/showPost");
}))

router.delete("/deleteOne/:id", asyncHandler(async(req,res)=>{
    await Post.deleteOne({_id : req.params.id});
    res.redirect("/showPost");
}))

router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
})


module.exports = router;