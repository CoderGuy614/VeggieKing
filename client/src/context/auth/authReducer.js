import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  EDIT_PROFILE_FAIL,
  POST_PROFILE_FAIL,
  EDIT_USER,
  EDIT_USER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  DELETE_ACCOUNT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileUpdate: "SUCCESS",
      };
    case EDIT_PROFILE_FAIL:
    case POST_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        profileUpdate: "FAIL",
        error: action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
        loading: false,
        userUpdated: "SUCCESS",
      };
    case EDIT_PROFILE:
      return {
        ...state,
        loading: false,
        profileUpdated: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
