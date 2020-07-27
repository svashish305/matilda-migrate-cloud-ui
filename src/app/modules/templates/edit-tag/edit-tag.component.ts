import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Tag } from 'src/app/utils/models/data.model';
import { Utilities } from 'src/app/utils/helpers/utilities';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss'],
})
export class EditTagComponent implements OnInit {
  @Input() tags: any[] = [];
  @Output() newTags: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private _utilities: Utilities) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      configuredTags: this._formBuilder.array([this.addNewTag()]),
    });

    if(this.tags && this.tags.length > 0) {
      this.configuredTags.removeAt(0);
      this.tags.forEach(_tag => this.configuredTags.push(this.addNewTag(_tag, 'auto')));
    }

    // this.form.valueChanges.subscribe(val => {
    //   console.log(val);
    //   console.log(this.form);
    //   this.newTags.emit({tags: val.configuredTags, valid: this.form.valid })
    // });
  }

  valueChange(form: any) {
    this.newTags.emit({tags: form.value.configuredTags, valid: form.valid, operation: 'update'});
  }

  addNewTag(tag?: Tag, eventTrigger?: string) {
    const newTag = this._formBuilder.group({
      id: [tag ? tag.id : this._utilities.generateId(), Validators.nullValidator],
      name: [tag ? tag.name : '', Validators.required],
      value: [tag ? tag.value : '', Validators.required]
    });
    return newTag;
  }

  addTag() {
    this.configuredTags.push(this.addNewTag(null, 'manual'));
  }

  deleteTag(index: number, form?:any) {
    this.configuredTags.removeAt(index);
    this.newTags.emit({tags: this.form.value.configuredTags, valid: this.form.valid, operation: 'delete'});
  }

  get configuredTags() {
    return this.form.get('configuredTags') as FormArray;
  }

}
