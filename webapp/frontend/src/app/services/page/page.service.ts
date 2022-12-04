import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/types/page.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPages(countryId: string, dioceseId: string, communityId: string, churchBookId: string): Observable<Page[]> {
    return this.httpClient.get<Page[]>(`${environment.api}/page/${countryId}/${dioceseId}/${communityId}/${churchBookId}`);
  }
  
  getPage(countryId: string, dioceseId: string, communityId: string, churchBookId: string, pageId: string): Observable<Page> {
    return this.httpClient.get<Page>(`${environment.api}/page/${countryId}/${dioceseId}/${communityId}/${churchBookId}/${pageId}`);
  }
  
  queuePageDownload(countryId: string, dioceseId: string, communityId: string, churchBookId: string, pageId: string): Observable<any> {
    return this.httpClient.patch(`${environment.api}/page/${countryId}/${dioceseId}/${communityId}/${churchBookId}/${pageId}`, {});
  }
  
}
