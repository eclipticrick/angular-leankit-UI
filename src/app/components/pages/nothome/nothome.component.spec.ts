import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NothomeComponent } from './nothome.component';

describe('NothomeComponent', () => {
  let component: NothomeComponent;
  let fixture: ComponentFixture<NothomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NothomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NothomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
