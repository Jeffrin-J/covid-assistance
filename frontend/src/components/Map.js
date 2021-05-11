import React, { useState,useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import datas from './samples';
import UMarker from './Userlocmaker'
import axios from 'axios';




const Map = (props) => {
    const{lat,lng}=props;

    const [center, setCenter] = useState({lat:lat, lng:lng});
    const [zoom, setZoom] = useState(11);
    const [markerdata,setMarkerData]=useState();

    // const getmarkers=()=>{
    //   return(
    //   markerdata.map(data=>{  
    //   return(      
    //   <Marker
    //   lat={data.lat}
    //   lng={data.lng}
    //   name="My Marker"
    //   color="blue"
    //   />);
    //   })
    //   );
    //   }

    useEffect(()=>{
      axios
      .post("http://localhost:8000/api/postcurrentloc",center)
      .then((res) => {
        if (res.data) {
          const data=res.data;
          setMarkerData(data);
          console.log(markerdata);
        }
      });
    });


  
  return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBSmRWeVaaWOuihcmrBFkmcvMgBDDg_Wag' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >

        <UMarker lat={center.lat}
        lng={center.lng}
        name="My Marker"
        color="red"/>
        
        {/* {getmarkers()}  */}
        
        </GoogleMapReact>
      </div>
    );
}

export default Map;