import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';

export default class Galaxys5 extends Component {
  render() {
    
    const color = (this.props.color) ? this.props.color : "black";

    return (
      <div className={`marvel-device s5 ${this.props.orientation} ${color}`}>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <Content show={this.props.show} />
        </div>
        <div className="home" />
      </div>
    );
  }
}

Galaxys5.propTypes = Props;
