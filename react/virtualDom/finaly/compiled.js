"use strict";

function h(tag, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    props: props || {},
    children: children || []
  };
}

function view() {
  return h("div", null, "hello,world", h("ul", null, h("li", null, "1"), h("li", null, "2"), h("li", null, "3"), h("li", null, "4")));
}

function setProps(dom, props) {
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
  children.map(createElement).forEach(function (item) {
    dom.appendChild(item);
  });
  return dom;
}

function render(target) {
  var vdom = view();
  var dom = createElement(vdom);
  target.appendChild(dom);
}
