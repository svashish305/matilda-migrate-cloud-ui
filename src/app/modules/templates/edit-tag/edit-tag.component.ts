import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Tag } from "src/app/models/data.models";
import * as uuid from "uuid";

@Component({
  selector: "app-edit-tag",
  templateUrl: "./edit-tag.component.html",
  styleUrls: ["./edit-tag.component.scss"],
})
export class EditTagComponent implements OnInit {
  @Input() tags: any[];
  firstFormGroup: FormGroup;
  newTagName = "";
  newTagValue = "";

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });

    // console.log("tags ", this.tags);
  }

  addTag() {
    // console.log("entered tag ", this.newTagName, this.newTagValue);
    const id = uuid.v4();
    let newTag: Tag = {
      id,
      name: this.newTagName,
      value: this.newTagValue,
      ...new Tag(),
    };
    this.tags.push(newTag);
    this.newTagName = "";
    this.newTagValue = "";
  }

  deleteTag(tagId) {
    this.tags = this.tags.filter((tag) => tag.id !== tagId);
  }
}
