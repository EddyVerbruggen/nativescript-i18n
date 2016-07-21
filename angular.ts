require('nativescript-i18n');
import { Pipe, PipeTransform } from '@angular/core';
/*
 * i18n
 * Translate in angular
 * Usage:
 *   value | i18n:args
 * Example:
 *   {{ 'My text' |  i18n:10}}
 *   formats to: Mi text 10
*/
@Pipe({
  name: 'i18n'
})
export class i18n implements PipeTransform {
  transform(value: string, more: string): string {
    return global.L(value, more);
  }
}
