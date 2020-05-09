"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ATTR_KEY = '__preprops_';
var state = {
  num: 5
};
var timer; // Component

var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
    this.state = {};
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(state) {
      this.state = _objectSpread(_objectSpread({}, this.state), state);
      var vdom = this.render();
      diff(this.dom, vdom, this.parent);
    }
  }, {
    key: "render",
    value: function render() {
      throw new Error('Component must have render');
    }
  }]);

  return Component;
}();

var MyComp = /*#__PURE__*/function (_Component) {
  _inherits(MyComp, _Component);

  var _super = _createSuper(MyComp);

  function MyComp(props) {
    var _this;

    _classCallCheck(this, MyComp);

    _this = _super.call(this, props);
    _this.state = {
      name: 'Tian'
    };
    return _this;
  }

  _createClass(MyComp, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return h("div", null, h("div", null, "This is My Component! ", this.props.count), h("div", {
        onClick: function onClick() {
          console.log(_this2.state.name);
        }
      }, "name: ", this.state.name));
    }
  }]);

  return MyComp;
}(Component); // 展示DOM


var arr = [0, 1, 2, 3, 4];

function view() {
  var elm = arr.pop(); // 用于测试能不能正常删除元素

  if (state.num !== 9) arr.unshift(elm); // 用于测试能不能正常添加元素

  if (state.num === 12) arr.push(9);
  return h("div", null, "Hello World", h(MyComp, {
    count: state.num
  }), h("ul", {
    myText: "dickens"
  }, arr.map(function (i) {
    return h("li", {
      id: i,
      "class": "li-".concat(i),
      key: i
    }, "\u7B2C", i);
  })));
}

function flatten(arr) {
  return Array.prototype.concat.call([], arr);
}

function h(tag, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var newChild = children.flat(Infinity);
  return {
    tag: tag,
    props: props || {},
    children: flatten(newChild) || []
  };
}

function createElement(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom);
  }

  var tag = vdom.tag,
      props = vdom.props,
      children = vdom.children; // 1. 创建元素

  var element = document.createElement(tag);
  setProps(element, props);
  children.map(function (vChild) {
    diff(undefined, vChild, element);
  });
  return element;
} // diff 算法


function evtProxy(evt) {
  this._eventListeners[evt.type](evt);
}

function setProps(element, props) {
  element[ATTR_KEY] = props;

  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      if (key.slice(0, 2) === 'on') {
        var event = key.slice(2).toLocaleLowerCase();
        element.addEventListener(event, evtProxy);
        (element._eventListeners || (element._eventListeners = {}))[event] = props[key];
      } else {
        element.setAttribute(key, props[key]);
      }
    }
  }
}

function diffProps(newVDom, element) {
  var allProps = _objectSpread(_objectSpread({}, element[ATTR_KEY]), newVDom.props);

  Object.keys(allProps).forEach(function (key) {
    var oldValue = element[ATTR_KEY][key];
    var newValue = newVDom.props[key];

    if (key.slice(0, 2) === 'on') {
      var event = key.slice(2);

      if (newValue) {
        element.addEventListener(event, evtProxy);
      } else {
        element.removeEventListener(event, evtProxy);
      }

      (element._eventListeners || (element._eventListeners = {}))[event] = newValue;
    } else {
      if (newValue === undefined) {
        element.removeAttribute(key);
        delete element[ATTR_KEY][key];
      } else if (oldValue === undefined || oldValue !== newValue) {
        element.setAttribute(key, newValue);
        element[ATTR_KEY][key] = newValue;
      }
    }
  });
}

