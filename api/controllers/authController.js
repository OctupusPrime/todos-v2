const User = require("../models/User")
const TaskList = require("../models/TaskList")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

const SECRET = "MY_SECRET_KEY";

class authController {
    async register (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return res.status(400).json({message: "Uncorect request", errors})
    
            const {email, password} = req.body
            const candidate = await User.findOne({email})
    
            if (candidate)
                return res.status(404).json({message: `User ${ email } already exist`})
    
            const hassPassword = await bcrypt.hash(password, 8)

            const thisUser = new User({email, password: hassPassword})
            await thisUser.save()

            const taskList = new TaskList({author: thisUser._id})
            await taskList.save()

            return res.json({message: "User was created"})
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Server error"})
        } 
    }

    async login (req, res) {//Сделать refresh и access
        try {
            const {email, password} = req.body
    
            const thisUser = await User.findOne({email})
            if (!thisUser) 
                return res.status(404).json({message: `User ${ email } not found`})
    
            const isPassValid = bcrypt.compareSync(password, thisUser.password)
            if (!isPassValid)
                return res.status(400).json({message: "Invalid password"})

            const token = jwt.sign({id: thisUser.id}, SECRET, {expiresIn: "7d"})
            return res.json({token})
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Server error"})
        } 
    }
}

module.exports = new authController()