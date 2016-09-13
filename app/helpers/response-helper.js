module.exports = {
  render: function(options, request, response) {
    renderData = options["json"] || options["html"];
    response.statusCode = options.statusCode;
    responseBody = { method: request.method, url: request.url };
    switch(true) {
      case options.hasOwnProperty("json"):
        response.setHeader('Content-Type', 'application/json');
      break;
      case options.hasOwnProperty("html"):
        response.setHeader('Content-Type', 'text/html');
      break;
    }

    let requestBody = [];
    request.on('data', (data) => {
      requestBody.push(data);
    }).on('end', () => {
      requestBody = Buffer.concat(requestBody).toString();
      console.log(requestBody);
      responseBody["body"] = requestBody;
      response.write(JSON.stringify(responseBody));
      response.end();
    })
  }
}
