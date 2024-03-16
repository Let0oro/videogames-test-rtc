const UserRoutes = require('express').Router();
const {
    registerUser, 
    loginUser, 
    logoutUser,
    removeUser,
    changePasswordUser
} = require('../controllers/user.controller');
const isAuth = require('../../middlewares/auth.middleware');

UserRoutes.post('/register', registerUser);
UserRoutes.post('/login', loginUser);
UserRoutes.post('/logout', [isAuth], logoutUser);
UserRoutes.delete('/remove', [isAuth], removeUser);
UserRoutes.put('/password', [isAuth], changePasswordUser);


module.exports = UserRoutes;