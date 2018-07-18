

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class iphonex extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "gold");

    return (
      <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera" />
          <div className="speaker" />
        </div>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="bottom-bar" />
        <div className="volume" />
        <div className="overflow">
          <div className="shadow shadow--tr" />
          <div className="shadow shadow--tl" />
          <div className="shadow shadow--br" />
          <div className="shadow shadow--bl" />
        </div>
        <div className="inner-shadow" />
        <div className="screen">
          <iframe src={this.props.url} />
        </div>
      </div>
    );
  }
}


iphonex.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
