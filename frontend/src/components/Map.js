import React, { useState,useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import datas from './samples';
import UMarker from './Userlocmaker'
import axios from 'axios';




const getmarkers=()=>{
return(
datas.map(data=>{  
return(      
<Marker
lat={data.lat}
lng={data.lng}
name="My Marker"
color="blue"
/>);
})
);
}

const Map = (props) => {
    const{lat,lng}=props;

    const [center, setCenter] = useState({lat:lat, lng:lng});
    const [zoom, setZoom] = useState(11);
    const [markerdata,setMarkerData]=useState();

    const getMapOptions = (maps) => {
      return {
        disableDefaultUI: true,
        mapTypeControl: true,
        streetViewControl: true,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
      };
    };

  
  return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBSmRWeVaaWOuihcmrBFkmcvMgBDDg_Wag' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >

        <UMarker lat={center.lat}
        lng={center.lng}
        name="My Marker"
        color="red"/>
        
        {getmarkers()} 
        
        </GoogleMapReact>
      </div>
    );
}

export default Map;