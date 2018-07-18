

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class iphone5c extends Component {
  render() {
   let color;
    this.props.color ? (color = this.props.color) : (color = "green");

    return (
      <div className={`marvel-device iphone8 ${color}`}>
          <div className="top-bar"></div>
          <div className="sleep"></div>
          <div className="volume"></div>
          <div className="camera"></div>
          <div className="sensor"></div>
          <div className="speaker"></div>
          <div className="screen">
              <iframe src={this.props.url} />
          </div>
          <div className="home"></div>
          <div className="bottom-bar"></div>
      </div>
    );
  }
}


iphone5c.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
