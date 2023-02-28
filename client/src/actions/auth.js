import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    //Error logs
    console.log(error);

    let errorCode = error.response.status;

    if (errorCode === 404) alert("No user exists with those credentials !!");
    else if (errorCode === 400) alert("Please check you E-Mail or Password !");
    else if (errorCode === 500)
      alert("Oops! Looks like something went wrong. :(");
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error.response.data);
    let errorCode = error.response.status;
    let errorMessage = error.response.data.message;

    if (errorCode === 400) alert(errorMessage);
    else if (errorCode === 500)
      alert("Oops! Looks like something went wrong. :(");
  }
};
