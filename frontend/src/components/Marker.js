import React from 'react';
import './marker.css';



const Marker = (props) => {
    const { color, name, id } = props;
    return (
<>
 <div
    className="pin bounce"
    style={{ backgroundColor: color, cursor: 'pointer' }}
    title={name}
  />
  
  <div className="pulse" />
  </>
    );
};

export default Marker;
            