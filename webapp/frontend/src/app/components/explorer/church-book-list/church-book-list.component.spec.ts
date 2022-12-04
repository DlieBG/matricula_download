import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchBookListComponent } from './church-book-list.component';

describe('ChurchBookListComponent', () => {
  let component: ChurchBookListComponent;
  let fixture: ComponentFixture<ChurchBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChurchBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
