const mongoose = require('../models/maindatabase')


const usersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: String
}, { collection: 'users' })

const UsersModel = mongoose.model("users", usersSchema)

module.exports = UsersModel




