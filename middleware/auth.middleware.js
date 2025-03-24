import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

//Middleware -> someone tries to get user details -> authorize middleware -> check if the user is authorized -> if yes, then get the user details 


const authorize = async (req, res, next) => {
    try {
        let token;

        // Check if the token is in the headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
            data: null,
        });
    }
}

export default authorize;