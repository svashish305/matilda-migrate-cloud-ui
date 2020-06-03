import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeftNavbarComponent } from './main-left-navbar.component';

describe('MainLeftNavbarComponent', () => {
  let component: MainLeftNavbarComponent;
  let fixture: ComponentFixture<MainLeftNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLeftNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
