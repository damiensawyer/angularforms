"use strict";
exports.__esModule = true;
//import * as _ from 'lodash';
var lodash_1 = require("lodash");
var functions = (function () {
    function functions() {
        this.Name = 'damien';
    }
    functions.prototype.doStuff = function (names) {
        lodash_1.each(names, function (x) { console.log(x); });
    };
    return functions;
}());
exports.functions = functions;
