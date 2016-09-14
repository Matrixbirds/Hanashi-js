process.$LOAD_PATH(module.paths, "actors");
const AbsActor =  require('abs-actor');
class Wish extends AbsActor {
  constructor(req, res) {
    super(req, res);
  }

  index() {
    this.render({ejs: "234234", statusCode: 200});
  }

  show() {
    this.render({ejs: "234234", statusCode: 200});
  }
}
module.exports = Wish;
