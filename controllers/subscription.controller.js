import Subscription from '../models/subscription.model.js';
import User from '../models/user.model.js';

// Create Subscription
export const createSubscription = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
        }

        const subscription = await Subscription.create({ ...req.body, user: req.user._id });

        res.status(201).json({ success: true, message: 'Subscription created successfully', data: subscription });
    } catch (error) {
        next(error);
    }
};

// Get all subscriptions
export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, message: 'All subscriptions retrieved', data: subscriptions });
    } catch (error) {
        next(error);
    }
};

// Get a single subscription by ID
export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, message: 'Subscription retrieved', data: subscription });
    } catch (error) {
        next(error);
    }
};

// Get Subscriptions for a User
export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Cannot view another user subscriptions' });
        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, message: 'Subscriptions retrieved', data: subscriptions });
    } catch (error) {
        next(error);
    }
};

// Update Subscription
export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, message: 'Subscription updated successfully', data: subscription });
    } catch (error) {
        next(error);
    }
};

// Delete Subscription
export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Cancel Subscription
export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        subscription.status = 'cancelled';
        await subscription.save();
        res.status(200).json({ success: true, message: 'Subscription cancelled successfully', data: subscription });
    } catch (error) {
        next(error);
    }
};

// Get Upcoming Renewals
export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const today = new Date();
        const upcomingRenewals = await Subscription.find({ renewalDate: { $gte: today } }).sort({ renewalDate: 1 });
        res.status(200).json({ success: true, message: 'Upcoming renewals retrieved', data: upcomingRenewals });
    } catch (error) {
        next(error);
    }
};