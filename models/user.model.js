import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required...'],
        trim: true,
        minLength: 2,
        maxLenght: 55
    },

    email: {
        type: String,
        required: [true, 'Email is required...'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid address...']
    },
    password:{
        type: String,
        required: [true, 'please fill a valid password'],
        minLength: 6
    }

}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;