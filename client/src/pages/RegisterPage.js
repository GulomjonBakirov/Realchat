import { useEffect, useState } from "react";
import makeToast from "../Toaster";
import { useDispatch, useSelector } from "react-redux";

import { register, clearErrors } from "../actions/userAction";

const RegisterPage = ({ history }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { loading, isAuthanticated, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthanticated) {
      makeToast("success", "Registered Successfully");
      history.push("/login");
    }

    if (error) {
      return makeToast("error", error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthanticated, history]);

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(register(data));
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
              value={data.name}
              onChange={(e) => handle(e)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abs@example.com"
              value={data.dispatchemail}
              onChange={(e) => handle(e)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={data.password}
              onChange={(e) => handle(e)}
            />
          </div>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
