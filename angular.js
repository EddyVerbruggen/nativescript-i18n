"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('./i18n');
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
/**
 * i18n
 * Translate in angular
 * Usage:
 *   value | i18n:args
 * Example:
 *   {{ 'My text' |  i18n:10}}
 *   formats to: Mi text 10
 */
var i18n = (function () {
    function i18n() {
    }
    i18n.prototype.transform = function (value, more) {
        return global.L(value, more);
    };
    i18n = __decorate([
        core_2.Pipe({
            name: 'i18n'
        })
    ], i18n);
    return i18n;
}());
exports.i18n = i18n;
exports.I18N_PROVIDERS = [core_1.provide(core_1.PLATFORM_PIPES, { useValue: [i18n], multi: true })];
