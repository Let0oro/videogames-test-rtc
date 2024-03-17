const User = require('../api/models/user.model');
require('dotenv').config();

async function isAdmin(req, res, next) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!!!user) {
            req.body.rol = (req.body.isAdmin === process.env.ADMIN);
        } else {
            const actualRol = await user.rol;
            if (!!actualRol && !!req.headers.admin) return next();
            const verifyAdmin = req.headers.admin = (req.body.isAdmin === process.env.ADMIN);
            await User.findOneAndUpdate(
            { email: email },
            { rol: verifyAdmin },
            ).lean();
        }
        return next();
    } catch (err) {
        return next(err)
    }
}

module.exports = isAdmin;