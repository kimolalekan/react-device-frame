"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _iphonex = require("./build/iphonex");

var _iphonex2 = _interopRequireDefault(_iphonex);

var _iphone = require("./build/iphone8");

var _iphone2 = _interopRequireDefault(_iphone);

var _iphone8plus = require("./build/iphone8plus");

var _iphone8plus2 = _interopRequireDefault(_iphone8plus);

var _iphone5s = require("./build/iphone5s");

var _iphone5s2 = _interopRequireDefault(_iphone5s);

var _iphone5c = require("./build/iphone5c");

var _iphone5c2 = _interopRequireDefault(_iphone5c);

var _iphone4s = require("./build/iphone4s");

var _iphone4s2 = _interopRequireDefault(_iphone4s);

var _ipad = require("./build/ipad");

var _ipad2 = _interopRequireDefault(_ipad);

var _macbookpro = require("./build/macbookpro");

var _macbookpro2 = _interopRequireDefault(_macbookpro);

var _nexus = require("./build/nexus5");

var _nexus2 = _interopRequireDefault(_nexus);

var _galaxys = require("./build/galaxys5");

var _galaxys2 = _interopRequireDefault(_galaxys);

var _galaxynote = require("./build/galaxynote8");

var _galaxynote2 = _interopRequireDefault(_galaxynote);

var _htcone = require("./build/htcone");

var _htcone2 = _interopRequireDefault(_htcone);

var _lumia = require("./build/lumia920");

var _lumia2 = _interopRequireDefault(_lumia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Device = function (_Component) {
  _inherits(Device, _Component);

  function Device() {
    _classCallCheck(this, Device);

    return _possibleConstructorReturn(this, (Device.__proto__ || Object.getPrototypeOf(Device)).apply(this, arguments));
  }

  _createClass(Device, [{
    key: "render",
    value: function render() {

      var device = void 0;
      var iphonex = _react2.default.createElement("iphonex", {
        color: this.props.color,
        url: this.props.url
      });
      var iphone8 = _react2.default.createElement("iphone8", {
        color: this.props.color,
        url: this.props.url
      });
      var iphone8plus = _react2.default.createElement("iphone8plus", {
        color: this.props.color,
        url: this.props.url
      });
      var iphone5s = _react2.default.createElement("iphone5s", {
        color: this.props.color,
        url: this.props.url
      });
      var iphone5c = _react2.default.createElement("iphone5c", {
        color: this.props.color,
        url: this.props.url
      });
      var iphone4s = _react2.default.createElement("iphone4s", {
        color: this.props.color,
        url: this.props.url
      });
      var ipad = _react2.default.createElement("ipad", {
        color: this.props.color,
        url: this.props.url
      });
      var macbookpro = _react2.default.createElement("macbookpro", {
        color: this.props.color,
        url: this.props.url
      });
      var nexus5 = _react2.default.createElement("nexus5", {
        color: this.props.color,
        url: this.props.url
      });
      var galaxys5 = _react2.default.createElement("galaxys5", {
        color: this.props.color,
        url: this.props.url
      });
      var galaxynote8 = _react2.default.createElement("galaxynote8", {
        color: this.props.color,
        url: this.props.url
      });

      switch (device) {
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

        case "nexus-5":
          device = nexus5;
          break;

        case "galaxy-s5":
          device = galaxys5;
          break;

        case "galaxy-note8":
          device = galaxynote8;
          break;

        case "htc-one":
          device = _htcone2.default;
          break;

        case "lumia-920":
          device = _lumia2.default;
          break;

        default:
          device = iphone8;
      }

      return device;
    }
  }]);

  return Device;
}(_react.Component);

Device.propTypes = {
  name: _propTypes2.default.string.isRequired,
  color: _propTypes2.default.string,
  url: _propTypes2.default.string
};

exports.default = Device;
