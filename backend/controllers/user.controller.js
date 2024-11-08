

const users = [];

export const getUsers = (req, res) => {
    
    res.status(200).json({
        success: true,
        data: users
    });
};

export const makeUsers = (req, res) => {

    const user = {
        name: req.body.name,
        password: req.body.password
    }

    users.push(user);
    
    res.status(200).json({
        success: true,
        user_created: user.name
    });
};