import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDiscoverComponent } from './template-discover.component';

describe('TemplateDiscoverComponent', () => {
  let component: TemplateDiscoverComponent;
  let fixture: ComponentFixture<TemplateDiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDiscoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
