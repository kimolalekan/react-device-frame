import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import Props from './devices/lib/Props';

import Iphonex from "./devices/iphonex";
import Iphone8 from "./devices/iphone8";
import Iphone8plus from "./devices/iphone8plus";
import Iphone5s from "./devices/iphone5s";
import Iphone5c from "./devices/iphone5c";
import Iphone4s from "./devices/iphone4s";
import Ipad from "./devices/ipad";
import Macbookpro from "./devices/macbookpro";
import Nexus5 from "./devices/nexus5";
import Galaxys5 from "./devices/galaxys5";
import Galaxynote8 from "./devices/galaxynote8";
import Htcone from "./devices/htcone";
import Lumia920 from "./devices/lumia920";

import './scss/Device.scss';
import 'Devices.css/assets/devices.min.css';

const DEVICES = {
  'galaxy-note8':Galaxynote8,
  'galaxy-s5':Galaxys5,
  'htc-one':Htcone,
  'ipad':Ipad,
  'iphone-4s':Iphone4s,
  'iphone-5c':Iphone5c,
  'iphone-5s':Iphone5s,
  'iphone-8':Iphone8,
  'iphone-8plus':Iphone8plus,
  'iphone-x':Iphonex,
  'lumia-920':Lumia920,
  'macbook-pro':Macbookpro,
  'nexus-5':Nexus5,
};

export const SUPPORTED_DEVICES = _.keys(DEVICES);

const DEFAULT_DEVICE = 'iphone-x';

export default class Device extends Component {

  static propTypes = {
    use: PropTypes.oneOf(SUPPORTED_DEVICES).isRequired,
    ...Props
  };

  static defaultProps = {
    title: '',
    use: DEFAULT_DEVICE,
    orientation: 'portrait',
  }
  
  // constructor(props){
  //   super(props)
  //   // TODO: figure out what colors are supported and enumerate that here in combination with props.use. 
  //   // + send a message to the console about using an invalid color for the props.use value when an invalid
  //   // + value is detected
  // }

  createDevice(name){

    const orientation = (this.props.orientation === 'landscape') ? "landscape" : "portrait";

    // render children if we have them, otherwise render whatever is in props.show 
    // NOTE: rendering of props.show is handled by ./devices/Content.js
    // * if props.show is a string we assume it's a valid url and slap that puppy into an <iframe> ... enjoy!
    const content = (this.props.children) ? this.props.children : this.props.show;

    const TheDevice = DEVICES[name];

    return (
      <TheDevice
        color={this.props.color}
        orientation={orientation}
        show={content}
        title={this.props.title}
      />
    );
  }

  getDevice(type) {
    let device = null;
    const valid_device = _.includes(SUPPORTED_DEVICES,type);
    if(valid_device){
      device = this.createDevice(type);
    }
    // use the default device and show a warning message
    else{
      const supported = SUPPORTED_DEVICES.join(', ');
      const message = [
        `<Device /> can’t render name="${type}" because this device type isn't supported. Instead we’ve rendered a ${DEFAULT_DEVICE} for you.`,"\n",
        `If you don’t like the default you can specify one of these: ${supported}.`
      ]
      console.warn(message);
      device = this.createDevice(DEFAULT_DEVICE);
    }

    return device; 

  }

  render() {
    const device = this.getDevice(this.props.use);
    return (<div className="react-device-frame actual">{device}</div>);
  }
}
