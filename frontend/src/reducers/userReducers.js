import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_ADMIN_REQUEST,
  USER_LIST_ADMIN_SUCCESS,
  USER_LIST_ADMIN_FAIL,
  USER_LIST_ADMIN_RESET,
  USER_DELETE_ADMIN_REQUEST,
  USER_DELETE_ADMIN_SUCCESS,
  USER_DELETE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userGoogleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GOOGLE_LOGIN_REQUEST:
      return { loading: true };
    case USER_GOOGLE_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_GOOGLE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListAdminReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_ADMIN_REQUEST:
      return { loading: true };
    case USER_LIST_ADMIN_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_ADMIN_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_ADMIN_REQUEST:
      return { loading: true };
    case USER_DELETE_ADMIN_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_ADMIN_REQUEST:
      return { loading: true };
    case USER_UPDATE_ADMIN_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_ADMIN_RESET:
      return { user: {} };
    default:
      return state;
  }
};
