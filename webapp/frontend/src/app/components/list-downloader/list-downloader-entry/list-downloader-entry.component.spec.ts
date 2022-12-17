import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDownloaderEntryComponent } from './list-downloader-entry.component';

describe('ListDownloaderEntryComponent', () => {
  let component: ListDownloaderEntryComponent;
  let fixture: ComponentFixture<ListDownloaderEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDownloaderEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDownloaderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
