function h(tag, props, ...children) {
  children = children || [];
  children = children.flat(2);
  return {
    tag,
    props: props || {},
    children: children
  }
}
const arr = [0, 1, 2, 3, 4, 5]
function view() {
  return (
    <div>
      hello,world
      <ul>
        {
          arr.map(item => (
            <li id="item" class={`li-${item}`}>{item * arr.length}</li>
          ))
        }
      </ul>
    </div>
  )
}

function setProps(dom, props) {
  // 让后续更好操作
  dom._props = props;
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
  children.map(createElement).forEach(dom.appendChild.bind(dom))
  return dom;
}

function render(target) {
  const vdom = view();
  const dom = createElement(vdom);
  target.appendChild(dom);
  task(target);
}

function task(target) {
  const time = window.setInterval(() => {
    arr.push(arr.length);
    const newVdom = view();
    diff(target.firstChild, newVdom, target);
    if (arr.length >= 20) {
      window.clearInterval(time);
    }
  }, 500)
}

function isSameType(dom, newVdom) {
  if (dom.nodeType === Node.TEXT_NODE && (typeof newVdom === 'string' || typeof newVdom === 'number')) {
    return String(dom.nodeValue) === String(newVdom)
  }
  if (dom.nodeType === Node.ELEMENT_NODE) {
    return dom.nodeName.toLocaleLowerCase() === newVdom.tag;
  }
  return false;
}

function diffProps(dom, newVdom) {
  const newProps = { ...dom._props, ...newVdom.props };
  for (const key in newProps) {
    if (newProps.hasOwnProperty(key)) {
      if (newVdom.props[key] === undefined) {
        dom.removeAttribute(key)
      } else {
        dom.setAttribute(key, newProps[key])
      }
    }
  }
}

function diffChild(dom, newVdom, parent) {
  const children = dom.childNodes,
    childLength = children.length;
  const { children: newChildren } = newVdom;
  const newChildLength = newChildren.length;
  const vLength = Math.max(childLength, newChildLength);
  for (let i = 0; i < vLength; i++) {
    diff(children[i], newChildren[i], parent);
  }
}

function diff(dom, newVdom, parent) {
  // 如果传入 dom 不存在那就是新增
  if (dom === undefined || dom === null) {
    parent.appendChild(createElement(newVdom))
    return;
  }
  // 如果传入 newVdom 不存在那就是删除
  if (newVdom === undefined || newVdom === null) {
    parent.removeChild(dom);
    return;
  }
  // 如果类型不同那就是直接替换节点
  if (!isSameType(dom, newVdom)) {
    parent.replaceChild(createElement(newVdom), dom);
    return;
  }
  // 如果类型相同则对比子节点
  if (dom.nodeName.toLocaleLowerCase() === newVdom.tag) {
    diffProps(dom, newVdom);
    diffChild(dom, newVdom, dom);
    return;
  }
  // 如果是文本节点类型相同则不动
  return;
}