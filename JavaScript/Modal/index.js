function isScrollDisplay(ele) {
  try {
    const scrollbarStyle = window.getComputedStyle(ele, '::-webkit-scrollbar');
    return (
      !scrollbarStyle || scrollbarStyle.getPropertyValue('display') !== 'none'
    )
  } catch (error) { }
  return true;
}

function getScroll() {
  const dom = document.createElement('div');
  dom.setAttribute('style', 'width:100px;height:100px;position:absolute;top:-900px;overflow:scroll;');
  document.body.appendChild(dom);
  const width = dom.offsetWidth - dom.clientWidth;
  const height = dom.offsetHeight - dom.clientHeight;
  document.body.removeChild(dom);
  return {
    width,
    height
  }
}

function hasScroll() {
  const doc = document.documentElement;
  return (
    doc.scrollHeight > doc.clientHeight &&
    getScroll().width > 0 &&
    isScrollDisplay(doc) && isScrollDisplay(document.body)
  )
}

function outerClose() {
  if (Modal.modalList.length === 0) {
    document.body.removeChild(Modal.outer);
    document.body.style.overflow = 'auto';
    let padding = window.getComputedStyle(document.body, 'padding-right');
    if (hasScroll()) {
      const scrollWidth = getScroll().width;
      padding -= scrollWidth;
    }
    document.body.style.paddingRight = padding + 'px';
    Modal.show = false;
  }
}
const dom = document.createElement('div')
function Modal({
  children = dom,
  onOk = () => { },
  onClose = () => { },
  title = 'title(点我关闭)',
  width = 280,
  height = 200,
  zIndex = 10
}) {
  if (Modal.outer == null) {
    const outer = document.createElement('div');
    outer.setAttribute('style',
      `position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.6);z-index:${zIndex}`)
    Modal.outer = outer;
    if (isScrollDisplay(document.body)) {
      let padding = window.getComputedStyle(document.body, 'padding-right');
      if (hasScroll()) {
        const scrollWidth = getScroll().width;
        padding += scrollWidth;
      }
      document.body.style.paddingRight = padding + 'px';
      document.body.style.overflow = 'hidden';
    }
  } else {
    const z = Modal.outer.style.zIndex;
    if (zIndex != z) {
      Modal.outer.style.zIndex = zIndex;
    }
  }

  if(!Modal.show) {
    document.body.appendChild(Modal.outer);
    Modal.show = true;
  }


  const wrap = document.createElement('div');
  const header = document.createElement('div');
  const mid = document.createElement('div');
  const footer = document.createElement('div');
  const list = Modal.modalList;
  const index = list.length;
  if (list.length) {
    list.push({
      zIndex: list[list.length - 1].zIndex + 1
    });
  } else {
    list.push({
      zIndex: 1
    });
  }
  wrap.setAttribute('style',
    `display:flex;flex-direction:column;width:${width}px;height:${height}px;
    z-index:${list[list.length - 1].zIndex};background-color:white;
    position:absolute;top:40%;left:50%;margin-left:-${width / 2}px`
  );
  header.setAttribute('style', 'display:flex;width:100%;height:50px;align-items:center;');
  mid.setAttribute('style', 'flex:1;overflow:auto;');
  footer.setAttribute('style', 'display:flex;width:100%;height:50px;align-items:center;');
  header.innerText = title;
  footer.innerText = 'footer(点我关闭)';
  wrap.appendChild(header);
  mid.appendChild(children);
  wrap.appendChild(mid);
  wrap.appendChild(footer);
  list[list.length - 1].wrap = wrap;
  function wrapClose() {
    Modal.outer.removeChild(wrap);
    Modal.modalList.splice(index, 1);
    outerClose()
  }
  header.addEventListener('click', () => {
    wrapClose();
    onClose();
  })
  footer.addEventListener('click', () => {
    wrapClose();
    onOk();
  })
  Modal.outer.appendChild(wrap);
}

Modal.outer = null;
Modal.modalList = [];
Modal.show = false;