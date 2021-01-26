import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const updateEmail = async (email, token) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isEmail = re.test(String(email).toLowerCase());
  console.log(email, isEmail);
  if (isEmail) {
    let update = {
      email,
    };
    await axios
      .post("http://localhost:4000/users/updateEmail", update, {
        headers: { "x-auth-token": token },
      })
      .then(
        (response) => {
          console.log(response);
          window.location = "/profile";
        },
        (error) => {
          console.log(error);
          alert("Update Failed");
          window.location = window.location.href;
        }
      );
  } else {
    alert("Please enter valid email");
  }
};

let getUserDetails = (
  setUser,
  token,
  setLoading,
  setName,
  setEmail,
  setNumber,
  setBio
) => {
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
      setEmail(response.data.user.email);
      setName(response.data.user.name);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};
function RecruiterProfile({ location, history }) {
  let [isLoading, setLoading] = useState(true);
  let [user, setUser] = useState("");
  let token = sessionStorage.getItem("auth-token");
  let [name, setName] = useState(user.name);
  let [email, setEmail] = useState(user.email);
  let [bio, setBio] = useState("");
  let [number, setNumber] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getUserDetails(
      setUser,
      token,
      setLoading,
      setName,
      setEmail,
      setNumber,
      setBio
    );
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

  return (
    <div>
      <h1>My Profile</h1>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            Username :{" "}
            <TextField
              id="standard-read-only-input"
              defaultValue={user.username}
              InputProps={{
                readOnly: true,
              }}
            >
              Input
            </TextField>
          </Grid>
          <Grid item xs={12}>
            Name :{" "}
            <TextField
              defaultValue={user.name}
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      //updateName(name, token);
                      axios
                        .post(
                          "http://localhost:4000/users/updateName",
                          { name },
                          {
                            headers: { "x-auth-token": token },
                          }
                        )
                        .then(
                          (response) => {
                            console.log(response);
                            setName(name);
                            alert(
                              "Name Successfully Updated, Please LogOut and Log In for changes to take affect"
                            );
                          },
                          (error) => {
                            console.log(error);
                            alert("Update Failed");
                            window.location = window.location.href;
                          }
                        );
                    }}
                  >
                    Update
                  </Button>
                ),
              }}
            >
              Input
            </TextField>
          </Grid>
          <Grid item xs={12}>
            Email :{" "}
            <TextField
              id="standard-basic"
              defaultValue={user ? user.email : email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(email);
              }}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      let isEmail = re.test(String(email).toLowerCase());
                      console.log(email, isEmail);
                      if (isEmail) {
                        let update = {
                          email,
                        };
                        axios
                          .post(
                            "http://localhost:4000/users/updateEmail",
                            update,
                            {
                              headers: { "x-auth-token": token },
                            }
                          )
                          .then(
                            (response) => {
                              console.log(response);
                              setEmail(email);
                              alert(
                                "Email updated successfully. Please LogOut and Log In for changes to take affect"
                              );
                            },
                            (error) => {
                              console.log(error);
                              alert("Update Failed");
                              window.location = window.location.href;
                            }
                          );
                      } else {
                        alert("Please enter valid email");
                      }
                    }}
                  >
                    Update
                  </Button>
                ),
              }}
            >
              Input
            </TextField>
          </Grid>
          <Grid item xs={12}>
            ContactNumber :{" "}
            <MuiPhoneNumber
              defaultCountry={"in"}
              value={user.concat_number}
              autoFormat={true}
              disableAreaCodes={true}
              enableLongNumbers={true}
              onChange={(value) => {
                console.log(value);
                setNumber(value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                //updateName(name, token);
                axios
                  .post(
                    "http://localhost:4000/users/updateNumber",
                    { number },
                    {
                      headers: { "x-auth-token": token },
                    }
                  )
                  .then(
                    (response) => {
                      console.log(response);
                      setNumber(number);
                      alert(
                        "Number Successfully Updated, Please LogOut and Log In for changes to take affect"
                      );
                    },
                    (error) => {
                      console.log(error);
                      alert("Update Failed");
                      window.location = window.location.href;
                    }
                  );
              }}
            >
              Update
            </Button>
          </Grid>
          <Button
            color="primary"
            onClick={() => {
              window.location = "/myjobs";
            }}
          >
            My Jobs{" "}
          </Button>
          <Button
            color="primary"
            onClick={() => {
              window.location = "/applications";
            }}
          >
            My Applications
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
        </Grid>
      </div>
    </div>
  );
}

export { RecruiterProfile };
