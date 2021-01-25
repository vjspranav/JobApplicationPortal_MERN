import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withStyles, useStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

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

// For Salary Filter

function Jobs({ location, history }) {
  let [isLoading, setLoading] = useState(true);
  let token = sessionStorage.getItem("auth-token");
  let [jobs, setJobs] = useState({});
  let [sal, setSal] = useState([]);

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
        setLoading(false);
      });
  }, [sal]);

  //   const RenderJob = () => {
  //     if (jobs)
  //       return Object.entries(jobs).map(([key, job], i) => {
  //         console.log("job is", job);
  //         return (
  //           <div key={key}>
  //             name is: {job.title}
  //             recruiter is: {job.author.name}
  //             rating: {job.rating ? job.rating : "unrated"}
  //             duration: {job.duration} Months salary: {job.salary}
  //             type: {job.type}
  //           </div>
  //         );
  //       });
  //     else {
  //       <h1>No Jobs Found</h1>;
  //     }
  //   };

  if (isLoading) return <h1>Loading Jobs</h1>;

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
                        <button>Apply</button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export { Jobs };
