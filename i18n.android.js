require('globals');
const application = require("tns-core-modules/application");
const utils = require('tns-core-modules/utils/utils');
const format = require('format');

const context = utils.ad.getApplicationContext();
const packageName = context.getPackageName();
const resources = context.getResources();

const L = function () {
    if (resources && arguments.length) {
        var resID = resources.getIdentifier(arguments[0], "string", packageName);

        if (resID != 0) {
            arguments[0] = resources.getString(resID);
            return format.apply(this, arguments);
        }
        return arguments[0];
    }
};

var applicationResources = application.getResources();
applicationResources.L = L;
application.setResources(applicationResources);
global.L = L;
