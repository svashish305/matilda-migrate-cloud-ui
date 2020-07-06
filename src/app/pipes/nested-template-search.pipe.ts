import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nestedTemplateSearch",
})
export class NestedTemplateSearchPipe implements PipeTransform {
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
  //         item.progress.toString().includes(searchText) ||
  //         item.pluginName.toString().includes(searchText) ||
  //         item.startDate.toString().includes(searchText) ||
  //         item.endDate.toString().includes(searchText)
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
    // if (search) {
    //   let newData = [];
    //   value.forEach((row, index) => {
    //     newData.push({});
    //     Object.keys(row).forEach((key) => {
    //       if (Array.isArray(row[key])) {
    //         newData[index][key] = [];
    //         row[key].forEach((inner) => {
    //           let obj = {};
    //           Object.keys(inner).forEach((innerKey) => {
    //             obj[innerKey] = inner[innerKey];
    //           });
    //           newData[index][key].push(obj);
    //         });
    //       } else {
    //         newData[index][key] = row[key];
    //       }
    //     });
    //   });
    //   newData = newData.filter((templateType, index) => {
    //     if (templateType.name.includes(search.toLowerCase())) {
    //       return newData[index];
    //     } else {
    //       let fields = [
    //         "name",
    //         "status",
    //         "progress",
    //         "pluginName",
    //         "startDate",
    //         "endDate",fff
    //       ];
    //       newData[index].items = templateType.items.filter((item) => {
    //         return fields.some((x) => {
    //           let ele = item[x].toString().toLowerCase();
    //           // console.log("ele ", ele);
    //           return ele.indexOf(search.toLowerCase()) != -1;
    //         });
    //       });
    //       return newData[index].items && newData[index].items.length;
    //     }
    //   });
    //   return newData;
    // } else {
    //   return value;
    // }
    // return null;

    let rootFields = ["name", "status", "progress"];
    let childFields = [
      "name",
      "pluginName",
      "status",
      "progress",
      "startDate",
      "endDate",
    ];
    let rootFound = false;
    let childFound = false;
    let groups = [];
    value.forEach((group) => {
      for (let i = 0; i < rootFields.length; i++) {
        if (
          group[rootFields[i]]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          rootFound = true;
        } else {
          let items = [];
          group.items.forEach((item) => {
            for (let i = 0; i < childFields.length; i++) {
              if (
                item[childFields[i]]
                  .toString()
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                childFound = true;
              }
            }
            if (childFound) {
              items.push(item);
              childFound = false;
            }
          });
          group.items = items;
        }
      }
      if (rootFound || childFound) {
        groups.push(group);
        rootFound = false;
        childFound = false;
      }
    });
    value = groups;
    return value;
  }
}
