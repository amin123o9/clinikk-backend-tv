const Subscription = require('../models/subscription');

class SubscriptionController {
    // Create subscription
    async createSubscription(req, res) {
        try {
            const { planType, startDate, endDate } = req.body;
            const userId = req.session.userId;

            // Check for existing active subscription
            const existingSubscription = await Subscription.findOne({
                userId,
                status: 'active',
                endDate: { $gt: new Date() }
            });

            if (existingSubscription) {
                return res.status(400).json({ message: 'Active subscription exists' });
            }

            const subscription = new Subscription({
                userId,
                planType,
                status: 'active',
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            });

            await subscription.save();
            res.status(201).json(subscription);
        } catch (error) {
            console.error('Subscription creation error:', error);
            res.status(500).json({ message: 'Error creating subscription' });
        }
    }

    // Check subscription status
    async checkSubscription(req, res) {
        try {
            const userId = req.session.userId;
            const subscription = await Subscription.findOne({
                userId,
                status: 'active',
                endDate: { $gt: new Date() }
            });

            res.json({
                isSubscribed: !!subscription,
                subscription: subscription || null
            });
        } catch (error) {
            console.error('Subscription check error:', error);
            res.status(500).json({ message: 'Error checking subscription' });
        }
    }
}

module.exports=new SubscriptionController();