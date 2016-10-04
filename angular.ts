require('./i18n');
import 'reflect-metadata';

import {provide, PLATFORM_PIPES} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';

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
        return global.L(value, ...more);
    }
}

//export const I18N_PROVIDERS = [provide(PLATFORM_PIPES, {useValue: [L], multi: true})];
