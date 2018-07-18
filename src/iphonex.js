

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
              <div className="camera"></div>
              <div className="speaker"></div>
          </div>
          <div className="top-bar"></div>
          <div className="sleep"></div>
          <div className="bottom-bar"></div>
          <div className="volume"></div>
          <div className="overflow">
              <div className="shadow shadow--tr"></div>
              <div className="shadow shadow--tl"></div>
              <div className="shadow shadow--br"></div>
              <div className="shadow shadow--bl"></div>
          </div>
          <div className="inner-shadow"></div>
          <div className="screen">
              <iframe src={this.state.url} />
          </div>
      </div>
    );
  }
}


iphonex.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
