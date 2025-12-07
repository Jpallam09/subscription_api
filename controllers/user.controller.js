import User from '../models/user.model.js';

// Get all Users
export const getUsers = async (req, res, next) => {
    //fetch all users from database
    try {
        const users = await User.find();
        //return users
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next.status(400).json({ error: error.message });
    }
};

//Get a single User by ID
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        //no user found
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        //user found
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};
