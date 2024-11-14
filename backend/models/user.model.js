import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static methods

userSchema.statics.signup = async function(email, password) {
    const doesEmailExist = await this.findOne({email});

    if(doesEmailExist){
        throw Error('Email already exists');
    };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        email,
        password: hash
    });

    return user
};

const User = mongoose.model('User', userSchema);

export default User;