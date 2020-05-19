import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class IcpSessionService {

  private ICP_SESSION_API = '/icp/sessions';

  constructor(private readonly httpClient: HttpClient) {}

  public loadSession(caseId: string): Observable<any> {
    return this.httpClient
      .get(`${this.ICP_SESSION_API}/${caseId}`,
        { observe: 'response' , withCredentials: true })
      .pipe(map(response => response.body));
  }
}
