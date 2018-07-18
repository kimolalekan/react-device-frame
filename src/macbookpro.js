

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./devices.css";

export default class macbookpro extends Component {
  render() {
   let color;
    this.props.color ? (color = this.props.color) : (color = "black");

    return (
<div className="marvel-device macbook">
    <div className="top-bar"></div>
    <div className="camera"></div>
    <div className="screen">
        <iframe src={this.props.url} />
    </div>
    <div className="bottom-bar"></div>
</div>
    );
  }
}


macbookpro.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string
};
