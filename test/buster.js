var config = module.exports;

config["basic"] = {
  env: "browser",
  rootPath: "../",
  extensions: [
    require("sinon")
  ],
  libs: [
    "test/lib/underscore.js"
  ],
  sources: [
    "vendor/assets/javascripts/mount.js",
    "vendor/assets/javascripts/levels.js",
    "vendor/assets/javascripts/logging_event.js",
    "vendor/assets/javascripts/logger.js",
    "vendor/assets/javascripts/layout.js",
    "vendor/assets/javascripts/layouts/pattern.js",
    "vendor/assets/javascripts/appender.js",
    "vendor/assets/javascripts/appenders/console.js"
  ],
  tests: [
    "test/*-test.js"
  ]
};
