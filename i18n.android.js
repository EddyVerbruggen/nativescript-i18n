require('globals');
var application = require("application");
var format = require('format');
var utils = require('utils/utils');

var context = utils.ad.getApplicationContext();
var packageName = context.getPackageName();
var resources = context.getResources();

var L = function() {
	if (resources && arguments.length) {
		var resID = resources.getIdentifier(arguments[0], "string", packageName);

		if (resID != 0) {
			arguments[0] = resources.getString(resID);
			return format.apply(this, arguments);
		}
		return arguments[0];
	}
};

application.setResources(L);
global.L = L;
