import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nestedWorkflowSearch",
})
export class NestedWorkflowSearchPipe implements PipeTransform {
  // transform(value: any, searchText?: any): any {
  //   if (!value) return [];
  //   if (!searchText) return value;
  //   searchText = searchText.toLowerCase();
  //   return value.filter((it) => {
  //     // console.log(it);
  //     let foundNested = false;
  //     it.items.filter((item) => {
  //       if (
  //         item.name.toLowerCase().includes(searchText) ||
  //         item.status.toLowerCase().includes(searchText) ||
  //         item.progress.toString().includes(searchText)
  //       ) {
  //         foundNested = true;
  //       }
  //     });
  //     return (
  //       it.name.toLowerCase().includes(searchText) ||
  //       it.status.toLowerCase().includes(searchText) ||
  //       it.progress.toString().includes(searchText) ||
  //       foundNested
  //     );
  //   });
  // }

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
      newData = newData.filter((waveType, index) => {
        if (waveType.name.includes(search.toLowerCase())) {
          return newData[index];
        } else {
          let fields = ["name", "status", "progress"];
          newData[index].items = waveType.items.filter((item) => {
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
