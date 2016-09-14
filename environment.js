exports.load_path = function(paths, ...lib_path) {
  lib_path.map((lib => paths.push(`${process.cwd()}/${lib}`)));
};
