const ATTR_KEY = '__preprops_';
let state = { num: 5 };
let timer;

// Component
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    const vdom = this.render();
    diff(this.dom, vdom, this.parent)
  }

  render() {
    throw new Error('Component must have render')
  }
}

class MyComp extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Tian' }
  }

  render() {
    return (
      <div>
        <div>This is My Component! {this.props.count}</div>
        <div>name: {this.state.name}</div>
      </div>
    )
  }
}

// 展示DOM
const arr = [0, 1, 2, 3, 4];
function view() {
  const elm = arr.pop();
  // 用于测试能不能正常删除元素
  if (state.num !== 9) arr.unshift(elm);

  // 用于测试能不能正常添加元素
  if (state.num === 12) arr.push(9);
  return (
    <div>
      Hello World
      <MyComp count={state.num} />
      <ul myText="dickens">
        {
          arr.map(i => (
            <li id={i} class={`li-${i}`} key={i}>
              第{i}
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

  children.map((vChild) => {
    diff(undefined, vChild, element)
  })
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
  let nodesWithoutKeyCount = 0;
  const childNodes = parent.childNodes,
    nodeLength = childNodes.length;
  const vChildren = newVDom.children,
    vLength = vChildren.length;

  let min = 0;

  for (let i = 0; i < nodeLength; i++) {
    const child = childNodes[i],
      props = child[ATTR_KEY];
    if (props !== undefined && props.key !== undefined) {
      nodesWithKey[props.key] = child;
      nodesWithKeyCount++;
    } else {
      nodesWithoutKey[nodesWithoutKeyCount++] = child
    }
  }

  for (let i = 0; i < vLength; i++) {
    const vChild = vChildren[i],
      vProps = vChild.props;
    let dom;
    const vKey = vProps !== undefined ? vProps.key : undefined;
    if (vKey !== undefined) {
      if (nodesWithKeyCount && nodesWithKey[vKey] !== undefined) {
        dom = nodesWithKey[vKey];
        delete nodesWithKey[vKey];
        nodesWithKeyCount--;
      }
    } else if (min < nodesWithoutKeyCount) {
      for (let j = 0; j < nodesWithoutKeyCount; j++) {
        const element = nodesWithoutKey[j];
        if (element !== undefined && isSameType(element, vChild)) {
          dom = element;
          nodesWithoutKey[j] = undefined;
          if (j === min) {
            min++
          }
          if (j === nodesWithoutKeyCount - 1) {
            nodesWithoutKeyCount--
          }
          break;
        }
      }
    }
    const isUpdate = diff(dom, vChild, parent);
    if (isUpdate) {
      const originChild = childNodes[i];
      if (originChild !== dom) {
        parent.insertBefore(dom, originChild);
      }
    }
  }
  if (nodesWithKeyCount) {
    for (const key in nodesWithKey) {
      if (nodesWithKey.hasOwnProperty(key)) {
        const element = nodesWithKey[key];
        parent.removeChild(element);
      }
    }
  }
  while (min <= nodesWithoutKeyCount) {
    const node = nodesWithoutKey[nodesWithoutKeyCount--];
    if (node !== undefined) {
      node.parentNode.removeChild(node);
    }
  }
}

function isSameType(element, newVDom) {
  const elmType = element.nodeType;
  const vdomType = typeof newVDom;
  if (typeof newVDom.tag === 'function') {
    return element._constructor === newVDom.tag;
  }
  if (
    elmType === Node.TEXT_NODE &&
    (vdomType === 'string' || vdomType === 'number') &&
    String(element.nodeValue) === String(newVDom)
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

function getVDomProps(vdom) {
  const props = vdom.props;
  props.children = vdom.children;
  return props;
}

function buildComponentFromVDom(dom, vdom, parent) {
  const cpnt = vdom.tag;
  if (typeof cpnt !== 'function') {
    throw new Error('vdom is not a function')
  }
  let componentInst = dom && dom._component;
  const props = getVDomProps(vdom);
  if (!componentInst) {
    componentInst = new cpnt(props);
    setTimeout(() => { componentInst.setState({ name: 'lisa' }) }, 5000);
  } else {
    componentInst.props = props;
  }
  const componentVDom = componentInst.render();
  diff(dom, componentVDom, parent, componentInst);
}

function diff(element, newVDom, parent, componentInst) {
  if (typeof newVDom === 'object' && newVDom !== null && typeof newVDom.tag === 'function') {
    buildComponentFromVDom(element, newVDom, parent);
    return false;
  }
  if (element === undefined) {
    const nextDom = createElement(newVDom);
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
  const newVDom = view();
  diff(element.firstChild, newVDom, element);
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



