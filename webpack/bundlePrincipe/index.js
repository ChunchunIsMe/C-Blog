const fs = require('fs');
const path = require('path');
const options = require('./webpack.config');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

const Parser = {
  getAst: path => {
    // 读取入口文件
    const content = fs.readFileSync(path, 'utf-8')
    return parser.parse(content, {
      sourceType: 'module'
    })
  },
  getDependecies: (ast, filename) => {
    const dependecies = {};
    traverse(ast, {
      // 类型为 ImportDeclaration 的 AST 节点 (即为 import 语句)
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename);
        // 保存依赖模块路径, 之后生成依赖关系图需要用到
        const filepath = './' + path.join(dirname, node.source.value);
        dependecies[node.source.value] = filepath;
      }
    })
    return dependecies;
  },
  getCode: ast => {
    // AST 转换为 code
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code;
  }
}

class Compoler {
  constructor(options) {
    // webpack 配置
    const { entry, output } = options;
    // 入口
    this.entry = entry;
    // 出口
    this.output = output;
    // 模块
    this.modules = [];

  }
  // 构建启动
  run() {
    // 解析入口文件
    const info = this.build(this.entry);
    this.modules.push(info);
    this.modules.forEach(({ dependecies }) => {
      if (dependecies) {
        for (const dependency in dependecies) {
          this.modules.push(this.build(dependency[dependency]))
        }
      }
    })
    // 生成依赖关系图
    const dependencyGraph = this.modules.reduce(
      (graph, item) => ({
        ...graph,
        [item.filename]: {
          dependecies: item.dependecies,
          code: item.code
        }
      })
    );
    this.generate(dependencyGraph);
  }
  build(filename) {
    const { getAst, getDependecies, getCode } = Parser;
    const ast = getAst(filename);
    const dependecies = getDependecies(ast, this.entry);
    const code = getCode(ast);
    return {
      filename,
      dependecies,
      code
    }
  }
  // 重写 require 函数, 输出 bundle 因为你导入的文件自动转换为 调用require函数而导出自动会帮你在exports对象下暴露导出对象
  generate(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    const bundle = `(function(graph) {
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function (require,exports,code){
          eval(code);
        })(localeRequire,exports,graph[module].code)
      }
    })(${JSON.stringify(code)})`
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
}

new Compoler(options).run();