import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'salaryDevide',
    standalone: true
})
export class SalaryDevidePipe implements PipeTransform {

    public transform(value: string): string {
        return this.reverseString(this.reverseString(value).replace(/(.{3})/g, '$1 '));
    }

    private reverseString(value: string): string {
        return [...value].reverse().join('');
    }

}