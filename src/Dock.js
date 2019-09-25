import React, { Component } from "react";
import PropTypes from 'prop-types';
import Drawer from 'react-drag-drawer';
import _ from 'lodash';
import {
  Button,
  ButtonGroup, 
  // ButtonDropdown,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import ReactTooltip from 'react-tooltip';
import Device, {
  SUPPORTED_DEVICES,
} from './Device';
import './scss/Dock.scss';

// various classes that get tagged into the dom when state changes
const CLASSES = {
  drawer_open: 'drawer-open',
  at_top: 'at-top',
}

const DEFAULTS = {
  // the default labels for the zoom menu buttons
  zoom: {
    full: 'Huge',
    large: 'Large',
    med: 'Medium',
    small: 'Small',
  },
  show: {
    zoom: true,
    switcher: true,
  }
}

// Map zoom text keys to zoom levels. Zoom text keys are used 
// to map props to viewable text, Zoom Levels provide the numeric
// levels that each text key sets into the dom when a zoom level changes
const ZOOM_MAP = {
  full: '100',
  large: '90',
  med: '80',
  small: '70',
  '100': 'full',
  '90': 'large',
  '80': 'med',
  '70': 'small',
}

// the numeric levels that each text key sets into the dom when a zoom level changes
const ZOOM_LEVELS = [
  '100',
  '90',
  '80',
  '70'
];

class Dock extends Component {
  
  // Requirements for props
  static propTypes = {
    // the device that you want to render as the initial device. Note that its possible to 
    // pass in an invalid value if you're passing in a device that you've also set in 
    // props.blacklist
    device: PropTypes.oneOf(SUPPORTED_DEVICES).isRequired,
    // text for the close button
    close: PropTypes.string.isRequired,
    // text for the open button
    open: PropTypes.string.isRequired,
    // add a tooltip to the open drawer button
    tooltip: PropTypes.string,
    // text for the zoom menu
    zoom: PropTypes.shape({
      full:PropTypes.string,
      large:PropTypes.string,
      med:PropTypes.string,
      small:PropTypes.string,
    }).isRequired,
    view: PropTypes.oneOf(['full','large','med','small']).isRequired,
    // a function that is called whenever the zoom level or device type is changed
    // your function is passed an object with this shape as its only argument: 
    // {
    //   zoom: 90, // the currently selected zoom level. is one of 70, 80, 90, 100
    //   device: "the-device-slug", // one of <Device/>.SUPPORTED_DEVICES
    // }
    onData: PropTypes.func,
    // an array of device names that you want to remove from the list of SUPPORTED_DEVICES
    hide: PropTypes.array,
    // show or hide specific controls
    show: PropTypes.shape({
      zoom: PropTypes.bool,
      switcher: PropTypes.bool,
    }), 
  }
  
  // Defaults for props
  static defaultProps = {
    // default labels for the clone button
    close: 'Hide Preview',
    // default label for the open button
    open: 'Live Preview',
    tooltip: '',
    zoom: DEFAULTS.zoom,
    view: 'med',
    onData: null,
    show: DEFAULTS.show,
    hide: [],
  }

  constructor(props){
    super(props);
    // merge any missing defaults from props.zoom from DEFAULTS.zoom 
    const zoom_text = _.merge(DEFAULTS.zoom,props.zoom);
    // get the zoom level for the human readable key in props.view
    const zoom_view = ZOOM_MAP[props.view];
    // remove devices from supported_devices if they appear in props.blacklist
    const supported_devices = _.xor(SUPPORTED_DEVICES,props.hide);
    // merge default into props.show
    const show_controls = _.merge(DEFAULTS.show,props.show);

    this.state = {
      // is the drawer open?
      open: false,
      // the zoom menu text labels
      zoom: zoom_text,
      // the zoom level
      view: zoom_view,
      // is the preview at the right had side? false for left
      float: 'right', // this is "left" or "right"
      // which device are we viewing? see <Device/> -> SUPPORTED_DEVICES for supported labels
      device: props.device,
      // a list of supported devices
      supported: supported_devices,
      // show or hide specific controls
      show: show_controls,
    }
  }

  getDrawer(){
    const drawer = document.getElementById('react-device-frame-drawer');
    return drawer;
  }

  getOpenWrapper(){
    const wrapper = document.getElementById('react-device-frame-drawer__controls');
    return wrapper;
  }

  attachDrawerClasses(){
    // pull the items out of state that we need to send pack to the parent
    const {view,device,float} = this.state;

    // if the drawer is open then add the current view, device and size to it
    const drawer = this.getDrawer();
    if (drawer !== null) {
      this.cleanZoom(drawer);
      this.cleanDevice(drawer);
      this.cleanFloat(drawer);
      drawer.classList.add(`zoom-${view}`);
      drawer.classList.add(`device-${device}`);
      drawer.classList.add(`at-${float}`);
    }
  }

  componentDidMount(){
    this.attachDrawerClasses();
  }

  componentDidUpdate(prevProps, prevState){
    // pull the items out of state that we need to send pack to the parent
    const {view,device,float} = this.state;
    // if we have an onData callback defined then send it the items we've pulled out of state
    if (_.isFunction(this.props.onData)) {
      this.props.onData({
        zoom: ZOOM_MAP[view],
        device: device,
        float: float,
      });
    }
  }

  setFloat(to){
    this.setState({ float: to },()=>{
      this.attachDrawerClasses();
    });
  }

  cleanFloat(from){
    from.classList.remove(`at-left`);
    from.classList.remove(`at-right`);
  }

  setZoom(to){
    this.setState({ view: to },()=>{
      this.attachDrawerClasses();
    });
  }

  cleanZoom(from){
    _.each(ZOOM_LEVELS,(level) => {
      from.classList.remove(`zoom-${level}`);
    });
  }

  setDevice(to){
    const wrapper = this.getOpenWrapper();
    this.cleanDevice(wrapper);
    this.setState({ device: to },()=>{
      this.toggle();
    });
  }

  cleanDevice(from){
    _.each(SUPPORTED_DEVICES,(name) => {
      from.classList.remove(`device-${name}`);
    });
  }

  viewportChanged(top){
    const element = this.getDrawer();
    if (top === true) {
      element.classList.remove('at-bottom');
      element.classList.add('at-top');
    }
    else {
      element.classList.remove('at-top');
      element.classList.add('at-bottom');
    }
  }

  // type selects a state key, one of 'device' or 'view'
  selected(type,select){
    const icon = (select === this.state[type]) ? (<i className="fa fa-circle fa-xs"></i>) : null;        
    return icon;
  }

  toggle = () => {
    const { open } = this.state;

    const wrapper = this.getOpenWrapper();

    if (open === true) {
      wrapper.classList.add(CLASSES.drawer_open);
    }
    else {
      wrapper.classList.remove(CLASSES.drawer_open);
    }

    this.setState({ open: !open },()=>{
      this.attachDrawerClasses();
    });
  }

  render() {

    const { open } = this.state;

    const CloseButton = (props) => {
      return (
        <Button 
            color="primary" 
            className={`btn-pill toggle toggle-close shadow ${props.classes}`} 
            onClick={()=>props.action()}
        >
          <i className="fa fa-close fa-lg"></i>
          {props.text}
        </Button>
      );
    }

    const FloatButton = (props) => {
      // get the next position for the float button as te opposite of it's 
      // current position
      const next = (props.showing === 'right') ? 'left' : 'right';
      return (
        <Button 
            color="secondary" 
            className="btn-pill toggle toggle-float shadow"
            onClick={()=>{ props.action(next); }}
        >
          <i className={`fa fa-arrow-circle-${next} fa-lg`}></i>
        </Button>
      );
    }


    const DeviceMenu = (props) => {

      return (
        <ButtonGroup className="ml-2 device-menu shadow">
          <UncontrolledButtonDropdown>
            <DropdownToggle 
                caret 
                className="p-0" 
                color="secondary"
            >
              <i className="icon-settings"></i>
            </DropdownToggle>
            <DropdownMenu direction={props.direction}>
              {props.items.map((item, index) =>{
                    // cleanup each name to match the proper name for the device
                const name = Device.getName(item);
                return (
                  <DropdownItem
                      key={index} 
                      className="btn-primary" 
                      onClick={(Event)=>{ 
                        props.onChoice(item); 
                      }}
                  >
                    {props.getSelected('device',item)}{name}
                  </DropdownItem>
                )}
              )}

            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </ButtonGroup>
      );
    }


    const ZoomMenu = (props) => {
      return (
        <ButtonGroup className={`ml-2 zoom-menu shadow open-${props.direction}`}>
          <UncontrolledButtonDropdown>
            <DropdownToggle 
                caret 
                className="p-0" 
                color="secondary"
            >
              <i className="icon-settings"></i>
            </DropdownToggle>
            <DropdownMenu direction={props.direction}>
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    props.onChoice('100'); 
                  }}
              >
                {props.getSelected('view','100')}{props.text.full}
              </DropdownItem>
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    props.onChoice('90');
                  }}
              >
                {props.getSelected('view','90')}{props.text.large}
              </DropdownItem>
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    props.onChoice('80');
                  }}
              >
                {props.getSelected('view','80')}{props.text.med}
              </DropdownItem>
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    props.onChoice('70');
                  }}
              >
                {props.getSelected('view','70')}{props.text.small}
              </DropdownItem>

            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </ButtonGroup>
      );
    }

    
    const OpenButton = (props) => {
      const drawer_open_class = (props.open === true) ? CLASSES.drawer_open : '';
      return (
        <div id="react-device-frame-drawer__controls" className={`control-wrapper ${drawer_open_class}`}>
          <div className="buttons">
            <Button 
                color="primary" 
                className="btn-pill toggle toggle-open shadow" 
                onClick={ ()=>{ props.toggle()} }
                data-tip
                data-for="react-device-frame-drawer__controls-hint"
                // INFO: Use these data-event attributes to style the tooltip and the content 
                // data-event='click' 
                // data-event-off='dblclick'
            >
              <i className="fa fa-mobile fa-lg"></i>
              {props.text}
            </Button>
            <DeviceMenu 
                items={props.menu.items}
                direction="down"
                getSelected={ (type,value)=>{ return props.menu.getSelected(type,value) }}
                onChoice={ (chosen) => { props.menu.onChoice(chosen); }}
            />
          </div>
          { 
          // only show a tooltip if one was sent in through Dock.props.tooltip
          (props.tooltip) ? (
          <ReactTooltip 
              id="react-device-frame-drawer__controls-hint"
              place="left" 
              type="dark"
              effect="solid"
              aria-haspopup="true"
              // allow clicking links inside tooltip
              // clickable={true}
              // delayHide={500}
              getContent={(data) => ( props.tooltip )}
          />
          ) : null}
        </div>
      );
    }

    return(
      <React.Fragment>
        <OpenButton 
            open={open}
            text={this.props.open}
            tooltip={this.props.tooltip}
            toggle={() => {this.toggle()}}
            menu={{
              items: this.state.supported,
              onChoice: (chosen) => { this.setDevice(chosen); },
              getSelected: (type,value) => { return this.selected(type,value); }
            }}
        />
        <Drawer
            id="react-device-frame-drawer"
            className="react-device-frame dock"
            open={open}
            allowClose={true}
            onRequestClose={this.toggle}
            inViewportChange={(at_top)=>{
              this.viewportChanged(at_top);
            }}
            // onOpen={()=>{}}
        >
          <div className="close-control zoom-reset close-control-top">
            <FloatButton 
                showing={this.state.float}
                action={(to)=>this.setFloat(to)}
            />
            <CloseButton 
                classes="toggle-top"
                text={this.props.close}
                action={()=>{this.toggle()}}
            />
            <ZoomMenu 
                text={this.props.zoom}
                direction="down"
                onChoice={(to)=>this.setZoom(to)}
                getSelected={(type,value)=>{ return this.selected(type,value) }}
            />
          </div>
          {this.props.children}
          <div className="close-control zoom-reset close-control-bottom">
            <FloatButton 
                showing={this.state.float}
                action={(to)=>this.setFloat(to)}
            />
            <CloseButton 
                classes="toggle-bottom"
                text={this.props.close}
                action={()=>{ this.toggle() }}
            />
            <ZoomMenu 
                text={this.props.zoom}
                direction="up"
                onChoice={(to)=>this.setZoom(to)}
                getSelected={(type,value)=>{ return this.selected(type,value) }}
            />
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default Dock;