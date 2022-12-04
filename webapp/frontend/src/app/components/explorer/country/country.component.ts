import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/services/country/country.service';
import { Country } from 'src/app/types/country.type';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country$!: Observable<Country>;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.getCountry(params['countryId']);
      }
    );
  }

  getCountry(countryId: string) {
    this.country$ = this.countryService.getCountry(countryId);
  }

}
