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
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    primary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
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
      paddig: 10,
    },

      
}));

export default function Tables(props) {
    const [markerdata,setMarkerData]=useState(undefined);
    const classes = useStyles();
    const{lat,lng}=props;
    const [center, setCenter] = useState({lat:lat, lng:lng});

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
        <div>{markerdata!=undefined && 
            <Paper>
                <TableContainer className={classes.table} color="secondary">
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell rowspan={2}>HospitalName</StyledTableCell>
                            <StyledTableCell colspan={3} align="center">Covid Beds</StyledTableCell>
                            <StyledTableCell colspan={3} align="center">Oxygen Beds</StyledTableCell>
                            <StyledTableCell colspan={3} align="center">Non Oxygen Beds</StyledTableCell>
                            <StyledTableCell colspan={3} align="center">ICU Beds</StyledTableCell>
                            <StyledTableCell colspan={3} align="center">Ventilator Beds</StyledTableCell>
                            <StyledTableCell rowspan={2} align="center">Last Updated</StyledTableCell>
                            <StyledTableCell rowspan={2} align="center">Contact Number</StyledTableCell>

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