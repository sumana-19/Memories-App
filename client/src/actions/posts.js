import {
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  LIKE,
  COMMENT,
  DELETECOMM,
  LIKECOMMENT,
} from "../constants/actionTypes";
import * as api from "../api";

//Action creators

//function that returns another function
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.error();
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createComment = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.createComment(comment, id);
    dispatch({ type: COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (pid, cid) => async (dispatch) => {
  try {
    await api.deleteComment(pid, cid);
    dispatch({ type: DELETECOMM, payload: { pid, cid } });
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = (pid, cid) => async (dispatch) => {
  try {
    const { data } = await api.likeComment(pid, cid);
    dispatch({ type: LIKECOMMENT, payload: { pid, data } });
  } catch (error) {
    console.log(error);
  }
};
