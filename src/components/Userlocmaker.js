import React from 'react';
import './marker.css';



const UMarker = (props) => {
    const { color, name } = props;
    return (
<>
 <div
    className="marker"
    style={{ backgroundColor: color, cursor: 'pointer' }}
    title={name}
  />



  </>
    );
};

export default UMarker;