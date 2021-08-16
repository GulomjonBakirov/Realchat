import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChatroomPage from "./pages/ChatroomPage";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import ProtectedRoute from "./pages/routes/ProtectedRoute";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import store from "./store";

function App() {
  const { loading, isAuthanticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/" component={IndexPage} exact={true} />
        <Route path="/login" component={LoginPage} exact={true} />
        <Route path="/register" component={RegisterPage} exact={true} />
        <Route path="/dashboard" component={DashboardPage} exact={true} />
        <Route path="/chatroom/:id" component={ChatroomPage} exact={true} />
      </Switch>
    </Router>
  );
}

export default App;
