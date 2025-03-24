import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscriptions.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import workflowRouter from './routes/workflow.route.js';


const app = express();

app.use(express.json()); // This helps to parse the JSON data
app.use(express.urlencoded({ extended: false})); // This helps to parse the form data
app.use(cookieParser()); // This helps to parse the cookies


app.use('/api/v1/auth', authRouter); //This is the base URL for the auth routes
app.use('/api/v1/users', userRouter); //This is the base URL for the user routes
app.use('/api/v1/subscriptions', subscriptionRouter); //This is the base URL for the subscription routes
app.use('/api/v1/workflows', workflowRouter); //This is the base URL for the workflow routes

app.use(errorMiddleware); //This is the error handling middleware

app.get('/', (req, res) => {
  res.send('Welcome to Subscription Tracker!!!');
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker server is running on localhost : http://localhost:${PORT}`);

    await connectDB();
});

export default app;