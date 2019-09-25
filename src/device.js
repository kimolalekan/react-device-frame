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
  'galaxy-note8':{
    meta: {
      size: 'large',
      type: 'phone',
      // no color options, source: https://marvelapp.github.io/devices.css/#note8
      color: {}
    },
    component: Galaxynote8
  },
  'galaxy-s5':{
    meta: {
      size: 'small',
      type: 'phone',
      // source: https://marvelapp.github.io/devices.css/#s5
      color: {
        'black':'#1e1e1e',
        'white':'#bcbcbc',
      }
    },
    component: Galaxys5
  },
  'htc-one':{
    meta: {
      size: 'small',
      type: 'phone',
      // no color options: source: https://marvelapp.github.io/devices.css/#htc-one
      color: {}
    },
    component: Htcone
  },
  'ipad':{
    meta: {
      size: 'medium',
      type: 'tablet',
      // source: https://marvelapp.github.io/devices.css/#ipad
      color: {
        'black': '#686868',
        'silver': '#bcbcbc',
      }
    },
    component: Ipad
  },
  'iphone-4s':{
    meta: {
      size: 'small',
      type: 'phone',
      // source: https://marvelapp.github.io/devices.css/#iphone4s
      // NOTE: color options on page say black/white; this is a bug on the page. 
      // TODO: submit PR for broken docs here: http://marvelapp.github.io/devices.css/#iphone4s
      color: {
        'black': '#686868',
        'silver': '#bcbcbc',
      }
    },
    component: Iphone4s
  },
  'iphone-5c':{
    meta: {
      size: 'small',
      type: 'phone',
      // source: https://marvelapp.github.io/devices.css/#iphone5c
      color: {
        'green':'#97e563',
        'white':'#FFFFFF',
        'red':'#f96b6c',
        'yellow':'#f2dc60',
        'blue':'#33a2db',
      },
    },
    component: Iphone5c
  },
  'iphone-5s':{
    meta: {
      size: 'small',
      type: 'phone',
      // source: https://marvelapp.github.io/devices.css/#iphone5s
      color: {
        'black': '#464646',
        'gold': '#f9e7d3',
        'silver': '#d9dbdc',
      },
    },
    component: Iphone5s
  },
  'iphone-8':{
    meta: {
      size: 'medium',
      type: 'phone',
      // source: https://marvelapp.github.io/devices.css/#iphone8
      color: {
        'black': '#464646',
        'gold': '#f9e7d3',
        'silver': '#d9dbdc',
      },
    },
    component: Iphone8
  },
  'iphone-8plus':{
    meta: {
      size: 'large',
      type: 'phone',
      // source: https://marvelapp.github.io/devices.css/#iphone8plus
      color: {
        'black': '#464646',
        'gold': '#f9e7d3',
        'silver': '#d9dbdc',
      },
    },
    component: Iphone8plus
  },
  'iphone-x':{
    meta: {
      size: 'medium',
      type: 'phone',
      // no color options. source: https://marvelapp.github.io/devices.css/#iphone-x
      color: {},
    },
    component: Iphonex
  },
  'lumia-920':{
    meta: {
      size: 'small',
      type: 'phone',
      // source: https://marvelapp.github.io/devices.css/#lumia920
      color: {
        'yellow': '#ffdd00',
        'black': '#000000',
        'white': '#FFFFFF',
        'red': '#CC3E32',
        'blue': '#00acdd',
      },
    },
    component: Lumia920
  },
  'macbook-pro':{
    meta: {
      size: 'medium',
      type: 'laptop',
      // no color options. source: https://marvelapp.github.io/devices.css/#macbook
      color: {},
    },
    component: Macbookpro
  },
  'nexus-5':{
    meta: {
      size: 'small',
      type: 'phone',
      // no color options. source: https://marvelapp.github.io/devices.css/#nexus5
      color: {},
    },
    component: Nexus5
  },
};

// fills a convenience constant -> DEVICE_META
const fillMeta = (from) => {
  const metadata = {};
  _.each(from,(device,name)=>{
    const data = _.pick(device,['meta']);
    _.set(metadata,name,data.meta);
  });
  return metadata;
}

const validColor = (check,type) => {
  const colors = deviceColors(type,'array');
  const valid = _.includes(colors,check);
  return valid;
}

const deviceName = (type) => {
  let name = _.startCase(type);
  name = name.replace('Iphone','iPhone');
  name = name.replace('Ipad','iPad');
  name = name.replace('Macbook','MacBook');
  name = name.replace('Htc','HTC');
  name = name.replace('Note 8','Note8');
  name = name.replace('Galaxy S 5','Galaxy S5');
  //name = name.replace(/([45]) [SC]/g,"$1$2");
  name = name.replace('4 S','4s');
  name = name.replace('5 S','5s');
  name = name.replace('5 C','5c');
  return name;
}

