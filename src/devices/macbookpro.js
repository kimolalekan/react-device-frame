import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class Macbookpro extends Component {
  render() {
    let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (
      <div className={`marvel-device macbook ${this.props.orientation}`}>
        <div className="top-bar" />
        <div className="camera" />
        <div className="screen">
          <iframe src={this.props.site} />
        </div>
        <div className="bottom-bar" />
      </div>
    );
  }
}

Macbookpro.propTypes = {
  color: PropTypes.string,
  orientation: PropTypes.string,
  site: PropTypes.string
};
