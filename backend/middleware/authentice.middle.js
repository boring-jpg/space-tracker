
export const isLoggedIn = async (req, res, next) => {

    if (!req.session.userID){

        return res.status(401).json({
            success: false,
            error: "Unauthorized: Please log in."
        });
        
    };

    next()
}