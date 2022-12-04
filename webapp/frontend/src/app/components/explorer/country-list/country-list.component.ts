import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { elementAt, Observable } from 'rxjs';
import { CountryService } from 'src/app/services/country/country.service';
import { Country } from 'src/app/types/country.type';
import { CreateParserJobComponent } from '../../parser/create-parser-job/create-parser-job.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  countries$!: Observable<Country[]>;
  
  displayedColumns: string[] = ['name', 'count', 'action'];

  constructor(
    private countryService: CountryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.countries$ = this.countryService.getCountries();
  }

  createParserJob(country: Country) {
    this.dialog.open(
      CreateParserJobComponent, {
      data: {
        country_regex: country.id
      }
    });
  }

}
