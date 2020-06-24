import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nestedSearch",
})
export class NestedSearchPipe implements PipeTransform {
  transform(value: any, searchText?: any): any {
    if (!value) return [];
    if (!searchText) return value;
    searchText = searchText.toLowerCase();
    return value.filter((it) => {
      console.log(it);
      return (
        it.name.toLowerCase().includes(searchText) ||
        it.statusCd.toLowerCase().includes(searchText) ||
        it.progress.toString().includes(searchText)
        // ||
        // (it.groups && it.groups.userAge.toString().includes(searchText)) ||
        // it.userid.userName.toLowerCase().includes(searchText)
      );
    });
  }
}
