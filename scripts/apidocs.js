var exec = require('child_process').exec,
  replace = require('replace'),
  cmd = 'copy -R ./node_modules/swagger-ui/dist/* ./docs/api/ && copy ./api-spec.json ./docs/api',
  winCmd = 'rmdir /S /Q .\\docs\\api & ' +
    'xcopy /e /i .\\node_modules\\swagger-ui\\dist .\\docs\\api && ' +
    'copy .\\api-spec.json .\\docs\\api';
console.log('Process platform: ', process.platform);

if (process.platform === 'win32') {
  cmd = winCmd;
}

exec(cmd, function (error, stdout, stderr) {
  console.log(error, stdout, stderr);

  replace({
    regex: "http://petstore.swagger.io/v2/swagger.json",
    replacement: "./api-spec.json",
    paths: ["docs/api/index.html"],
    recursive: true,
    silent: true,
  });
});

