var fs = require('fs-extra');
var path = require('path');
var parser = require('xmldom').DOMParser;

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
            if (pjson['nativescript-i18n'].defaultLang) {
                defaultLang = pjson['nativescript-i18n'].defaultLang;
            }
        }
    }


	return new Promise(function(resolve, reject) {
		if (fs.existsSync(i18nFolderPath)) {
			if (platform === 'android') {
				fs.readdirSync(i18nFolderPath).forEach(function(lang) {
					var outputFile;
					if (lang === defaultLang) {
						outputFile = path.join(appResourcesDirectoryPath, 'Android', 'values', 'strings.xml');
					} else {
						outputFile = path.join(appResourcesDirectoryPath, 'Android', 'values-' + lang, 'strings.xml');
					}

					fs.copy(path.join(i18nFolderPath, lang, 'strings.xml'), outputFile, {
						clobber: true
					},
					function(err) {
						if (err) {
							console.error(err);
							reject();
						}
					});
				});
			} else if (platform == 'ios') {
				fs.readdirSync(i18nFolderPath).forEach(function(lang) {
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
							fs.ensureFile(outputPlistFile, function(err) {
								if (!err) {
									fs.writeFile(outputPlistFile, infoPlistData);
								} else {
									console.error(err);
									reject();
								}
							});
						}


					}

					fs.ensureFile(outputFile, function(err) {
						if (!err) {
							fs.writeFile(outputFile, result);
						} else {
							console.error(err);
							reject();
						}
					});
				});
			} else if (platform == 'windows') {
				//TODO PRs gladly accepted :P
			}
		}
		resolve();
	});
};
