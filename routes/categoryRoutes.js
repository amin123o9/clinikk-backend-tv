// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const  CategoryController  = require('../controllers/categoryController');
const authController = require('../controllers/authController');

router.use(authController.checkAuth);

router.get('/', CategoryController.getCategories);
router.get('/:categoryId/media', CategoryController.getMediaByCategory);
router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;