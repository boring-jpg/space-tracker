import bcrypt from 'bcrypt';
import User from "../models/user.model.js"

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.session);
    try{

        const user = await User.findOne({email: email})

        if(!user) {

            return res.status(401).json({
                success: false,
                error: "Invalid username or password."
            });

        };

        if(!await bcrypt.compare(password, user.password)){

            return res.status(401).json({
                success: false,
                error: "Invalid username or password."
            });

        };
        
        if (req.session.loggedIn === true){
            return res.status(409).json({
                success: false,
                error: "User is already logged in."
            });
        };


        req.session.userID = user._id;
        req.session.loggedIn = true;
    
        return res.status(200).json({
            success: true,
            message: "Successful login"
        });

    } catch (err) {

        console.error(err.message);
        return res.status(500).json({
            success: false,
            error: "Server error:"
        });

    };
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

export const authCheck = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User is logged in."
    });
};

export const logout = (req, res) => {

    try{
        if(req.session.loggedIn === true){
            req.session.loggedIn = false;
            res.status(200).json({
                success: true,
                message: "Successfully logged out."
            })
        } else {
            res.status(400).json({
                success: false,
                error: "user is not logged in."
            });
        };
    } catch (e){
        console.error(e.message);
        res.status(500).json({
            success: false,
            error: "server error"
        });
    };
    


}
