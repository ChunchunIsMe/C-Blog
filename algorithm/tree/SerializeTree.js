function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
}

function Serialize(pRoot) {
  // write code here
  if (pRoot == null) {
    return ''
  }
  const queue = [pRoot];
  let str = ''
  while (queue.length > 0) {
    const arr = [];
    const j = queue.length;
    for (let i = 0; i < j; i++) {
      if (queue[i] === '#') {
        arr.push('#');
      } else {
        arr.push(queue[i].val)
        if (queue[i].left == null) {
          queue.push('#');
        } else {
          queue.push(queue[i].left)
        }
        if (queue[i].right == null) {
          queue.push('#');
        } else {
          queue.push(queue[i].right)
        }
      }
    }
    queue.splice(0, j);
    str += arr.join(',') + '|';
  }
  return str;
}
function Deserialize(s) {
  // write code here
  if (!s) {
    return null;
  }
  const floor = s.split('|');
  const allVal = floor.map(item => item.split(',')).flat().map(item => item === '#' ? null : new TreeNode(item));
  for (let i = 0; i < allVal.length; i++) {
    if(allVal[i]==null) {
      continue;
    }
    allVal[i].left = allVal[2 * i + 1];
    allVal[i].right = allVal[2 * i + 2];
  }
  return allVal[0];
}

const a = { val: 1 }, b = { val: 2 }, c = { val: 3 }, d = { val: 4 }, e = { val: 5 }, f = { val: 6 }, g = { val: 7 };
a.left = b; a.right = c; b.left = d; b.right = e; c.left = f; c.right = g;

const str = Serialize(a);
console.log(str);
const nextA = Deserialize(str);
