const ejs = require('ejs');

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
      _req = requestHelper(request, data);
      responseHelper(_req, response);
    });
  }
}

function responseHelper(data, res) {
  res.write(data);
  res.end();
}

function requestHelper(req, data) {
  result = as_json(req, "method", "url");
  result["body"] = JSON.parse(Buffer.concat(data).toString());
  return JSON.stringify(result);
}

function as_json(obj, ...keys) {
  return JSON.parse(JSON.stringify(obj, keys));
}
