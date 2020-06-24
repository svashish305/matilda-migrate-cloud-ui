import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchPipe } from "../pipes/search.pipe";
import { NestedTemplateSearchPipe } from "../pipes/nested-template-search.pipe";
import { NestedWorkflowSearchPipe } from "../pipes/nested-workflow-search.pipe";

@NgModule({
  declarations: [
    SearchPipe,
    NestedTemplateSearchPipe,
    NestedWorkflowSearchPipe,
  ],
  imports: [CommonModule],
  exports: [SearchPipe, NestedTemplateSearchPipe, NestedWorkflowSearchPipe],
  providers: [],
  bootstrap: [],
})
export class SearchPipeModule {}
