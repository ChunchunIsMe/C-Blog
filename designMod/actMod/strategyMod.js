// 策略类
const strategies = {
  A() {
    console.log('This is stragegy A')
  },
  B() {
    console.log('This is stragegy B')
  }
}

// 环境类
const context = name => {
  return strategies[name]();
}

// 调用策略A
context("A");
// 调用策略B
context("B")

// redux是很明显的策略模式，他也拥有
function createStore(reducer, propState, enhancer) {

  if (propState && typeof propState === 'function') {
    enhancer = propState;
    propState = null;
  }
  var state = propState || {};
  var listeners = [];
  var dispatchLoading = false;


  function dispatch(action) {
    dispatchLoading = true;
    state = reducer(action);
    listeners.forEach(function (listener) {
      listener();
    })
    dispatchLoading = false;
  }

  function getState() {
    return state;
  }

  function subscribe(fn) {
    if (dispatchLoading) {
      throw new Error("can't subscribe in dispatching")
    }
    var i = listeners.length;
    listeners.push(fn);
    return function () {
      listeners.splice(i, 1);
    }
  }

  function replaceReducer(nextReducer) {
    if (dispatchLoading) {
      throw new Error("can't replaceReducer in dispatching")
    }
    reducer = nextReducer;
  }

  return {
    dispatch,
    getState,
    subscribe,
    replaceReducer
  };
}

function compose(chain) {
  if (chain.length === 0) {
    return function (arg) {
      return arg;
    }
  }
  if (chain.length === 1) {
    return chain[0];
  }

  return chain.reduce(function (a, b) {
    return function () {
      return a(b(arguments));
    }
  })
}

function applyMiddleware() {
  var props = arguments;
  return function (createStroe) {
    return function (reducer, state) {
      var store = createStroe(reducer, state);
      var chain = [];
      var API = {
        getState: store.getState,
        dispatch: store.dispatch
      }
      chain = props.map(function (item) {
        return item(API)
      });

      var dispatch = compose(chain)

      return Object.assign({}, store, { dispatch: dispatch })
    }
  }
}


// 上述就是一个简单的redux的实现，可以自己定义策略模式中的策略类(reducer)和环境类(dispatch)