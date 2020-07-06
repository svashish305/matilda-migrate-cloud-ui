import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGeneralConfigComponent } from './task-general-config.component';

describe('TaskGeneralConfigComponent', () => {
  let component: TaskGeneralConfigComponent;
  let fixture: ComponentFixture<TaskGeneralConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskGeneralConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGeneralConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
