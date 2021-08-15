import { useEffect, useState } from "react";
import makeToast from "../Toaster";
import { useDispatch, useSelector } from "react-redux";

import { register, clearErrors } from "../actions/userAction";

const RegisterPage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, isAuthanticated, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthanticated) {
      history.push("/login");
    }

    if (error) {
      return console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthanticated, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    dispatch(register(formData));
  };

  return (
    <div className="card">
      <form onSubmit={submitHandler}>
        <div className="cardHeader">Registeration</div>
        <div className="cardBody">
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="G'ulomjon"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
