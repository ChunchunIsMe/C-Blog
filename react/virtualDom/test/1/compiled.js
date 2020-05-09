"use strict";

function view() {
  return h("div", null, "Hello World", h("ul", null, h("li", {
    id: "1",
    "class": "li-1"
  }, "\u7B2C1")));
}

function flatten(arr) {
  return Array.prototype.concat.call([], arr);
}

function h(tag, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    props: props || {},
    children: flatten(children) || []
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
}

function render(parent) {
  var vdom = view();
  var element = createElement(vdom);
  parent.appendChild(element);
}
