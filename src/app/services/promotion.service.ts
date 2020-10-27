import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  /*getPromotions(): Promise<Promotion[]> {
    //return Promise.resolve(PROMOTIONS);

    /*return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve(PROMOTIONS), 2000);
    });

    return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  }*/
  getPromotions(): Observable<Promotion[]> {
    //return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL + 'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  /*getPromotion(id: string): Promise<Promotion> {
    //return Promise.resolve( PROMOTIONS.filter((promo) => (promo.id === id))[0] );

    /*return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve( PROMOTIONS.filter((promo) => (promo.id === id))[0] ), 2000);
    });

    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).toPromise();
  }*/
  getPromotion(id: string): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  /*getFeaturedPromotion(): Promise<Promotion> {
    //return Promise.resolve( PROMOTIONS.filter((promotion) => promotion.featured)[0] );

    /*return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve( PROMOTIONS.filter((promotion) => promotion.featured)[0] ), 2000);
    });

    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
  }*/
  getFeaturedPromotion(): Observable<Promotion> {
    //return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
