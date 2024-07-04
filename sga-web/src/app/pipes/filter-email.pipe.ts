import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmail',
  standalone: true,
})
export class FilterEmailPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any[] {
    const searchResult = [];
    for (const email of (value ?? [])) {
      if (
        email.email.toLowerCase().indexOf(args) > -1 ||
        email.email.toUpperCase().indexOf(args) > -1 ||
        email.email.indexOf(args) > -1
      ) {
        searchResult.push(email);
      }
    }
    return searchResult;
  }
}
