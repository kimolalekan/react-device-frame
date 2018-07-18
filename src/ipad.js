

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class ipad extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (

      <div className={`marvel-device ipad ${color}`}>
        <div className="camera" />
        <div className="screen">
          <iframe src={this.props.url} />
        </div>
        <div className="home" />
      </div>
    );
  }
}


ipad.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
