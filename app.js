const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const dbConnect = require("./config/db");
const methodOverride = require("express-method-override");
const cookieParser = require("cookie-parser");

dbConnect();

app.use(expressLayouts);
app.set("view engine","ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));
app.use(cookieParser());


app.use("/",require("./routes/main"));


app.listen(port, ()=>{
    console.log(`Server Start : ${port}번`);
});