import {
  ALL_CHATROOMS_REQUEST,
  ALL_CHATROOMS_SUCCESS,
  ALL_CHATROOMS_FAIL,
  CLEAR_ERRORS,
} from "../constants/chatroomConstants";
import axios from "axios";

export const getAllChatroom = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CHATROOMS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("CC_Token")}`,
      },
    };
    console.log(config);

    const { data } = await axios.get("http://localhost:4000/chatroom", config);
    console.log(data);
    dispatch({ type: ALL_CHATROOMS_SUCCESS, payload: data.chatrooms });
  } catch (error) {
    dispatch({
      type: ALL_CHATROOMS_FAIL,
      error: error.response.data.message,
    });
    console.log(error);
  }
};
