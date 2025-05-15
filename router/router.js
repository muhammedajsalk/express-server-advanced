const express = require('express')
const router = express.Router()
const AdminModel = require('../models/admin')
const UserModel = require('../models/users')
const jwt = require('jsonwebtoken')
const bycript = require('bcryptjs')
const authMiddleware = require('../controller/authMiddleWare')
const fileuploads = require('../controller/fileuploadMiddleware')

const jwt_secret_code = process.env.ACCESS_TOKKEN_SECRET


router.post('/register', async (req, res) => {
        try {
                const { username, password } = req.body
                const checkUser = await AdminModel.findOne({ username })
                if (checkUser) return res.status(400).json({ message: "enter anothor username this user in our server" })
                const hashpassword = await bycript.hash(password, 10)
                const newAdmin = new AdminModel({ username: username, password: hashpassword })
                const save = await newAdmin.save()
                res.status(201).json({ message: "Admin is created", admin: save });
        } catch (error) {
                res.status(400).json({ message: "the register post error found" + error })
        }
});

router.post('/login', async (req, res) => {
        const { username, password } = req.body
        try {
                const adminUser = await AdminModel.findOne({ username })
                if (!adminUser) return res.status(400).json({ message: "invalid username" })
                if (adminUser.password === password) {
                        const token = jwt.sign({ id: adminUser._id }, jwt_secret_code, { expiresIn: '1hr' })
                        res.status(200).json({ message: "user is logged", tokenmessage: token })
                } else {
                        res.status(400).json({ message: "incorrect information" })
                }
        } catch (err) {
                res.status(400).json({ message: "the login post error found" + err })
        }

})

const middelwarestycoo = [authMiddleware, fileuploads.single("photo")]

router.post('/users', middelwarestycoo, async (req, res) => {
        try {
                const { username, email, name, photo } = req.body
                const users = await UserModel.findOne({ username })
                if (users) return res.status(400).json({ message: "the user is already in database" })
                const newuser = new UserModel({ username: username, email: email, name: name, photo: `uploads/${req.file.filename}` })
                const save = await newuser.save()
                res.status(200).json({ message: "new user added succefully", newuser: save })
        } catch (error) {
                res.status(400).json({ message: "error is " + error })
        }
})

router.get("/users", authMiddleware, async (req, res) => {
        try {
                const datas = await UserModel.find()
                res.status(200).json(datas)

        } catch (error) {
                res.status(400).json({ message: "error is " + error })
        }
})

router.get("/users/:id", authMiddleware, async (req, res) => {
        try {
                const id = req.params.id
                const userData = await UserModel.findOne({ _id: id })
                if (userData == null) return res.status(400).json({ message: "user data not found" })
                res.status(200).json(userData)
        } catch (error) {
                res.status(400).json({ message: "error is " + error })
        }
})

router.put("/users/:id",authMiddleware, async (req, res) => {
        try {
                const id = req.params.id
                const newuserData = await UserModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
                if (newuserData == null) return res.status(400).json({ message: "user data not found" })
                res.status(200).json(newuserData)
        } catch (error) {
                res.status(400).json({ message: "error is " + error })
        }
})
module.exports = router