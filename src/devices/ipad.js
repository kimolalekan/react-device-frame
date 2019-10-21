import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';

export default class Ipad extends Component {
  render() {
    
    const color = (this.props.color) ? this.props.color : "black";

    return (
      <div className={`marvel-device ipad ${this.props.orientation} ${color}`}>
        <div className="camera" />
        <div className="screen">
          <Content show={this.props.show} />
        </div>
        <div className="home" />
      </div>
    );
  }
}

Ipad.propTypes = Props;