/**
 * Pass in a device type-name to see if its supported by <Device/>.
 * @param {string} type a valid device type
 * @returns {bool} true if the device is supported
 */
const deviceSupported = (type) => {
  const supported = _.includes(SUPPORTED_DEVICES,type);
  return supported;
}

/**
 * Pass in a valid device type-name to get the supported colors for the device.
 * @param {string} type a valid device type
 * @param {string} format pass in 'array' or 'object'. object will return the raw color metadata, 
 *                        an object of color-name:'hex' entries, 'array' will send back only the color names
 * @returns {object} the supported colors for device 
 */
const deviceColors = (type,format='object') => {
  let colors = {};
  if (deviceSupported(type)) {
    // get the colors for this device
    colors = _.get(DEVICE_META,`${type}.color`,{});
  }
  if (format !== 'object') {
    colors = _.keys(colors);
  }
  return colors;
}

/**
 * Pass in a valid device type-name to get the default color for the device.
 * @param {string} type a valid device type
 * @returns {string} the default color for the device
 */
const deviceColor = (type) => {
  let color = null;
  const colors = deviceColors(type);
  // NOTE: we're not guarding for a valid device here because deviceColors() does that for us. 
  // * we do send back a null if the device name is invalid though...
  const have_colors = !_.isEmpty(colors);
  if (have_colors) {
    const names = _.keys(colors);
    // use the first entry in the array as the default color
    color = _.first(names);
  }      
  return color;
}

/**
 * Pass in a valid device type-name and get back an array of info-* points mined from the device metadata.
 * @param {string} type a valid device type
 * @returns {array} an array of calculated infos on the device
 */
const deviceStats = (type) => {
  const stats = [];
  if (deviceSupported(type)) {
    const meta = _.get(DEVICE_META,type,{});
    // add the device size to the stats
    stats.push(`info-size-${meta.size}`);
    // add the device type to the stats
    stats.push(`info-type-${meta.type}`);
    // add the number of colors the device supports to the stats
    const color_count = _.keys(meta.color).length;
    stats.push(`info-colors-${color_count}`);
  }
  return stats;
}

export const DEVICE_META = fillMeta(DEVICES);

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


  static getColors(type,cfg={}){
    cfg=_.merge({
      as:'raw' // this can be "raw" or "names"
    },cfg);
    const format = (cfg.as === 'names') ? 'array' : 'object';
    const colors = deviceColors(type,format);
    return colors;
  }

  static getColor(type){
    const color = deviceColor(type);
    return color;
  }

  static getStats(type){
    const info = deviceStats(type);
    return info;
  }

  static getName = (type) =>{
    const name = deviceName(type);
    return name;
  }

  /**
   * Gets the component for a given device name. 
   * WARNING: this method does not guard invalid device names. check {name} with deviceSupported(name) before you call createDevice()
   * @param {string} name a supported device name that you've already checked with deviceSupported(name)
   */
  createDevice(name){

    const orientation = (this.props.orientation === 'landscape') ? "landscape" : "portrait";

    // get the default color for the given device
    let default_color = deviceColor(name);
    const try_color = this.props.color;
    const valid_color = validColor(try_color,name);
    // figure out what color we're going to use: from props.color, a default color for the type
    const color = (!_.isEmpty(try_color) && valid_color) ? try_color : default_color;

    // render children if we have them, otherwise render whatever is in props.show 
    // NOTE: rendering of props.show is handled by ./devices/Content.js
    // * if props.show is a string we assume it's a valid url and slap that puppy into an <iframe> ... enjoy!
    const content = (this.props.children) ? this.props.children : this.props.show;

    const TheDevice = DEVICES[name].component;

    return (
      <TheDevice
        color={color}
        orientation={orientation}
        show={content}
        title={this.props.title}
      />
    );
  }

  getDevice(type) {
    let device = null;
    if(deviceSupported(type)){
      device = this.createDevice(type);
    }
    // an invalid device was requested. use the default device and show a warning message.
    else{
      const supported = SUPPORTED_DEVICES.join(', ');
      const default_name = deviceName(DEFAULT_DEVICE);
      const message = [
        `<Device /> can’t render name="${type}" because this device type isn't supported. Instead we’ve rendered a ${default_name} for you.`,"\n",
        `If you don’t like the default you can specify one of these: ${supported}.`
      ].join(' ');
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
