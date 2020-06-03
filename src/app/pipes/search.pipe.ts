import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const search = args ? args : '';
    if (search) {
      let newData = [];
      value.forEach((row, index) => {
        newData.push({});
        Object.keys(row).forEach((key) => {
          if (Array.isArray(row[key])) {
            newData[index][key] = [];
            row[key].forEach((inner) => {
              const obj = {};
              Object.keys(inner).forEach((innerKey) => {
                obj[innerKey] = inner[innerKey];
              });
              newData[index][key].push(obj);
            });
          } else {
            newData[index][key] = row[key];
          }
        });
      });
      newData = newData.filter((waveType, index) => {
        const fields = ['name', 'status', 'startDate', 'endDate'];
        newData[index].templates = waveType.templates.filter((template) => {
          return fields.some((x) => {
            const ele = template[x].toLowerCase();
            return ele.indexOf(search.toLowerCase()) !== -1;
          });
        });
        return newData[index].templates && newData[index].templates.length;
      });
      return newData;
    } else {
      return value;
    }
    // return null;
  }
}
