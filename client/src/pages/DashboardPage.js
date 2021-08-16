import React from "react";
import { logout } from "../actions/userAction";
import makeToast from "../Toaster";

import { useSelector, useDispatch } from "react-redux";

const DashboardPage = ({ history }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    makeToast("success", "Logged Out successfully");
    localStorage.removeItem("CC_Token");
    history.push("/");
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
          <div className="chatroom">
            <div>Kursdoshlar</div>
            <div className="join">Join</div>
          </div>
          <div className="chatroom">
            <div>Kursdoshlar</div>
            <div className="join">Join</div>
          </div>
          <div className="chatroom">
            <div>Kursdoshlar</div>
            <div className="join">Join</div>
          </div>
        </div>
        <button onClick={logoutHandler}>Logout Profile</button>
      </div>
    </div>
  );
};

export default DashboardPage;
