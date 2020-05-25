const http = require('http');

class Koa {
  constructor() {
    this.middlewares = [];
    this.ctx = {};
  }

  listen(port) {
    http.createServer(this._callback.bind(this)).listen(port);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  _compose(ctx) {
    this.ctx = ctx;
    const dispatch = (i) => {
      if (typeof this.middlewares[i] === 'function') {
        return Promise.resolve(this.middlewares[i](ctx, () => dispatch(i + 1)))
      }
    }
    return dispatch(0)
  }

  _callback(req, res) {
    if (req.url !== '/favicon.ico') {
      this._compose({ res, req }).then(() => {
        if (this.ctx.body) {
          res.write(this.ctx.body);
        }
        res.end();
      })
    }
  }
}

const koa = new Koa();
koa.listen(3000);
koa.use((ctx, next) => {
  console.log(1)
  next();
  console.log('end1')
})
koa.use((ctx, next) => {
  console.log(2)
  next();
  console.log('end2')
})
koa.use((ctx, next) => {
  console.log(3)
  next();
  console.log('end3')
})

module.exports = Koa;