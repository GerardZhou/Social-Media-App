import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Get user profile controller Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow/unfollow yourself" });
    }
    if (!userToModify || !currUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const isFollowing = currUser.following.includes(id);
    if (isFollowing) {
      // unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      // TODO: return id of user as a response

      res.status(200).json({ message: "User unfollowed" });
    } else {
      // follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      // send notification to user
      const newNotification = new Notification({
        from: req.user._id,
        to: id,
        type: "follow",
      });

      await newNotification.save();

      // TODO: return id of user as a response
      res.status(200).json({ message: "User followed" });
    }
  } catch (error) {
    console.log("followUnfollowUser Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSuggestUsers = async (req, res) => {
  try {
    // exclude current user and users already followed
    const userId = req.user._id;
    const usersFollowed = await User.findById(userId).select("following");
    const users = await User.aggregate([
      { $match: { _id: { $ne: userId } } },
      { $sample: { size: 10 } },
    ]);
  } catch (error) {
    console.log("getSuggestUsers Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
