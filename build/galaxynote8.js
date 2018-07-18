"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./devices.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var galaxynote8 = function (_Component) {
  _inherits(galaxynote8, _Component);

  function galaxynote8() {
    _classCallCheck(this, galaxynote8);

    return _possibleConstructorReturn(this, (galaxynote8.__proto__ || Object.getPrototypeOf(galaxynote8)).apply(this, arguments));
  }

  _createClass(galaxynote8, [{
    key: "render",
    value: function render() {
      var color = void 0;
      this.props.color ? color = this.props.color : color = "black";

      return _react2.default.createElement(
        "div",
        { className: "marvel-device note8" },
        _react2.default.createElement("div", { className: "inner" }),
        _react2.default.createElement(
          "div",
          { className: "overflow" },
          _react2.default.createElement("div", { className: "shadow" })
        ),
        _react2.default.createElement("div", { className: "speaker" }),
        _react2.default.createElement("div", { className: "sensors" }),
        _react2.default.createElement("div", { className: "more-sensors" }),
        _react2.default.createElement("div", { className: "sleep" }),
        _react2.default.createElement("div", { className: "volume" }),
        _react2.default.createElement("div", { className: "camera" }),
        _react2.default.createElement(
          "div",
          { className: "screen" },
          _react2.default.createElement("iframe", { src: this.props.url })
        )
      );
    }
  }]);

  return galaxynote8;
}(_react.Component);

exports.default = galaxynote8;


galaxynote8.propTypes = {
  color: _propTypes2.default.string,
  url: _propTypes2.default.string
};