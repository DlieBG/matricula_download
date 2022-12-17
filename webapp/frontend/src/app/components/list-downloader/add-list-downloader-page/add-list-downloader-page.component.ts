import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ChurchBookService } from 'src/app/services/church-book/church-book.service';
import { CommunityService } from 'src/app/services/community/community.service';
import { CountryService } from 'src/app/services/country/country.service';
import { DioceseService } from 'src/app/services/diocese/diocese.service';
import { PageService } from 'src/app/services/page/page.service';
import { ChurchBook } from 'src/app/types/church-book.type';
import { Community } from 'src/app/types/community.type';
import { Country } from 'src/app/types/country.type';
import { Diocese } from 'src/app/types/diocese.type';
import { ListDownloaderPage } from 'src/app/types/list-downloader';
import { Page } from 'src/app/types/page.type';

@Component({
  selector: 'app-add-list-downloader-page',
  templateUrl: './add-list-downloader-page.component.html',
  styleUrls: ['./add-list-downloader-page.component.scss']
})
export class AddListDownloaderPageComponent implements OnInit {

  countries$!: Observable<Country[]> | null;
  dioceses$!: Observable<Diocese[]> | null;
  communities$!: Observable<Community[]> | null;
  churchBooks$!: Observable<ChurchBook[]> | null;
  pages$!: Observable<Page[]> | null;
  
  page: ListDownloaderPage = {} as ListDownloaderPage;

  constructor(
    private countryService: CountryService,
    private dioceseService: DioceseService,
    private communityService: CommunityService,
    private churchBookService: ChurchBookService,
    private pageService: PageService,
    private dialog: MatDialogRef<AddListDownloaderPageComponent>,
    @Inject(MAT_DIALOG_DATA)
    private lastPage: ListDownloaderPage | null
  ) { }

  ngOnInit(): void {
    this.countries$ = this.countryService.getCountries();

    if(this.lastPage) {
      this.page.country = this.lastPage.country;
      this.page.diocese = this.lastPage.diocese;
      this.page.community = this.lastPage.community;
      this.page.church_book = this.lastPage.church_book;

      this.dioceses$ = this.dioceseService.getDioceses(this.page.country);
      this.communities$ = this.communityService.getCommunities(this.page.country, this.page.diocese);
      this.churchBooks$ = this.churchBookService.getChurchBooks(this.page.country, this.page.diocese, this.page.community);
      this.pages$ = this.pageService.getPages(this.page.country, this.page.diocese, this.page.community, this.page.church_book);
    }
  }

  countryChange() {
    this.dioceses$ = this.dioceseService.getDioceses(this.page.country);
    this.communities$ = null;
    this.churchBooks$ = null;
    this.pages$ = null;
  }
  
  dioceseChange() {
    this.communities$ = this.communityService.getCommunities(this.page.country, this.page.diocese);
    this.churchBooks$ = null;
    this.pages$ = null;
  }
  
  communityChange() {
    this.churchBooks$ = this.churchBookService.getChurchBooks(this.page.country, this.page.diocese, this.page.community);
    this.pages$ = null;
  }
  
  churchBookChange() {
    this.pages$ = this.pageService.getPages(this.page.country, this.page.diocese, this.page.community, this.page.church_book);
  }

  isComplete() {
    return ['country', 'diocese', 'community', 'church_book', 'page', 'file_name'].every(
      (key) => {
        return (this.page as any)[key]
      }
    );
  }

  add() {
    this.dialog.close(this.page);
  }

}
