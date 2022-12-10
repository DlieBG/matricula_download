import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PageService } from 'src/app/services/page/page.service';
import { ListDownloaderPage, StateFinished } from 'src/app/types/list-downloader';
import { Page } from 'src/app/types/page.type';

@Component({
  selector: 'app-list-downloader-page',
  templateUrl: './list-downloader-page.component.html',
  styleUrls: ['./list-downloader-page.component.scss']
})
export class ListDownloaderPageComponent implements OnInit {

  @Input() listDownloaderPage!: ListDownloaderPage;
  @Output() stateFinishedChange: EventEmitter<StateFinished> = new EventEmitter<StateFinished>;

  page$!: Observable<Page>;

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.page$ = this.pageService
      .getPage(
        this.listDownloaderPage.country,
        this.listDownloaderPage.diocese,
        this.listDownloaderPage.community,
        this.listDownloaderPage.church_book,
        this.listDownloaderPage.page
      )
      .pipe(
        tap(
          (page) => {
            console.log(page);
          }
        )
      );
  }

}
