## 打包产物分析
### 简单产物
#### 开始
如果我们要分析打包产物的话,我们肯定需要搭建环境的,首先初始化npm、再安装webpack
```
npm init -y
npm i webpack webpack-cli -D
```
然后在目录下随便写三个文件index.js、test.js、useTest.js
```
// index.js
console.log('aa');
// test.js
export default 'aa'
// useTest.js
import a from './test';
console.log(a);
```
再简单配置一下webpack.config.js
```
const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index.js'),
    useTest: path.resolve(__dirname, 'useTest.js')
  },
  output: {
    path: path.resolve(__dirname, 'distSimple'),
    filename: '[name].js',
  },
  mode: 'development'
}
```
执行
```
npx webpack
```
我们就可以看到 distSimple 文件夹下有三个打包产物了
#### 分析
首先看 index.js 的打包产物,它其实就是一个自调用函数
```
(function (modules) {
  // ...
})({
  "./index.js": (function (module, exports) {
        eval("console.log('llc');\n\n//# sourceURL=webpack:///./index.js?");
  })
})
```
> 注意这里的`sourceURL`是为了给`eval`的代码命名,因为`eval`执行的代码是在当前的`JavaScript context`中创建出来的,有时候调试区很难找到这个文件,用这个命名就可以轻松找到它

自调用函数传入了一个对象,对象中存在属性'./index.js'值为函数,函数里使用 eval 调用了你 index.js 中写的代码,我们看传入的函数之后做了什么操作,
```
function (modules) {
  // ...
  // 在一大堆定义之后调用了
  return __webpack_require__(__webpack_require__.s = "./index.js");
}
```
其实就是把`./index.js`赋值给了`__webpack_require__.s`然后传入了函数`__webpack_require__`,我们再来看看`__webapck_require__`做了什么操作吧
```
(function (modules) { // webpackBootstrap
  // 创建一个模组的缓存
  var installedModules = {};

  // 引入函数
  function __webpack_require__(moduleId) {

    // 确认传入的moduleId在缓存中存不存在,存在则将其exports全部返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 如果不存在就创建一个新的module并且将它放在缓存中
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // 调用传入的modules[moduleId]函数并且this设置为module.exports,并且传入参数module/module.exports/__webpack_require__
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 这个标志代表传入的module已经加载完毕
    module.l = true;

    // 最后将这个创建的 export 返回
    return module.exports;
  }

  // ...
}
```
其实`index.js`因为代码写的比较简单所以看不出来webpack整理之后的模块管理是怎么实现的,只能看到在`modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);`中调用了`index.js`中的代码,那我们可以来看看`useTest.js`中的代码

首先是自调用函数传入的参数
```
({
  "./test.js":
    (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ('llc');\n\n//# sourceURL=webpack:///./test.js?");
    }),
  "./useTest.js":
    (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \"./test.js\");\n\nconsole.log(_test__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./useTest.js?");
    })
});
```
因为这里没有进行拆包,所以这个文件将`useTest.js`中导入的`test.js`给打了进来,而在自调用函数中最后`return`的是`__webpack_require__(__webpack_require__.s = "./useTest.js")`这里走的流程就相当于是打包后的`index.js`文件,而不一样的是`useTest`中的`eval`
```
// useTest eval
__webpack_require__.r(__webpack_exports__);
var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./test.js\");
console.log(_test__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);
```
我将`eval`中真正执行的代码进行整理了一下,这里比`index.js`多调用了一个`__webpack_require_.r`和`__webpack_require__(\"./test.js\")`,我们先来看`__webpack_require_.r`做了什么
```
__webpack_require__.r = function (exports) {
  // 判断 Symbol 是否支持
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // 存在则给传入的对象赋值 [Symbol.toStringTag] 这个值会给 toString 设置 Tag 比如这个设置之后调用 toString 会返回[object Module]
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  // 如果不支持则给其 __esModule 属性赋值 { value: true }
  Object.defineProperty(exports, '__esModule', { value: true });
};
```
这里就是给对象赋值了一些属性,好让外部知道这是一个`Module`对象,而主要的是第二句,它调用`__webpack_require__(\"./test.js\")`并将返回值赋值给一个变量,我们来看看`./test.js`中的`eval`做了什么
```
// 同上
__webpack_require__.r(__webpack_exports__);
// 将传入的第二个参数(即__webpack_require__中定义的module.exports)的default属性赋值为'llc'
__webpack_exports__[\"default\"] = ('llc');
```
而在`__webpack_require__`中将`module.exports`返回了

所以这样通过`webpack`进行`ast`解析成自己定义的`require`和`exports`进行模块管理了

