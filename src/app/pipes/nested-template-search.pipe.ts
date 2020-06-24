import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nestedTemplateSearch",
})
export class NestedTemplateSearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let search = args ? args : "";
    if (search) {
      let newData = [];
      value.forEach((row, index) => {
        newData.push({});
        Object.keys(row).forEach((key) => {
          if (Array.isArray(row[key])) {
            newData[index][key] = [];
            row[key].forEach((inner) => {
              let obj = {};
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
      newData = newData.filter((templateType, index) => {
        if (templateType.name.includes(search.toLowerCase())) {
          return newData[index];
        } else {
          let fields = ["name", "statusCd", "progress", "startDate", "endDate"];
          newData[index].items = templateType.items.filter((item) => {
            return fields.some((x) => {
              let ele = item[x].toString().toLowerCase();
              // console.log("ele ", ele);
              return ele.indexOf(search.toLowerCase()) != -1;
            });
          });
          return newData[index].items && newData[index].items.length;
        }
      });
      return newData;
    } else {
      return value;
    }
    // return null;
  }
}
