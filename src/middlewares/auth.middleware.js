const User = require('../api/models/user.model');
const { verifyToken } = require('../utils/token.js');

async function isAuth(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!!!token) return next(new Error('Unauthorized'));

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET)
        console.log({decoded});
        req.user = await User.findById(decoded.id)
        return next()
    } catch (err) {
        next(err)
    }
}

module.exports = isAuth;