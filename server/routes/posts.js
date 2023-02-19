import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getPostsBySearch,
  createComment,
  deleteComment,
  likeComment
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.put("/:id/comment", auth, createComment);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.delete("/:id/comment/:cid", auth, deleteComment);
router.patch("/:id/likepost", auth, likePost);
router.patch("/:id/comment/:cid",auth, likeComment);

export default router;
