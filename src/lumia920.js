import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class Lumia920 extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "yellow");

    return (
      <div
        className={`marvel-device lumia920 ${this.props.orientation} ${color}`}
      >
        <div className="top-bar" />
        <div className="volume" />
        <div className="camera" />
        <div className="speaker" />
        <div className="screen">
          <iframe src={this.props.site} />
        </div>
      </div>
    );
  }
}

Lumia920.propTypes = {
  color: PropTypes.string,
  site: PropTypes.string,
  orientation: PropTypes.string
};
