import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDownloaderPageComponent } from './list-downloader-page.component';

describe('ListDownloaderPageComponent', () => {
  let component: ListDownloaderPageComponent;
  let fixture: ComponentFixture<ListDownloaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDownloaderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDownloaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
