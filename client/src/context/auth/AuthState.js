import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PROFILE_SUCCESS,
  POST_PROFILE_FAIL,
  EDIT_USER_FAIL,
  USER_LOADED,
  EDIT_USER,
  EDIT_PROFILE,
  EDIT_PROFILE_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Post Profile
  const postProfile = async (profile) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/profile", profile, config);
      dispatch({
        type: PROFILE_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: POST_PROFILE_FAIL,
        payload: err.response.data.errors,
      });
    }
  };

  const editUser = async (typ, val, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/users/${id}`, { [typ]: val }, config);

      dispatch({
        type: EDIT_USER,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: EDIT_USER_FAIL,
        payload: err.response.data.errors,
      });
    }
  };

  const editProfile = async (typ, val, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/profile/${id}`, { [typ]: val }, config);

      dispatch({
        type: EDIT_PROFILE,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload: err.response.data.errors,
      });
    }
  };

  const deleteAccount = async (id) => {
    try {
      const res = await axios.delete("/api/profile");
      dispatch({
        type: DELETE_ACCOUNT,
        payload: res.data.msg,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        postProfile,
        editProfile,
        editUser,
        clearErrors,
        deleteAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
