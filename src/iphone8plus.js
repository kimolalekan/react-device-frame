import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class Iphone8plus extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div
        className={`marvel-device iphone8plus ${
          this.props.orientation
        } ${color}`}
      >
        <div className="top-bar" />
        <div className="sleep" />
        <div className="volume" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <iframe src={this.props.site} />
        </div>
        <div className="home" />
        <div className="bottom-bar" />
      </div>
    );
  }
}

Iphone8plus.propTypes = {
  color: PropTypes.string,
  site: PropTypes.string,
  orientation: PropTypes.string
};
