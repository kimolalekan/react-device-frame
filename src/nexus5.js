

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class iphone8 extends Component {
  render() {
   let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div className="marvel-device nexus5">
          <div className="top-bar"></div>
          <div className="sleep"></div>
          <div className="volume"></div>
          <div className="camera"></div>
          <div className="screen">
              <iframe src={this.prop.url} />
          </div>
      </div>
    );
  }
}


nexus5.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
