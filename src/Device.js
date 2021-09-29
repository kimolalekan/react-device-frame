import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from 'lodash';

// import all supported components
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

// grab all props for all devices
import Props from './devices/lib/Props';

// grab our local styles
import './scss/Device.scss';

// grab the styles from node_modules/Devices.css
import 'Devices.css/assets/devices.min.css';

/**
 * used by normalize to squash values in arrays and objects to lowercase
 * @param {object|array} set an array or single level deep hash
 * @returns your set with lowercase values in it
 */
const toLower = (set) => {
  let processed = null;
  const type = (_.isArray(set)) ? 'array' : 'object';
  // set all values in the map to lowercase so it wont matter what the values we check against are stored as
  switch (type) {
    case 'array':
      processed = [];
      _.each(set,(name)=>{
        const lower = _.toLower(name);
        processed.push(lower);
      });
    break;
  
    case 'object':
    default:
      processed = {};
      _.each(set,(value,name)=>{
        const lower = _.toLower(value);
        _.set(processed,name,lower);
      });
    break;
  }
  return processed;
}

/**
 * Post processes device data to normalize specific information within the set
 * @param {DEVICES} source our device dataset/constant
 */
const normalize = (source) => {
  // iterate over the source and alter whatever is necessary in each device
  _.each(source,(data,name) => {
    // pull the colors out of device metadata and pass them to the color value normalizer
    const color = toLower(data.meta.color);
    // set the normalized colors back into the device metadata
    _.set(source,`${name}.meta.color`,color);
    // set the altered device data into the destination object
    _.set(source,name,data);
  });
  return source;
}

// our "database" of supported devices; adds metadata for each device and attaches the 
// imported components to an object key that we can use later to pull in the device that we're 
// going to render
const DEVICES = normalize({
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
        'white':'#bcbcbc',
        'black':'#1e1e1e',
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
        'silver': '#bcbcbc',
        'black': '#686868',
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
        'silver': '#bcbcbc',
        'black': '#686868',
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
        'green': '#97E563',
        'white': '#ffFFff',
        'red': '#F96b6c',
        'yellow': '#f2Dc60',
        'blue': '#33A2db',
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
        'silver': '#d9dbdc',
        'gold': '#f9e7d3',
        'black': '#464646',
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
        'gold': '#f9e7d3',
        'silver': '#d9dbdc',
        'black': '#464646',
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
        'gold': '#f9e7d3',
        'silver': '#d9dbdc',
        'black': '#464646',
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
        'white': '#ffffff',
        'red': '#cc3e32',
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
});

/**
 * Pulls our metadata from our device dataset DEVICES. Used to fill a convenience constant -> DEVICE_META
 * @param {DEVICES} from the device dataset 
 * @returns {object} a hash of {device-type:{metadata}} pairs
 */
const fillMeta = (from) => {
  const metadata = {};
  _.each(from,(device,name)=>{
    const data = _.pick(device,['meta']);
    _.set(metadata,name,data.meta);
  });
  return metadata;
}

/**
 * Creates human readable names from device type keys. see: DEVICES->object-keys
 * @param {string} type a valid device type
 * @returns {string} a human readable name for the device
 */
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
const deviceColor = (type,format='object') => {
  let color = null;
  const colors = deviceColors(type);
  // NOTE: we're not guarding for a valid device here because deviceColors() does that for us. 
  // * we do send back a null if the device name is invalid though...
  const have_colors = !_.isEmpty(colors);
  if (have_colors) {
    const names = _.keys(colors);
    // use the first entry in the array as the default color
    color = _.first(names);
    if (format === 'object') {
      color = {[color]:colors[color]}
    }
  }
  return color;
}

/**
 * From a given {value} lookup it's key, or from a given key lookup it's {value} in the device's available colors. For
 * example if a deice supports the color {'red':'#f96b6c'} and you pass in "red" you'll get back '#f96b6c' or if you 
 * pass in '#f96b6c' you'll get back 'red'.
 * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
 * @param {string} value a string to lookup in the device's meta.color table. 
 * @returns {string|null} null if no mappable value found
 */
const colorMap = (type,value) => {
  // get all available colors for this device {type}
  const colors = deviceColors(type);
  // clone the available colors into an object we can alter
  let map = _.clone(colors);
  // invert the map so the keys are now the values
  const invert = _.invert(map);
  // merge the inverted values into the map
  map = _.merge(map,invert);
  // set the check value to lowercase so it wont matter what case the incoming value is set as
  const check = _.toLower(value);
  // lookup the value in th map pulling out the #HEX or 
  // the name based on what was passed in through value
  // send back the default if no value can be found
  const found = _.get(map,check,null);
  return found;
}

/**
 * Gets all supported color names for the device {type}
 * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
 * @returns {array} an array of supported human readable color names for the device {type}
 */
const colorNames = (type) => {
  const available = deviceColors(type);
  const names = _.keys(available);
  return names;
}

/**
 * Gets all supported #hex color values for the device {type}
 * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
 * @returns {array} an array of supported #hex color values for the device {type}
 */
const colorValues = (type) => {
  const available = deviceColors(type);
  const values = _.values(available);
  return values;
}

/**
 * Validates {using} against the device {type} and uses the default color for the device if {using} isn't a supported color
 * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
 * @param {string} using a human readable color name, like "red". 
 * @returns {string|null} returns the color you passed in through {using} if valid, the default color for the device {type}, or null
 *                        if the device doesn't have a default color 
 */
