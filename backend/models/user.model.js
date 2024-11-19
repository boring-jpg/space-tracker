import mongoose, { trusted } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favLaunches: [
        {
            ID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        }
    ]
});

// static methods
userSchema.pre("save", async function(next){
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    };
    next();
});

const User = mongoose.model('User', userSchema);

export default User;