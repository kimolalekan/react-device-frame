

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class lumia920 extends Component {
  render() {
   let color;
    this.props.color ? (color = this.props.color) : (color = "yellow");

    return (
      <div className={`marvel-device lumia920 ${color}`}>
          <div className="top-bar"></div>
          <div className="volume"></div>
          <div className="camera"></div>
          <div className="speaker"></div>
          <div className="screen">
              <iframe src={this.props.url} />
          </div>
      </div>
    );
  }
}


lumia920.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
