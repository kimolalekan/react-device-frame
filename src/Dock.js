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
import { GithubPicker } from 'react-color';
import reSize from './lib/reSize';

// pull in Component and utils
import Device, {
  SUPPORTED_DEVICES,
} from './Device';
import './scss/Dock.scss';

import {CLASSES,DEFAULTS,ZOOM_MAP,ZOOM_LEVELS} from './lib/constants';

class Dock extends Component {
  
  // holds refs for the drawer
  drawerRef = {
    container: null,
    overlay: null,
    content: null,
  }

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
    // your function is passed an object with this shape as it's only argument: {
    //   @zoom {string} one of: 'full','large','med','small'. this is the currently selected zoom level.
    //   @device {string} one of <Device/>.SUPPORTED_DEVICES, like: "the-device-slug"
    // }
    onData: PropTypes.func,
    // an array of device names that you want to remove from the list of SUPPORTED_DEVICES
    hide: PropTypes.array,
    // show or hide specific controls
    show: PropTypes.shape({
      zoom: PropTypes.bool,
      switcher: PropTypes.bool,
      color: PropTypes.bool,
      orientation: PropTypes.bool,
    }), 
    // add padding in px to the top of the drawer. handy if you have a header at the top of your page.
    padTop: PropTypes.number,
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
    padTop: 0,
    orient: 'portrait',
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

      // @DEVICE DISPLAY SIZE
      // the zoom menu text labels
      zoom: zoom_text,
      // the zoom level, an integer, one of: 70, 80, 90, or 100.
      view: zoom_view,

      // @PREVIEW LOCATION
      // is the preview at the right had side? false for left
      float: 'right', // this is "left" or "right"
      
      // @device display orientation
      // TODO: add orientation menu
      orient: props.orient, // this is landscape or portrait

      // @DEVICE COLORS
      // the currently selected color
      color: 'black',
      // is the color chooser visible?
      chooser: false,

