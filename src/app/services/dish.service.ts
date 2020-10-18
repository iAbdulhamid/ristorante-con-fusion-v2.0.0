import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {   
    //return Promise.resolve(DISHES);
    return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve(DISHES), 3000);
    });
  }
  
  getDish(id: string): Promise<Dish> {
    //return Promise.resolve( DISHES.filter((dish) => (dish.id === id))[0] );
    return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve( DISHES.filter((dish) => (dish.id === id))[0] ), 3000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    //return Promise.resolve( DISHES.filter((dish) => dish.featured)[0] );
    return new Promise(resolve=> {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve( DISHES.filter((dish) => dish.featured)[0] ), 3000);
    });
  }
}
