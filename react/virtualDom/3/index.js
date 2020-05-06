const ATTR_KEY = '__preprops_';
let state = { num: 5 };
let timer;

// 展示DOM

function view() {
  return (
    <div>
      Hello World
      <ul>
        {
          // 生成元素为0到n-1的数组
          [...Array(state.num).keys()]
            .map(i => (
              <li id={i} class={`li-${i}`}>
                第{i * state.num}
              </li>
            ))
        }
      </ul>
    </div>
  )
}

function flatten(arr) {
  return Array.prototype.concat.call([], arr);
}

function h(tag, props, ...children) {
  const newChild = children.flat(Infinity);
  return {
    tag,
    props: props || {},
    children: flatten(newChild) || []
  }
}

function setProps(element, props) {
  element[ATTR_KEY] = props;
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

// diff 算法

function diffProps(newVDom, element) {
  const allProps = { ...element[ATTR_KEY], ...newVDom.props };
  Object.keys(allProps).forEach(key => {
    const oldValue = element[ATTR_KEY][key];
    const newValue = newVDom.props[key];
    if (newValue === undefined) {
      element.removeAttribute(key);
      delete element[ATTR_KEY][key];
    } else if (oldValue === undefined || oldValue !== newValue) {
      element.setAttribute(key, newValue)
      element[ATTR_KEY][key] = newValue;
    }
  })

}

function diffChildren(newVDom, parent) {
  const nodesWithKey = {};
  let nodesWithKeyCount = 0;
  const nodesWithoutKey = [];
  const nodesWithoutKeyCount = 0;
  const childNodes = parent.childNodes,
    nodeLength = childNodes.length;
  const vChildren = newVDom.children;
  vLength = vChildren.length;

  let min = 0;

  for (let i = 0; i < nodeLength; i++) {
    const child = childNodes[i],
      props = child[ATTR_KEY];
    if (props !== undefined && props.key !== undefined) {
      nodesWithKey[props.key] = child;
    } else {
      nodesWithoutKey[nodesWithoutKeyCount++] = child
    }
  }
  // const childrenLength = Math.max(parent.childNodes.length, newVDom.children.length)

  // for (let i = 0; i < childrenLength; i++) {
  //   diff(newVDom.children[i], parent, i)
  // }
}

function isSameType(element, newVDom) {
  const elmType = element.nodeType;
  const vdomType = typeof newVDom;
  if (
    elmType === Node.TEXT_NODE &&
    (vdomType === 'string' || vdomType === 'number') &&
    element.nodeValue === newVDom
  ) {
    return true;
  }

  if (
    elmType === Node.ELEMENT_NODE &&
    element.tagName.toLowerCase() === newVDom.tag
  ) {
    return true;
  }

  return false;
}

function diff(newVDom, parent, index = 0) {
  const element = parent.childNodes[index];
  if (element === undefined) {
    parent.appendChild(createElement(newVDom));
    return;
  }
  if (newVDom === undefined) {
    parent.removeChild(element);
    return;
  }

  if (!isSameType(element, newVDom)) {
    parent.replaceChild(createElement(newVDom), element);
    return;
  }

  if (element.nodeType === Node.ELEMENT_NODE) {
    diffProps(newVDom, element);
    diffChildren(newVDom, element);
  }
}

function tick(element) {
  if (state.num > 20) {
    clearInterval(timer);
    return;
  }
  const newVDom = view();
  diff(newVDom, element);
}

function render(element) {
  const vdom = view();
  const dom = createElement(vdom);
  element.appendChild(dom);
  timer = window.setInterval(() => {
    state.num += 1;
    tick(element);
  }, 500)
}



