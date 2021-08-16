import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";
import ChatroomPage from "./pages/ChatroomPage";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = React.useState(null);

  const setUpSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:4000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setUpSocket, 3000);
        makeToast("error", "Socket Disconnected");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setUpSocket();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={IndexPage} exact={true} />
        <Route
          path="/login"
          render={() => <LoginPage setUpSocket={setUpSocket} />}
          exact={true}
        />
        <Route path="/register" component={RegisterPage} exact={true} />
        <Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact={true}
        />
        <Route
          path="/chatroom/:id"
          render={() => <ChatroomPage socket={socket} />}
          exact={true}
        />
      </Switch>
    </Router>
  );
}

export default App;
