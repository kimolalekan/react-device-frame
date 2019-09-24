import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';

export default class Htcone extends Component {
  render() {
    
    // TODO: does HTC One use color?
    // const color = (this.props.color) ? this.props.color : "gold";

    return (
      <div className={`marvel-device htc-one ${this.props.orientation}`}>
        <div className="top-bar" />
        <div className="camera" />
        <div className="sensor" />
        <div className="speaker" />
        <div className="screen">
          <Content show={this.props.show} />
        </div>
      </div>
    );
  }
}

Htcone.propTypes = Props;
