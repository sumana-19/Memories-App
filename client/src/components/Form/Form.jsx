import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Typography, TextField, Paper, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";

//GET THE CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }

    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own Memories and like others' Memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing` : `Creating`} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          value={postData.title}
          fullWidth
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) => {
              setPostData({ ...postData, selectedFile: base64.base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
