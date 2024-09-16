const express = require("express")
const app = express()
const path = require("path")
const upload = require("./multer")


const users = [
    "ayush",
    "joy",
    "toy",
    "ronny"
]

app.set("view engine" ,"ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.render("index")
})

app.post("/api/checkuser",function(req,res){
    if(users.includes(req.body.username)){
        res.json({
            isAvailable:false,
            message:"Username already taken."
        })
    }
    else{
        res.json({
            isAvailable:true,
            message:"Username is available"
        }) 
    }
})

app.post("/testing",upload.single("image"),function(req,res){
    var image = req.file.buffer
    
    res.json({...req.body, image})
})

app.listen(3000)