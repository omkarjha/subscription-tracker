import user from '../models/user.model.js';

//Authorizations for all the users

export const getUsers = async (req, res, next) => {
    try {
        const users = await user.find();

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

//Authorization for a single user

export const getUser = async (req, res, next) => {
    try {
        const founduser = await user.findById(req.params.id).select('-password');

        if (!founduser) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: founduser,
        });
    } catch (error) {
        next(error);
    }
}
