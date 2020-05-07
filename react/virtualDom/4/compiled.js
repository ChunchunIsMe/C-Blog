"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ATTR_KEY = '__preprops_';
var state = {
  num: 5
};
var timer; // 展示DOM

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
  element[ATTR_KEY] = props;

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


function diffProps(newVDom, element) {
  var allProps = _objectSpread(_objectSpread({}, element[ATTR_KEY]), newVDom.props);

  Object.keys(allProps).forEach(function (key) {
    var oldValue = element[ATTR_KEY][key];
    var newValue = newVDom.props[key];

    if (newValue === undefined) {
      element.removeAttribute(key);
      delete element[ATTR_KEY][key];
    } else if (oldValue === undefined || oldValue !== newValue) {
      element.setAttribute(key, newValue);
      element[ATTR_KEY][key] = newValue;
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
      _readOnlyError("nodesWithKey"), nodesWithKey++;
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
      if (nodesWithKeyCount && nodesWithKey[vkey] !== undefined) {
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

  if (elmType === Node.TEXT_NODE && (vdomType === 'string' || vdomType === 'number') && String(element.nodeValue) === String(newVDom)) {
    return true;
  }

  if (elmType === Node.ELEMENT_NODE && element.tagName.toLowerCase() === newVDom.tag) {
    return true;
  }

  return false;
}

function diff(element, newVDom, parent) {
  if (element === undefined) {
    parent.appendChild(createElement(newVDom));
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
