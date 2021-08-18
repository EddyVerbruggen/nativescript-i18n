require('globals');
const format = require('format');
import { ad } from "@nativescript/core/utils";
import { getResources, setResources } from "@nativescript/core/application";

const context = ad.getApplicationContext();
const packageName = context.getPackageName();
const resources = context.getResources();

const L = function () {
    if (resources && arguments.length) {
        var resID = resources.getIdentifier(arguments[0], "string", packageName);

        if (resID !== 0) {
            arguments[0] = resources.getString(resID);
            return format.apply(this, arguments);
        }
        return arguments[0];
    }
};

var applicationResources = getResources();
applicationResources.L = L;
setResources(applicationResources);
global.L = L;
