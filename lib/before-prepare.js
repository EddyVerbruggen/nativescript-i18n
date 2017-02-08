var fs = require('fs');
var path = require('path');
var parser = require('xmldom').DOMParser;
var plist = require('plist');

module.exports = function(logger, platformsData, projectData, hookArgs) {
	var platform = hookArgs.platform.toLowerCase();
	var appResourcesDirectoryPath = projectData.appResourcesDirectoryPath;
	var i18nFolderPath = path.join(projectData.projectDir, 'app', 'i18n');
	var pjson = require(path.join(projectData.projectDir, 'package.json'));
	var defaultLang = 'en';

    if (pjson['nativescript-i18n']) {
        if (pjson['nativescript-i18n'].customLangPath) {
            var customLangPath = path.join(projectData.projectDir, pjson['nativescript-i18n'].customLangPath);
            if (fs.existsSync(customLangPath)) {
                i18nFolderPath = customLangPath;
            }
        }
            if (pjson['nativescript-i18n'].defaultLang) {
                defaultLang = pjson['nativescript-i18n'].defaultLang;
            }
    }


	return new Promise(function(resolve, reject) {
		if (fs.existsSync(i18nFolderPath)) {
			if (platform === 'android') {
				fs.readdirSync(i18nFolderPath).forEach(function(lang) {
					var outputFile;

					if (lang === defaultLang) {
						var androidPath = path.join(appResourcesDirectoryPath, 'Android', 'values');
						if (!fs.existsSync(androidPath)) {
							fs.mkdirSync(androidPath);
						}
						outputFile = path.join(appResourcesDirectoryPath, 'Android', 'values', 'strings.xml');
					} else {
						var androidPath = path.join(appResourcesDirectoryPath, 'Android', 'values-' + lang);
						if (!fs.existsSync(androidPath)) {
							fs.mkdirSync(androidPath);
						}
						outputFile = path.join(appResourcesDirectoryPath, 'Android', 'values-' + lang, 'strings.xml');
					}
					fs.writeFileSync(outputFile, fs.readFileSync(path.join(i18nFolderPath, lang, 'strings.xml'), 'utf8'));
				});
			} else if (platform == 'ios') {
				var plist = require('plist');
				var infoPlistFile = path.join(appResourcesDirectoryPath, 'iOS', 'info.plist');
				var plistObj = plist.parse(fs.readFileSync(infoPlistFile, 'utf8'));
				plistObj["CFBundleDevelopmentRegion"] = defaultLang;
				fs.writeFileSync(infoPlistFile, plist.build(plistObj));

				fs.readdirSync(i18nFolderPath).forEach(function(lang) {
					var iosLangPath = path.join(appResourcesDirectoryPath, 'iOS', lang + '.lproj');
					if (!fs.existsSync(iosLangPath)) {
						fs.mkdirSync(iosLangPath);
					}

					var outputFile = path.join(appResourcesDirectoryPath, 'iOS', lang + '.lproj', 'Localizable.strings');
					var fileData = fs.readFileSync(path.join(i18nFolderPath, lang, 'strings.xml'), 'utf8');
					var doc = new parser().parseFromString(fileData);
					var defs = doc.getElementsByTagName('string');
					var result = '';

					for (var i = 0; i < defs.length; i++) {
						var def = defs[i];
						result += '"' + def.getAttribute('name') + '"="' + unescape(def.textContent) + '";\n';

						if (def.getAttribute('name') == 'app_name') {
							var outputPlistFile = path.join(appResourcesDirectoryPath, 'iOS', lang + '.lproj', 'InfoPlist.strings');
							var infoPlistData='"CFBundleDisplayName"="'+unescape(def.textContent)+'";\n';
							fs.writeFileSync(outputPlistFile, infoPlistData);
						}
					}

					fs.writeFileSync(outputFile, result);
				});
			} else if (platform == 'windows') {
				//TODO PRs gladly accepted :P
			}
		}
		resolve();
	});
};
