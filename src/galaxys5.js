

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class galaxys5 extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (
      <div className={`marvel-device s5 ${color}`}>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <iframe src={this.props.url} />
        </div>
        <div className="home" />
      </div>

    );
  }
}


galaxys5.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
