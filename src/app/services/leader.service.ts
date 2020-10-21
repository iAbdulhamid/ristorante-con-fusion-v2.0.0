import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  /*getLeaders(): Promise<Leader[]> {
    //return Promise.resolve(LEADERS);

    //return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
      //  setTimeout(() => resolve(LEADERS), 1000);
    //});

    return of(LEADERS).pipe(delay(1000)).toPromise();
  }*/
  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(1000));
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
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(1000));
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
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(1000));
  }
  
}