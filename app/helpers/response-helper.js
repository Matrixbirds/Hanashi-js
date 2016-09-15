const ejs = require('ejs');
const fs = require('fs');

module.exports = {
  render: function(options, request, response) {
    renderData = options["json"] || options["html"];
    response.statusCode = options.statusCode;
    switch(true) {
      case options.hasOwnProperty("json"):
        response.setHeader('Content-Type', 'application/json');
      break;
      case options.hasOwnProperty("ejs"):
      case options.hasOwnProperty("html"):
        response.setHeader('Content-Type', 'text/html');
      break;
      default:
        response.setHeader('Content-Type', 'text/html');
      break;
    }

    const data = [];
    request.on('data', (_data) => {
      data.push(_data);
    }).on('end', () => {
      requestObject = requestHelper(request, data);
      responseHelper(response, options.ejs || requestObject, options.path);
    });
  }
}

function responseHelper(res, requestObject, path) {
  if (path) {
    ejsHelper.call(res, path, requestObject);
  }
  else {
    res.write(JSON.stringify(requestObject));
    res.end();
  }
}

function ejsHelper(path, data) {
  var res = this;
  ejs.renderFile(path, data, function(err, html) {
    if (!err) {
      res.write(html);
      res.end();
    }
    else {
      res.write("Operation Error");
      res.end();
    }
  });
}

function requestHelper(req, data) {
  result = as_json(req, "method", "url");
  if (data.length > 0)
    result["data"] = JSON.parse(Buffer.concat(data).toString());
  return result;
}

function as_json(obj, ...keys) {
  return JSON.parse(JSON.stringify(obj, keys));
}
