const http = require('http');

const ResponseHelper = require('./app/helpers/response-helper.js')

const config = null;

class Home {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  index() {
    ResponseHelper.render({json: "234234", statusCode: 200}, this.req, this.res);
  }
}

class Wish {

  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  index() {
    ResponseHelper.render({html: "234234", statusCode: 200}, this.req, this.res);
  }

  show() {
    ResponseHelper.render({json: "234234", statusCode: 200}, this.req, this.res);
  }
}

const routes = ["/home", "/wish/index", "/wish/:id"];

function dispatch(request, response) {
  if (routes.includes(request.url)) {
    route = `${request.method} ${request.url}`;
    switch(true) {
      case /GET \/home/.test(route):
        new Home(request, response).index();
        break;

      case /GET \/wish\/index/.test(route):
        new Wish(request, response).index();
        break;

      case /GET \/wish\/\d+/.test(route):
        new Wish(request, response).show();
        break;

      default:
        ResponseHelper.render({json: "Page Not Found", statusCode: 404}, request, response)
        break;
    }
  }
  else {
    ResponseHelper.render({json: "Page Not Found", statusCode: 404}, request, response)
  }
}

http
  .createServer((req, res) => dispatch(req, res))
  .listen(8888);

console.log("Listening on 8888 & papapa");
