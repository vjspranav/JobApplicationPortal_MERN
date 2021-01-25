import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard({ location, history }) {
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
  if (user)
    return (
      <h1>
        Hello World, I am {user.username}. I am a {user.type}
      </h1>
    );
  else {
    history.push("/login");
    return <h1>Redirecting to login</h1>;
  }
}

export { Dashboard };
