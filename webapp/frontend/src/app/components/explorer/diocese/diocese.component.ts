import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/services/country/country.service';
import { DioceseService } from 'src/app/services/diocese/diocese.service';
import { Country } from 'src/app/types/country.type';
import { Diocese } from 'src/app/types/diocese.type';

@Component({
  selector: 'app-diocese',
  templateUrl: './diocese.component.html',
  styleUrls: ['./diocese.component.scss']
})
export class DioceseComponent implements OnInit {

  country$!: Observable<Country>;
  diocese$!: Observable<Diocese>;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private dioceseService: DioceseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getCountry(params['countryId']);
        this.getDiocese(params['countryId'], params['dioceseId']);
      }
    );
  }

  getCountry(countryId: string) {
    this.country$ = this.countryService.getCountry(countryId);
  }

  getDiocese(countryId: string, dioceseId: string) {
    this.diocese$ = this.dioceseService.getDiocese(countryId, dioceseId);
  }

}
