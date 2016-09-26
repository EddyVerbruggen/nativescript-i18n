"use strict";
require('./i18n');
require('reflect-metadata');
var core_1 = require('@angular/core');
/**
 * Translate in angular
 * Usage:
 *   value | L:args
 * Example:
 *   {{ 'My text' |  L:10:20.356}}
 *   formats to: Mi text 10 and 20.356
 *   if 'My text' is defined as <string name="My text" formatted="false">Mi text %d and %f</string>
 */
var L = (function () {
    function L() {
    }
    L.prototype.transform = function (value) {
        var more = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            more[_i - 1] = arguments[_i];
        }
        return global.L.apply(global, [value].concat(more));
    };
    L = __decorate([
        core_1.Pipe({
            name: 'L'
        }), 
        __metadata('design:paramtypes', [])
    ], L);
    return L;
}());
exports.L = L;
//# sourceMappingURL=angular.js.map