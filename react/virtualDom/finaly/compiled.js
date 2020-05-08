"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function h(tag, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  children = children || [];
  children = children.flat(2);
  return {
    tag: tag,
    props: props || {},
    children: children
  };
}

var arr = [0, 1, 2, 3, 4, 5];

function view() {
  return h("div", null, "hello,world", h("ul", null, arr.map(function (item) {
    return h("li", {
      id: "item",
      "class": "li-".concat(item)
    }, item * arr.length);
  })));
}

function setProps(dom, props) {
  // 让后续更好操作
  dom._props = props;

  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      var value = props[key];
      dom.setAttribute(key, value);
    }
  }
}

function createElement(vdom) {
  if (typeof vdom === 'number' || typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }

  var tag = vdom.tag,
      props = vdom.props,
      children = vdom.children;
  var dom = document.createElement(tag);
  setProps(dom, props);
  children.map(createElement).forEach(dom.appendChild.bind(dom));
  return dom;
}

function render(target) {
  var vdom = view();
  var dom = createElement(vdom);
  target.appendChild(dom);
  task(target);
}

function task(target) {
  var time = window.setInterval(function () {
    arr.push(arr.length);
    var newVdom = view();
    diff(target.firstChild, newVdom, target);

    if (arr.length >= 20) {
      window.clearInterval(time);
    }
  }, 500);
}

function isSameType(dom, newVdom) {
  if (dom.nodeType === Node.TEXT_NODE && (typeof newVdom === 'string' || typeof newVdom === 'number')) {
    return String(dom.nodeValue) === String(newVdom);
  }

  if (dom.nodeType === Node.ELEMENT_NODE) {
    return dom.nodeName.toLocaleLowerCase() === newVdom.tag;
  }

  return false;
}

function diffProps(dom, newVdom) {
  var newProps = _objectSpread(_objectSpread({}, dom._props), newVdom.props);

  for (var key in newProps) {
    if (newProps.hasOwnProperty(key)) {
      if (newVdom.props[key] === undefined) {
        dom.removeAttribute(key);
      } else {
        dom.setAttribute(key, newProps[key]);
      }
    }
  }
}

function diffChild(dom, newVdom, parent) {
  var children = dom.childNodes,
      childLength = children.length;
  var newChildren = newVdom.children;
  var newChildLength = newChildren.length;
  var vLength = Math.max(childLength, newChildLength);

  for (var i = 0; i < vLength; i++) {
    diff(children[i], newChildren[i], parent);
  }
}

function diff(dom, newVdom, parent) {
  // 如果传入 dom 不存在那就是新增
  if (dom === undefined || dom === null) {
    parent.appendChild(createElement(newVdom));
    return;
  } // 如果传入 newVdom 不存在那就是删除


  if (newVdom === undefined || newVdom === null) {
    parent.removeChild(dom);
    return;
  } // 如果类型不同那就是直接替换节点


  if (!isSameType(dom, newVdom)) {
    parent.replaceChild(createElement(newVdom), dom);
    return;
  } // 如果类型相同则对比子节点


  if (dom.nodeName.toLocaleLowerCase() === newVdom.tag) {
    diffProps(dom, newVdom);
    diffChild(dom, newVdom, dom);
    return;
  } // 如果是文本节点类型相同则不动


  return;
}
