import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { PageService } from 'src/app/services/page/page.service';
import { ChurchBook } from 'src/app/types/church-book.type';
import { Community } from 'src/app/types/community.type';
import { Country } from 'src/app/types/country.type';
import { Diocese } from 'src/app/types/diocese.type';
import { Page } from 'src/app/types/page.type';
import { CreateParserJobComponent } from '../../parser/create-parser-job/create-parser-job.component';
import { PagePreviewComponent } from '../page-preview/page-preview.component';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  @Input() country!: Country;
  @Input() diocese!: Diocese;
  @Input() community!: Community;
  @Input() churchBook!: ChurchBook;

  pages$!: Observable<Page[]>;

  displayedColumns: string[] = ['label', 'comment', 'time', 'error', 'status', 'action'];

  constructor(
    private pageService: PageService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPages(this.country.id, this.diocese.id, this.community.id, this.churchBook.id);
  }
  
  getPages(countryId: string, dioceseId: string, communityId: string, churchBookId: string) {
    this.pages$ = this.pageService.getPages(countryId, dioceseId, communityId, churchBookId).pipe(
      map(
        (pages: Page[]) => {
          return pages ? pages : [];
        }
      )
    );
  }

  downloadPage(page: Page) {
    this.pageService.queuePageDownload(page.country, page.diocese, page.community, page.church_book, page.id).subscribe({
      next: () => {
        this.snackbar.open('Download gestartet', 'ok', { duration: 3000 });
        this.getPages(this.country.id, this.diocese.id, this.community.id, this.churchBook.id);
      }
    });
  }

  createParserJob(churchBook: ChurchBook) {
    this.dialog.open(
      CreateParserJobComponent, {
      data: {
        country_regex: churchBook.country,
        diocese_regex: churchBook.diocese,
        community_regex: churchBook.community,
        page_skip: false
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

  savePage(page: Page) {
    if(page.s3.presigned_url)
      this.httpClient.get(page.s3.presigned_url, {responseType: 'blob' as 'json'})
        .subscribe((res: any) => {
          const file = new Blob([res], {type: res.type});

          const blob = window.URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = blob;
          link.download = `${page.id}.jpg`;

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
