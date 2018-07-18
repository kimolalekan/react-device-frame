

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class galaxynote8 extends Component {
  render() {
   let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (

      <div className="marvel-device note8">
  <div className="inner"></div>
  <div className="overflow">
    <div className="shadow"></div>
  </div>
  <div className="speaker"></div>
  <div className="sensors"></div>
  <div className="more-sensors"></div>
  <div className="sleep"></div>
  <div className="volume"></div>
  <div className="camera"></div>
  <div className="screen">
    <iframe src={this.props.url} />
  </div>
  </div>
    );
  }
}


galaxynote8.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
