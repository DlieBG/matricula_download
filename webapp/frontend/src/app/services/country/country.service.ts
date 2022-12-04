import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/types/country.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${environment.api}/country/`);
  }
  
  getCountry(countryId: string): Observable<Country> {
    return this.httpClient.get<Country>(`${environment.api}/country/${countryId}`);
  }

}
