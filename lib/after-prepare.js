var fs = require('fs-extra');
var path = require('path');

module.exports = function(logger, platformsData, projectData, hookArgs) {

	console.error(arguments);



	var platform = hookArgs.platform.toLowerCase();
	var appResourcesDirectoryPath = projectData.appResourcesDirectoryPath;
	var i18nFolderPath = path.join(projectData.projectDir, 'app', 'i18n');

	return new Promise(function(resolve, reject) {
		if (fs.existsSync(i18nFolderPath)) {
			if (platform == 'android') {
				fs.readdirSync(i18nFolderPath).forEach(function(lang) {
					if (lang == 'en') {
						var outputDir = path.join(appResourcesDirectoryPath, 'Android', 'values', 'strings.xml');
					} else {
						var outputDir = path.join(appResourcesDirectoryPath, 'Android', 'values-' + lang, 'strings.xml');
					}

					fs.copy(path.join(i18nFolderPath, lang, 'strings.xml'), outputDir,{clobber:true}, function(err) {
						if (err) {
							console.error(err);
							reject();
						}
					});
				});
			}
		}
		resolve();
	});
};
