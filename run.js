// Transpile all code following this line with babel
require('babel-register')({
    "presets": [
        ["env", {
            "targets": {
                "node": "current"
            }
        }]
    ]
});
// Import the rest of our application.
module.exports = require('./js/index.js');
