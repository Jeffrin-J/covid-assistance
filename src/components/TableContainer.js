import React from "react";
import { geolocated,geoPropTypes } from "react-geolocated";
import Tables from './Tables.js';



class TableContainer extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <Tables lat={this.props.coords.latitude} lng={this.props.coords.longitude} rad={this.props.rad}/>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}

TableContainer.propTypes = { ...TableContainer.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(TableContainer);

