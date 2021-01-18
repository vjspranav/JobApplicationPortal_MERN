import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import "./components/templates/node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/templates/Navbar";
import { Register } from "./accounts/Register";
import Test from "./Test";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/register" component={Register} />
        <Route path="/test" component={Test} />
      </div>
    </Router>
  );
}

export default App;
