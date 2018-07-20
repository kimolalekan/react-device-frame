import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class Htcone extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div className={`marvel-device htc-one ${this.props.orientation}`}>
        <div className="top-bar" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <iframe src={this.props.site} />
        </div>
      </div>
    );
  }
}

Htcone.propTypes = {
  color: PropTypes.string,
  site: PropTypes.string,
  orientation: PropTypes.string
};
