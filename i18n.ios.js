/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />

require('globals');
const application = require("tns-core-modules/application");
const format = require('format');

const bundle = NSBundle.mainBundle;

const L = function () {
    arguments[0] = bundle.localizedStringForKeyValueTable(arguments[0], '', null);
    return format.apply(this, arguments);
};

var applicationResources = application.getResources();
applicationResources.L = L;
application.setResources(applicationResources);
global.L = L;
