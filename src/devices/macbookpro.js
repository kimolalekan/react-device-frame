import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';

export default class Macbookpro extends Component {
  render() {
    return (
      <div className={`marvel-device macbook`}>
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
