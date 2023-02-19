import mongoose from "mongoose";
import { commentSchema } from "./Comment.js";
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      type: commentSchema,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
