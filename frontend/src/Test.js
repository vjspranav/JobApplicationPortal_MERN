import { useState } from "react";
import axios from "axios";

export default function Test({ history }) {
  let [val, setVal] = useState("You are not logged in");
  let token = sessionStorage.getItem("auth-token");
  console.log(token);
  axios
    .get(
      "http://localhost:4000/protected",
      {
        headers: { "x-auth-token": token },
      },
      null
    )
    .then((response) => {
      console.log(response.status);
      setVal(response.data.status);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div>
      <h1>{val}</h1>
      <button
        onClick={() => {
          if (val === "API atfer login is working properly !") {
            sessionStorage.setItem("auth-token", "");
            setVal("You are not Logged in");
            history.push("/");
          } else {
            history.push("/login");
          }
        }}
      >
        {val === "API atfer login is working properly !" ? "Logout" : "Login"}
      </button>
    </div>
  );
}
