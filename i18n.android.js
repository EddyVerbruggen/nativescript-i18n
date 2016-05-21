require('globals');
var application = require("application");
var format = require('format');
var utils = require('utils/utils');

var context = utils.ad.getApplicationContext();
var packageName = context.getPackageName();
var resources = context.getResources();

console.error('========== packageName' +packageName);

var L = function() {

	console.error('========== arguments');
	console.error(arguments);

	if (resources && arguments.length) {
		var resID = resources.getIdentifier(arguments[0], "string", packageName);

		arguments[0] = resources.getString(resID);
		return format.apply(this, arguments);
	}
};

application.resources.L = L;
global.L = L;