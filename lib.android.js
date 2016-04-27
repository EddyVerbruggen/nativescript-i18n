var application = require("application");
var format = require('format');
var utils = require('utils/utils');


application.resources.L = function(str) {
	var context = utils.ad.getApplicationContext();
	var res = context.getResources();
	if (res) {
		var resID = res.getIdentifier(str, "string", context.getPackageName());
		var value = res.getString(resID);
		return format.vsprintf.call(this, value);
	}
};
