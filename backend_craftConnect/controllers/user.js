import User from "../models/users.js";
import Project from "../models/projects.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const projects = await Project.find({ user: userId }).exec();
    const userProjects = projects.flat();
    const totalVotes = userProjects.reduce(
      (accumulator, project) => accumulator + project.upvotes,
      0
    );
    res.json({
      user,
      projects: userProjects,
      totalUpvotes: totalVotes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        message: "You are not authorized to update other users profile",
      });
    }
    if (req.body.currentUser !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to edit other users profile",
      });
    }

    const { formData } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    if (formData.username) user.username = formData.username;
    if (formData.email) user.email = formData.email;
    if (formData.bio) user.bio = formData.bio;
    if (formData.role) user.role = formData.role;

    await user.save();

    res.json({ message: "User details updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProfile = async (req, res) => {
  try {
    const { query } = req.query; 

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const regex = new RegExp(query, "i");

    const users = await User.find({
      $or: [{ username: { $regex: regex } }, { email: { $regex: regex } }],
    })
      .limit(5)
      .exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
};
