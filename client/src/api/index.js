import axios from "axios";

const API = axios.create({
  baseURL: "https://memories-app-t2z1.onrender.com",
});

//localhost:3001
//https://memories-app-t2z1.onrender.com

//For sending the token to the middleware
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const createComment = (comment, id) =>
  API.put(`/posts/${id}/comment`, comment);
export const updatePost = (id, updatedPost) =>
  axios.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const deleteComment = (pid, cid) =>
  API.delete(`/posts/${pid}/comment/${cid}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const likeComment = (pid, cid) =>
  API.patch(`/posts/${pid}/comment/${cid}`);

export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