      // @DEVICES
      // which device are we viewing? see <Device/> -> SUPPORTED_DEVICES for supported labels
      device: props.device,
      // a list of supported devices
      supported: supported_devices,
      // show or hide specific controls
      show: show_controls,
    }

    this.measureDrawer = this.measureDrawer.bind(this);
    this.chooserToggle = this.chooserToggle.bind(this);

  }

  getDrawer(){
    const drawer = document.getElementById('react-device-frame-drawer');
    return drawer;
  }

  getOpenWrapper(){
    const wrapper = document.getElementById('react-device-frame-drawer__controls');
    return wrapper;
  }

  componentDidMount() {
    this.measureDrawer();
    window.addEventListener("resize", this.measureDrawer);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measureDrawer);
  }

  componentDidUpdate(prevProps, prevState){
    // pull the items out of state that we need to send pack to the parent
    const {view,device,float,orient,color} = this.state;
    // if we have an onData callback defined then send it the items we've pulled out of state
    if (_.isFunction(this.props.onData)) {
      this.props.onData({
        zoom: ZOOM_MAP[view],
        device: device,
        float: float,
        orient: orient,
        color: color,
      });
    }
  }

  setFloat(to){
    this.setState({ float: to },()=>{
      this.measureDrawer();
    });
  }

  cleanFloat(from){
    from.classList.remove(`at-left`);
    from.classList.remove(`at-right`);
  }

  setZoom(to){
    this.setState({ view: to },()=>{
      this.measureDrawer();
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
      this.measureDrawer();
    });
  }

  applyPadding(to){
    // pull the zoom level out of state
    const {view} = this.state;
    // get the un-zoomed device height
    const device_height = _.round(this.drawerRef.overlay.getBoundingClientRect().height);
    // get the height of the window form the reSize HOC
    const window_height = this.props.reSize.height;
    // output padding in px
    const units = 'px';
    // each close control is 30px (30.5px) tall but positioned relative so they collectively take up ≈60px
    const fixed_pad = 60; 
    // the amount of padding passed into the <Drawer/>
    const props_pad = this.props.padTop;
    // the total amount of additional padding when factoring in buttons and requested padding
    const extra = fixed_pad + props_pad;
    // the perceptual device height when zoomed
    const adjusted_device_height = _.round(device_height * (view/100));
    // the leftover height after removal of the device height from the window height
    const oversize =  (adjusted_device_height - window_height);
    // default to providing only the padding requested by props.padTop
    let provide_padding = props_pad;
    // if the perceptual size of the device is larger than the viewport then provide adjusted padding based on the
    // zoom settings
    if (oversize > 0) {
      // the padding left over after factoring in the perceived height when zoom resized by {view}
      const adjusted_padding = _.round(oversize * (view/100));
      // the needed padding after adding in the buttons and the requested padding
      const padding = adjusted_padding + extra;
      // only provide additional padding if we need it because the device is taller than the window,
      // otherwise, provide the requested padding from props.topPad + our buttons
      provide_padding = (adjusted_device_height >= window_height ) ? padding : props_pad;        
    }
    // apply padding to the drawer
    to.style.paddingTop = `${provide_padding}${units}`;
  }

  attachClasses(to){
    // pull the items out of state that we need to attach to the drawer
    const {view,device,float} = this.state;

    this.cleanZoom(to);
    this.cleanDevice(to);
    this.cleanFloat(to);
    to.classList.add(`zoom-${view}`);
    to.classList.add(`device-${device}`);
    to.classList.add(`at-${float}`);

  }

  measureDrawer(){
    // if the drawer is open then add classes and padding to it
    const drawer = this.getDrawer();
    if (drawer !== null) {
      this.applyPadding(drawer);
      this.attachClasses(drawer);
    }
  }

  chooserToggle(){
    // pull out the current value of chooser from state
    const {chooser:visible} = this.state;
    // swap the value of visible and reset that value into state
    this.setState({chooser: !visible});
  }

  chooseColorHover(hovered){
    const {device} = this.state;
    const name = Device.colorMap(device,hovered.hex);
    console.table({
      '@':'chooseColorHover()',
      color: hovered.hex,
      name: name,
    });
  }

  chooseColorComplete(chosen){
    const {device} = this.state;
    const name = Device.colorMap(device,chosen.hex);
    // set the selected color name into state
    this.setState({color: name});

  }

  render() {

    const { open, float, color } = this.state;

    // all colors available for the requested device
    const colors_available = Device.getColors(this.props.device);
    // the default color for the requested device
    const color_default = Device.getColor(this.props.device,{as:'name'});

    const selectable = {
      all: colors_available,
      default: color_default,
      use: color,
    };

    // TODO: add color selection menu per device using Device.getColors() and Device.getColor()
    // TODO: add orientation menu for landscape/portrait

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

    const ColorSwitch = (props) => {
      // const available = props.selections.all;
      // const colors = colorNames(props.selections);
      const colors = Device.colorValues(this.state.device);
      const using = Device.colorUse(this.state.device,props.selections.use);
      // const names = _.keys(available);
      // const using = props.selections.use;
      // const fallback = props.selections.default;
      // const render_color = _.includes(names,using) ? available[using] : available[fallback];
      const have_colors = !_.isEmpty(colors);
      return (have_colors) ? (
        <React.Fragment>
          <Button 
            color="ghost"
            className="shadow color-chooser"
            onClick={this.chooserToggle}
          >
            <i className="fa fa-circle fa-xs" style={{
              color: using,
              backgroundColor: using,
            }}></i>
          </Button>
          { (props.visible) ? (
          <GithubPicker 
              className="color-chooser-choices"
              // width="212px"
              colors={colors}
              color={using}
              onChange={this.chooserToggle}
              onChangeComplete={(color, event) => {
                this.chooseColorComplete(color);
              }} 
              onSwatchHover={ (color, event) => {
                // console.log({
                //   'swatch':'hover!',
                //   color:color,
                //   event:event
                // });
                this.chooseColorHover(color);
              }} 
              triangle={(props.opens === 'left') ? "top-left" : "top-right"}
          />
          ) : null }
        </React.Fragment>
      ) : null;
    } 

    // TODO: add orientation controls
    // const Orientation = (props) => {
    //   return (
    //     <React.Fragment>

    //     </React.Fragment>
    //   );
    // } 

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
            {/* TODO: implement state.controls.switcher to show device switcher */}
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
            toggle={() => { this.toggle() }}
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
            // direction
            onRequestClose={this.toggle}
            inViewportChange={(at_top)=>{
              this.viewportChanged(at_top);
            }}
            onOpen={()=>{
              this.measureDrawer();
            }}
            // notifyWillClose={(a)=>{console.log({'@':'notifyWillClose()','a':a})}}
            modalElementClass="react-device-frame drawer-modal"
            containerElementClass="react-device-frame drawer-main"
            getContainerRef={(Ref)=>{
              const have_ref = !_.isEmpty(Ref);
              if(have_ref){
                this.drawerRef['container'] = Ref;
              }
            }}
            getModalRef={(Ref)=>{
              const have_ref = !_.isEmpty(Ref);
              if(have_ref){
                this.drawerRef['overlay'] = Ref;
              }
            }}
        >
          <div className="close-control zoom-reset close-control-top">
            {/* TODO: implement state.controls to show hide controls */}
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
            <ColorSwitch 
                visible={this.state.chooser} 
                chosen={this.state.color} 
                opens={float}
                selections={selectable}
            />
          </div>
          <div className="react-device-frame content-main" ref={(element)=>{ this.drawerRef['content'] = element}}>
            {this.props.children}
          </div>
          <div className="close-control zoom-reset close-control-bottom">
            {/* TODO: implement state.controls to show hide controls */}
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
            <ColorSwitch 
                visible={this.state.chooser} 
                chosen={this.state.color} 
                opens={float}
                selections={selectable}
            />
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default reSize(Dock);