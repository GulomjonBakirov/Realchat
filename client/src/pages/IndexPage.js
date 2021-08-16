import React, { useEffect } from "react";

const IndexPage = ({ history }) => {
  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (!token) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
  }, []);

  return <div></div>;
};

export default IndexPage;
