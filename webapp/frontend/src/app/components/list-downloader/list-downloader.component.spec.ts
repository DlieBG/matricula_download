import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDownloaderComponent } from './list-downloader.component';

describe('ListDownloaderComponent', () => {
  let component: ListDownloaderComponent;
  let fixture: ComponentFixture<ListDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDownloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
