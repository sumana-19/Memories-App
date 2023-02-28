import mongoose from "mongoose";
import PostMessage from "../models/postMesssage.js";
import { Comment } from "../models/Comment.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Number(total / LIMIT),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i"); // i => ignores upper and lower cases
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  }); //userId from the middleware

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

export const createComment = async (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  mongoose.isValidObjectId(req.userId);
  const newComment = new Comment({
    ...comment,
    createdAt: new Date().toISOString(),
    postedBy: req.userId,
  });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  try {
    await newComment.save();
    post.comments.push(newComment);
  } catch (error) {
    console.log(error);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //We renamed id as _id
  const post = req.body;

  console.log("Post id from backend update:",_id);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully!" });
};

export const deleteComment = async (req, res) => {
  const { id, cid } = req.params;

  const post = await PostMessage.findByIdAndUpdate(
    id,
    {
      $pull: { comments: { _id: cid } },
    },
    { new: true }
  );
  if (!post) {
    return res.status(404).send("Post not found");
  }

  await Comment.findByIdAndRemove(cid);

  res.send("Success");
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated." });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId); //Like the post
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId)); //Unlike the post
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const likeComment = async (req, res) => {
  const { id, cid } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated." });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const comment = await Comment.findById(cid);

  const index = comment.likes.findIndex((id) => {
    return id === String(req.userId);
  });
  if (index === -1) {
    comment.likes.push(req.userId);
  } else {
    comment.likes = comment.likes.filter((id) => id !== String(req.userId));
  }

  await Comment.findByIdAndUpdate(cid, {
    $set: { likes: comment.likes },
  });
  const updatedPost = await PostMessage.updateOne(
    { _id: id, "comments._id": cid },
    {
      $set: {
        "comments.$.likes": comment.likes,
      },
    },
    {
      new: true,
    }
  );
  const newpost = await PostMessage.findById(id);
  res.json(newpost);
};
