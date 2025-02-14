const Category = require('../models/Category');

class CategoryController {

    async createCategory(req, res) {
        try {
            const { name, description } = req.body;

            // Check if category already exists
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ message: 'Category already exists' });
            }

            // Create new category
            const category = new Category({
                name,
                description
            });

            await category.save();

            res.status(201).json({
                message: 'Category created successfully',
                category
            });

        } catch (error) {
            console.error('Create category error:', error);
            res.status(500).json({ message: 'Error creating category' });
        }
    }

    // Optional: Delete category
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            
            const category = await Category.findByIdAndDelete(id);
            
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.json({ message: 'Category deleted successfully' });

        } catch (error) {
            console.error('Delete category error:', error);
            res.status(500).json({ message: 'Error deleting category' });
        }
    }

    // Optional: Update category
    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const category = await Category.findByIdAndUpdate(
                id,
                { name, description },
                { new: true }
            );

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.json({
                message: 'Category updated successfully',
                category
            });

        } catch (error) {
            console.error('Update category error:', error);
            res.status(500).json({ message: 'Error updating category' });
        }
    
}
    // Get all categories
    async getCategories(req, res) {
        try {
            const categories = await Category.find().sort({ name: 1 });
            res.json(categories);
        } catch (error) {
            console.error('Get categories error:', error);
            res.status(500).json({ message: 'Error fetching categories' });
        }
    }

    // Get media by category
    async getMediaByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const userId = req.session.userId;

            // Check subscription status
            const subscription = await Subscription.findOne({
                userId,
                status: 'active',
                endDate: { $gt: new Date() }
            });

            let query = { categoryId };
            if (!subscription) {
                query.isPremium = false;
            }

            const media = await MediaContent.find(query)
                .populate('categoryId', 'name')
                .sort({ createdAt: -1 });

            res.json(media);
        } catch (error) {
            console.error('Get media by category error:', error);
            res.status(500).json({ message: 'Error fetching category media' });
        }
    }
}
module.exports=new CategoryController();

