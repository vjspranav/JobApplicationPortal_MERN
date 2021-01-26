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
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const theme = createMuiTheme({
  palette: {
    green: green,
    secondary: green,
  },
});

// For Salary Filter

function Jobs({ location, history }) {
  let [isLoading, setLoading] = useState(true);
  let token = sessionStorage.getItem("auth-token");
  let [jobs, setJobs] = useState({});
  let [sal, setSal] = useState([]);
  let [user, setUser] = useState(" ");
  let [applicant, setApplicant] = useState(" ");
  let [applications, setApplications] = useState(" ");
  let [dutration, setDuration] = useState(7);

  useEffect(() => {
    const filters = {};
    if (sal[0]) filters.minSal = sal[0];
    if (sal[1]) filters.maxSal = sal[1];
    console.log(filters);
    axios
      .post("http://localhost:4000/jobs/getJobs", filters, {
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
                  .get(
                    "http://localhost:4000/jobs/getMyApplications",
                    {
                      headers: { "x-auth-token": token },
                    },
                    null
                  )
                  .then((response) => {
                    console.log(response.status);
                    setApplications(response.data.applications);
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
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      });
  }, [sal]);

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

  const checkJob = (applications, job_id) => {
    console.log("In Loop");
    Object.values(applications).forEach((application) => {
      console.log(application.job_id, job_id);
      if (application.job_id === job_id) {
        console.log("True Returned");
        return true;
      }
    });
    return false;
  };
  let job_ids = [];
  Object.values(applications).forEach((application) => {
    job_ids.push(application.job_id);
  });
  console.log(job_ids);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h3>Filters</h3>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem button>
              <form noValidate autoComplete="off">
                <label>Salary</label>
                <TextField
                  id="standard-basic"
                  label="Enter Min"
                  fullWidth={true}
                  onChange={(e) => {
                    setSal([e.target.value, sal[1] ? 0 : sal[1]]);
                    console.log(e.target.value);
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="Enter Max"
                  fullWidth={true}
                  onChange={(e) =>
                    setSal([sal[0] ? sal[0] : 0, e.target.value])
                  }
                />
              </form>
            </ListItem>
            <Divider />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("Minsal, MaxSal: ");
              }}
            >
              Filter
            </Button>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Job Title</TableCell>
                    <TableCell align="center">Posted By</TableCell>
                    <TableCell align="center">Duration</TableCell>
                    <TableCell align="center">Job type</TableCell>
                    <TableCell align="center">Salary</TableCell>
                    <TableCell align="center">Job Rating</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(jobs).map((job) => (
                    <StyledTableRow key={job.id}>
                      <TableCell component="th" scope="row">
                        {job.title}
                      </TableCell>
                      <TableCell align="center">{job.author.name}</TableCell>
                      <TableCell align="center">{job.duration}</TableCell>
                      <TableCell align="center">{job.type}</TableCell>
                      <TableCell align="center">{job.salary}/-</TableCell>
                      <TableCell align="center">
                        {job.rating ? job.rating : "unrated"}
                      </TableCell>
                      <TableCell align="center">
                        <ThemeProvider theme={theme}>
                          <Button
                            variant="contained"
                            color={
                              job_ids.includes(job._id)
                                ? "secondary"
                                : "primary"
                            }
                            onClick={() => {
                              if (job_ids.includes(job._id))
                                console.log("Already Applied");
                              else {
                                var maxLength = 250;
                                let sop = -1;

                                while (
                                  sop == -1 ||
                                  (sop != null &&
                                    sop.split(" ").length > maxLength)
                                ) {
                                  alert("Please enter in less than 250 words");
                                  sop = prompt(
                                    "Please enter SOP (in not more than 250 words)",
                                    "Tell us about yourself"
                                  );
                                }
                                let data = {
                                  job_id: job._id,
                                  recruiter: job.author.username,
                                  jobTitle: job.title,
                                  sop,
                                };
                                axios
                                  .post(
                                    "http://localhost:4000/jobs/createApplication",
                                    data,
                                    {
                                      headers: { "x-auth-token": token },
                                    }
                                  )
                                  .then(
                                    (response) => {
                                      console.log(response.status);
                                      if (response.status == 200) {
                                        alert("Applied Successfully");
                                        window.location = window.location.href;
                                      } else alert("err");
                                    },
                                    (error) => {
                                      console.log(error);
                                      alert("Applying Failed");
                                      window.location = window.location.href;
                                    }
                                  );
                              }
                            }}
                          >
                            {job_ids.includes(job._id) ? "Applied" : "Apply"}
                          </Button>
                        </ThemeProvider>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
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
  );
}

export { Jobs };
