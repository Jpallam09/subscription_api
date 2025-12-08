import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (request, response, next) => {
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Extract user details from request body
        const { name, email, password } = request.body;

        const existingUser = await User.findOne({ email });
        // Check if user with the same email already exists
        if (existingUser) {
            const error = new Error('Email already in use')
            error.statusCode = 409;
            throw error;
        }
        // Generate salt (this also includes random generation or add random values)
        const salt = await bcrypt.genSalt(10);
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session })
        // Generate JWT token
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        // Send response
        response.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0],
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (request, response, next) => {
    try {
        // Extract email and password from request body
        const { email, password } = request.body;
        // Find user by email from database
        const user = await User.findOne({ email });
        // If user not found, throw error
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        /*Compare provided password with stored hashed password (Bcrypt handles     
        salting internally to protect against rainbow table attacks)*/
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // If password is invalid, throw error
        if (!isPasswordValid) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        // Generate JWT token (user ID is embedded in the token payload)
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        response.status(200).json({
            success: true,
            message: 'Signed in successfully',
            data: {
                token,
                user,
            }
        });

    } catch (error) {
        //if any error occurs, pass it to the next middleware
        next(error);
    }
};

export const signOut = async (request, response, next) => {
    try {
        // Since JWTs are stateless, sign-out can be handled on the client side by deleting the token.
        response.status(200).json({
            success: true,
            message: 'Signed out successfully',
        });
    } catch (error) {
        next(error);
    }
};