import React, { Component } from "react";
import PropTypes from "prop-types";
import Iphonex from "./device/iphonex";
import Iphone8 from "./device/iphone8";
import Iphone8plus from "./device/iphone8plus";
import Iphone5s from "./device/iphone5s";
import Iphone5c from "./device/iphone5c";
import Iphone4s from "./device/iphone4s";
import Ipad from "./device/ipad";
import Macbookpro from "./device/macbookpro";
import Nexus5 from "./device/nexus5";
import Galaxys5 from "./device/galaxys5";
import Galaxynote8 from "./device/galaxynote8";
import Htcone from "./device/htcone";
import Lumia920 from "./device/lumia920";

export default class Device extends Component {
  getDevice(type) {
    let device, orientation;
    this.props.landscape ? (orientation = "landscape") : (orientation = "");

    const iphonex = (
      <Iphonex
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const iphone8 = (
      <Iphone8
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const iphone8plus = (
      <Iphone8plus
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const iphone5s = (
      <Iphone5s
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const iphone5c = (
      <Iphone5c
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const iphone4s = (
      <Iphone4s
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const ipad = (
      <Ipad
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const macbookpro = (
      <Macbookpro
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const htcone = (
      <Htcone
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const nexus5 = (
      <Nexus5
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const lumia920 = (
      <Lumia920
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const galaxys5 = (
      <Galaxys5
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );
    const galaxynote8 = (
      <Galaxynote8
        color={this.props.color}
        orientation={orientation}
        site={this.props.url}
      />
    );

    switch (type) {
      case "iphone-x":
        device = iphonex;
      break;
      case "iphone-8":
        device = iphone8;
      break;
      case "iphone-8plus":
        device = iphone8plus;
      break;
      case "iphone-5s":
        device = iphone5s;
      break;
      case "iphone-5c":
        device = iphone5c;
      break;
      case "iphone-4s":
        device = iphone4s;
      break;
      case "ipad-mini":
        device = ipad;
      break;
      case "macbook-pro":
        device = macbookpro;
      break;
      case "htc-one":
        device = htcone;
      break;
      case "lumia-920":
        device = lumia920;
      break;
      case "nexus-5":
        device = nexus5;
      break;
      case "galaxy-s5":
        device = galaxys5;
      break;
      case "galaxy-note8":
        device = galaxynote8;
      break;
    }

    return device; 

  }

  render() {
    const device = this.getDevice(this.props.name);

    return device;
  }
}

Device.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  url: PropTypes.string,
  portrait: PropTypes.boolean,
  landscape: PropTypes.boolean
};
