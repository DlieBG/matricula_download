import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from 'src/app/types/community.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCommunities(countryId: string, dioceseId: string): Observable<Community[]> {
    return this.httpClient.get<Community[]>(`${environment.api}/community/${countryId}/${dioceseId}`);
  }
  
  getCommunity(countryId: string, dioceseId: string, communityId: string): Observable<Community> {
    return this.httpClient.get<Community>(`${environment.api}/community/${countryId}/${dioceseId}/${communityId}`);
  }
  
}
