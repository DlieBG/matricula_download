import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {ListDownloaderService} from 'src/app/services/list-downloader/list-downloader.service';
import {ListDownloader, ListDownloaderPage, StateFinished} from 'src/app/types/list-downloader';
import {AddListDownloaderPageComponent} from '../add-list-downloader-page/add-list-downloader-page.component';
import {ChangeFileNameComponent} from "../change-file-name/change-file-name.component";

@Component({
    selector: 'app-list-downloader-entry',
    templateUrl: './list-downloader-entry.component.html',
    styleUrls: ['./list-downloader-entry.component.scss']
})
export class ListDownloaderEntryComponent implements OnInit {

    list$!: Observable<ListDownloader>;

    states: Map<string, boolean> = new Map<string, boolean>;

    downloadAll$: Subject<void> = new Subject();
    saveAll$: Subject<void> = new Subject();

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private listDownloaderService: ListDownloaderService
    ) {
    }

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
        this.states.set(stateFinished._id, stateFinished.finished);
    }

    changeFileName(list: ListDownloader, index: number) {
        this.dialog.open(
            ChangeFileNameComponent,
            {
                data: list.pages[index].file_name
            }
        ).afterClosed().subscribe(
            (fileName) => {
                if (fileName) {
                    list.pages[index].file_name = fileName;

                    this.listDownloaderService.updateList(list._id, list).subscribe({
                        next: () => {
                            this.getListDownloader(list._id);
                        }
                    });
                }
            }
        );
    }

    deletePage(list: ListDownloader, index: number) {
        list.pages.splice(index, 1);

        this.listDownloaderService.updateList(list._id, list).subscribe({
            next: () => {
                this.getListDownloader(list._id);
            }
        });
    }

    notEmpty(): boolean {
        return this.states.size > 0;
    }

    downloadAll() {
        this.downloadAll$.next();
    }

    allFinished(pages: ListDownloaderPage[]): boolean {
        return this.states.size > 0 ? pages.every(
            (page) => {
                return this.states.get(page.page);
            }
        ) : false;
    }

    saveAll() {
        this.saveAll$.next();
    }

    addListDownloaderPage(list: ListDownloader) {
        this.dialog.open(
            AddListDownloaderPageComponent,
            {
                data: list.pages.length > 0 ? list.pages[list.pages.length - 1] : null
            }
        ).afterClosed().subscribe({
            next: (page: ListDownloaderPage) => {
                if (page)
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
