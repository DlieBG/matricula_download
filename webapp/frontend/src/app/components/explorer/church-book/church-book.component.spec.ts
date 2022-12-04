import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchBookComponent } from './church-book.component';

describe('ChurchBookComponent', () => {
  let component: ChurchBookComponent;
  let fixture: ComponentFixture<ChurchBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChurchBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
