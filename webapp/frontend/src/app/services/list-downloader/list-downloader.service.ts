import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateListDownloader, ListDownloader } from 'src/app/types/list-downloader';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListDownloaderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getLists(): Observable<ListDownloader[]> {
    return this.httpClient.get<ListDownloader[]>(`${environment.api}/list-downloader`);
  }

  getList(_id: string): Observable<ListDownloader> {
    return this.httpClient.get<ListDownloader>(`${environment.api}/list-downloader/${_id}`);
  }

  createList(list: CreateListDownloader): Observable<any> {
    return this.httpClient.post(`${environment.api}/list-downloader`, list);
  }

  updateList(_id: string, list: ListDownloader): Observable<any> {
    return this.httpClient.put(`${environment.api}/list-downloader/${_id}`, list);
  }

  deleteList(_id: string): Observable<any> {
    return this.httpClient.delete(`${environment.api}/list-downloader/${_id}`);
  }

}
