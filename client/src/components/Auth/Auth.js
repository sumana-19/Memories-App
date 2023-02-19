import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Input from "./Input";
import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signin, signup } from "../../actions/auth";
import jwt_decode from "jwt-decode";

import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // console.log("res:", res);

    const decoded= jwt_decode(res.credential);    //Decoding JWT


    const {name, picture, sub} = decoded;

    const result = decoded;
    const token = res?.credential;

    try {
      //const userID = api.getUserIdFromGoogleToken(googleToken)
      // OR
      //const userToken = api.getTokenFromGoogleToken(googleToken)
      dispatch({ type: "AUTH", data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful.Try again later.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            state_cookie_domain="same-origin-allow-popups"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account?Sign In"
                  : "Don't have an account?Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
