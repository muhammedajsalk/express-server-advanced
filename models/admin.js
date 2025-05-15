const mangoose=require('../models/maindatabase')

const AdminSchema= new mangoose.Schema({
    username:String,
    password:String
}, { collection: 'AdminData' })

const AdminModel=mangoose.model("Admin",AdminSchema)


module.exports=AdminModel