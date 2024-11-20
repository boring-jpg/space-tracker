import User from "../models/user.model.js";

export const addFavorite = (req, res) => {

    try{
        const userID = req.session.userID;
        const {launchID} = req.body
        const user = User.findById(userID);

        if(!user){
            res.status(400).json({
                success: false,
                error: "User not Found"
            });
        };

        if(!Array.isArray(user.favLaunches)){
            user.favLaunches = [];
        };

        user.favLaunches.push(JSON.stringify({launchID: launchID}));

        res.status(200).json({
            success: true,
            message: "Successfully added Launch to favorites."
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: "Server Error"
        });
    };
    
};

export const removeFavorite = (req, res) => {

};