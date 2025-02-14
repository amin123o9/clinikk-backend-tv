const express = require('express');
const router = express.Router();
const  MediaController  = require('../controllers/mediaController');
const authController = require('../controllers/authController');

router.use(authController.checkAuth);

router.get('/', MediaController.getAllMedia);
router.get('/:id', MediaController.getMediaById);

module.exports = router;