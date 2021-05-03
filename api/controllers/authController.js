const User = require("../models/User");
const Token = require("../models/Token");
const TaskList = require("../models/TaskList");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const authHelper = require('../helpers/auth.helper');

const { secret, tokens } = require('../config/app').jwt;

const updateTokens = async (userId) => {
    const accessToken = authHelper.generateAccessToken(userId);
    const refreshToken = authHelper.generateRefreshToken();

    await authHelper.replaceDbRefreshToken(refreshToken.id, userId);

    return {
            accessToken,
            refreshToken: refreshToken.token
    };
};

class authController {
    async register (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({message: "Uncorect request, try again", errors});
    
            const {email, password} = req.body;
            const candidate = await User.findOne({email});
    
            if (candidate)
                return res.status(404).json({message: `User ${ email } already exist`});
    
            const hassPassword = await bcrypt.hash(password, 8);

            const thisUser = new User({email, password: hassPassword});
            await thisUser.save();

            const taskList = new TaskList({author: thisUser._id});
            await taskList.save();

            const {refreshToken, accessToken} = await updateTokens(thisUser._id);

            res.cookie('refreshToken', refreshToken, tokens.refresh.cookieOptns); 
            res.cookie('accessToken', accessToken, tokens.access.cookieOptns); 

            return res.json({message: "User was created"})
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Server error"})
        } 
    }

    async login (req, res) {
        try {
            const {email, password} = req.body;
    
            const thisUser = await User.findOne({email});
            if (!thisUser) 
                return res.status(404).json({message: `User ${ email } not found`});
    
            const isPassValid = bcrypt.compareSync(password, thisUser.password);
            if (!isPassValid)
                return res.status(400).json({message: "Invalid password"});

            const {refreshToken, accessToken} = await updateTokens(thisUser._id);

            res.cookie('refreshToken', refreshToken, tokens.refresh.cookieOptns); 
            res.cookie('accessToken', accessToken, tokens.access.cookieOptns); 
    
            return res.send('Auntificated');
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Server error"});
        } 
    }

    async logout (req, res) {
        try {
            res.cookie('refreshToken', null, tokens.refresh.cookieOptns); 
            res.cookie('accessToken', null, tokens.access.cookieOptns); 

            return res.status(200).json({message: "User logout"});
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: "Server error"});
        }      
    }

    async refreshToken (req, res) {
        const reqRefreshToken  = req.cookies.refreshToken;
        let payload;
        try {
            payload = jwt.verify(reqRefreshToken, secret);
            if (payload.type !== 'refresh') {
                return res.status(400).json({message: "Invalid token"});
            }

            const token = await Token.findOne({ tokenId: payload.id });

            if (token === null)
                throw new Error('Invalid token!');

            const {refreshToken, accessToken} = await updateTokens(token.userId);

            res.cookie('refreshToken', refreshToken, tokens.refresh.cookieOptns); 
            res.cookie('accessToken', accessToken, tokens.access.cookieOptns); 
    
            return res.send('Tokens refreshed');

        } catch (e) {
            if (e instanceof jwt.TokenExpiredError)
                return res.status(401).json({message: "Invalid expired"});

            if (e instanceof jwt.JsonWebTokenError)
                return res.status(401).json({message: "Invalid token"});

            return res.status(400).json({message: e.message})
        }
    }
}

module.exports = new authController()