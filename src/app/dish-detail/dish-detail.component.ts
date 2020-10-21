import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  //@Input()dish: Dish;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    //let id = this.route.snapshot.params['id'];
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { 
        this.dish = dish; 
        this.setPrevNext(dish.id); 
      });


    //this.dish = this.dishservice.getDish(id);
    //this.dishservice.getDish(id)
    //  .then(dish => this.dish = dish);
    //this.dishservice.getDish(id)
    //  .subscribe(dish => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
}
