var i18nPlugin = require("./../i18n");

import {provide, PLATFORM_PIPES} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'i18n'})
export class i18n implements PipeTransform {
    transform(value: string, more: string): string {
        return global.L(value, more);
    }
}

exports.I18N_PROVIDERS = [provide(PLATFORM_PIPES, {useValue: [i18n], multi: true})];