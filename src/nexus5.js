

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class nexus5 extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div className="marvel-device nexus5">
        <div className="top-bar" />
        <div className="sleep" />
        <div className="volume" />
        <div className="camera" />
        <div className="screen">
          <iframe src={this.props.url} />
        </div>
      </div>
    );
  }
}


nexus5.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
