"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var application = require("tns-core-modules/application");
require("./i18n");
require("reflect-metadata");
var core_1 = require("@angular/core");
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
        return (_a = application.getResources()).L.apply(_a, [value].concat(more));
        var _a;
    };
    return L;
}());
L = __decorate([
    core_1.Pipe({
        name: 'L'
    })
], L);
exports.L = L;
var NativeScriptI18nModule = (function () {
    function NativeScriptI18nModule() {
    }
    return NativeScriptI18nModule;
}());
NativeScriptI18nModule = __decorate([
    core_1.NgModule({
        declarations: [L],
        exports: [L]
    })
], NativeScriptI18nModule);
exports.NativeScriptI18nModule = NativeScriptI18nModule;
