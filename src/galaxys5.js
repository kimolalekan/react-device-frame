import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class Galaxys5 extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (
      <div className={`marvel-device s5 ${this.props.orientation} ${color}`}>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <iframe src={this.props.site} />
        </div>
        <div className="home" />
      </div>
    );
  }
}

Galaxys5.propTypes = {
  color: PropTypes.string,
  site: PropTypes.string,
  orientation: PropTypes.string
};
