"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./i18n");
require("reflect-metadata");
var core_1 = require("@angular/core");
var L = (function () {
    function L() {
    }
    L.prototype.transform = function (value) {
        var more = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            more[_i - 1] = arguments[_i];
        }
        return global["L"].apply(global, [value].concat(more));
    };
    L = __decorate([
        core_1.Pipe({
            name: 'L'
        })
    ], L);
    return L;
}());
exports.L = L;
var NativeScriptI18nModule = (function () {
    function NativeScriptI18nModule() {
    }
    NativeScriptI18nModule = __decorate([
        core_1.NgModule({
            declarations: [L],
            exports: [L]
        })
    ], NativeScriptI18nModule);
    return NativeScriptI18nModule;
}());
exports.NativeScriptI18nModule = NativeScriptI18nModule;
//# sourceMappingURL=angular.js.map