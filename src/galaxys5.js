

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class galaxys5 extends Component {
  render() {
   let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (
      <div className={`marvel-device s5 ${color}`}>
          <div className="top-bar"></div>
          <div className="sleep"></div>
          <div className="camera"></div>
          <div className="sensor"></div>
          <div className="speaker"></div>
          <div className="screen">
            <iframe src={this.props.url} />
          </div>
          <div className="home"></div>
      </div>

    );
  }
}


galaxys5.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
