import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  dish: Dish;
  promotion: Promotion;
  featuredCorporateLeader: Leader;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderService: LeaderService) { }

  ngOnInit() {
    //this.dish = this.dishservice.getFeaturedDish();

    //this.dishservice.getFeaturedDish()
    //  .then(dish => this.dish = dish);

    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish);



    //this.promotion = this.promotionservice.getFeaturedPromotion();

    //this.promotionservice.getFeaturedPromotion()
    //  .then(promotion => this.promotion = promotion);
    
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);



    //this.featuredCorporateLeader = this.leaderService.getFeaturedLeader();

    //this.leaderService.getFeaturedLeader()
    //.then(featuredCorporateLeader => this.featuredCorporateLeader = featuredCorporateLeader);

    this.leaderService.getFeaturedLeader()
      .subscribe(featuredCorporateLeader => this.featuredCorporateLeader = featuredCorporateLeader);
  }

}
