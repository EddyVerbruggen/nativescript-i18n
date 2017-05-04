require('globals');
var application = require("application");
var format = require('format');
var utils = require("utils/utils");

var bundle = utils.ios.getter(NSBundle, NSBundle.mainBundle);

var L = function() {
	arguments[0] = bundle.localizedStringForKeyValueTable(arguments[0], '', null);
	return format.apply(this, arguments);
};

application.setResources(L)
global.L = L;
