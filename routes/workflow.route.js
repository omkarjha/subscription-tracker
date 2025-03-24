import { Router} from 'express';
import Subscription from '../models/subscription.model.js';
import { sendReminders } from '../controllers/workflow.controller.js'

const workflowRouter = Router();

workflowRouter.post('/subscription/reminder', sendReminders);

export default workflowRouter;