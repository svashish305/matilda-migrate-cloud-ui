import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedWorkflowSearch',
})
export class NestedWorkflowSearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const search = args ? args : '';
    const rootFields = ['name', 'status', 'progress'];
    const childFields = ['name', 'status', 'progress'];
    let rootFound = false;
    let childFound = false;
    const groups = [];
    const tempValue = value.map((x: any) => Object.assign({}, x));
    tempValue.forEach((group) => {
      rootFound = false;
      const items = [];
      rootFields.forEach((rootFieldKey) => {
        if (
          !rootFound &&
          typeof group[rootFieldKey] !== 'object' &&
          group[rootFieldKey]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          rootFound = true;
          groups.push(group);
        }
      });
      if (!rootFound) {
        group.items.forEach((item) => {
          childFound = false;
          childFields.forEach((childFieldKey) => {
            if (
              !childFound &&
              item[childFieldKey]
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              childFound = true;
              items.push(item);
            }
          });
        });
        if (items.length) {
          group.items = items;
          groups.push(group);
        }
      }
    });
    return groups;
  }
}
