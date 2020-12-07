import * as UserConsts from '../constants/UserActionTypes';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConsts.USER_LOGIN_REQUEST:
      return { loading: true };

    case UserConsts.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case UserConsts.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case UserConsts.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConsts.USER_REGISTER_REQUEST:
      return { loading: true };

    case UserConsts.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case UserConsts.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case UserConsts.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConsts.USER_DETAILS_REQUEST:
      return { loading: true };

    case UserConsts.USER_DETAILS_SUCCESS:
      return { loading: false, userDetail: action.payload };

    case UserConsts.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case UserConsts.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UserConsts.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case UserConsts.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case UserConsts.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case UserConsts.USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};
