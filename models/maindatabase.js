const mangoose=require('mongoose')
require('dotenv').config()


const mongoUrl=process.env.MONGO_URL

mangoose.connect(mongoUrl)
.then(()=>console.log("the data base is connected"))
.catch((err)=>console.log("data base is error",err))


module.exports=mangoose