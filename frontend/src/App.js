import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import "./components/templates/node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/templates/Navbar";
import { Login } from "./accounts/Login";
import { Register } from "./accounts/Register";
import Test from "./Test";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Test} />
      </div>
    </Router>
  );
}

export default App;
