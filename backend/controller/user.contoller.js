import { response } from "express";
import User from "../models/user.model.js"

export const loginUser = async (req, res) => {
    res.status(200).json({
        msg: 'login user'
    });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // make sure email not alreay used.
    const userExists = await User.findOne({email});
    if (userExists){

       return res.status(400).json({
            success: false,
            error: "Email already in use."
        });
    };

    try {

        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        });

        return res.status(200).json({
            success: true,
            user: newUser
        });

    } catch (err) {

        console.error(`Error: Failed to create user. ${err}`);

        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    };

};

