import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";

import * as Yup from "yup";
import axios from "axios";

function CreateJob({ history }) {
  return (
    <div>
      <h1>Yet to Implement</h1>
      <Button
        color="primary"
        onClick={() => {
          window.location = "/profile";
        }}
      >
        My Profile{" "}
      </Button>
      <Button
        color="primary"
        onClick={() => {
          window.location = "/dashboard";
        }}
      >
        Dashboard
      </Button>
      <Button
        color="secondary"
        onClick={() => {
          sessionStorage.setItem("auth-token", "");
          window.location = "/login";
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export { CreateJob };