const colorUse = (type,using) => {
  const available = deviceColors(type);
  const fallback = deviceColor(type,'name');
  // set the check value to lowercase so it wont matter what case the incoming value is set as
  using = _.toLower(using);
  // use the color in props or the fallback color
  const color = _.get(available,using,available[fallback]);
  return color;
}

/**
 * Pass in a valid device type-name and get back an array of info-* points mined from the device metadata.
 * @param {string} type a valid device type
 * @returns {array} an array of calculated information about the device
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

// a hash of {device-type:{metadata}} objects
export const DEVICE_META = fillMeta(DEVICES);
// an array of supported devices
export const SUPPORTED_DEVICES = _.keys(DEVICES);
// the default device. this is used if an invalid device is passed in through props.use
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

  /**
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @param {object} cfg a configuration object with the following shape:
   *                     @as {string} can be "raw" or "names".  
   * @returns {array|object} if (cfg.as === "names") an array of color names. if (cfg.as === 'raw') an object with 
   *                          the all supported colors in it as a {name:'#HEX-COLOR',name2:'#HEX-COLOR'} pairs.
   */
  static getColors(type,cfg={}){
    cfg=_.merge({
      as:'raw' // this can be "raw" or "names"
    },cfg);
    const format = (cfg.as === 'names') ? 'array' : 'object';
    const colors = deviceColors(type,format);
    return colors;
  }

  /**
   * Get a list of all supported devices as keys and each devices metadata as values
   * @returns {object} a hash of {device-type:{metadata}} objects
   */
  static getDevices() {
    const devices = {};
    _.each(DEVICES,(device,name)=>{
      const data = _.pick(device,'meta');
      _.set(devices,name,data.meta);
    });
    return devices;
  }

  /**
   * Pass in a valid device type-name to get the default color for the device. 
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @param {object} cfg a configuration object with the following shape:
   *                     @as {string} can be "raw" or "name". if you're getting the default device color and don't want to pull all the 
   *                                  colors separately with Device.getColors() to get the value then use {as: 'raw'} 
   * @returns {string|object} if (cfg.as === name) a string with the default color in it. if (cfg.as === name) an object with 
   *                          the default color in it as a {name:'#HEX-COLOR'} pair.
   */
  static getColor(type,cfg={}){
    cfg=_.merge({
      as:'raw' // this can be "raw" or "name"
    },cfg);
    const format = (cfg.as === 'name') ? 'array' : 'object';
    const color = deviceColor(type,format);
    return color;
  }

  /**
   * Get an array of info-* strings that let you know about the device
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @returns {array} an array of strings, formatted device metadata
   */
  static getStats(type){
    const info = deviceStats(type);
    return info;
  }

  /**
   * Get the human readable formatted name of the device from it's device type (key).
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @returns {string}
   */
  static getName(type){
    const name = deviceName(type);
    return name;
  }

  /**
   * Check if a color {check} (name or value) is valid for a given device {type}
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @param {string} check a color value or name to check
   * @returns {bool}
   */
  static colorValid(type,check){
    const mapped = colorMap(type,check);
    const valid = (mapped !== null) ? true : false;
    return valid;
  }

  /**
   * Validates {using} against the device {type} and uses the default color for the device if {using} isn't a supported color
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @param {string} using a human readable color name, like "red". 
   * @returns {string|null} returns the color you passed in through {using} if valid, the default color for the device {type}, or null
   *                        if the device doesn't have a default color 
   */
  static colorUse(type,using){
    const choose = colorUse(type,using);
    return choose;
  }

  /**
   * Gets all supported color names for the device {type}
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @returns {array} an array of supported human readable color names for the device {type}
   */
  static colorNames(type){
    const colors = colorNames(type);
    return colors;
  }

  /**
   * Gets all supported #hex color values for the device {type}
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @returns {array} an array of supported #hex color values for the device {type}
   */
  static colorValues(type){
    const colors = colorValues(type);
    return colors;
  }

  /**
   * From a given {value} lookup it's key, or from a given key lookup it's {value} in the device's available colors. For
   * example if a deice supports the color {'red':'#f96b6c'} and you pass in "red" you'll get back '#f96b6c' or if you 
   * pass in '#f96b6c' you'll get back 'red'.
   * @param {string} type a valid device type. use Device.getDevices() to see all devices and metadata for each device.
   * @param {string} value a string to lookup in the device's meta.color table. 
   * @returns {string|null} null of no mappable color found
   */
  static colorMap(type,value){
    const color = colorMap(type,value);
    return color;
  }

  /**
   * Gets the component for a given device name. 
   * WARNING: this method does not guard invalid device names. check {name} with deviceSupported(name) before you call createDevice()
   * @param {string} name a supported device name that you've already checked with deviceSupported(name)
   */
  createDevice(name){

    const orientation = (this.props.orientation === 'landscape') ? "landscape" : "portrait";

    // try to use the requested color
    const try_color = this.props.color;
    // validate the requested color. use it if valid, fallback on the default.
    const color_hex = colorUse(name,try_color);
    // color use returns a hex value. map it to the color name for the device.
    const color_name = colorMap(name,color_hex);

    // render children if we have them, otherwise render whatever is in props.show 
    // NOTE: rendering of props.show is handled by ./devices/Content.js
    // * if props.show is a string we assume it's a valid url and slap that puppy into an <iframe> ... enjoy!
    const content = (this.props.children) ? this.props.children : this.props.show;

    const TheDevice = DEVICES[name].component;

    return (
      <TheDevice
        color={color_name}
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
