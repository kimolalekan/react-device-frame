import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';

export default class Galaxynote8 extends Component {
  render() {
    
    // TODO: does Galaxynote8 use color?
    // const color = (this.props.color) ? this.props.color : "black";

    return (
      <div className={`marvel-device note8 ${this.props.orientation}`}>
        <div className="inner" />
        <div className="overflow">
          <div className="shadow" />
        </div>
        <div className="speaker" />
        <div className="sensors" />
        <div className="more-sensors" />
        <div className="sleep" />
        <div className="volume" />
        <div className="camera" />
        <div className="screen">
          <Content show={this.props.show} />
        </div>
      </div>
    );
  }
}

Galaxynote8.propTypes = Props;
