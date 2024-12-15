import User from "../models/user.model.js";

export const addFavorite = async (req, res) => {
  try {
    const { userID } = req.session;
    const { launchID } = req.body;
    const itemExists = await User.find({
      _id: userID,
      favLaunches: { $elemMatch: { launchID: launchID } },
    });

    if (itemExists[0] !== undefined) {
      return res.status(400).json({
        success: false,
        error: "Item already in favorites.",
      });
    }

    const result = await User.updateOne(
      { _id: userID },
      { $push: { favLaunches: { launchID: launchID } } },
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        error: "Failed to add launch to favorites",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully added Launch to favorites.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { userID } = req.session;
    const { launchID } = req.body;

    const itemExists = await User.find({
      _id: userID,
      favLaunches: { $elemMatch: { launchID: launchID } },
    });


    if (itemExists[0] === undefined) {
      return res.status(400).json({
        success: false,
        error: "Item not in favorites.",
      });
    }

    const result = await User.updateOne(
      { _id: userID },
      { $pull: { favLaunches: { launchID: launchID } } },
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        error: "Failed to remove launch from favorites",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully removed Launch to favorites.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export const showFavorite = async (req, res) => {
  try {
    const { userID } = req.session;

    if (!userID) {
      res.status(400).json({
        success: false,
        error: "Invalid Session",
      });
    }

    const currentUser = await User.findById(userID);

    if (!currentUser) {
      res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    if (currentUser.favLaunches === undefined) {
      res.status(404).json({
        success: false,
        error: "No favorites found",
      });
    }

    res.status(200).json({
      success: true,
      data: currentUser.favLaunches,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
