import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nestedTemplateSearch",
})
export class NestedTemplateSearchPipe implements PipeTransform {
  transform(value: any, searchText?: any): any {
    if (!value) return [];
    if (!searchText) return value;
    searchText = searchText.toLowerCase();
    return value.filter((it) => {
      // console.log(it);
      let foundNested = false;
      it.items.filter((item) => {
        if (
          item.name.toLowerCase().includes(searchText) ||
          item.statusCd.toLowerCase().includes(searchText) ||
          item.progress.toString().includes(searchText) ||
          item.pluginName.toLowerCase().includes(searchText) ||
          item.startDate.toString().includes(searchText) ||
          item.endDate.toString().includes(searchText)
        ) {
          foundNested = true;
        }
      });
      return (
        it.name.toLowerCase().includes(searchText) ||
        it.statusCd.toLowerCase().includes(searchText) ||
        it.progress.toString().includes(searchText) ||
        foundNested
      );
    });
  }
}
