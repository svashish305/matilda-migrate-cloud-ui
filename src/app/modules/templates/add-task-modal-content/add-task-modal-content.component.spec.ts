import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskModalContentComponent } from './add-task-modal-content.component';

describe('AddTaskModalContentComponent', () => {
  let component: AddTaskModalContentComponent;
  let fixture: ComponentFixture<AddTaskModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
