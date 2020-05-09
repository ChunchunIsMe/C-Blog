const nodePatchTypes = {
  CREATE: 'create node',
  REMOVE: 'remove node',
  REPLACE: 'replace node',
  UPDATE: 'update node'
}

const propPatchTypes = {
  REMOVE: 'remove prop',
  UPDATE: 'update prop'
}

let state = { num: 5 };
let timer;
let preVDom;

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

function diffProps(oldVDom, newVDom) {
  const patches = [];
  const allProps = { ...oldVDom.props, ...newVDom.props };
  Object.keys(allProps).forEach(key => {
    const oldValue = oldVDom.props[key];
    const newValue = newVDom.props[key];
    if (newValue === undefined) {
      patches.push({
        type: propPatchTypes.REMOVE,
        key
      })
    } else if (oldValue === undefined || oldValue !== newValue) {
      patches.push({
        type: propPatchTypes.UPDATE,
        key,
        value: newValue
      })
    }
  })
  return patches;
}

function diffChildren(oldVDom, newVDom) {
  const patches = [];

  const childrenLength = Math.max(oldVDom.children.length, newVDom.children.length)

  for (let i = 0; i < childrenLength; i++) {
    patches.push(diff(oldVDom.children[i], newVDom.children[i]))
  }
  return patches;
}

function diff(oldVDom, newVDom) {
  if (oldVDom === undefined) {
    return {
      type: nodePatchTypes.CREATE,
      vdom: newVDom
    }
  }

  if (newVDom === undefined) {
    return {
      type: nodePatchTypes.REMOVE
    }
  }

  if (
    typeof oldVDom !== typeof newVDom ||
    ((typeof oldVDom === 'string' || typeof oldVDom === 'number') && oldVDom !== newVDom) ||
    oldVDom.tag !== newVDom.tag
  ) {
    return {
      type: nodePatchTypes.REPLACE,
      vdom: newVDom
    }
  }

  if (oldVDom.tag) {
    const propsDiff = diffProps(oldVDom, newVDom);
    const childrenDiff = diffChildren(oldVDom, newVDom);

    if (propsDiff.length > 0 || childrenDiff.some(patchObj => (patchObj !== undefined))) {
      return {
        type: nodePatchTypes.UPDATE,
        props: propsDiff,
        children: childrenDiff
      }
    }
  }
}

// tick
function patchProps(element, props) {
  if (!props) {
    return;
  }
  props.forEach(item => {
    if (item.type === propPatchTypes.REMOVE) {
      element.removeAttribute(item.key);
    } else if (item.type === propPatchTypes.UPDATE) {
      element.setAttribute(item.key, item.value);
    }
  })
}

function patch(parent, patchObj, index = 0) {
  if (!patchObj) {
    return;
  }
  if (patchObj.type === nodePatchTypes.CREATE) {
    return parent.appendChild(createElement(patchObj.vdom))
  }
  const element = parent.childNodes[index];
  if (patchObj.type === nodePatchTypes.REMOVE) {
    return parent.removeChild(element);
  }
  if (patchObj.type === nodePatchTypes.REPLACE) {
    return parent.replaceChild(createElement(patchObj.vdom), element)
  }
  if (patchObj.type === nodePatchTypes.UPDATE) {
    const { props, children } = patchObj;
    patchProps(element, props);
    children.forEach((patchObj, i) => {
      patch(element, patchObj, i)
    })
  }
}



function tick(element) {
  if (state.num > 20) {
    clearInterval(timer);
    return;
  }
  const newVDom = view();
  const patchObj = diff(preVDom, newVDom);
  patch(element, patchObj);
  preVDom = newVDom;
}

function render(element) {
  const vdom = view();
  preVDom = vdom;
  const dom = createElement(vdom);
  element.appendChild(dom);

  timer = window.setInterval(() => {
    state.num += 1;
    tick(element);
  }, 500)
}



