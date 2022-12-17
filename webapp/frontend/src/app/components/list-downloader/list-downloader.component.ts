import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ListDownloaderService } from 'src/app/services/list-downloader/list-downloader.service';
import { ListDownloader } from 'src/app/types/list-downloader';
import { CreateListDownloaderComponent } from './create-list-downloader/create-list-downloader.component';

@Component({
  selector: 'app-list-downloader',
  templateUrl: './list-downloader.component.html',
  styleUrls: ['./list-downloader.component.scss']
})
export class ListDownloaderComponent implements OnInit {

  lists$!: Observable<ListDownloader[]>;

  displayedColumns: string[] = ['name', 'action'];

  constructor(
    private listDownloaderService: ListDownloaderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.lists$ = this.listDownloaderService.getLists();
  }

  createListDownloader() {
    this.dialog
      .open(
        CreateListDownloaderComponent
      )
      .afterClosed()
      .subscribe({
        next: () => {
          this.getLists();
        }
      });
  }
  
  deleteListDownloader(_id: string) {
    this.listDownloaderService.deleteList(_id).subscribe({
      next: () => {
        this.getLists();
      }
    });
  }
  
}
