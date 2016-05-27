require('globals');
require('nativescript-i18n');

var application = require("application");

console.error('==============');
console.error(NSBundle.mainBundle().localizedStringForKeyValueTable('hello','deff', null));
console.error(L('hello','moo'));


application.start({ moduleName: "main-page" });


