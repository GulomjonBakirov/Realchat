import {
  ALL_CHATROOMS_REQUEST,
  ALL_CHATROOMS_SUCCESS,
  ALL_CHATROOMS_FAIL,
  CLEAR_ERRORS,
} from "../constants/chatroomConstants";

export const getAllChatrooms = (state = { chatrooms: [] }, action) => {
  switch (action.type) {
    case ALL_CHATROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CHATROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        chatroom: action.payload,
      };
    case ALL_CHATROOMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};
