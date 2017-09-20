

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./lib/css/devices.min.css";

class Device extends Component {
  render() {

 const classes = "device-" + this.props.name + " device-" + this.props.color;

    return (
      <div className={classes}>
        <div className="device-frame">
          <div className="device-content">
            <iframe className="device-src" src={this.props.url} />
          </div>
        </div>
        <div className="device-stripe" />
        <div className="device-header">
          <div className="device-sensors" />
        </div>
        <div className="device-btns" />
        <div className="device-power" />
      </div>
    );
  }
}


Device.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string
};

export default Device;
