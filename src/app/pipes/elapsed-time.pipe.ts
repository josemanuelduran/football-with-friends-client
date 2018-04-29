import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'fwfElapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

    transform(value: string | Date): string {
        let result: string = null;
        let dateString: string = null;
        if (value != null) {

            if ((<Date>value).toDateString) {
                dateString = (<Date>value).toISOString();
            } else {
                dateString = <string>value;
            }

            let m = moment(dateString, moment.ISO_8601);

            if (!m.isValid()) {
                // Assume a string representing the time is passed
                m = moment(dateString, 'LT');
            }

            result = m.fromNow();
        }
        return result;
    }

}
