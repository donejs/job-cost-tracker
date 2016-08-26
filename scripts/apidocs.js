var exec = require('child_process').exec,
  replace = require('replace'),
  cmd = 'rm -rf docs/api && mkdir docs/api && cp -R ./node_modules/swagger-ui/dist/ ./docs/api/ && cp ./api-spec.json ./docs/api',
  winCmd = 'rmdir /S /Q .\\docs\\api && ' +
    'xcopy /e /i .\\node_modules\\swagger-ui\\dist .\\docs\\api && ' +
    'copy .\\api-spec.json .\\docs\\api';

if (process.platform === 'win32') {
  cmd = winCmd;
}

exec(cmd, function (err, stdout, stderr) {
  if (err) {
    console.log(err);
    throw err;
  }

  if (stderr) {
    console.log(stderr);
    throw err;
  }

  replace({
    regex: "http://petstore.swagger.io/v2/swagger.json",
    replacement: "./api-spec.json",
    paths: ["docs/api/index.html"],
    recursive: true,
    silent: true,
  });
});

