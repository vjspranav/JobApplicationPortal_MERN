import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import "./components/templates/node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/templates/Navbar";
import { Login } from "./accounts/Login";
import { Register } from "./accounts/Register";
import Test from "./Test";
import { Dashboard } from "./dashboard/dashboard";
function App() {
  let [token, setToken] = useState(sessionStorage.getItem("auth-token"));
  useEffect(() => {
    setToken(sessionStorage.getItem("auth-token"));
  }, []);
  return (
    <Router>
      <div className="container">
        {token ? "" : <Navbar />}
        <br />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/test" component={Test} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
