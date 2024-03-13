const jwt = require('jsonwebtoken');

function generateToken(id, email) {
    if (!!!id || !!!email) {
        throw new Error('Email or id is missing');
    }
    return jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '1d'}); 
}

function verifyToken(token) {
    if (!!!token) {
        throw new Error('Token is missing')
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken, 
    verifyToken
}