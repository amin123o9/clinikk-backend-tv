const express = require('express');
const router = express.Router();
const  SubscriptionController  = require('../controllers/subscriptionController');
const authController = require('../controllers/authController');

router.use(authController.checkAuth);

router.post('/', SubscriptionController.createSubscription);
router.get('/status', SubscriptionController.checkSubscription);

module.exports = router;