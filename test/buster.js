var config = module.exports;

config["basic"] = {
  env: "browser",
  rootPath: "../",
  extensions: [
    require("sinon"),
    require("when")
  ],
  libs: [
    "test/lib/underscore.js",
    "test/lib/jquery-1.9.1.min.js"
  ],
  sources: [
    "vendor/assets/javascripts/jlog.js"
  ],
  tests: [
    "test/*-test.js"
  ]
};
