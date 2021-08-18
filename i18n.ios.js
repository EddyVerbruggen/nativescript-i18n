/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />

require('globals');
import { getResources, setResources } from "@nativescript/core/application";
const format = require('format');

const bundle = NSBundle.mainBundle;

const L = function () {
    arguments[0] = bundle.localizedStringForKeyValueTable(arguments[0], '', null);
    return format.apply(this, arguments);
};

var applicationResources = getResources();
applicationResources.L = L;
setResources(applicationResources);
global.L = L;
