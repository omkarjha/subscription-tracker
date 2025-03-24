import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'; 

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Logic to create a new user
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: token,
            user: newUsers[0],
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        // Logic to sign in a user
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if(!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Send the response
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: token,
            user
        });

        
    } catch (error) {
        // Handle the error
        next(error);
    }
};

export const signOut = async (req, res, next) => { };