### 拆包分析
#### 开始
我们依然使用`test.js、useTest.js`这两个文件进行分析，只不过我们需要新建一个`webpack.bundle.js`来进行拆包
```
const path = require('path');

module.exports = {
  entry: {
    useTest: path.resolve(__dirname, 'useTest.js')
  },
  output: {
    path: path.resolve(__dirname, 'distBundle'),
    filename: '[name].js',
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      cacheGroups: {
        vendors: {
          test: /test.js/,
          priority: 10
        }
      }
    }
  }
}
```
执行`npx webpack --config=webpack.bunld.js`就可以发现产物在`distBundle`文件夹下了
#### 分析

首先看`useTest.js`因为这是入口文件。开始依然是一个自调用函数,传入的自调用函数的参数格式和简单产物的一致,只不过这次少了`test.js`, 但是其中的逻辑代码和简单产物的有了很大的不同
```
(function (modules) {
  // ...

  var deferredModules = [];

  // ...
  // 首先给 window["webpackJsonp"] 赋值为 window["webpackJsonp"] || [],然后将 window["webpackJsonp"]赋值给 jsonArray
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  // 将 jsonArray 的 push 函数赋值给 oldJsonpFunction
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  // 重写jsonArray的push方法
  jsonpArray.push = webpackJsonpCallback;
  // 浅拷贝一份 jsonpArray 赋值给 jsonpArray
  jsonpArray = jsonpArray.slice();
  // 循环 jsonpArray 中的元素调用 webpackJsonpCallback 函数
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  // 将 oldJsonpFunction 赋值给 parentJsonpFunction
  var parentJsonpFunction = oldJsonpFunction;
  // deferredModules 增加 ["./useTest.js", "vendors~useTest"] 元素
  deferredModules.push(["./useTest.js", "vendors~useTest"]);
  // 最后调用 checkDeferredModules 函数并将返回值返回
  return checkDeferredModules();
})
  ({
    "./useTest.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \"./test.js\");\n\nconsole.log(_test__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./useTest.js?");
      })
  });
```
上面使用到了`window["webpackJsonp"]`、`webpackJsonpCallback`和`checkDeferredModules`我们来分别看看这三个东西是什么

我们先来看 `vendors~useTest.js` 这个文件就是拆出去的`test.js`。而`window[webpackJsonp]`中的数据就是从这里来的
```
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~useTest"], {
  "./test.js":
    (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ('llc');\n\n//# sourceURL=webpack:///./test.js?");
    })
}]);
```
我们可以看到这个文件将一个`[[产物文件名],{'源文件名': 源文件代码}]`这种格式的数组`push`进了`window["webpackJsonp"]`

