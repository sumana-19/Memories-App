import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import decode from "jwt-decode";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [searchTerm, setSearchTerm] = useState("");

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime())
        //logout the user if the token expired
        logout();
    }
    //JWT

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); //When location changes,set the user;

  

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.picture}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            color="primary"
            variant="contained"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
