const express = require('express');
const router = express.Router();
const  ViewingHistoryController  = require('../controllers/viewingHistoryController');
const authController = require('../controllers/authController');

router.use(authController.checkAuth);

router.post('/', ViewingHistoryController.updateHistory);
router.get('/', ViewingHistoryController.getUserHistory);
router.get('/:contentId', ViewingHistoryController.getContentProgress);

module.exports = router;