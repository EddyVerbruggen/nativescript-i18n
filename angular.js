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
 * Translate in angular
 * Usage:
 *   value | L:args
 * Example:
 *   {{ 'My text' |  L:10}}
 *   formats to: Mi text 10
 */
var L = (function () {
    function L() {
    }
    L.prototype.transform = function (value, more) {
        return global.L(value, more);
    };
    L = __decorate([
        core_2.Pipe({
            name: 'L'
        })
    ], L);
    return L;
}());
exports.L = L;
exports.I18N_PROVIDERS = [core_1.provide(core_1.PLATFORM_PIPES, { useValue: [L], multi: true })];
