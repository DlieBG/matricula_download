import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListDownloaderPageComponent } from './add-list-downloader-page.component';

describe('AddListDownloaderPageComponent', () => {
  let component: AddListDownloaderPageComponent;
  let fixture: ComponentFixture<AddListDownloaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListDownloaderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListDownloaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
