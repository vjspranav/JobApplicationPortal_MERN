import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import "./components/templates/node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/templates/Navbar";
import { Login } from "./accounts/Login";
import { Register } from "./accounts/Register";
import Test from "./Test";
import { Dashboard } from "./dashboard/dashboard";
import { MyApplications } from "./dashboard/myApplications";
import { Jobs } from "./dashboard/jobs";
import { MyJobs } from "./dashboard/myJobs";
import { MyJobApplications } from "./dashboard/myJobApplications";
import { Profile } from "./profile/profile";
import { ApplicantProfile } from "./profile/applicantProfile";
import { RecruiterProfile } from "./profile/recruiterProfile";
import { CreateJob } from "./dashboard/createJob";

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
        <Route path="/profile" component={Profile} />
        <Route path="/applicantProfile" component={ApplicantProfile} />
        <Route path="/recruiterProfile" component={RecruiterProfile} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/myjobs" component={MyJobs} />
        <Route path="/myjobapplications" component={MyJobApplications} />
        <Route path="/applications" component={MyApplications} />
        <Route path="/createjob" component={CreateJob} />
      </div>
    </Router>
  );
}

export default App;
