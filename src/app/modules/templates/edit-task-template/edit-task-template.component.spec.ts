import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskTemplateComponent } from './edit-task-template.component';

describe('EditTaskTemplateComponent', () => {
  let component: EditTaskTemplateComponent;
  let fixture: ComponentFixture<EditTaskTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
