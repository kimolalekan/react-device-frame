import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';

export default class Macbookpro extends Component {
  render() {
    
    // TODO: does Macbookpro use color?
    // const color = (this.props.color) ? this.props.color : "black";
    // TODO: does macbook use orientation!?
    return (
      <div className={`marvel-device macbook ${this.props.orientation}`}>
        <div className="top-bar" />
        <div className="camera" />
        <div className="screen">
          <Content show={this.props.show} />
        </div>
        <div className="bottom-bar" />
      </div>
    );
  }
}

Macbookpro.propTypes = Props;
