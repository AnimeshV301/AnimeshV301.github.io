const express = require('express') 
const bodyparser = require('body-parser') 
const mongoose = require(`mongoose`)
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://animeshv301:Dog@cat4@cluster0.r8ivj.mongodb.net/costumerdata" , { useNewUrlParser: true ,useUnifiedTopology :true})
const cotmschema = {
    name:String,
    email:String,
    address:String,
    city:String,
    State:String,
    Zip:Number,
    phone:Number
};
const costum = mongoose.model("costum",cotmschema);

app.get("/",function (req,res){
    res.sendFile(__dirname + '/loginform.html');
});
app.post("/",function (req,res){
   let newcostum = new costum({
       name:req.body.name,
       email:req.body.email,
       address:req.body.address,
       city:req.body.city,
       State:req.body.State,
       Zip:req.body.Zip,
       phone:req.body.phone
   });
   newcostum.save();
   res.redirect("/");
});

app.listen(4000,function(){
    console.log("server is running on 4000")
})