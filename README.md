# nativescript-i18n

This is a plugin for Nativescript that implements i18n in an easy manner.

It uses the native capabilities of each platform without the need of a separate JS or JSON file.

It is heavily inspired from [NativeLang](https://github.com/alejonext/NativeLang) and [this thread](https://github.com/NativeScript/NativeScript/issues/42)

The plugin defines an `L()` method at the application level so it will be accessible both from the XML and JS files.

###! Please don't forget to read the [IMPORTANT section](https://github.com/rborn/nativescript-i18n#important-) ! :smile: ###


###Credits
Thanks to [@TheBrousse](https://twitter.com/TheBrousse) and [@ValioStoychev](https://twitter.com/valiostoychev) for the help with iOS and [@alejonext](https://github.com/alejonext/NativeLang) for creating the initial module.

Also a big thanks to all the [contributors](https://github.com/rborn/nativescript-i18n/graphs/contributors) that made this repo better :)

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


To define a custom path for the i18n files (other than `App_Resources/i18n`), add this configuration to your project's package.json

~~~
"nativescript-i18n": {
    "customLangPath": "app/resources/i18n"
}
~~~


Language defaults to english if the phone's language doesn't match any of your defined languages. If you want to set your own default language, add this configuration to your project's package.json

**Keep in mind that on iOS the language picked by the device will be based on the order in** `Settings` -> `Language & Region` -> `Preferred language order`

~~~
"nativescript-i18n": {
    "defaultLang": "es"
}
~~~

####IMPORTANT !!####

-  for all the strings definitions that have a replacement you need to add `formatted=false`
-  quotes and apostrophes need to be escaped `<string name="with_quotes">Apostrophe: \' and quotes: \"</string>`
-  We need to add in strings.xml the next two lines for the app to compile properly which **also makes the app name localized on both ios and android and sets the title of the initial activity on android**

	~~~
	<string name="app_name">demo</string>
	<string name="title_activity_kimera">demo</string>
	~~~
- **Sometimes you might need to fully delete the app from the device/sim for the plugin to fully work** (usually only when the plugin is installed at a later stage of the project development)
- If you get TypeScript complaining about L not being defined, then put `/// <reference path="./node_modules/nativescript-i18n/references.d.ts" /> Nativescript i18n` in your `references.d.ts`.

####JS files####
~~~
	console.log(L('home'));
	console.log(L('multi_replace', 'ONE', 'TWO'));
~~~

####Angular####

~~In case you use Angular for your app, things get a little more complicated.~~

My Angular skills are zero but [@alejonext](https://github.com/alejonext/NativeLang) has a solution for it in this [comment](https://github.com/rborn/nativescript-i18n/issues/2#issuecomment-233828647).


**Update 28.06.2016**

[@AirMike](https://github.com/AirMike) and [@loloof64](https://github.com/loloof64) did a great job by testing and further improving [@alejonext's PR](https://github.com/rborn/nativescript-i18n/pull/6) so the plugin includes now support for Angular :bow:

After you import the plugin in the app in the usual way just need to import the module `NativeScriptI18nModule` from `nativescript-i18n/angular` in your file (main.ts)

(Please be aware that the below intructions are in typescript not pure js)

~~~
	import { NativeScriptI18nModule } from "nativescript-i18n/angular";
~~~

and then import it in your app module

~~~
	@NgModule({


      imports: [
        NativeScriptI18nModule
      ]


    })
    export class AppModule { }
~~~

Angular usage is `{{ value | L:args }}`

~~~
	<Button text="{{ 'Login' | L }}"></Button>
~~~

As for a more detailed example :

You can put a code like this in your main.ts :

~~~
    import { NativeScriptI18nModule } from 'nativescript-i18n/angular';

    import { NativeScriptModule } from "nativescript-angular/platform";
    import { NgModule } from "@angular/core";
    import { AppComponent } from "./app.component";


    @NgModule({

      imports: [
        NativeScriptModule,
        NativeScriptI18nModule
      ],

      declarations: [
        AppComponent,
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
~~~

For the main component, let's say that the following html template is used (the strings definitions follow next):

~~~
    <GridLayout rows="*,*,*">
        <label row="0" text="{{'menuitem_new_file' | L }}"></label>
        <label row="1" text="{{'menuitem_new_folder' | L }}"></label>
        <label row="2" text="{{'menuitem_new' | L:'---':'***':124.25693 }}"></label>
    </GridLayout>
~~~

And let's say that these are the string definitions for "en" (put in app/i18n/en/strings.xml)

~~~
    <resources>
        <string name="app_name">Chess Exercices Cupboard</string>
        <string name="title_activity_kimera">Chess Exercices Cupboard</string>

        <string formatted="false" name="menuitem_new">%s New... %s %0.2f</string>
        <string name="menuitem_new_file">File</string>
        <string name="menuitem_new_folder">Folder</string>
    </resources>
~~~

And the french translations (put in app/i18n/fr/srings.xml)

~~~
    <resources>
        <string name="app_name">Chess Exercices Cupboard</string>
        <string name="title_activity_kimera">Chess Exercices Cupboard</string>

        <string formatted="false" name="menuitem_new">%s Nouveau... %s %0.2f</string>
        <string name="menuitem_new_file">Fichier</string>
        <string name="menuitem_new_folder">Dossier</string>
    </resources>
~~~

Then if your phone is configured for french you'll see something like this :

~~~
    Fichier
    Dossier
    --- Nouveau... *** 124.25693
~~~

Or, if configured for english or "unrecognized" language :

~~~
    File
    Folder
    --- New... *** 124.25693
~~~

####Demo####
Please have a look in the `demo` folder for a working example.

### iOS Permission text

Add this special keys to app/i18n/(lang)/strings.xml. To notify user, in configured language while showing permission alerts.

| Key                                       | Description of key   |  
| ----------------------------------------- | ---------------------| 
|NSAppleMusicUsageDescription               | Specifies the reason for your app to use the media library|   
|NSBluetoothPeripheralUsageDescription      | Specifies the reason for your app to use Bluetooth|   
|NSCalendarsUsageDescription                | Specifies the reason for your app to access the user’s calendars|   
|NSCameraUsageDescription                   | Specifies the reason for your app to access the device’s camera|     
|NSContactsUsageDescription                 | Specifies the reason for your app to access the user’s contacts|   
|NSHealthShareUsageDescription              | Specifies the reason for your app to read the user’s health data|    
|NSHealthUpdateUsageDescription             | Specifies the reason for your app to make changes to the user’s health data|   
|NSHomeKitUsageDescription                  | Specifies the reason for your app to access the user’s HomeKit configuration data|   
|NSLocationAlwaysUsageDescription           | Specifies the reason for your app to access the user’s location information at all times|   
|NSLocationWhenInUseUsageDescription        | Specifies the reason for your app to access the user’s location information while your app is in use|   
|NSMicrophoneUsageDescription               | Specifies the reason for your app to access any of the device’s microphones|   
|NSMotionUsageDescription                   | Specifies the reason for your app to access the device’s accelerometer|   
|NSPhotoLibraryUsageDescription             | Specifies the reason for your app to access the user’s photo library|     
|NSRemindersUsageDescription                | Specifies the reason for your app to access the user’s reminders|    
|NSSiriUsageDescription                     | Specifies the reason for your app to send user data to Siri|  
|NSSpeechRecognitionUsageDescription        | Specifies the reason for your app to send user data to Apple’s speech recognition servers|       


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
- [x] Angular support
- [x] Custom path for the language files ([#28](https://github.com/rborn/nativescript-i18n/issues/28))
- [x] Set default language for app ([#11](https://github.com/rborn/nativescript-i18n/issues/11))
- [x] Show translations on app permission alerts ([#45](https://github.com/rborn/nativescript-i18n/issues/45))
- [ ] Report errors on case some files could not be created
