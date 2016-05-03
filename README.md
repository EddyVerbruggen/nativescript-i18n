# nativescript-i18n (WIP)

This is a plugin for Nativescript that implements i18n in an easy manner.

It uses the native capabilities of each platform without the need of a separate JS or JSON file.

It is heavily inspired from [NativeLang](https://github.com/alejonext/NativeLang) and [this thread](https://github.com/NativeScript/NativeScript/issues/42)

The plugin defines an `L()` method at the application level so it will be accessible both from the XML and JS files.

###Usage

Just require `nativescript-i18n` and `globals` in app.js as early as possible (I do it even before I require the `application` module).

~~~
	require('globals');
	require('nativescript-i18n');
~~~

And use it like this (full example to come):

####XML files####

~~~
	<TabViewItem title="{{ L('tab_home') }}">
	<TabViewItem title="{{ L('tab_with_args',theFirstReplacement, theSecondReplacement) }}">
~~~

Assuming you have defined in **strings.xml** the definitions and in the model the replacement `theFirstReplacement, theSecondReplacement` variables

~~~
	<string name="tab_home">Home Tab</string>
	<string formatted="false" name="tab_with_args">Args: %s %s</string>
~~~

**!IMPORTANT** -  for all the strings definitions that have a replacement you need to add `formatted=false`

####JS files####
~~~
	console.log(L('tab_home'));
	console.log(L('tab_with_args', 'ONE', 'TWO'));
~~~	






### (pseudo) roadmap/ideas

The following ideas to be implemented are inspired by [this comment](https://github.com/NativeScript/NativeScript/issues/42#issuecomment-169202040)


- [x] Android implementation - use the native `strings.xml` in `App_Resources/Android/values/`
- [ ] iOS implementation -  use the native `Localizable.strings` files (where do we need to put this files?)
- [x] Allow formatted strings, eg: `L('hello', 'world')` to translate the definition `hello %s` (and/or other other types `%d`, etc)
- [ ] Possibly a cli tool/command to extract strings from our language function uses and put them into our strings.xml to be translated
- [ ] Move the strings.xml files in `app/i18n` (exact folder structure to be decided) and use them as a base for the next points
  - Build a "transaltor" for the iOS (and windows?) format
  - Build a hook to move the files in the right place before compiling
  - Merge strings found in the `App_Resources/Android/values/` folder if needed and signal conflicts (and kill the build process)
- [ ] What about assets (images/splash screens/etc) ?
- [ ] What about the app name? (or {N} takes care of it?)
- [ ] Do we need a cache at the module level so we don't have to cross the native bridge everytime? (a benchmark should be done to decide this)
