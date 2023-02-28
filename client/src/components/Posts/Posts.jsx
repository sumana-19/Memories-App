import React from "react";
import { Grid, CircularProgress, Paper } from "@material-ui/core";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No Posts";

  return isLoading ? (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" disableShrink={true} />
    </Paper>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
