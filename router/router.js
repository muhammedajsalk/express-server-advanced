const express=require('express')
const router=express.Router()
const AdminModel=require('../models/admin')


router.post('/register', async (req, res) => {
        const newAdmin= new AdminModel(req.body)
        const save= newAdmin.save()
        res.json("admin is created",save)
});

module.exports=router