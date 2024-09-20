import pkg from "mongoose";
const { Schema, model, models } = pkg;

const UpvoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Upvote = models.Upvote || model("Upvote", UpvoteSchema);
export default Upvote;
