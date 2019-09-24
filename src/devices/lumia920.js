import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';



export default class Lumia920 extends Component {
  render() {
    
    const color = (this.props.color) ? this.props.color : "yellow";

    return (
      <div
        className={`marvel-device lumia920 ${this.props.orientation} ${color}`}
      >
        <div className="top-bar" />
        <div className="volume" />
        <div className="camera" />
        <div className="speaker" />
        <div className="screen">
          <Content show={this.props.show} />
        </div>
      </div>
    );
  }
}

Lumia920.propTypes = Props;
