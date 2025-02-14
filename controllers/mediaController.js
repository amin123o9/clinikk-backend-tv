const MediaContent = require('../models/MediaContent');
const Subscription = require('../models/subscription');

class MediaController {
    // Get all media content
    async getAllMedia(req, res) {
        try {
            const userId = req.session.userId;
            
            // Check subscription status
            const subscription = await Subscription.findOne({
                userId,
                status: 'active',
                endDate: { $gt: new Date() }
            });

            let query = {};
            if (!subscription) {
                // If no subscription, only show non-premium content
                query.isPremium = false;
            }

            const mediaContent = await MediaContent.find(query)
                .populate('categoryId', 'name')
                .sort({ createdAt: -1 });

            res.json(mediaContent);
        } catch (error) {
            console.error('Get media error:', error);
            res.status(500).json({ message: 'Error fetching media content' });
        }
    }

    // Get single media content
    async getMediaById(req, res) {
        try {
            const content = await MediaContent.findById(req.params.id)
                .populate('categoryId', 'name');

            if (!content) {
                return res.status(404).json({ message: 'Content not found' });
            }

            // Check subscription for premium content
            if (content.isPremium) {
                const subscription = await Subscription.findOne({
                    userId: req.session.userId,
                    status: 'active',
                    endDate: { $gt: new Date() }
                });

                if (!subscription) {
                    return res.status(403).json({ message: 'Subscription required' });
                }
            }

            res.json(content);
        } catch (error) {
            console.error('Get media by ID error:', error);
            res.status(500).json({ message: 'Error fetching content' });
        }
    }
}

module.exports=new MediaController();