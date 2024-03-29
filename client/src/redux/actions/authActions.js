import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// Register user
export const register = ({ name, email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// logout user
export const logout = () => ({
  type: LOGOUT_SUCCESS
});

// login user
export const login = ({ email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch(
        returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// setup config/headers and token
export const tokenConfig = getState => {
  // get token from localStorage
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // if token - add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
