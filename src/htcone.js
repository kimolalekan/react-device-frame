

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class htcone extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div className="marvel-device htc-one">
        <div className="top-bar" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <iframe src={this.props.url} />
        </div>
      </div>
    );
  }
}


htcone.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
