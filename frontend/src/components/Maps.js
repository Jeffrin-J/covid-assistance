import React, { useState,useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import datas from './samples';
import UMarker from './Userlocmaker'
import axios from 'axios';
import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import {Marker, Popup} from "react-leaflet"
import L from "leaflet"
import {AppBar, Grid,Toolbar} from '@material-ui/core'
import { fade, makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  MapContainer: {
    paddingTop: "2px",
    paddingLeft: "2px",

  table: {
      minWidth: 650,
    },
    
  }}));


const markerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/codegeous/react-component-depot/master/src/resources/images/marker.png",
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});


const markerIcon2 = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/stedman/GeoLocateMe/master/bluedot.png",
  iconSize: [15, 15],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});




const Maps = (props) => {
    const{lat,lng}=props;

    const [center, setCenter] = useState({lat:lat, lng:lng});
    const [zoom, setZoom] = useState(11);
    const mapRef = useRef();
    const [markerdata,setMarkerData]=useState(undefined);
    const ZOOM_LEVEL=11;

    const classes = useStyles();


    const getmarkers=()=>{

      
      return(
      markerdata.map(data=>{
      return(      
      <Marker key={data.place} position={[data.lat, data.lng]} icon={markerIcon} >
      <Popup>
      <b>
      {console.log(data)}
      {data.place}
        </b>
      </Popup>
      </Marker>
      );
      })
      );
      }

const gettables=()=>{

  return(
    
      <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>HospitalName</TableCell>
            <TableCell align="right">Covid Beds Total</TableCell>
            <TableCell align="right">Covid Beds Occpied</TableCell>
            <TableCell align="right">Covid Beds Vacant</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {markerdata.map((row) => (
            <TableRow key={row.place}>
              <TableCell component="th" scope="row">
                {row.place}
              </TableCell>
              <TableCell align="right">{row.covid_bed_total}</TableCell>
              <TableCell align="right">{row.covid_bed_occupied}</TableCell>
              <TableCell align="right">{row.covid_bed_vacant}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );

}



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

  
  return (
    <>

    <AppBar position="static">
      <Toolbar>
      </Toolbar>
      </AppBar>
    <Grid container className={classes.MapContainer}>
        <Grid item sm={12} md={6} style={{ height: '100%', width: '100%' }}>


       <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />



        {markerdata!=undefined && getmarkers() }
        
        <Marker
                  position={[center.lat, center.lng]}
                  icon={markerIcon2}
                >
                  <Popup>
                    <b>
                      {center.lat}, {center.lng}
                    </b>
                  </Popup>
        </Marker>


        


        
        </MapContainer>


      </Grid>

      <Grid item sm={12} md={6}>

      {markerdata!=undefined && gettables()}

      </Grid> 

      </Grid>

      </>
    );
}

export default Maps;