import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={IndexPage} exact={true} />
        <Route path="/login" component={LoginPage} exact={true} />
        <Route path="/register" component={RegisterPage} exact={true} />
        <Route path="/dashboard" component={DashboardPage} exact={true} />
      </Switch>
    </Router>
  );
}

export default App;
