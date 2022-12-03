import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateParserJob, ParserJob } from 'src/app/types/parser-job.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParserJobService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getParserJobs(): Observable<ParserJob[]> {
    return this.httpClient.get<ParserJob[]>(`${environment.api}/parser-job/`);
  }

  getParserJob(_id: string): Observable<ParserJob> {
    return this.httpClient.get<ParserJob>(`${environment.api}/parser-job/${_id}`);
  }

  createParserJob(parserJob: CreateParserJob): Observable<any> {
    return this.httpClient.post(`${environment.api}/parser-job/`, parserJob);
  }

  deleteParserJob(_id: string): Observable<any> {
    return this.httpClient.delete(`${environment.api}/parser-job/${_id}`);
  }

}
