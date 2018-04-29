import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fwfCapitalize'
})
export class CapitalizePipe implements PipeTransform {
    transform(value: string): string {
        let capitalize = value;
        if (capitalize && capitalize.length > 0) {
            capitalize = capitalize.substring(0, 1).toUpperCase() + capitalize.substring(1);
        }
        return capitalize;
    }
}
