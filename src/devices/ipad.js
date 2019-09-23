import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class Ipad extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (
      <div className={`marvel-device ipad ${this.props.orientation} ${color}`}>
        <div className="camera" />
        <div className="screen">
          <iframe src={this.props.site} />
        </div>
        <div className="home" />
      </div>
    );
  }
}

Ipad.propTypes = {
  color: PropTypes.string,
  site: PropTypes.string,
  orientation: PropTypes.string
};
