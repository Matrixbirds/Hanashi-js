// load app environment
process.$LOAD_PATH = require('./environment.js').load_path;
process.$LOAD_PATH(module.paths, "app/", "actors/", "app/helpers/");

const http = require('http');
const ejs = require('ejs');
const path = require('path');

const Home = require('home');
const Wish = require('wish');

const ResponseHelper = require('response-helper');

const config = null;

const routes = ["/home", "/wish/index", "/wish/:id"];

function dispatch(request, response) {
  if (routes.includes(request.url)) {
    route = `${request.method} ${request.url}`;
    switch(true) {
      case /GET \/home/.test(route):
        new Home(request, response).index("./views/home/index.ejs");
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
