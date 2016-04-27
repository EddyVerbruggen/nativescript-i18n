require('globals');
var application = require("application");
var format = require('format');
var utils = require('utils/utils');


var L = function() {
	if (arguments.length) {
		var context = utils.ad.getApplicationContext();
		var res = context.getResources();
		if (res) {
			var resID = res.getIdentifier(arguments[0], "string", context.getPackageName());
			arguments[0] = res.getString(resID);
			return format.apply(this, arguments);
		}
	}

};

application.resources.L = L;
global.L = L;