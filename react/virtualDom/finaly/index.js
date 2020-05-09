function h(tag, props, ...children) {
  children = children || [];
  children = children.flat(2);
  return {
    tag,
    props: props || {},
    children: children
  }
}
let arr = [0, 1, 2, 3, 4, 5]
function view() {
  return (
    <div>
      hello,world
      <ul>
        {
          arr.map(item => (
            <li id="item" key={item} class={`li-${item}`}>{item * arr.length}</li>
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
    if (arr[0] === 0) {
      arr.push(arr.length);
    } else {
      arr.unshift(arr.length)
    }
    arr = arr.reverse();
    const newVdom = view();
    diff(target.firstChild, newVdom, target);
    if (arr.length >= 10) {
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
  const withKey = {}, withOutKey = [];
  // 这里 min 主要就是为了减少循环次数用的
  let withOutKeyCount = 0, min = 0;

  // 循环现有 dom 的子节点 将节点分为带 key 的和不带 key 的
  for (let i = 0; i < childLength; i++) {
    const dom = children[i];
    const eleKey = dom._props ? dom._props.key : undefined;
    if (eleKey === undefined) {
      withOutKey.push(dom);
      withOutKeyCount++;
    } else {
      withKey[eleKey] = dom;
    }
  }

  // 循环传过来的 vDom 的子 vDom
  for (let i = 0; i < newChildLength; i++) {
    const newVdom = newChildren[i];
    const dom = children[i];
    const vKey = newVdom.props ? newVdom.props.key : undefined;
    // 这个sameDom 是为了将找到的现有和循环到的Vdom相似的dom储存起来,然后在进行diff操作
    let sameDom;

    // 将子 vDOm 分为两类一类带 key 一类不带 key
    if (vKey !== undefined) {
      // 如果现有的dom中有相同key的dom则将其赋值给sameDom并将其在withKey对象中删除
      if (withKey[vKey] !== undefined) {
        sameDom = withKey[vKey];
        withKey[vKey] = undefined;
      }
    } else {
      // 循环不带 key 的现有 dom
      for (let j = min; j < withOutKeyCount; j++) {
        // 找到类似的 现有dom
        if (isSameType(withOutKey[j], newVdom)) {
          // 赋值给 sameDom 然后将其在 withOutKey 所占的位置置为 undefined
          sameDom = withOutKey[j];
          withOutKey[j] = undefined;
          // 下面都是为了减少循环进行的操作
          if (j === min) {
            min++;
          }
          if (j === withOutKeyCount - 1) {
            withOutKeyCount--;
          }
          break;
        }
      }
    }

    // 当存在 key 的 vdom 没有找到 sameDom 的时候需要给他找到它新增节点的位置
    // 如果使用 diff 增加的话这种情况的 vdom 永远都会加到父节点的最后面

    if (vKey !== undefined && sameDom === undefined) {
      parent.insertBefore(createElement(newVdom), dom)
      continue;
    }
    // 将找到的相似的 sameDomm 和 vdom 进行 diff
    const isUpdate = diff(sameDom, newVdom, parent);
    // 如果需要换位置就使用下面的操作
    if (!isUpdate || isUpdate.nodeType) {
      // 如果 isUpdate 是个节点说明发生了 key 相同但是 tag 不同的情况需要将它调整位置
      if (isUpdate.nodeType) {
        sameDom = isUpdate;
      }
      // 如果已经在那个操作就不用换了，如果不是正确的位置就需要换位置
      if (dom && dom !== sameDom) {
        parent.insertBefore(sameDom, dom);
      }
    }
  }
  
  // 经过上面的操作新的 vdom 已经在页面上了，没匹配到的 dom 说明是删除的需要全部删除

  // 删除多余的带 key 的节点
  for (const key in withKey) {
    if (withKey.hasOwnProperty(key)) {
      const element = withKey[key];
      if (element !== undefined) {
        parent.removeChild(element);
      }
    }
  }

  // 删除多余的不带 key 的节点
  while (min < withOutKeyCount) {
    const element = withOutKey[--withOutKeyCount];
    if (element !== undefined) {
      parent.removeChild(element);
    }
  }
}


function diff(dom, newVdom, parent) {
  // 如果传入 dom 不存在那就是新增
  if (dom === undefined || dom === null) {
    parent.appendChild(createElement(newVdom))
    return true;
  }
  // 如果传入 newVdom 不存在那就是删除
  if (newVdom === undefined || newVdom === null) {
    parent.removeChild(dom);
    return true;
  }
  // 如果类型不同那就是直接替换节点
  if (!isSameType(dom, newVdom)) {
    // 如果存在key相同但是tag不同的就会出现直接替换node的操作这个时候需要将 node 导出调整位置
    const node = createElement(newVdom)
    parent.replaceChild(node, dom);
    return node;
  }
  // 如果类型相同则对比子节点
  if (dom.nodeName.toLocaleLowerCase() === newVdom.tag) {
    diffProps(dom, newVdom);
    diffChild(dom, newVdom, dom);
  }
  // 如果是文本节点类型相同则不动
  return false;
}