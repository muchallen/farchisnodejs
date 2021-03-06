const {Router} = require('express');
const authController = require('../controllers/authControllers')
const {requireAuth} = require('../middleware/authMiddleware')
const router = Router();
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
router.get('/signup',requireAuth,authController.signup_get);
router.post('/signup',requireAuth,authController.signup_post);
router.get('/logout',authController.logout_get);




module.exports = router;