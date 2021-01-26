import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";

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

const updateName = async (name, token) => {
  if (name) {
    let update = {
      name,
    };
    await axios
      .post("http://localhost:4000/users/updateName", update, {
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

function ApplicantProfile({ location, history }) {
  let [isLoading, setLoading] = useState(true);
  let [user, setUser] = useState("");
  let [name, setName] = useState("");
  // For updating
  let [email, setEmail] = useState("");
  let token = sessionStorage.getItem("auth-token");

  const classes = useStyles();

  let getUser = async () => {
    await axios
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
        console.log(user.email);
        // setName(response.data.user.name);
        // setEmail(response.data.user.email);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(token);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (user) {
    if (user.type != "applicant") {
      alert("Not an applicant");
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
                      updateName(name, token);
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
                      updateEmail(email, token);
                      getUser();
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
          <Button
            color="primary"
            onClick={() => {
              window.location = "/dashboard";
            }}
          >
            My Dashboard{" "}
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

export { ApplicantProfile };
