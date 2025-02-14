const ViewingHistory = require('../models/ViewingHistory');
const MediaContent = require('../models/MediaContent');

class ViewingHistoryController {
    // Create or update viewing history
    async updateHistory(req, res) {
        try {
            const { contentId, watchDuration, lastPosition } = req.body;
            const userId = req.session.userId;

            // Check if content exists
            const content = await MediaContent.findById(contentId);
            if (!content) {
                return res.status(404).json({ message: 'Content not found' });
            }

            // Check if completed
            const completed = lastPosition >= content.duration;

            // Update or create viewing history
            const history = await ViewingHistory.findOneAndUpdate(
                { userId, contentId },
                {
                    watchDuration,
                    lastPosition,
                    completed
                },
                { upsert: true, new: true }
            );

            // Increment view count if new view
            if (!history) {
                await MediaContent.findByIdAndUpdate(contentId, {
                    $inc: { viewsCount: 1 }
                });
            }

            res.json(history);
        } catch (error) {
            console.error('Update history error:', error);
            res.status(500).json({ message: 'Error updating viewing history' });
        }
    }

    // Get user's viewing history
    async getUserHistory(req, res) {
        try {
            const userId = req.session.userId;
            const history = await ViewingHistory.find({ userId })
                .populate('contentId')
                .sort({ updatedAt: -1 });

            res.json(history);
        } catch (error) {
            console.error('Get history error:', error);
            res.status(500).json({ message: 'Error fetching viewing history' });
        }
    }

    // Get specific content progress
    async getContentProgress(req, res) {
        try {
            const { contentId } = req.params;
            const userId = req.session.userId;

            const history = await ViewingHistory.findOne({ userId, contentId });
            
            if (!history) {
                return res.json({ lastPosition: 0, completed: false });
            }

            res.json(history);
        } catch (error) {
            console.error('Get progress error:', error);
            res.status(500).json({ message: 'Error fetching content progress' });
        }
    }
}

module.exports=new ViewingHistoryController();