import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, map, Observable, Subscription, tap} from 'rxjs';
import {PageService} from 'src/app/services/page/page.service';
import {ListDownloaderPage, StateFinished} from 'src/app/types/list-downloader';
import {Page} from 'src/app/types/page.type';
import {Country} from "../../../types/country.type";
import {Diocese} from "../../../types/diocese.type";
import {Community} from "../../../types/community.type";
import {ChurchBook} from "../../../types/church-book.type";
import {CountryService} from "../../../services/country/country.service";
import {DioceseService} from "../../../services/diocese/diocese.service";
import {CommunityService} from "../../../services/community/community.service";
import {ChurchBookService} from "../../../services/church-book/church-book.service";
import {PagePreviewComponent} from "../../explorer/page-preview/page-preview.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-list-downloader-page',
    templateUrl: './list-downloader-page.component.html',
    styleUrls: ['./list-downloader-page.component.scss']
})
export class ListDownloaderPageComponent implements OnInit, OnDestroy {

    @Input() listDownloaderPage!: ListDownloaderPage;
    @Input() index!: number | null;
    @Input() downloadAll!: Observable<void>;
    @Input() saveAll!: Observable<void>;

    @Output() stateFinishedChange: EventEmitter<StateFinished> = new EventEmitter<StateFinished>();
    @Output() fileNameChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() pageDelete: EventEmitter<number> = new EventEmitter<number>();

    country$!: Observable<Country>;
    diocese$!: Observable<Diocese>;
    community$!: Observable<Community>;
    churchBook$!: Observable<ChurchBook>;
    page!: Page;

    interval$!: Subscription;
    active = true;

    constructor(
        private countryService: CountryService,
        private dioceseService: DioceseService,
        private communityService: CommunityService,
        private churchBookService: ChurchBookService,
        private pageService: PageService,
        private dialog: MatDialog,
        private httpClient: HttpClient,
        private snackbar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.stateFinishedChange.next({
            _id: this.listDownloaderPage.page,
            finished: false
        });

        this.getCountry();
        this.getDiocese();
        this.getCommunity();
        this.getChurchBook();
        this.getPage();

        this.interval$ = interval(5000).subscribe(
            () => {
                this.getPage();
            }
        );

        this.downloadAll.subscribe(
            () => {
                console.log(this.index, this.page)
                if (this.active && this.page)
                    this.downloadPage(this.page);
            }
        );

        this.saveAll.subscribe(
            () => {
                if (this.active && this.page && this.listDownloaderPage)
                    this.savePage(this.page, this.listDownloaderPage.file_name);
            }
        );
    }

    ngOnDestroy(): void {
        this.interval$.unsubscribe();
        this.active = false;
    }

    getCountry() {
        this.country$ = this.countryService
            .getCountry(
                this.listDownloaderPage.country
            );
    }

    getDiocese() {
        this.diocese$ = this.dioceseService
            .getDiocese(
                this.listDownloaderPage.country,
                this.listDownloaderPage.diocese
            );
    }

    getCommunity() {
        this.community$ = this.communityService
            .getCommunity(
                this.listDownloaderPage.country,
                this.listDownloaderPage.diocese,
                this.listDownloaderPage.community
            );
    }

    getChurchBook() {
        this.churchBook$ = this.churchBookService
            .getChurchBook(
                this.listDownloaderPage.country,
                this.listDownloaderPage.diocese,
                this.listDownloaderPage.community,
                this.listDownloaderPage.church_book
            );
    }

    getPage() {
        this.pageService
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
                        this.stateFinishedChange.next({
                            _id: this.listDownloaderPage.page,
                            finished: page.s3.finished != null
                        });
                    }
                ),
            )
            .subscribe(
                (page) => {
                    this.page = page;
                }
            );
    }

    changeFileName() {
        if (this.index != null)
            this.fileNameChange.next(this.index);
    }

    deletePage() {
        if (this.index != null)
            this.pageDelete.next(this.index);
    }

    downloadPage(page: Page) {
        this.pageService.queuePageDownload(page.country, page.diocese, page.community, page.church_book, page.id).subscribe({
            next: () => {
                this.snackbar.open('Download gestartet', 'ok', {duration: 3000});
                this.getPage();
            }
        });
    }

    viewPage(page: Page) {
        this.dialog.open(
            PagePreviewComponent,
            {
                data: page,
                width: '100%',
                height: '90%'
            }
        );
    }

    savePage(page: Page, file_name: string) {
        if (page.s3.presigned_url)
            this.httpClient.get(page.s3.presigned_url, {responseType: 'blob' as 'json'})
                .subscribe((res: any) => {
                    const file = new Blob([res], {type: res.type});

                    const blob = window.URL.createObjectURL(file);
                    const link = document.createElement('a');
                    link.href = blob;
                    link.download = `${file_name}.jpg`;

                    link.dispatchEvent(new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    }));

                    setTimeout(() => {
                        window.URL.revokeObjectURL(blob);
                        link.remove();
                    }, 100);
                });
    }

}
