import validate from "validator";

export const validateSignup = async (req, res, next) => {
    let { name, email, password } = req.body;

    const errorMsg = (message) => {
        return res.status(400).json({
            success: false,
            error: message
        });
    };

    // validate user input
    if (!name || !email || !password){
        return errorMsg("Missing required fields");
    };

    if (!validate.isEmail(email)) {
        return errorMsg("Invalid Email.");
    };

    if (!validate.isStrongPassword(password)){
        return errorMsg("Password not strong enough.")
    };

    // normalize user input
    req.body.email = validate.normalizeEmail(email).trim();
    req.body.name = name.toLowerCase().trim();

    next();
};

export const validateLogin = async (req, res, next) => {
    let {email, password} = req.body;

    const errorMsg = (message) => {
        return res.status(400).json({
            success: false,
            error: message
        });
    };

    if (!email || !password){
        return errorMsg("Missing email or password");
    };

    // normalize email
    req.body.email = validate.normalizeEmail(email).trim();

    next();
}