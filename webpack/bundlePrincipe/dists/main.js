(function(graph) {
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function (require,exports,code){
          eval(code);
        })(localeRequire,exports,graph[module].code)
      }
    })({"filename":"./src/index.js","dependecies":{},"code":"\"use strict\";\n\nconsole.log(123123);"})