import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ListDownloaderService } from 'src/app/services/list-downloader/list-downloader.service';
import { ListDownloader, ListDownloaderPage, StateFinished } from 'src/app/types/list-downloader';
import { AddListDownloaderPageComponent } from '../add-list-downloader-page/add-list-downloader-page.component';

@Component({
  selector: 'app-list-downloader-entry',
  templateUrl: './list-downloader-entry.component.html',
  styleUrls: ['./list-downloader-entry.component.scss']
})
export class ListDownloaderEntryComponent implements OnInit {

  list$!: Observable<ListDownloader>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private listDownloaderService: ListDownloaderService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getListDownloader(params['_id']);
      }
    );
  }

  getListDownloader(_id: string) {
    this.list$ = this.listDownloaderService.getList(_id);
  }

  stateFinishedChange(stateFinished: StateFinished) {

  }

  addListDownloaderPage(list: ListDownloader) {
    this.dialog.open(
      AddListDownloaderPageComponent,
      {
        data: list.pages.length > 0 ? list.pages[list.pages.length - 1] : null
      }
    ).afterClosed().subscribe({
      next: (page: ListDownloaderPage) => {
        if(page)
          list.pages.push(page);
          this.listDownloaderService.updateList(list._id, list).subscribe({
            next: () => {
              this.getListDownloader(list._id);
            }
          });
      }
    });
  }

}
