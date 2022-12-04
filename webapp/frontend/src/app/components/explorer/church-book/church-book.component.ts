import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChurchBookService } from 'src/app/services/church-book/church-book.service';
import { CommunityService } from 'src/app/services/community/community.service';
import { CountryService } from 'src/app/services/country/country.service';
import { DioceseService } from 'src/app/services/diocese/diocese.service';
import { ChurchBook } from 'src/app/types/church-book.type';
import { Community } from 'src/app/types/community.type';
import { Country } from 'src/app/types/country.type';
import { Diocese } from 'src/app/types/diocese.type';

@Component({
  selector: 'app-church-book',
  templateUrl: './church-book.component.html',
  styleUrls: ['./church-book.component.scss']
})
export class ChurchBookComponent implements OnInit {

  country$!: Observable<Country>;
  diocese$!: Observable<Diocese>;
  community$!: Observable<Community>;
  churchBook$!: Observable<ChurchBook>;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private dioceseService: DioceseService,
    private communityService: CommunityService,
    private churchBookService: ChurchBookService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getCountry(params['countryId']);
        this.getDiocese(params['countryId'], params['dioceseId']);
        this.getCommunity(params['countryId'], params['dioceseId'], params['communityId']);
        this.getChurchBook(params['countryId'], params['dioceseId'], params['communityId'], params['churchBookId']);
      }
    );
  }

  getCountry(countryId: string) {
    this.country$ = this.countryService.getCountry(countryId);
  }

  getDiocese(countryId: string, dioceseId: string) {
    this.diocese$ = this.dioceseService.getDiocese(countryId, dioceseId);
  }

  getCommunity(countryId: string, dioceseId: string, communityId: string) {
    this.community$ = this.communityService.getCommunity(countryId, dioceseId, communityId);
  }

  getChurchBook(countryId: string, dioceseId: string, communityId: string, churchBookId: string) {
    this.churchBook$ = this.churchBookService.getChurchBook(countryId, dioceseId, communityId, churchBookId);
  }

}
