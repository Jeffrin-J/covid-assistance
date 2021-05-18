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
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import {Container,CssBaseline,Avatar} from '@material-ui/core';
import HotelIcon from '@material-ui/icons/Hotel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

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

const useStyles = makeStyles((theme) => ({
  
    table: {
      minWidth:'100px',
      paddig: '0px',
    },

    widthing:{
      
    },

    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(0),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    inputborder:{
      border:red 
    },
    error:{
      color: red,
      fontsize: 'small',
      fontweight: 'lighter!important', 
      textalign: 'center !important',
    },inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    
  
    spacing: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },

      
}));

export default function Tables(props) {
    const [markerdata,setMarkerData]=useState(undefined);
    const classes = useStyles();
    const{lat,lng}=props;
    const [center] = useState({lat:lat, lng:lng});
    const [Phone,SetPhone]=useState();
    const [Email, SetEmail] = useState("");
    const [UserName, SetUserName] = useState("");
    const [open, setOpen] = React.useState(false);
    const [HospitalName, setHospitalName] = React.useState("");
    const [bedtype, setbedType] = React.useState("");
    const [temp,settemp] = React.useState({});

    const handleClickOpens=(rowplace,tem)=>{
      setOpen(true);
      console.log(rowplace);
      setHospitalName(rowplace);
      settemp(tem);      
    }

    const handleClose = (e) => {
      setOpen(false);
      e.preventDefault();
    };

    const handleSubmit=(e)=>{
      e.preventDefault();
      
      axios
        .post("http://localhost:8000/api/requestbed",{name: UserName, email: Email, phone_number:Phone, bed_type:bedtype, hospital:HospitalName})
        .then((res) => {
          if (res.data.message==="Success") {
            console.log(res.data.message);
          }
        });
    };
    
    useEffect(()=>{
        console.log(center);
        axios
        .post("http://localhost:8000/api/postcurrentloc",center)
        .then((res) => {
          if (res.data) {
            const data=res.data;
            console.log(data)
            setMarkerData(data);
          }
        });
        
    },[]);

    return(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>{markerdata!==undefined && 
            <Paper className={classes.widthing} >
                <TableContainer  color="secondary">
                    <Table className={classes.table} stickyHeader aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell rowSpan={2}>HospitalName</StyledTableCell>
                            <StyledTableCell colSpan={3} align="center">Covid Beds</StyledTableCell>
                            <StyledTableCell colSpan={3} align="center">Oxygen Beds</StyledTableCell>
                            <StyledTableCell colSpan={3} align="center">Non Oxygen Beds</StyledTableCell>
                            <StyledTableCell colSpan={3} align="center">ICU Beds</StyledTableCell>
                            <StyledTableCell colSpan={3} align="center">Ventilator Beds</StyledTableCell>
                            <StyledTableCell rowSpan={2} align="center">Action</StyledTableCell> 
                            <StyledTableCell rowSpan={2} align="center">Last Updated</StyledTableCell>
                            <StyledTableCell rowSpan={2} align="center">Contact Number</StyledTableCell>
                            
                        </TableRow>
                        <TableRow> 
                            <StyledTableCell align="center">Covid Beds Total</StyledTableCell>
                            <StyledTableCell align="center">Covid Beds Occupied</StyledTableCell>
                            <StyledTableCell align="center">Covid Beds Vacant</StyledTableCell>
                            <StyledTableCell align="center">Oxygen Beds Total</StyledTableCell>
                            <StyledTableCell align="center">Oxygen Beds Occupied</StyledTableCell>
                            <StyledTableCell align="center">Oxygen Beds Vacant</StyledTableCell>
                            <StyledTableCell align="center">Non Oxygen Beds Total</StyledTableCell>
                            <StyledTableCell align="center">Non Oxygen Beds Occupied</StyledTableCell>
                            <StyledTableCell align="center">Non Oxygen Beds Vacant</StyledTableCell>
                            <StyledTableCell align="center">ICU Beds Total</StyledTableCell>
                            <StyledTableCell align="center">ICU Beds Occupied</StyledTableCell>
                            <StyledTableCell align="center">ICU Beds Vacant</StyledTableCell>
                            <StyledTableCell align="center">Ventilator Total</StyledTableCell>
                            <StyledTableCell align="center">Ventilator Occupied</StyledTableCell>
                            <StyledTableCell align="center">Ventilator Vacant</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody >
                        {markerdata.map((row) => (
                            <StyledTableRow key={row.place} color="secondary">
                            <StyledTableCell component="th" scope="row">
                                {row.place}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.covid_bed_total}</StyledTableCell>
                            <StyledTableCell align="center">{row.covid_bed_occupied}</StyledTableCell>
                            <StyledTableCell align="center">{row.covid_bed_vacant}</StyledTableCell>
                            <StyledTableCell align="center">{row.oxy_bed_total}</StyledTableCell>
                            <StyledTableCell align="center">{row.oxy_bed_occupied}</StyledTableCell>
                            <StyledTableCell align="center">{row.oxy_bed_vacant}</StyledTableCell>
                            <StyledTableCell align="center">{row.non_oxy_bed_total}</StyledTableCell>
                            <StyledTableCell align="center">{row.non_oxy_bed_occupied}</StyledTableCell>
                            <StyledTableCell align="center">{row.non_oxy_bed_vacant}</StyledTableCell>
                            <StyledTableCell align="center">{row.icu_bed_total}</StyledTableCell>
                            <StyledTableCell align="center">{row.icu_bed_occupied}</StyledTableCell>
                            <StyledTableCell align="center">{row.icu_bed_vacant}</StyledTableCell>
                            <StyledTableCell align="center">{row.vent_bed_total}</StyledTableCell>
                            <StyledTableCell align="center">{row.vent_bed_occupied}</StyledTableCell>
                            <StyledTableCell align="center">{row.vent_bed_vacant}</StyledTableCell>
                            <StyledTableCell align="center">{row.covid_bed_vacant===0 && row.oxy_bed_vacant===0 && row.non_oxy_bed_vacant===0 && row.icu_bed_vacant===0 && row.vent_bed_vacant===0 ?       
                            (<Button variant="contained" color="secondary" disabled>Request</Button>) : (<Button variant="contained" color="secondary" value={row.place} onClick={()=>handleClickOpens(row.place,[row.covid_bed_vacant,row.oxy_bed_vacant,row.non_oxy_bed_vacant,row.icu_bed_vacant,row.vent_bed_vacant])} >Request</Button>) }</StyledTableCell>
          
                                  <Dialog
                                    fullWidth='checked'
                                    maxWidth='sm'
                                    open={open}
                                    onClose={handleClose}
                                  >
                                    <DialogContent>
                                    <Container component="main" maxWidth="xs">
                                  <CssBaseline />
                                  <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                      <HotelIcon />
                                    </Avatar>
                                    
                                    <form className={classes.form} >
                                      <TextField onChange={(e)=>{SetUserName(e.target.value)}}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Name"
                                        name="username"
                                        autoComplete="username"
                                        value={UserName}
                                        autofocus
                                      />

                                      <TextField onChange={(e)=>{SetEmail(e.target.value)}}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        type="email"
                                        value={Email}
                                      />
                                      
                                      <TextField onChange={(e)=>{SetPhone(e.target.value)}}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phonenumber"
                                        autoComplete="email"
                                        type="tel"
                                        value={Phone}
                                      />

                                      <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={bedtype}
                                        onChange={(e)=>{setbedType(e.target.value)}}
                                        className={classes.selectEmpty}
                                        defaultValue=""
                                        required
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                      >
                                        {temp[0] && <MenuItem value="Covid Bed">Covid Bed</MenuItem> }
                                        {temp[1] && (<MenuItem value="Oxygen Bed">Oxygen beds</MenuItem>)}
                                        {temp[2] && (<MenuItem value="Non oxygen Bed">Non oxygen Bed</MenuItem>)}
                                        {temp[3] && (<MenuItem value="Non oxygen Bed">ICU Bed</MenuItem>)}
                                        {temp[4] && (<MenuItem value="Ventilator Bed">Ventilator Bed</MenuItem>)}
                                      </Select>

                                  
                                      <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick = {handleSubmit}
                                        className={classes.submit}
                                      >
                                        Submit
                                      </Button>
                                    </form>
                                  </div>
                                  </Container>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose} color="primary">
                                        Close
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                            <StyledTableCell align="center">{row.last_updated}</StyledTableCell>
                            <StyledTableCell align="center">{(String(row.contactnumber).length > 5) ? row.contactnumber : '-'}</StyledTableCell> 
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        }</div>
      </ThemeProvider>
    );
}