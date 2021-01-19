import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Login({ history, location }) {
  const initialValues = {
    userid: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    userid: Yup.string().required("Email id / Username is required"),
    password: Yup.string().required("Password is required"),
  });

  let onSubmit = ({ userid, password, isSubmitting }) => {
    const userDetails = { userid, password };
    axios.post("http://localhost:4000/users/login", userDetails).then(
      (response) => {
        localStorage.setItem("auth-token", response.data.token);
        console.log(response);
        history.push("/");
      },
      (error) => {
        console.log(error);
        alert("Login Failed");
        history.push("/");
      }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className="card-header">Login</h3>
          <div className="card-body">
            <div className="form-group">
              <label>Email/Username</label>
              <Field
                name="userid"
                type="text"
                className={
                  "form-control" +
                  (errors.userid && touched.userid ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="userid"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Login
                </button>
                <Link to="register" className="btn btn-link">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Login };
