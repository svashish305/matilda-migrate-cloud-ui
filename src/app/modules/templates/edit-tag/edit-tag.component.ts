import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-tag",
  templateUrl: "./edit-tag.component.html",
  styleUrls: ["./edit-tag.component.scss"],
})
export class EditTagComponent implements OnInit {
  @Input() tags: any[];
  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });

    // console.log("tags ", this.tags);
  }
}
