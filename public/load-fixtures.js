var loader = require('@loader');

var isWindow = loader.isPlatform('window');
var isProduction = loader.isEnv('production');

var fixturesPath = (isWindow && !isProduction) ?
  'public/models/fixtures/fixtures' : '@empty';

System.config({
  map: {
    fixturesOn: fixturesPath
  }
});
