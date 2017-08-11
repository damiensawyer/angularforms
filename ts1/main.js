const chalk = require('./node_modules/chalk/index.js');
//const chalk = require('chalk');
var _  = require('./node_modules/lodash/lodash.js');

console.log(chalk.blue('Hello world!'));
//const log = console.log;

(function (window, document) {
    let elements = document.getElementsByTagName('div');
    let i = 0;
    _.each(elements, function (e) {
        if (i++ % 2 === 0) {
            e.setAttribute('style', 'background-color:green');
        }
    });
})(window, document);

