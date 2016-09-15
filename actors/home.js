process.$LOAD_PATH(module.paths, "actors");

const AbsActor =  require('abs-actor');
class Home extends AbsActor {
  constructor(req, res) {
    super(req, res);
  }

  index(view) {
    this.render({ejs: { title: 'Home & Hanashi', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }, path: view, statusCode: 200});
  }
}

module.exports = Home;