function diffChildren(newVDom, parent) {
  var nodesWithKey = {};
  var nodesWithKeyCount = 0;
  var nodesWithoutKey = [];
  var nodesWithoutKeyCount = 0;
  var childNodes = parent.childNodes,
      nodeLength = childNodes.length;
  var vChildren = newVDom.children,
      vLength = vChildren.length;
  var min = 0;

  for (var i = 0; i < nodeLength; i++) {
    var child = childNodes[i],
        props = child[ATTR_KEY];

    if (props !== undefined && props.key !== undefined) {
      nodesWithKey[props.key] = child;
      nodesWithKeyCount++;
    } else {
      nodesWithoutKey[nodesWithoutKeyCount++] = child;
    }
  }

  for (var _i = 0; _i < vLength; _i++) {
    var vChild = vChildren[_i],
        vProps = vChild.props;
    var dom = void 0;
    var vKey = vProps !== undefined ? vProps.key : undefined;

    if (vKey !== undefined) {
      if (nodesWithKeyCount && nodesWithKey[vKey] !== undefined) {
        dom = nodesWithKey[vKey];
        delete nodesWithKey[vKey];
        nodesWithKeyCount--;
      }
    } else if (min < nodesWithoutKeyCount) {
      for (var j = 0; j < nodesWithoutKeyCount; j++) {
        var element = nodesWithoutKey[j];

        if (element !== undefined && isSameType(element, vChild)) {
          dom = element;
          nodesWithoutKey[j] = undefined;

          if (j === min) {
            min++;
          }

          if (j === nodesWithoutKeyCount - 1) {
            nodesWithoutKeyCount--;
          }

          break;
        }
      }
    }

    var isUpdate = diff(dom, vChild, parent);

    if (isUpdate) {
      var originChild = childNodes[_i];

      if (originChild !== dom) {
        parent.insertBefore(dom, originChild);
      }
    }
  }

  if (nodesWithKeyCount) {
    for (var key in nodesWithKey) {
      if (nodesWithKey.hasOwnProperty(key)) {
        var _element = nodesWithKey[key];
        parent.removeChild(_element);
      }
    }
  }

  while (min <= nodesWithoutKeyCount) {
    var node = nodesWithoutKey[nodesWithoutKeyCount--];

    if (node !== undefined) {
      node.parentNode.removeChild(node);
    }
  }
}

function isSameType(element, newVDom) {
  var elmType = element.nodeType;

  var vdomType = _typeof(newVDom);

  if (typeof newVDom.tag === 'function') {
    return element._constructor === newVDom.tag;
  }

  if (elmType === Node.TEXT_NODE && (vdomType === 'string' || vdomType === 'number') && String(element.nodeValue) === String(newVDom)) {
    return true;
  }

  if (elmType === Node.ELEMENT_NODE && element.tagName.toLowerCase() === newVDom.tag) {
    return true;
  }

  return false;
}

function getVDomProps(vdom) {
  var props = vdom.props;
  props.children = vdom.children;
  return props;
}

function buildComponentFromVDom(dom, vdom, parent) {
  var cpnt = vdom.tag;

  if (typeof cpnt !== 'function') {
    throw new Error('vdom is not a function');
  }

  var componentInst = dom && dom._component;
  var props = getVDomProps(vdom);

  if (!componentInst) {
    componentInst = new cpnt(props);
    setTimeout(function () {
      componentInst.setState({
        name: 'lisa'
      });
    }, 5000);
  } else {
    componentInst.props = props;
  }

  var componentVDom = componentInst.render();
  diff(dom, componentVDom, parent, componentInst);
}

function diff(element, newVDom, parent, componentInst) {
  if (_typeof(newVDom) === 'object' && newVDom !== null && typeof newVDom.tag === 'function') {
    buildComponentFromVDom(element, newVDom, parent);
    return false;
  }

  if (element === undefined) {
    var nextDom = createElement(newVDom);

    if (componentInst) {
      nextDom._component = componentInst;
      nextDom._constructor = componentInst.constructor;
      componentInst.dom = nextDom;
    }

    parent.appendChild(nextDom);
    return false;
  }

  if (newVDom === undefined) {
    parent.removeChild(element);
    return false;
  }

  if (!isSameType(element, newVDom)) {
    parent.replaceChild(createElement(newVDom), element);
    return false;
  }

  if (element.nodeType === Node.ELEMENT_NODE) {
    diffProps(newVDom, element);
    diffChildren(newVDom, element);
  }

  return true;
}

function tick(element) {
  if (state.num > 20) {
    clearInterval(timer);
    return;
  }

  var newVDom = view();
  diff(element.firstChild, newVDom, element);
}

function render(element) {
  var vdom = view();
  var dom = createElement(vdom);
  element.appendChild(dom);
  timer = window.setInterval(function () {
    state.num += 1;
    tick(element);
  }, 500);
}
