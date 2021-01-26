import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function RecruiterProfile({ location, history }) {
  let [isLoading, setLoading] = useState(true);
  let [user, setUser] = useState("");
  let token = sessionStorage.getItem("auth-token");

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/users/getMyUser",
        {
          headers: { "x-auth-token": token },
        },
        null
      )
      .then((response) => {
        console.log(response.status);
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(token);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (user) {
    if (user.type != "recruiter") {
      alert("Not a recruiter");
      window.location = "/dashboard";
    }
  }
  return <h1>RecruiterProfile</h1>;
}

export { RecruiterProfile };
