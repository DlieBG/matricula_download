import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChurchBook } from 'src/app/types/church-book.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChurchBookService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getChurchBooks(countryId: string, dioceseId: string, communityId: string): Observable<ChurchBook[]> {
    return this.httpClient.get<ChurchBook[]>(`${environment.api}/church-book/${countryId}/${dioceseId}/${communityId}`);
  }
  
  getChurchBook(countryId: string, dioceseId: string, communityId: string, churchBookId: string): Observable<ChurchBook> {
    return this.httpClient.get<ChurchBook>(`${environment.api}/church-book/${countryId}/${dioceseId}/${communityId}/${churchBookId}`);
  }
  
  queueChurchBookDownload(countryId: string, dioceseId: string, communityId: string, churchBookId: string): Observable<any> {
    return this.httpClient.patch(`${environment.api}/church-book/${countryId}/${dioceseId}/${communityId}/${churchBookId}`, {});
  }
  
}
