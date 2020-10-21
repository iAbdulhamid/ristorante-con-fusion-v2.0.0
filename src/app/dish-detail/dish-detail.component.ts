import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  //@Input()dish: Dish;
  dish: Dish;

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    //this.dish = this.dishservice.getDish(id);

    //this.dishservice.getDish(id)
    //  .then(dish => this.dish = dish);

    this.dishservice.getDish(id)
      .subscribe(dish => this.dish = dish);
  }
  goBack(): void {
    this.location.back();
  }

}
