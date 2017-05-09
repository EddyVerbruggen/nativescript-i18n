import * as application from 'tns-core-modules/application';
import './i18n';
import 'reflect-metadata';

import { Pipe, PipeTransform, NgModule } from '@angular/core';

/**
 * Translate in angular
 * Usage:
 *   value | L:args
 * Example:
 *   {{ 'My text' |  L:10:20.356}}
 *   formats to: Mi text 10 and 20.356
 *   if 'My text' is defined as <string name="My text" formatted="false">Mi text %d and %f</string>
 */
@Pipe({
    name: 'L'
})
export class L implements PipeTransform {
    transform(value: string, ...more: string[]): string {
        return application.getResources().L(value, ...more);
    }
}

@NgModule({
    declarations: [L],
    exports: [L]
})


export class NativeScriptI18nModule { }