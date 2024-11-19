
export const isLoggedIn = async (req, res, next) => {

    console.log(req.session);
    if (req.session.loggedIn){

        return res.status(401).json({
            success: false,
            error: "Unauthorized: Please log in."
        });
        
    };

    next()
}