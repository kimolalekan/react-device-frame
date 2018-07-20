"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _iphonex = require("./iphonex");

var _iphonex2 = _interopRequireDefault(_iphonex);

var _iphone = require("./iphone8");

var _iphone2 = _interopRequireDefault(_iphone);

var _iphone8plus = require("./iphone8plus");

var _iphone8plus2 = _interopRequireDefault(_iphone8plus);

var _iphone5s = require("./iphone5s");

var _iphone5s2 = _interopRequireDefault(_iphone5s);

var _iphone5c = require("./iphone5c");

var _iphone5c2 = _interopRequireDefault(_iphone5c);

var _iphone4s = require("./iphone4s");

var _iphone4s2 = _interopRequireDefault(_iphone4s);

var _ipad = require("./ipad");

var _ipad2 = _interopRequireDefault(_ipad);

var _macbookpro = require("./macbookpro");

var _macbookpro2 = _interopRequireDefault(_macbookpro);

var _nexus = require("./nexus5");

var _nexus2 = _interopRequireDefault(_nexus);

var _galaxys = require("./galaxys5");

var _galaxys2 = _interopRequireDefault(_galaxys);

var _galaxynote = require("./galaxynote8");

var _galaxynote2 = _interopRequireDefault(_galaxynote);

var _htcone = require("./htcone");

var _htcone2 = _interopRequireDefault(_htcone);

var _lumia = require("./lumia920");

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
    key: "getDevice",
    value: function getDevice(type) {
      var device = void 0,
          orientation = void 0;
      this.props.landscape ? orientation = "landscape" : orientation = "";

      var iphonex = _react2.default.createElement(_iphonex2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var iphone8 = _react2.default.createElement(_iphone2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var iphone8plus = _react2.default.createElement(_iphone8plus2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var iphone5s = _react2.default.createElement(_iphone5s2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var iphone5c = _react2.default.createElement(_iphone5c2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var iphone4s = _react2.default.createElement(_iphone4s2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var ipad = _react2.default.createElement(_ipad2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var macbookpro = _react2.default.createElement(_macbookpro2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var htcone = _react2.default.createElement(_htcone2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var nexus5 = _react2.default.createElement(_nexus2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var lumia920 = _react2.default.createElement(_lumia2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var galaxys5 = _react2.default.createElement(_galaxys2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });
      var galaxynote8 = _react2.default.createElement(_galaxynote2.default, {
        color: this.props.color,
        orientation: orientation,
        site: this.props.url
      });

      if (type === "iphone-x") {
        return iphonex;
      } else if (type === "iphone-8") {
        return iphone8;
      } else if (type === "iphone-8plus") {
        return iphone8plus;
      } else if (type === "iphone-5s") {
        return iphone5s;
      } else if (type === "iphone-5c") {
        return iphone5c;
      } else if (type === "iphone-4s") {
        return iphone4s;
      } else if (type === "ipad-mini") {
        return ipad;
      } else if (type === "macbook-pro") {
        return macbookpro;
      } else if (type === "htc-one") {
        return htcone;
      } else if (type === "lumia-920") {
        return lumia920;
      } else if (type === "nexus-5") {
        return nexus5;
      } else if (type === "galaxy-s5") {
        return galaxys5;
      } else if (type === "galaxy-note8") {
        return galaxynote8;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var device = this.getDevice(this.props.name);

      return device;
    }
  }]);

  return Device;
}(_react.Component);

exports.default = Device;


Device.propTypes = {
  name: _propTypes2.default.string.isRequired,
  color: _propTypes2.default.string,
  url: _propTypes2.default.string,
  portrait: _propTypes2.default.boolean,
  landscape: _propTypes2.default.boolean
};