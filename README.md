# nativescript-i18n (WIP)

This is a plugin for Nativescript that implements i18n in an easy manner.

It uses the native capabilities of each platform without the need of a separate JS or JSON file.

It is heavily inspired from [NativeLang](https://github.com/alejonext/NativeLang) and [this thread](https://github.com/NativeScript/NativeScript/issues/42)

The plugin defines an `L()` method at the application level so it will be accessible both from the XML and JS files.

###Credits
Thanks to [@TheBrousse](https://twitter.com/TheBrousse) and [@ValioStoychev](https://twitter.com/valiostoychev) for the help with iOS and [@alejonext](https://github.com/alejonext/NativeLang) for creating the initial module.

###Usage
Install the plugin in your app

~~~
npm install --save nativescript-i18n
~~~


Create a folder `i18n` in the `app` folder with the following structure:

~~~
App_Resources
i18n
  |
  |-- en
  |		|- strings.xml
  |
  |-- es
  		|- strings.xml
~~~


Require `nativescript-i18n` and `globals` in `app.js` as early as possible (I do it even before I require the `application` module, the very first 2 lines).

~~~
	require('globals');
	require('nativescript-i18n');
~~~

And in the code use it like this:

####XML files####

**Simple string**

~~~
	<Label text="{{ L('hello') }}">
~~~

**It supports one or multiple replacements, directly or from the model**

~~~
	<Label text="{{ L('hello') }}" class="title" textWrap="true" />
	<Label text="{{ L('hello_replace','my friend') }}" class="message" textWrap="true" />
	<Label text title="{{ L('multi_replace','direct replacement', modelReplacement) }}">
~~~

Assuming you have defined in **strings.xml** the definitions and in the model the replacement `modelReplacement` variable

~~~
	<string name="hello">Hello!</string>
	<string formatted="false" name="hello_replace">Hello %s!</string>
	<string formatted="false" name="multi_replace">We can replace directly in xml: %s or from the model: %s</string>
~~~

####IMPORTANT !!####

-  for all the strings definitions that have a replacement you need to add `formatted=false`
-  We need to add in strings.xml the next two lines for the app to compile properly which **also makes the app name localized on both ios and android and sets the title of the initial activity on android**

	~~~
	<string name="app_name">demo</string>
	<string name="title_activity_kimera">demo</string>
	~~~
- **Sometimes you might need to fully delete the app from the device/sim for the plugin to fully work** (usually only when it's installed at a later stage of the development)

####JS files####
~~~
	console.log(L('home'));
	console.log(L('multi_replace', 'ONE', 'TWO'));
~~~

####Demo####
Please have a look in the `demo` folder for a working example.



### (pseudo) roadmap/ideas

The following ideas are inspired by [this comment](https://github.com/NativeScript/NativeScript/issues/42#issuecomment-169202040)


- [x] Android implementation - use the native `strings.xml` in `App_Resources/Android/values/`
- [x] iOS implementation - use the native `Localizable.strings` files (where do we need to put this files?)
- [x] Allow formatted strings, eg: `L('hello', 'world')` to translate the definition `hello %s` (and/or other other types `%d`, etc)
- [ ] Possibly a cli tool/command to extract strings from our language function uses and put them into our strings.xml to be translated
- [x] Move the strings.xml files in `app/i18n` (exact folder structure to be decided) and use them as a base for the next points
  - [x] Build a hook to move the files in the right place before compiling for Android
  - [x] Build a hook to translate and move the files in the right place before compiling for iOS
- [ ] What about assets (images/splash screens/etc) ? _might be out of scope of this plugin_
- [x] What about the app name?
- [ ] Do we need a cache at the module level so we don't have to cross the native bridge everytime? (a benchmark should be done to decide this)
- [x] Make the cache aware of the current language and language change
