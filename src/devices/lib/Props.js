import PropTypes from "prop-types";

// used in content display area. see <Content/>
const ContentProps = {
  title: PropTypes.string,
  show: PropTypes.oneOfType([ 
    PropTypes.string, 
    PropTypes.elementType,
    // This covers the case where we're passing in children instead of show=""
    PropTypes.any,
  ]),
}
// Additional props used by device types. see ../devices
const FrameProps = {
  color: PropTypes.string,
  orientation: PropTypes.oneOf(['portrait','landscape']),
};

// combined props for all device types and the base props for <Device/>
const Props = {
  ...ContentProps,
  ...FrameProps,
}

export default Props;
export {
  ContentProps,
  FrameProps,
}