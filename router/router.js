const express = require('express')
const router = express.Router()
const AdminModel = require('../models/admin')


router.post('/register', async (req, res) => {
        try {
                const { username} = req.body
                const checkUser = await AdminModel.findOne({ username })
                if (checkUser) return res.status(400).json({ message: "enter anothor username this user in our server" })
                const newAdmin = new AdminModel(req.body)
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
                        res.status(200).json({ message: "user is logged" })
                } else {
                        res.status(400).json({ message: "incorrect information" })
                }
        } catch (err) {
                res.status(400).json({ message: "the login post error found" })
        }

})

module.exports = router