import User from "../models/user.model.js"

export const loginUser = async (req, res) => {
    res.status(200).json({
        msg: 'login user'
    });
};

export const signupUser = async (req, res) => {
    const {email, password} = req.body

    console.log('\ncreating user...')
    
    try{

        const user = await User.signup(email, password);

        res.status(200).json({
            success: true,
            user
        });

        console.log(`\nUser ${email} created`)

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });

        console.log(`\nrejected ${email}. Email aleardy in use.`)
    };
};

