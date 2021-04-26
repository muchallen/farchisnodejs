const {Router} = require('express');
const appController = require('../controllers/appController')
const {requireAuth} = require('../middleware/authMiddleware')


const router = Router();
router.get('/',requireAuth, appController.home_get); 
router.get('/users',requireAuth,appController.users_get);
router.post('/users',requireAuth,appController.users_post);
router.get('/towing',requireAuth,appController.towing_get);
router.post('/towing',requireAuth,appController.towing_post);
router.get('/quotations',requireAuth,appController.service_get);
router.post('/quotations',requireAuth,appController.service_post);
router.get('/vehicles',requireAuth,appController.vehicle_get);
router.post('/vehicles',requireAuth,appController.vehicle_post);
router.get('/events',requireAuth,appController.events_get);
router.get('/events',requireAuth,appController.events_post);
router.get('/messages',requireAuth,appController.message_get);
router.post('/messages',requireAuth,appController.message_post);




module.exports = router;