// 代理模式一般有两种用途

// 1. 用于图片懒加载

var myImage = function () {
  var imgNode = document.createElement('img');
  document.append(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
}

var proxyImg = (function () {
  var img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('./img.png');
      img.src = src;
    }
  }
})()

// 2. 进行缓存代理

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

function multiply() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result *= arguments[i];
  }
  return result;
}

function proxyFunc(fn) {
  var cache = {};
  return function () {
    var cacheKey = arguments.join(',')
    if (cacheKey in cache) {
      return cache[cacheKey]
    }
    return cache[cacheKey] = fn.apply(this, arguments);
  }
}