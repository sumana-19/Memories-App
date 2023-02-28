import {
  FETCH_ALL,
  CREATE,
  DELETE,
  UPDATE,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  LIKE,
  COMMENT,
  DELETECOMM,
  LIKECOMMENT,
} from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
  
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case DELETECOMM:
      return {
        ...newState,
        posts: newState.posts.filter(({ comments }) =>
          comments.some(({ _id }) => _id === action.payload.cid)
        ),
      };

    case LIKECOMMENT:
      return {
        ...newState,
        posts: newState.posts.map((post) =>
          post._id === action.payload.pid ? action.payload.data : post
        ),
      };
    default:
      return state;
  }
};
