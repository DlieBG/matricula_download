import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diocese } from 'src/app/types/diocese.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DioceseService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getDioceses(countryId: string): Observable<Diocese[]> {
    return this.httpClient.get<Diocese[]>(`${environment.api}/diocese/${countryId}`);
  }
  
  getDiocese(countryId: string, dioceseId: string): Observable<Diocese> {
    return this.httpClient.get<Diocese>(`${environment.api}/diocese/${countryId}/${dioceseId}`);
  }
  
}
