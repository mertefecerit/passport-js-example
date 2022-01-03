const router = require('express').Router();
const userController = require('../controllers/User');
const validation = require('../middlewares/validation');
const {authorization} = require('../middlewares/authorization');

router.get('/',authorization, userController.index);
router.get('/login', userController.loginPage);
router.get('/register', userController.registerPage);
router.get('/forgot-password', userController.forgotPasswordPage);

router.get('/verify/:token',userController.verify);

router.post('/register-process', validation.validateNewUser(), userController.registerProcess);
router.post('/login-process', userController.loginProcess);
router.post('/logout-process', userController.logoutProcess);
router.post('/forgot-password-process',userController.forgotPasswordProcess);

module.exports = router;