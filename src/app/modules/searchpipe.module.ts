import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchPipe } from "../pipes/search.pipe";
import { NestedSearchPipe } from "../pipes/nested-search.pipe";

@NgModule({
  declarations: [SearchPipe, NestedSearchPipe],
  imports: [CommonModule],
  exports: [SearchPipe, NestedSearchPipe],
  providers: [],
  bootstrap: [],
})
export class SearchPipeModule {}
