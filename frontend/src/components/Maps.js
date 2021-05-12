import React, { useState,useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
//import Marker from './Marker';
import datas from './samples';
import UMarker from './Userlocmaker'
import axios from 'axios';
import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import {Marker, Popup} from "react-leaflet"
import L from "leaflet"




const markerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/codegeous/react-component-depot/master/src/resources/images/marker.png",
  iconSize: [40, 40],
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


    const getmarkers=()=>{

      
      return(
      markerdata.map(data=>{  
        {console.log(data)}
      return(      
      <Marker position={[data.lat, data.lng]} icon={markerIcon} >
      <Popup>
      <b>
      {center.lat}, {center.lng}
        </b>
      </Popup>
      </Marker>
      );
      })
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


    // useEffect(()=>{
    //   getmarkers();
    // },[markerdata])


  
  return (
        <div style={{ height: '100%', width: '100' }}>


       <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
            <TileLayer
              url={osm.maptiler.url}
              attribution={osm.maptiler.attribution}
            />

        {/* <UMarker lat={center.lat}
        lng={center.lng}
        name="My Marker"
        color="red"/>

        {console.log(markerdata)} */}


        {markerdata!=undefined && getmarkers() }
        
        

        <Marker
                  position={[center.lat, center.lng]}
                  icon={markerIcon}
                >
                  <Popup>
                    <b>
                      {center.lat}, {center.lng}
                    </b>
                  </Popup>
        </Marker>


        
        </MapContainer>
      </div>
    );
}

export default Maps;