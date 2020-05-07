function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children || []
  }
}
function view() {
  return (
    <div>
      hello,world
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  )
}

function setProps(dom, props) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const value = props[key];
      dom.setAttribute(key, value)
    }
  }
}

function createElement(vdom) {
  if (typeof vdom === 'number' || typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }
  const { tag, props, children } = vdom;
  const dom = document.createElement(tag);
  setProps(dom, props);
  children.map(createElement).forEach((item) => {
    dom.appendChild(item)
  })
  return dom;
}

function render(target) {
  const vdom = view();
  const dom = createElement(vdom);
  target.appendChild(dom);
}