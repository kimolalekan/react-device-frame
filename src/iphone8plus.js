

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class iphone8plus extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div className={`marvel-device iphone8plus ${color}`}>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="volume" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <iframe src={this.props.url} />
        </div>
        <div className="home" />
        <div className="bottom-bar" />
      </div>
    );
  }
}


iphone8plus.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
