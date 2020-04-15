// ForEach就是很经典的桥接应用，下面是模拟的ForEach实现,这里Foreach作为桥梁将函数fn的行为和arr数组进行联通

function ForEach(arr, fn) {
  if (!Array.isArray(arr)) {
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    fn(element)
  }
}
