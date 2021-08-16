import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/userAction";
import makeToast from "../Toaster";

import { useSelector, useDispatch } from "react-redux";
import { getAllChatroom } from "../actions/chatroomAction";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChatroom());
  }, []);

  const { loading, error, chatroom } = useSelector(
    (state) => state.allChatroom
  );
  const logoutHandler = () => {
    dispatch(logout());
    makeToast("success", "Logged Out successfully");
    localStorage.removeItem("CC_Token");
    props.history.push("/");
  };
  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="Kursdoshlar"
          />
        </div>

        <button>Create Chatroom</button>
        <div className="chatrooms">
          {chatroom &&
            chatroom.map((chatroom) => (
              <div key={chatroom._id} className="chatroom">
                <div style={{ textTransform: "capitalize" }}>
                  {chatroom.name}
                </div>
                <Link to={`/chatroom/${chatroom._id}`} className="join">
                  Join
                </Link>
              </div>
            ))}
        </div>
        <button onClick={logoutHandler}>Logout Profile</button>
      </div>
    </div>
  );
};

export default DashboardPage;
