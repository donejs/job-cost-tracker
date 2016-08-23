var historyApiFallback = require('connect-history-api-fallback');
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "ui": {
        "port": 8083,
        "weinre": {
            "port": 8084
        }
    },
    "files": ['public/**/*.{js,less,stache,html}'],
    "watchOptions": {},
    "server": true,
    "port": 8080,
    "middleware": [ historyApiFallback() ],
    "serveStatic": [
        'public',
        'node_modules',
        './'
    ]
};
