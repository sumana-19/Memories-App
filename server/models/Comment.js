import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
  text: String,
  name: String,
  image: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  postedBy: { type: String, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);
export { Comment, commentSchema };
