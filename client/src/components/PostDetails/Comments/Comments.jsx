import React, { useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  TextField,
  Button,
  Box,
  List,
  Grid,
  Avatar,
} from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import {
  createComment,
  deleteComment,
  likeComment,
} from "../../../actions/posts";

const Comments = () => {
  const { posts, post, isLoading } = useSelector((state) => {
    return {
      post: state.posts.post,
      posts: state.posts.posts,
      isLoading: state.posts.isLoading,
    };
  });
  const dispatch = useDispatch();
  const { id } = useParams(); // /posts/:id
  const history = useHistory();

  const classes = useStyles();

  const [comment, setComment] = useState({
    text: "",
  });
  if (isLoading) return <div />;
  const newPost = posts.filter(({ _id }) => _id === post._id);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createComment(
        { ...comment, name: user?.result?.name, image: user?.result?.imageUrl },
        id
      )
    );
    history.push(`/posts/${id}/comment`);

    setComment({ text: "" });
  };

  const Likes = ({ comment }) => {
    if (comment.likes.length > 0) {
      return comment.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {comment.likes.length > 2
            ? `You and ${comment.likes.length - 1} others`
            : `${comment.likes.length} like${
                comment.likes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{comment.likes.length}{" "}
          {comment.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  if (!user?.result?.name) {
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In to comment on others' Memories.
          </Typography>
        </Paper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <MessageOutlinedIcon
            className={classes.commentIcon}
            fontSize="small"
          />
          <Typography variant="h6">
            Comments:{newPost[0]?.comments?.length}
          </Typography>
        </div>

        <Divider />
        <List>
          {newPost[0]?.comments?.length != 0 && (
            <div className={classes.section}>
              {newPost[0]?.comments?.map((comment) => (
                <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar
                        src={comment.image}
                        className={classes.purple}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          fontSize: "10px",
                        }}
                      />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {comment.name}
                      </h4>
                      <p style={{ textAlign: "left" }}>{comment.text}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {moment(comment.createdAt).fromNow()}
                      </p>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </div>
          )}
        </List>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <MessageOutlinedIcon className={classes.commentIcon} fontSize="small" />
        <Typography variant="h6">
          Comments:{newPost[0]?.comments?.length}
        </Typography>
      </div>
      <Divider />
      <div className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <TextField
            name="comment"
            variant="outlined"
            label="Type comment here..."
            value={comment.text}
            fullWidth
            rows={4}
            multiline
            onChange={(e) =>
              setComment({
                text: e.target.value,
              })
            }
          />
          <Grid
            style={{
              textAlign: "center",
            }}
          >
            <Button
              style={{ marginTop: "10px" }}
              color="primary"
              disabled={!comment.text}
              variant="contained"
              className={classes.button}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </Grid>
        </form>
        <List>
          {newPost[0]?.comments?.length != 0 && (
            <div className={classes.section}>
              {newPost[0]?.comments?.map((comment) => (
                <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar
                        src={comment.image}
                        className={classes.purple}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          fontSize: "10px",
                        }}
                      />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {comment.name}
                      </h4>
                      <p style={{ textAlign: "left" }}>{comment.text}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {moment(comment.createdAt).fromNow()}
                      </p>
                    </Grid>
                    <Button
                      size="small"
                      color="primary"
                      disabled={!user?.result}
                      onClick={(e) => {
                        dispatch(likeComment(post._id, comment._id));
                      }}
                    >
                      <Likes comment={comment} />
                    </Button>
                    {(user?.result?.googleId === comment?.postedBy ||
                      user?.result?._id === comment?.postedBy) && (
                      <Button
                        size="small"
                        color="secondary"
                        onClick={(e) =>
                          dispatch(deleteComment(post._id, comment._id))
                        }
                      >
                        <DeleteIcon fontSize="small" />
                        Delete
                      </Button>
                    )}
                  </Grid>
                </Paper>
              ))}
            </div>
          )}
        </List>
      </div>
    </>
  );
};

export default Comments;
