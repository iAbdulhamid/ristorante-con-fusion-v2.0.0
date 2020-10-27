import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  /*getLeaders(): Promise<Leader[]> {
    //return Promise.resolve(LEADERS);

    //return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
      //  setTimeout(() => resolve(LEADERS), 1000);
    //});

    return of(LEADERS).pipe(delay(1000)).toPromise();
  }*/
  getLeaders(): Observable<Leader[]> {
    //return of(LEADERS).pipe(delay(1000));
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  /*getLeader(id: string): Promise<Leader> {
    //return Promise.resolve( LEADERS.filter((leader) => (leader.id === id))[0] );

    /*return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve( LEADERS.filter((leader) => (leader.id === id))[0] ), 1000);
    });

    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(1000)).toPromise();
  }*/
  getLeader(id: string): Observable<Leader> {
    //return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(1000));
    return this.http.get<Leader>(baseURL + 'leadership/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  /*getFeaturedLeader(): Promise<Leader> {
    //return Promise.resolve( LEADERS.filter((leader) => leader.featured)[0] );

    /*return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve( LEADERS.filter((leader) => leader.featured)[0] ), 1000);
    });

    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(1000)).toPromise();
  }*/
  getFeaturedLeader(): Observable<Leader> {
    //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(1000));
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map((leader) => leader[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
}