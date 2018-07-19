Object.defineProperty(exports, "__esModule", { value: !0 });
var _createClass = (function() {
    function e(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(e, o.key, o);
      }
    }
    return function(r, t, o) {
      return t && e(r.prototype, t), o && e(r, o), r;
    };
  })(),
  _react = require("react"),
  _react2 = _interopRequireDefault(_react),
  _propTypes = require("prop-types"),
  _propTypes2 = _interopRequireDefault(_propTypes),
  _iphonex = require("./build/iphonex"),
  _iphonex2 = _interopRequireDefault(_iphonex),
  _iphone = require("./build/iphone8"),
  _iphone2 = _interopRequireDefault(_iphone),
  _iphone8plus = require("./build/iphone8plus"),
  _iphone8plus2 = _interopRequireDefault(_iphone8plus),
  _iphone5s = require("./build/iphone5s"),
  _iphone5s2 = _interopRequireDefault(_iphone5s),
  _iphone5c = require("./build/iphone5c"),
  _iphone5c2 = _interopRequireDefault(_iphone5c),
  _iphone4s = require("./build/iphone4s"),
  _iphone4s2 = _interopRequireDefault(_iphone4s),
  _ipad = require("./build/ipad"),
  _ipad2 = _interopRequireDefault(_ipad),
  _macbookpro = require("./build/macbookpro"),
  _macbookpro2 = _interopRequireDefault(_macbookpro),
  _nexus = require("./build/nexus5"),
  _nexus2 = _interopRequireDefault(_nexus),
  _galaxys = require("./build/galaxys5"),
  _galaxys2 = _interopRequireDefault(_galaxys),
  _galaxynote = require("./build/galaxynote8"),
  _galaxynote2 = _interopRequireDefault(_galaxynote),
  _htcone = require("./build/htcone"),
  _htcone2 = _interopRequireDefault(_htcone),
  _lumia = require("./build/lumia920"),
  _lumia2 = _interopRequireDefault(_lumia);
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function _classCallCheck(e, r) {
  if (!(e instanceof r)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(e, r) {
  if (!e) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return !r || ("object" !== typeof r && "function" !== typeof r) ? e : r;
}
function _inherits(e, r) {
  if ("function" !== typeof r && null !== r) {
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof r
    );
  }
  (e.prototype = Object.create(r && r.prototype, {
    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
  })),
  r &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : (e.__proto__ = r));
}
var Device = (function(e) {
  function r() {
    return (
      _classCallCheck(this, r),
      _possibleConstructorReturn(
        this,
        (r.__proto__ || Object.getPrototypeOf(r)).apply(this, arguments)
      )
    );
  }
  return (
    _inherits(r, _react.Component),
    _createClass(r, [
      {
        key: "getDevice",
        value: function(e) {
          var r = _react2.default.createElement(_iphonex2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            t = _react2.default.createElement(_iphone2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            o = _react2.default.createElement(_iphone8plus2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            i = _react2.default.createElement(_iphone5s2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            p = _react2.default.createElement(_iphone5c2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            n = _react2.default.createElement(_iphone4s2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            u = _react2.default.createElement(_ipad2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            l = _react2.default.createElement(_macbookpro2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            a = _react2.default.createElement(_nexus2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            s = _react2.default.createElement(_galaxys2.default, {
              color: this.props.color,
              site: this.props.url
            }),
            c = _react2.default.createElement(_galaxynote2.default, {
              color: this.props.color,
              site: this.props.url
            });
          return "iphone-x" === e
            ? r
            : "iphone-8" === e
              ? t
              : "iphone-8plus" === e
                ? o
                : "iphone-5s" === e
                  ? i
                  : "iphone-5c" === e
                    ? p
                    : "iphone-4s" === e
                      ? n
                      : "ipad-mini" === e
                        ? u
                        : "macbook-pro" === e
                          ? l
                          : "htc-one" === e
                            ? htcone
                            : "nexus-5" === e
                              ? a
                              : "galaxy-s5" === e
                                ? s
                                : "galaxy-note8" === e
                                  ? c
                                  : void 0;
        }
      },
      {
        key: "render",
        value: function() {
          return this.getDevice(this.props.name);
        }
      }
    ]),
    r
  );
})();
(exports.default = Device),
(Device.propTypes = {
  name: _propTypes2.default.string.isRequired,
  color: _propTypes2.default.string,
  url: _propTypes2.default.string
});
