import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    getUserSubscriptions,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    getUpcomingRenewals,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// Get all subscriptions
subscriptionRouter.get('/', authorize, getAllSubscriptions);

// Get a single subscription by ID
subscriptionRouter.get('/:id', authorize, getSubscriptionById);

// Create a subscription
subscriptionRouter.post('/', authorize, createSubscription);

// Update a subscription
subscriptionRouter.put('/:id', authorize, updateSubscription);

// Delete a subscription
subscriptionRouter.delete('/:id', authorize, deleteSubscription);

// Get subscriptions for a specific user
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// Cancel a subscription
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

// Get upcoming renewals
subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

export default subscriptionRouter;

// The above defines the CRUD operations for subscriptions.
