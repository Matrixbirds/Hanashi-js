process.$LOAD_PATH(module.paths, "app/helpers");
const ResponseHelper = require('response-helper');
class AbsActor {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.render = function(options) {
      ResponseHelper.render(options, this.req, this.res);
    }
  }
}

module.exports = AbsActor;
