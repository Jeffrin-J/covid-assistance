import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import './marker.css';

const useStyles = makeStyles((theme) => ({
  MapContainer: {
    paddingTop: "2px",
    paddingLeft: "2px",
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
  const{lat,lng,rad}=props;
  const [center] = useState({lat:lat, lng:lng ,rad:rad});
    const mapRef = useRef();
    const [markerdata,setMarkerData]=useState(undefined);
    const ZOOM_LEVEL=8;
    const [reset,setreset]=useState(0);
    

    const classes = useStyles();


    const getmarkers=()=>{

      
      return(
      markerdata.map(data=>{
      return(      
      <Marker key={data.place} position={[data.lat, data.lng]} icon={markerIcon} >
      <Popup>
      <b>
      {/* {console.log(data)} */}
      {data.place} <br/>
      Total vacancy:{data.covid_bed_vacant+data.oxy_bed_vacant+data.non_oxy_bed_vacant+data.icu_bed_vacant+data.vent_bed_vacant}
        </b>
      </Popup>
      </Marker>
      );
      })
      );
      }

   

    useEffect(()=>{
      console.log("hi");
      
      // firsttime=0
      axios
      .post("http://localhost:8000/api/postcurrentloc",center)
      .then((res) => {
        if (res.data) {
          const data=res.data;
          console.log(data)
          setMarkerData(data);
        }
      });
    
      setreset(0);
    },[reset]);


  return (
    <>
       
       <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} className = {classes.MapContainer}>
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />
        {markerdata!==undefined && getmarkers() }      
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