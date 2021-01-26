import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  createMuiTheme,
  withStyles,
  useStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function MyJobs({ location, history }) {
  let [isLoading, setLoading] = useState(true);
  let token = sessionStorage.getItem("auth-token");
  let [jobs, setJobs] = useState({});
  let [user, setUser] = useState(" ");
  let [recruiter, setRecruiter] = useState(" ");

  useEffect(() => {
    axios
      .get("http://localhost:4000/jobs/getMyJobs", {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        setJobs(response.data.jobs);
        console.log(jobs);
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
            axios
              .get(
                "http://localhost:4000/users/getMyUserRecruiter",
                {
                  headers: { "x-auth-token": token },
                },
                null
              )
              .then(async (response) => {
                console.log(response.status);
                setRecruiter(response.data.recruiter);
                await axios
                  .post("http://localhost:4000/jobs/getJobs")
                  .then((response) => setJobs(response.data.jobs));
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      });
  }, []);

  if (!token) {
    history.push("/login");
  }
  if (isLoading) return <h1>Loading Jobs</h1>;
  if (user.type != "recruiter") {
    alert("Applicant not allowed");
    history.push("/dashboard");
  }
  console.log(recruiter);
  console.log(jobs);
  return (
    <div>
      <h1>My Jobs</h1>
      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Job Title</TableCell>
                    <TableCell align="center">Date of Posting</TableCell>
                    <TableCell align="center">Number of Applicants</TableCell>
                    <TableCell align="center">Remianig Positions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(jobs).map((job) => (
                    <StyledTableRow key={job._id}>
                      <TableCell component="th" scope="row">
                        {job.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {job.date}
                      </TableCell>
                      <TableCell align="center">
                        {job.numApplications}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {job.numPositions - job.curNumPositions}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              color="primary"
              onClick={() => {
                window.location = "/createjob";
              }}
            >
              CreateJob
            </Button>
          </Paper>
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
        </Grid>
      </Grid>
    </div>
  );
}

export { MyJobs };
