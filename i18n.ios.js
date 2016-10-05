require('globals');
var application = require("application");
var format = require('format');

var bundle = NSBundle.mainBundle;

var L = function() {
	arguments[0] = bundle.localizedStringForKeyValueTable(arguments[0], '', null);
	return format.apply(this, arguments);
};

application.resources.L = L;
global.L = L;
