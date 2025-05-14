const express=require('express')
const app=express()
const router=require("./router/router")


app.use(express.json())
app.use(express.urlencoded())

app.use("/",router)

app.get("/",(req,res)=>{
    res.json("hello guys")
})

app.listen(3000,()=>{
     console.log("browser is runnig 3000")
})