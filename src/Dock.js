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
import {SUPPORTED_DEVICES} from './Device';
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
  }

  constructor(props){
    super(props);
    const zoom_text = _.merge(DEFAULTS.zoom,props.zoom);
    const zoom_view = ZOOM_MAP[props.view];
    this.state = {
      // is the drawer open?
      open: false,
      // the zoom menu text labels
      zoom: zoom_text,
      // the zoom level
      view: zoom_view,
      // which device are we viewing? see <Device/> -> SUPPORTED_DEVICES for supported labels
      device: props.device,
    }
  }

  componentDidMount(){
    // var element = document.getElementById('react-device-frame-drawer');
    // const {zoom} = this.state;
    // element.classList.add(`zoom-${zoom}`);
  }

  getDrawer(){
    const drawer = document.getElementById('react-device-frame-drawer');
    return drawer;
  }

  getOpenWrapper(){
    const wrapper = document.getElementById('react-device-frame-drawer__controls');
    return wrapper;
  }

  componentDidUpdate(prevProps, prevState){
    // pull the items out of state that we need to send pack to the parent
    const {view,device} = this.state;
    // if the drawer is open then add the current view size to it
    const element = this.getDrawer();
    if (element !== null) {
      element.classList.add(`zoom-${view}`);  
    }
    // if we have an onData callback defined then sed it the items we've pulled out of state
    if (typeof this.props.onData === 'function') {
      this.props.onData({
        zoom: view,
        device: device,
      });
    }
  }

  setZoom(to){
    const element = this.getDrawer();
    // eslint-disable-next-line array-callback-return
    ZOOM_LEVELS.map((level) => {
      element.classList.remove(`zoom-${level}`);
    });
    this.setState({ view: to });
  }

  setDevice(to){
    this.setState({ device: to });
  }

  viewportChanged(at_top){
    const element = this.getDrawer();
    if (at_top === true) {
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

    this.setState({ open: !open })
  }

  render() {

    const { open } = this.state;

    const drawer_open_class = (open === true) ? CLASSES.drawer_open : '';

    const CloseButton = (props) => {
      return (
        <Button 
            color="primary" 
            className={`btn-pill btn-primary toggle toggle-close shadow ${props.classes}`} 
            onClick={()=>this.toggle()}
        >
          <i className="fa fa-close fa-lg"></i>
          {this.props.close}
        </Button>
      );
    }

    const DeviceMenu = (props) => {
      return (
        <ButtonGroup className="ml-2 device-menu">
          <UncontrolledButtonDropdown>
            <DropdownToggle 
                caret 
                className="p-0" 
                color="secondary"
            >
              <i className="icon-settings"></i>
            </DropdownToggle>
            <DropdownMenu direction="left">
              {SUPPORTED_DEVICES.map((item, index) =>{
                const name = item;
                return (
                  <DropdownItem
                      key={index} 
                      className="btn-primary" 
                      onClick={(Event)=>{ 
                        this.setDevice(item); 
                      }}
                  >
                    {this.selected('device',item)}{name}
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
        <ButtonGroup className="ml-2 zoom-menu">
          <UncontrolledButtonDropdown>
            <DropdownToggle 
                caret 
                className="p-0" 
                color="secondary"
            >
              <i className="icon-settings"></i>
            </DropdownToggle>
            <DropdownMenu direction="left">
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    this.setZoom('100'); 
                  }}
              >
                {this.selected('view','100')}{this.props.zoom.full}
              </DropdownItem>
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    this.setZoom('90');
                  }}
              >
                {this.selected('view','90')}{this.props.zoom.large}
              </DropdownItem>
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    this.setZoom('80');
                  }}
              >
                {this.selected('view','80')}{this.props.zoom.med}
              </DropdownItem>
              <DropdownItem 
                  className="btn-primary" 
                  onClick={(Event)=>{ 
                    this.setZoom('70');
                  }}
              >
                {this.selected('view','70')}{this.props.zoom.small}
              </DropdownItem>

            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </ButtonGroup>
      );
    }

    const OpenButton = (props) => {
      return (
        <div id="react-device-frame-drawer__controls" className={`control-wrapper ${drawer_open_class}`}>
          <div className="buttons">
            <Button 
                color="primary" 
                className="btn-pill toggle toggle-open shadow" 
                onClick={()=>this.toggle()}
                data-tip
                data-for="react-device-frame-drawer__controls-hint"
                // INFO: Use these data-event attributes to style the tooltip and the content 
                // data-event='click' 
                // data-event-off='dblclick'
            >
              <i className="fa fa-mobile fa-lg"></i>
              {this.props.open}
            </Button>
            <DeviceMenu />
          </div>
          {(this.props.tooltip) ? (
          <ReactTooltip 
              id="react-device-frame-drawer__controls-hint"
              place="left" 
              type="dark"
              effect="solid"
              aria-haspopup="true"
              // allow clicking links inside tooltip
              // clickable={true}
              // delayHide={500}
              getContent={(data) => ( this.props.tooltip )}
          />
          ) : null}
        </div>
      );
    }

    return(
      <React.Fragment>
        <OpenButton />
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
            <CloseButton classes="toggle-top" />
            <ZoomMenu />
          </div>
          {this.props.children}
          <div className="close-control zoom-reset close-control-bottom">
            <CloseButton classes="toggle-bottom" />
            <ZoomMenu />
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default Dock;