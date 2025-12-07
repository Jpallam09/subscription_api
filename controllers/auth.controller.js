import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (request, response, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = request.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('Email already in use')
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session })

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

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
        const { email, password } = request.body;

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

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