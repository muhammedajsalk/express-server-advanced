const express = require('express')
const router = express.Router()
const AdminModel = require('../models/admin')
const jwt=require('jsonwebtoken')
const bycript=require('bcryptjs')

const jwt_secret_code=process.env.ACCESS_TOKKEN_SECRET


router.post('/register', async (req, res) => {
        try {
                const { username,password} = req.body
                const checkUser = await AdminModel.findOne({ username })
                if (checkUser) return res.status(400).json({ message: "enter anothor username this user in our server" })
                const hashpassword=await bycript.hash(password,10)
                const newAdmin = new AdminModel({username:username,password:hashpassword})
                const save = await newAdmin.save()
                res.status(201).json({ message: "Admin is created", admin: save });
        } catch (error) {
               res.status(400).json({ message: "the register post error found"+error})
        }
});

router.post('/login', async (req, res) => {
        const { username, password } = req.body
        try {
                const adminUser = await AdminModel.findOne({ username })
                if (!adminUser) return res.status(400).json({ message: "invalid username" })
                if (adminUser.password === password) {
                        const token=jwt.sign({id:adminUser._id},jwt_secret_code,{expiresIn:'1hr'})
                        res.status(200).json({ message: "user is logged" ,tokenmessage:token})
                } else {
                        res.status(400).json({ message: "incorrect information" })
                }
        } catch (err) {
                res.status(400).json({ message: "the login post error found"+err })
        }

})

module.exports = router