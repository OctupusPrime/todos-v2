const uuid = require('uuid/v4'); 
const jwt = require('jsonwebtoken');
const { tokens, secret } = require('../config/app').jwt;

const Token = require("../models/Token");

class authHelper {
    generateAccessToken (userId) {
        const payload = {
            userId,
            type: tokens.access.type
        };
        const options = { expiresIn: tokens.access.expiresIn };
    
        return jwt.sign(payload, secret, options);
    }

    generateRefreshToken () {
        const payload = {
            id: uuid(),
            type: tokens.refresh.type
        };
        const options = { expiresIn: tokens.refresh.expiresIn };
    
        return {
            id: payload.id,
            token: jwt.sign(payload, secret, options)
        };
    }

    async replaceDbRefreshToken (tokenId, userId) {
        await Token.findOneAndRemove({ userId })
            .exec()
            .then(() => Token.create({ tokenId, userId }));
    }
}

module.exports = new authHelper();