import Project from "../models/projects.js";
import Comment from "../models/comments.js";
import Upvote from "../models/upvote.js";

export const getDashboardData = async (req, res) => {
  try {
    const projects = await Project.find().populate("user");
    const comments = await Comment.find();
    const upvotes = await Upvote.find();

    const dashboardData = projects.map((project) => {
      const projectComments = comments.filter((comment) =>
        comment.project.equals(project._id)
      ).length;
      const projectUpvotes = upvotes.filter((upvote) =>
        upvote.project.equals(project._id)
      ).length;
      const profileVisits = 0;

      return {
        project,
        comments: projectComments,
        upvotes: projectUpvotes,
        profileVisits,
      };
    });

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
