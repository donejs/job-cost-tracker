var glob = require("glob"),
  docco = require("docco"),
  ignoreList = ['public/**/functional.js',
    'public/**/test.js',
    'public/**/unit.js'];


glob("public/**/*.js", {
  ignore: ignoreList
}, function (er, files) {
  docco.document({args: files});
});
