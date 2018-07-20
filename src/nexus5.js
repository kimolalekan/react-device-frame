import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class Nexus5 extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div className={`marvel-device nexus5 ${this.props.orientation}`}>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="volume" />
        <div className="camera" />
        <div className="screen">
          <iframe src={this.props.site} />
        </div>
      </div>
    );
  }
}

Nexus5.propTypes = {
  color: PropTypes.string,
  site: PropTypes.string,
  orientation: PropTypes.string
};
