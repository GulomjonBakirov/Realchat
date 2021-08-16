import React, { useEffect, useState } from "react";
import makeToast from "../Toaster";
import { useDispatch, useSelector } from "react-redux";

import { login, clearErrors } from "../actions/userAction";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, isAuthanticated, error, token, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isAuthanticated) {
      makeToast("success", "Login successfully");
      localStorage.setItem("CC_Token", token);
      history.push("/dashboard");
    }

    if (error) {
      return makeToast("error", error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isAuthanticated, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="card">
      <form onSubmit={submitHandler}>
        <div className="cardHeader">Login</div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abs@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
