import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFileNameComponent } from './change-file-name.component';

describe('ChangeFileNameComponent', () => {
  let component: ChangeFileNameComponent;
  let fixture: ComponentFixture<ChangeFileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFileNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
