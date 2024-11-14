import User from "../models/user.model.js"

export const loginUser = async (req, res) => {
    res.status(200).json({
        msg: 'login user'
    })
}

export const signupUser = async (req, res) => {
    res.status(200).json({
        msg: 'signup user'
    })
}

