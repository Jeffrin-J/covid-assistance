import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import url from "../config";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "100px",
    paddig: "0px",
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: red,
    fontsize: "small",
    fontweight: "lighter!important",
    textalign: "center !important",
  },
  text: {
    position: "absolute",
    top: "30%",
    left: "35%",
    fontFamily: "Garamond, serif",
    color: "#1DA1F2",
  },
  imag: {
    position: "absolute",
    top: "45%",
    left: "35%",
    width: "25%",
    height: "40%",
    borderRadius: "100%",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function DashBoard(props) {
  const [username] = useState(props.username);
  const [beddata, SetBedData] = useState(undefined);
  const classes = useStyles();
  const [Reason, SetReason] = useState("");
  const [ReasonBit, SetReasonBit] = useState(0);
  const [reset, setreset] = useState(0);
  const [reset1, setreset1] = useState(0);

  useEffect(() => {
    axios
      .post(url.concat("getrequests"), { hospital: username })
      .then((res) => {
        if (res.data) {
          SetBedData(res.data);
        }
      });
    setreset(0);
  }, [reset]);

  const handlesubmit = (id, status) => {
    console.log(id);
    axios
      .post(url.concat("acceptOrReject"), {
        id: id,
        status: status,
        Reason: Reason,
      })
      .then((res) => {
        if (res.data.message === "Mail sent") {
          console.log(res.data.message);
          setreset(1);
        } else {
          alert(res.data.message);
        }
      });
  };

  useEffect(() => {
    setreset1(0);
  }, [reset1]);

  const handleReject = (ind) => {
    let pos = beddata
      .map(function (e) {
        return e.id;
      })
      .indexOf(ind);
    let arr = beddata;

    if (arr.length === pos + 1 || arr[pos + 1].reason === undefined) {
      arr.splice(pos + 1, 0, { identity: ind, reason: "reason" });
      SetBedData(arr);
      setreset1(1);
    }
    console.log(beddata);
  };

  const handleonclick = () => {
    console.log("Hi");
    SetReasonBit(0);
  };

  const handlecloseIcon = (id) => {
    let pos = beddata
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);
    let arr = beddata;
    arr.splice(pos + 1, 1);
    SetBedData(arr);
    setreset1(1);
  };

  return (
    <>
      <div>
        {beddata !== undefined && beddata.length > 0 ? (
          <Paper>
            <TableContainer color="secondary">
              <Table
                className={classes.table}
                stickyHeader
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Bed Type</StyledTableCell>
                    <StyledTableCell align="center">
                      Phone Number
                    </StyledTableCell>
                    <StyledTableCell align="center">Time</StyledTableCell>
                    <StyledTableCell colSpan={2} align="center">
                      Action
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {beddata.map((row) => (
                    <>
                      {console.log(row.reason)}
                      {row.reason === undefined && (
                        <StyledTableRow key={row.name} color="secondary">
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.bed_type}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.phone_number}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.timestamp}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  handlesubmit(
                                    row.id,
                                    "accept",
                                    row.email,
                                    row.bed_type,
                                    row.name
                                  )
                                }
                              >
                                Accept
                              </Button>
                            }
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleReject(row.id)}
                              >
                                Reject
                              </Button>
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                      {console.log(row.reason === "reason")}
                      {row.reason === "reason" && (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell colSpan={5}>
                            <TextField
                              onChange={(e) => {
                                SetReason(e.target.value);
                              }}
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="Reason"
                              label="Reason"
                              name="Reason"
                              autoComplete="Reason"
                              value={Reason}
                              autoFocus
                            />
                          </StyledTableCell>

                          <StyledTableCell align="center" colSpan={1}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                handlesubmit(row.identity, "reject")
                              }
                            >
                              SUBMIT
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <CloseIcon
                              color="secondary"
                              fontSize="large"
                              onClick={() => handlecloseIcon(row.identity)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <>
            <h1 className={classes.text}>No more Requests !... :)</h1>
            <img
              className={classes.imag}
              src="https://www.totaljobs.com/advice/wp-content/uploads/healthcare-assistant-job-description.jpg"
              alt=""
            />
          </>
        )}
      </div>
    </>
  );
}
