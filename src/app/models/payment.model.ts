export enum Month {
    JANUARY = 'JANUARY',
    FEBRUARY = 'FEBRUARY',
    MARCH = 'MARCH',
    APRIL = 'APRIL',
    MAY = 'MAY',
    JUNE = 'JUNE',
    JULY = 'JULY',
    AUGUST = 'AUGUST',
    SEPTEMBER = 'SEPTEMBER',
    OCTOBER = 'OCTOBER',
    NOVEMBER = 'NOVEMBER',
    DECEMBER = 'DECEMBER'
}

export namespace Month {

    export function getMonth(index: number): Month {
        let result = Month.JANUARY;
        switch (index) {
            case 0:
                break;
            case 1:
                result = Month.FEBRUARY;
                break;
            case 2:
                result = Month.MARCH;
                break;
            case 3:
                result = Month.APRIL;
                break;
            case 4:
                result = Month.MAY;
                break;
            case 5:
                result = Month.JUNE;
                break;
            case 6:
                result = Month.JULY;
                break;
            case 7:
                result = Month.AUGUST;
                break;
            case 8:
                result = Month.SEPTEMBER;
                break;
            case 9:
                result = Month.OCTOBER;
                break;
            case 10:
                result = Month.NOVEMBER;
                break;
            case 11:
                result = Month.DECEMBER;
                break;

        }
        return result;
    }

    export function getIndex(month: Month): number {
        let result = 0;
        switch (month) {
            case Month.JANUARY:
                break;
            case  Month.FEBRUARY:
                result = 1;
                break;
            case Month.MARCH:
                result = 2;
                break;
            case  Month.APRIL:
                result = 3;
                break;
            case Month.MAY:
                result = 4;
                break;
            case Month.JUNE:
                result = 5;
                break;
            case Month.JULY:
                result = 6;
                break;
            case Month.AUGUST:
                result = 7;
                break;
            case Month.SEPTEMBER:
                result = 8;
                break;
            case Month.OCTOBER:
                result = 9;
                break;
            case Month.NOVEMBER:
                result = 10;
                break;
            case Month.DECEMBER:
                result = 11;
                break;

        }
        return result;
    }

}

export interface Payment {
    id?: string;
    playerId: string;
    year: number;
    month?: Month;
    monthIndex?: number;
    matchDate?: string;
    paymentDate?: Date;
    paid: boolean;
    amount: number;
    name?: string;
}
