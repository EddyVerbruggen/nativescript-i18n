require('./i18n');

import {provide, PLATFORM_PIPES} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';

/**
 * Translate in angular
 * Usage:
 *   value | L:args
 * Example:
 *   {{ 'My text' |  L:10}}
 *   formats to: Mi text 10
 */
@Pipe({
	name: 'L'
})
export class L implements PipeTransform {
    transform(value: string, more: string): string {
        return global.L(value, more);
    }
}

export const I18N_PROVIDERS = [provide(PLATFORM_PIPES, {useValue: [L], multi: true})];