然后我们来看`webpackJsonpCallback`这个函数中传入的值是`window["webpackJsonp"]`中的项
```
var installedChunks = {
  "useTest": 0
};

function webpackJsonpCallback(data) {
  // 获取产物文件名
  var chunkIds = data[0];
  // 获取打包后产物
  var moreModules = data[1];
  // 目前还不知道
  var executeModules = data[2];

  // 循环 chunkIds
  var moduleId, chunkId, i = 0, resolves = [];
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    // 判断产物文件名数组中的元素是否是 installedChunks 中的元素并且值是否存在
    if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
      // 如果存在就在resolves数组中新增 installedChunks[chunkId][0]
      resolves.push(installedChunks[chunkId][0]);
    }
    // 将 installedChunks[chunkId] = 0
    installedChunks[chunkId] = 0;
  }
  // 将 moreModules 所有属性赋值给 modules
  for (moduleId in moreModules) {
    if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
      modules[moduleId] = moreModules[moduleId];
    }
  }
  // 这里 parentJsonpFunction 还是 undefined 所以还是不调用
  if (parentJsonpFunction) parentJsonpFunction(data);

  // 调用 resolves 数组中所有的函数
  while (resolves.length) {
    resolves.shift()();
  }

  // deferredModules.push(executeModules);
  deferredModules.push.apply(deferredModules, executeModules || []);

  // 调用 checkDeferredModules 将返回值返回
  return checkDeferredModules();
};
```
好像这里调用将`installedChunks["vendors~useTest"]=0`并增加了`modules['./test.js']=fn`然后调用了`checkDeferredModules`,所以我们再来看看`checkDeferredModules`
```
function checkDeferredModules() {
  var result;
  // 第一次在 webpackJsonpCallback 中 deferredModules = [] 所以这次这个函数没有任何调用
  // 最后自调用函数 return 调用时 deferredModules = [["./useTest.js", "vendors~useTest"]]
  // modules = {'./test.js':fn,'./useTest.js':fn}
  for (var i = 0; i < deferredModules.length; i++) {
    var deferredModule = deferredModules[i];
    var fulfilled = true;
    for (var j = 1; j < deferredModule.length; j++) {
      var depId = deferredModule[j];
      
      if (installedChunks[depId] !== 0) fulfilled = false;
    }
    if (fulfilled) {
      deferredModules.splice(i--, 1);
      result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
    }
  }
  // 这里返回了 __webpack_require__(deferredModules[0][0])的值
  return result;
}
```
结论: 其实简单的拆包就是将包的代码挂在了window对象下,然后将该代码放在入口文件自调用函数的参数中
### 按需加载分析
#### 起步
因为`webpack`的按需加载是使用`import()`来实现的,所以我们不能再用`useTest.js`了,我们新建一个`asyncUseTest.js`并且安装`html-webpack-plugin`来分析.运行`npm i html-webpack-plugin -D`
```
// asyncUseTest.js
import('./test').then(res => {
  console.log(res);
})
```
再新建一个webpack.async.js
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'asyncUseTest.js'),
  },
  output: {
    path: path.resolve(__dirname, 'distAsync'),
    filename: '[name].js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```
运行`npx webpack --config=webpack.async.js`就可以看到产物了。
#### 分析
我们首先可以看到生成的html中只有`index.js`的`script`却没有另一个`js`这就很奇怪了。我们来看看打包后的`index.js`到底是怎么操作的。
```
(function (modules) { // webpackBootstrap
  // ...
  return __webpack_require__(__webpack_require__.s = "./asyncUseTest.js");
})
  ({
    "./asyncUseTest.js":
      /*!*************************!*\
        !*** ./asyncUseTest.js ***!
        \*************************/
      /*! no static exports found */
      (function (module, exports, __webpack_require__) {
        eval("__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./test */ \"./test.js\")).then(res => {\n  console.log(res);\n})\n\n//# sourceURL=webpack:///./asyncUseTest.js?");
      })
  });
```
可以发现代码中其他东西都和拆包的代码差不多,有些不同的就是最后并没有调用`checkDeferredModules`而是调用了`__webpack_require__`这两个函数我们都分析过,就不再做分析,我们主要看看`webpack`是怎么进行按需加载的。使用`import()`和之前唯一的区别就是用了`__webpack_require__.e`,我们来看看这个函数做了什么
```
__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = [];
  // 在 installedChunks 对象中寻找文件

  var installedChunkData = installedChunks[chunkId];
  // 如果key = 文件名 的 value 的值为 0 则代表已经被装载
  if (installedChunkData !== 0) {

    // a Promise means "currently loading".
    // 如果key = 文件名 的 value 的值不为 0 且存在, 说明文件在装载中这个状态
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      // setup Promise in chunk cache
      // 从没有操作过的文件使用 promise 将 promise 函数中的 [resolve,reject]赋值给installedChunks[chunkId]和installedChunkData
      var promise = new Promise(function (resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      // 将 promise 加入到 promises 中并且赋值给 installedChunkData[2]
      promises.push(installedChunkData[2] = promise);

      // 创建 script 标签
      var script = document.createElement('script');
      var onScriptComplete;

      // 设置字符串编码格式
      script.charset = 'utf-8';
      script.timeout = 120;
      if (__webpack_require__.nc) {
        script.setAttribute("nonce", __webpack_require__.nc);
      }
      // 将文件路径赋值给 src
      script.src = jsonpScriptSrc(chunkId);

      // 写script 加载完成/加载错误/加载超时处理函数
      var error = new Error();
      onScriptComplete = function (event) {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var chunk = installedChunks[chunkId];
        if (chunk !== 0) {
          if (chunk) {
            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
            var realSrc = event && event.target && event.target.src;
            error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
            error.name = 'ChunkLoadError';
            error.type = errorType;
            error.request = realSrc;
            chunk[1](error);
          }
          installedChunks[chunkId] = undefined;
        }
      };
      // 如果 2 分钟还没有加载成功就报超时
      var timeout = setTimeout(function () {
        onScriptComplete({ type: 'timeout', target: script });
      }, 120000);
      // 如果报错或者加载成功调用处理函数
      script.onerror = script.onload = onScriptComplete;
      // 将该script标签增加到html中
      document.head.appendChild(script);
    }
  }
  // 返回一个promise.all 只有当参数数组中所有promise都变成fullfilling它返回的Promise才会变成fullfilling
  return Promise.all(promises);
};
```
其实按需加载的原理就是暂时不加script标签引入,当用到的时候再调用`__webpack_require__.e`往文档加script动态引入该文件。
### 总结
- 简单打包: 将文件整合成一个对象,需要时通过文件名拿到对象下方法,进行调用。
- 简单拆包: 将拆包后的文件整合成对象挂载在window对象下,调用主入口函数时,将其整合在入口函数的对象下,入口函数需要拆包文件导出值时,使用`__webpack_require__`获取
- 按需加载拆包: 和简单拆包一样将文件整合成对象挂载在window对象下, 调用主入口函数时,先在文档增加script标签将需要导入的文件通过标签引入,然后和简单拆包一样操作

> 注意: 使用`html-webpack-plugin`是简单拆包和按需加载拆包是有区别的,简单拆包的会直接生成`script`在生成的`html`中而按需加载拆分的包不会出现