import React, { useState, useEffect } from 'react';
import {withStyles, makeStyles} from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  
    table: {
      minWidth:'100px',
      paddig: '0px',
    },    
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error:{
      color: red,
      fontsize: 'small',
      fontweight: 'lighter!important', 
      textalign: 'center !important',
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
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
    }))(TableRow);


    
export default function DashBoard(props){

    const [username,setusername]=useState(props.match.params.username);
    const [beddata,SetBedData]=useState(undefined);
    const classes = useStyles();
    const [Reason,SetReason]=useState("");
    const [ReasonBit,SetReasonBit]=useState(0);

    const handlesubmit=(e,status,email,bed_type,hospitalname) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/api/acceptOrReject",{status:status,Reason:Reason,email:email,bed_type:bed_type,hospital:hospitalname})
        .then((res) => {
          if (res.data.message==="Success") {
            console.log(res.data.message);
          }
        });
    }

    useEffect(()=>{
        console.log(username)
        axios
        .post("http://localhost:8000/api/getrequests",{hospital:username})
        .then((res) => {
          if (res.data) {
            SetBedData(res.data)
          }
        });
    },[]);




    return (
        <>
        <div>{beddata!=undefined && 
            <Paper >
                <TableContainer  color="secondary">
                    <Table className={classes.table} stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" >Name</StyledTableCell>
                                <StyledTableCell align="center" >Email</StyledTableCell>
                                <StyledTableCell align="center" >Bed Type</StyledTableCell>
                                <StyledTableCell align="center" >Phone Number</StyledTableCell>
                                <StyledTableCell align="center" >Time</StyledTableCell>
                                <StyledTableCell colSpan={2} align="center" >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {beddata.map((row) => (
                                <>
                                <StyledTableRow key={row.name} color="secondary">
                                    <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.bed_type}</StyledTableCell>
                                    <StyledTableCell align="center">{row.phone_number}</StyledTableCell>
                                    <StyledTableCell align="center">{row.timestamp}</StyledTableCell>
                                    <StyledTableCell align="center">{<Button variant="contained" color="secondary" onClick = {()=>handlesubmit("accept",row.email,row.bed_type,row.name)}>Accept</Button>}</StyledTableCell>
                                    <StyledTableCell align="center">{<Button variant="contained" color="secondary" onClick = {()=>SetReasonBit(1)}>Reject</Button>}</StyledTableCell>
                                </StyledTableRow>
                                
                                {ReasonBit==1 && <StyledTableRow>
                                <StyledTableCell colspan={5}>
                                        <TextField onChange={(e)=>{SetReason(e.target.value)}}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Reason"
                                        label="Reason"
                                        name="Reason"
                                        autoComplete="Reason"
                                        value={Reason}
                                        autofocus
                                      /> 
                                      </StyledTableCell>

                                      <StyledTableCell align="center" colspan={1}>
                                      <Button variant='contained' color='secondary' onClick={()=>handlesubmit("reject",row.email,row.bed_type,row.name)}>
                                      SUBMIT
                                      </Button>    
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                      <CloseIcon color="secondary" fontSize="large"  />
                                      </StyledTableCell>
                                      </StyledTableRow>}
                                </>
                                
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        }</div>
        </>
    )
};

