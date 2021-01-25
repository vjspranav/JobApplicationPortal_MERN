import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register({ history }) {
  const initialValues = {
    fullName: "",
    username: "",
    gender: "M",
    email: "",
    type: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Gender is required"),
    fullName: Yup.string().required("Name is required"),
    username: Yup.string().required("Userame is required"),
    type: Yup.string().required("Type of User is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    const userDetails = {
      name: fields.fullName,
      username: fields.username,
      email: fields.email,
      type: fields.type,
      gender: fields.gender,
      password: fields.password,
    };
    axios.post("http://localhost:4000/users/register", userDetails).then(
      (response) => {
        console.log(response);
        history.push("/login");
      },
      (error) => {
        console.log(error);
        alert("User Creation Failed");
      }
    );
    console.log(userDetails);
  }
  let token = sessionStorage.getItem("auth-token");
  if (token) {
    alert("Already logged in");
    history.push("/dashboard");
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className="card-header">Register</h3>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col">
                <label>gender</label>
                <Field
                  name="gender"
                  as="select"
                  className={
                    "form-control" +
                    (errors.gender && touched.gender ? " is-invalid" : "")
                  }
                >
                  <option value=""></option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                  <option value="None">Prefer Not to state</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-10">
                <label>Full Name</label>
                <Field
                  name="fullName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.fullName && touched.fullName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Username</label>
              <Field
                name="username"
                type="text"
                className={
                  "form-control" +
                  (errors.username && touched.username ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Email</label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-2">
                <label>Type</label>
                <Field
                  name="type"
                  as="select"
                  className={
                    "form-control" +
                    (errors.type && touched.type ? " is-invalid" : "")
                  }
                >
                  <option value=""></option>
                  <option value="applicant">Applicant</option>
                  <option value="recruiter">Recruiter</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
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
              <div className="form-group col">
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    "form-control" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Register
              </button>
              <Link to="/" className="btn btn-link">
                Cancel
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Register };
