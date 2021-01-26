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

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

function MyApplications({ location, history }) {
  let [isLoading, setLoading] = useState(true);
  let token = sessionStorage.getItem("auth-token");
  let [applications, setApplications] = useState({});
  let [jobs, setJobs] = useState({});
  let [user, setUser] = useState(" ");
  let [applicant, setApplicant] = useState(" ");

  useEffect(() => {
    axios
      .get("http://localhost:4000/jobs/getMyApplications", {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        setApplications(response.data.applications);
        console.log(applications);
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
                "http://localhost:4000/users/getMyUserApplicant",
                {
                  headers: { "x-auth-token": token },
                },
                null
              )
              .then((response) => {
                console.log(response.status);
                setApplicant(response.data.applicant);
                axios
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
  if (user.type != "applicant") {
    alert("Recruiter not allowed");
    history.push("/dashboard");
  }
  console.log(applicant);
  console.log(applications);
  return (
    <div>
      <h1>My Applications</h1>
      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Job Title</TableCell>
                    <TableCell align="center">Recruiter</TableCell>
                    <TableCell align="center">Date of Joining</TableCell>
                    <TableCell align="center">Salary</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Rate the Job</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(applications).map((application) => (
                    <StyledTableRow key={application._id}>
                      <TableCell component="th" scope="row">
                        {application.jobTitle}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {application.recruiter}
                      </TableCell>
                      <TableCell align="center">
                        {application.status == "accepted"
                          ? application.date
                          : "Not Applicable"}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {jobs[application.job_id].salary}
                      </TableCell>
                      <TableCell align="center">{application.status}</TableCell>
                      <TableCell align="center">
                        {application.status == "accepted" ? (
                          <Rating
                            name="customized-empty"
                            defaultValue={application.rating}
                            precision={1}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                        ) : (
                          "NA"
                        )}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export { MyApplications };
