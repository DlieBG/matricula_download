import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ListDownloaderService } from 'src/app/services/list-downloader/list-downloader.service';
import { CreateListDownloader} from 'src/app/types/list-downloader';

@Component({
  selector: 'app-create-list-downloader',
  templateUrl: './create-list-downloader.component.html',
  styleUrls: ['./create-list-downloader.component.scss']
})
export class CreateListDownloaderComponent {

  listDownloader: CreateListDownloader = {
    name: "Neue Liste"
  };

  constructor(
    private listDownloaderService: ListDownloaderService,
    private dialog: MatDialogRef<CreateListDownloaderComponent>
  ) { }

  createListDownloader() {
    this.listDownloaderService.createList(this.listDownloader).subscribe({
      next: () => {
        this.dialog.close();
      }
    });
  }

}
