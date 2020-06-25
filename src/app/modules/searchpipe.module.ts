import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchPipe } from "../pipes/search.pipe";
import { NestedTemplateSearchPipe } from "../pipes/nested-template-search.pipe";
import { NestedWorkflowSearchPipe } from "../pipes/nested-workflow-search.pipe";
import { NaiveSearchPipe } from "../pipes/naive-search.pipe";

@NgModule({
  declarations: [
    SearchPipe,
    NaiveSearchPipe,
    NestedTemplateSearchPipe,
    NestedWorkflowSearchPipe,
  ],
  imports: [CommonModule],
  exports: [
    SearchPipe,
    NaiveSearchPipe,
    NestedTemplateSearchPipe,
    NestedWorkflowSearchPipe,
  ],
  providers: [],
  bootstrap: [],
})
export class SearchPipeModule {}
