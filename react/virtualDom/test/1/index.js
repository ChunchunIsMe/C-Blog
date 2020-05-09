
function view() {
  return (
    <div>
      Hello World
      <ul>
        <li id="1" class="li-1">
          第1
        </li>
      </ul>
    </div>
  )
}
function flatten(arr) {
  return Array.prototype.concat.call([], arr);
}

function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: flatten(children) || []
  }
}

function setProps(element, props) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      element.setAttribute(key, props[key]);
    }
  }
}

function createElement(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  const { tag, props, children } = vdom;

  // 1. 创建元素
  const element = document.createElement(tag);

  setProps(element, props);

  children.map(createElement).forEach(element.appendChild.bind(element));
  return element;
}

function render(parent) {
  const vdom = view();
  const element = createElement(vdom);
  parent.appendChild(element);
}