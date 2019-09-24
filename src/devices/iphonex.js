import React, { Component } from "react";
import Content from './lib/Content';
import Props from './lib/Props';

export default class Iphonex extends Component {
  
  render(){
    
    // TODO: does Iphonex use color?
    // const color = (this.props.color) ? this.props.color : "gold";

    return (
      <div className={`marvel-device iphone-x ${this.props.orientation}`}>
        <div className="notch">
          <div className="camera" />
          <div className="speaker" />
        </div>
        <div className="top-bar" />
        <div className="sleep" />
        <div className="bottom-bar" />
        <div className="volume" />
        <div className="overflow">
          <div className="shadow shadow--tr" />
          <div className="shadow shadow--tl" />
          <div className="shadow shadow--br" />
          <div className="shadow shadow--bl" />
        </div>
        <div className="inner-shadow" />
        <div className="screen">
          <Content show={this.props.show} />
        </div>
      </div>
    );  
  }

}

Iphonex.propTypes = Props;