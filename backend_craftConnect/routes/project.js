import { Router } from "express";
import {
  getProject,
  getTopRankedUsers,
  addProject,
  deleteProject,
  updateProject,
  upvoteProject,
  getUpvoteStatus,
  addComment,
  mostUpVoted,
} from "../controllers/project.js";
import { isAuthenticated } from "../middlewares/auth.js";
import upload from "../services/multer.js";
const router = Router();

router.get("/top-ranked", getTopRankedUsers);
router.get("/most-upvoted", mostUpVoted);
router.get("/:projectId", getProject);
router.post("/add", isAuthenticated, upload.array("images", 5), addProject);
router.put("/:projectId/upvote", isAuthenticated, upvoteProject);
router.get("/:projectId/upvote-status", isAuthenticated, getUpvoteStatus);
router.delete("/:id/:projectId", isAuthenticated, deleteProject);
router.put(
  "/:id/:projectId",
  isAuthenticated,
  upload.array("images", 5),
  updateProject
);
router.post("/:projectId/comments", isAuthenticated, addComment);

export default router;
