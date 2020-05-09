"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var nodePatchTypes = {
  CREATE: 'create node',
  REMOVE: 'remove node',
  REPLACE: 'replace node',
  UPDATE: 'update node'
};
var propPatchTypes = {
  REMOVE: 'remove prop',
  UPDATE: 'update prop'
};
var state = {
  num: 5
};
var timer;
var preVDom; // 展示DOM

function view() {
  return h("div", null, "Hello World", h("ul", null, // 生成元素为0到n-1的数组
  _toConsumableArray(Array(state.num).keys()).map(function (i) {
    return h("li", {
      id: i,
      "class": "li-".concat(i)
    }, "\u7B2C", i * state.num);
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

function setProps(element, props) {
  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      element.setAttribute(key, props[key]);
    }
  }
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
  children.map(createElement).forEach(element.appendChild.bind(element));
  return element;
} // diff 算法


function diffProps(oldVDom, newVDom) {
  var patches = [];

  var allProps = _objectSpread(_objectSpread({}, oldVDom.props), newVDom.props);

  Object.keys(allProps).forEach(function (key) {
    var oldValue = oldVDom.props[key];
    var newValue = newVDom.props[key];

    if (newValue === undefined) {
      patches.push({
        type: propPatchTypes.REMOVE,
        key: key
      });
    } else if (oldValue === undefined || oldValue !== newValue) {
      patches.push({
        type: propPatchTypes.UPDATE,
        key: key,
        value: newValue
      });
    }
  });
  return patches;
}

function diffChildren(oldVDom, newVDom) {
  var patches = [];
  var childrenLength = Math.max(oldVDom.children.length, newVDom.children.length);

  for (var i = 0; i < childrenLength; i++) {
    patches.push(diff(oldVDom.children[i], newVDom.children[i]));
  }

  return patches;
}

function diff(oldVDom, newVDom) {
  if (oldVDom === undefined) {
    return {
      type: nodePatchTypes.CREATE,
      vdom: newVDom
    };
  }

  if (newVDom === undefined) {
    return {
      type: nodePatchTypes.REMOVE
    };
  }

  if (_typeof(oldVDom) !== _typeof(newVDom) || (typeof oldVDom === 'string' || typeof oldVDom === 'number') && oldVDom !== newVDom || oldVDom.tag !== newVDom.tag) {
    return {
      type: nodePatchTypes.REPLACE,
      vdom: newVDom
    };
  }

  if (oldVDom.tag) {
    var propsDiff = diffProps(oldVDom, newVDom);
    var childrenDiff = diffChildren(oldVDom, newVDom);

    if (propsDiff.length > 0 || childrenDiff.some(function (patchObj) {
      return patchObj !== undefined;
    })) {
      return {
        type: nodePatchTypes.UPDATE,
        props: propsDiff,
        children: childrenDiff
      };
    }
  }
} // tick


function patchProps(element, props) {
  if (!props) {
    return;
  }

  props.forEach(function (item) {
    if (item.type === propPatchTypes.REMOVE) {
      element.removeAttribute(item.key);
    } else if (item.type === propPatchTypes.UPDATE) {
      element.setAttribute(item.key, item.value);
    }
  });
}

function patch(parent, patchObj) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!patchObj) {
    return;
  }

  if (patchObj.type === nodePatchTypes.CREATE) {
    return parent.appendChild(createElement(patchObj.vdom));
  }

  var element = parent.childNodes[index];

  if (patchObj.type === nodePatchTypes.REMOVE) {
    return parent.removeChild(element);
  }

  if (patchObj.type === nodePatchTypes.REPLACE) {
    return parent.replaceChild(createElement(patchObj.vdom), element);
  }

  if (patchObj.type === nodePatchTypes.UPDATE) {
    var props = patchObj.props,
        children = patchObj.children;
    patchProps(element, props);
    children.forEach(function (patchObj, i) {
      patch(element, patchObj, i);
    });
  }
}

function tick(element) {
  if (state.num > 20) {
    clearInterval(timer);
    return;
  }

  var newVDom = view();
  var patchObj = diff(preVDom, newVDom);
  patch(element, patchObj);
  preVDom = newVDom;
}

function render(element) {
  var vdom = view();
  preVDom = vdom;
  var dom = createElement(vdom);
  element.appendChild(dom);
  timer = window.setInterval(function () {
    state.num += 1;
    tick(element);
  }, 500);
}
