import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListDownloaderComponent } from './create-list-downloader.component';

describe('CreateListDownloaderComponent', () => {
  let component: CreateListDownloaderComponent;
  let fixture: ComponentFixture<CreateListDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListDownloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateListDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
