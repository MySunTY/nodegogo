const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const dbConnect = require("./config/db");

dbConnect();

app.use(expressLayouts);
app.set("view engine","ejs");
app.set("views", "./views");

app.use(express.static("public"));


app.use("/",require("./routes/main"));


app.listen(port, ()=>{
    console.log(`Server Start : ${port}번`);
});