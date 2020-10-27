import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }
  
  /*getDishes(): Promise<Dish[]> {   
    //return Promise.resolve(DISHES);
    
    //return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
      //  setTimeout(() => resolve(DISHES), 3000);
    //});

    return of(DISHES).pipe(delay(3000)).toPromise();
  }
  */
  getDishes(): Observable<Dish[]> {   
    //return of(DISHES).pipe(delay(3000));
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }
  
  /*getDish(id: string): Promise<Dish> {
    //return Promise.resolve( DISHES.filter((dish) => (dish.id === id))[0] );
    
    //return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
      //  setTimeout(() => resolve( DISHES.filter((dish) => (dish.id === id))[0] ), 3000);
    //});

    return of( DISHES.filter((dish) => (dish.id === id))[0] ).pipe(delay(3000)).toPromise();
  }*/
  getDish(id: string): Observable<Dish> {
    //return of( DISHES.filter((dish) => (dish.id === id))[0] ).pipe(delay(3000));
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  /*getFeaturedDish(): Promise<Dish> {
    //return Promise.resolve( DISHES.filter((dish) => dish.featured)[0] );
    
    //return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
      //  setTimeout(() => resolve( DISHES.filter((dish) => dish.featured)[0] ), 3000);
    //});

    return of( DISHES.filter((dish) => dish.featured)[0] ).pipe(delay(3000)).toPromise();
  }*/
  getFeaturedDish(): Observable<Dish> {
    //return of( DISHES.filter((dish) => dish.featured)[0] ).pipe(delay(3000));
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<string[] | any> {
    //return of(DISHES.map(dish => dish.id ));
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  putDish(dishCopy: Dish): Observable<Dish> {
    DISHES.push(dishCopy);
    return of (DISHES.filter((dish) => dish.id === dishCopy.id))[0];
  }
}
