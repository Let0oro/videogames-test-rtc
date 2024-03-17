const UserRoutes = require('express').Router();
const {
    registerUser, 
    loginUser, 
    logoutUser,
    removeUser,
    changePasswordUser
} = require('../controllers/user.controller');
const isAuth = require('../../middlewares/auth.middleware');
const isAdmin = require("../../middlewares/admin.middleware");

UserRoutes.post('/register', [isAdmin], registerUser);
UserRoutes.post('/login', [isAdmin], loginUser);
UserRoutes.post('/logout', [isAuth], logoutUser);
UserRoutes.delete('/remove', [isAuth], removeUser);
UserRoutes.put('/password', [isAuth], changePasswordUser);


module.exports = UserRoutes;