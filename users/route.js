const express = require('express');
const userRegisterController = require('./controllers/registerController');
const userLoginController = require('./controllers/loginController');
const dashboardController = require('./controllers/dashboardController');

const router = express.Router();

router.get('/', userLoginController.index);
router.get('/register', userRegisterController.registerationForm);
router.post('/register', userRegisterController.registerUser);
router.post('/createAdmin', userRegisterController.registerAdmin);
router.get('/login:id', userLoginController.loginUser);
router.get('/user:id', dashboardController.showUser);
router.patch('/user:id', dashboardController.updateUser);
router.delete('/user:id',  dashboardController.deleteUser);

module.exports = router;