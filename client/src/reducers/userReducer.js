import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthanticated: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthanticated: true,
        user: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthanticated: false,
        user: 0,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
