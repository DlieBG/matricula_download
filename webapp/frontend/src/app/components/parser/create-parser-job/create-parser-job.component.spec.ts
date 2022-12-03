import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParserJobComponent } from './create-parser-job.component';

describe('CreateParserJobComponent', () => {
  let component: CreateParserJobComponent;
  let fixture: ComponentFixture<CreateParserJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParserJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateParserJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
