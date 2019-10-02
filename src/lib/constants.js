import _ from 'lodash';

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
    color: true, 
    orientation: true,
    float: true,
  }
}

// Map zoom text keys to zoom levels. Zoom text keys are used 
// to map props to viewable text, Zoom Levels provide the numeric
// levels that each text key sets into the dom when a zoom level changes
const ZOOM_MAP = {
  'full': '100',
  'large': '90',
  'med': '80',
  'small': '70',
}
// flip the zoom_map and merge the results back into the zoom_map
// so we can access a level from a label and a label from a level
_.set(ZOOM_MAP,_.merge(ZOOM_MAP,_.invert(ZOOM_MAP)));

// the numeric levels that each text key sets into the dom when a zoom level changes
const ZOOM_LEVELS = [
  '100',
  '90',
  '80',
  '70'
];

export {
  CLASSES,
  DEFAULTS,
  ZOOM_MAP,
  ZOOM_LEVELS
}
