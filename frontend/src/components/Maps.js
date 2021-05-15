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
import Grid from '@material-ui/core/Grid';
import {fade, makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './marker.css';

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
  iconUrl: "https://sheengroup.com.au/assets/Uploads/misc/current-location.png",
  iconSize: [40,40],
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
      {/* {console.log(data)} */}
      {data.place}
        </b>
      </Popup>
      </Marker>
      );
      })
      );
      }

    useEffect(()=>{
      console.log("hi");
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

      </>
    );
}

export default Maps;