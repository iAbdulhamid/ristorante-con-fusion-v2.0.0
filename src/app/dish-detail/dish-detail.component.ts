import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { expand, flyInOut, visibility } from '../animations/animations';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})
export class DishDetailComponent implements OnInit {

  //@Input()dish: Dish;
  dish: Dish;
  dishCopy: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  visibility = 'shown';
  
  @ViewChild('fform') commentFormDirective;
  commentForm: FormGroup;
  comment: Comment;
  //review: {name:"", stars:"", comment:""};
  
  formErrors = {
    'author': '',
    'rating': 5,
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    }
  };


  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL
              ) { 
                this.createForm();
               }

  ngOnInit(): void {
    //let id = this.route.snapshot.params['id'];
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden'; 
      return this.dishservice.getDish(params['id'])
    }))
    .subscribe(dish => { 
      this.dish = dish; 
      this.dishCopy = dish;
      this.setPrevNext(dish.id);
      this.visibility = 'shown'; 
    },
    errmess => this.errMess = <any>errmess);


    //this.dish = this.dishservice.getDish(id);
    //this.dishservice.getDish(id)
    //  .then(dish => this.dish = dish);
    //this.dishservice.getDish(id)
    //  .subscribe(dish => this.dish = dish);
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [5],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)] ],
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  
  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    
    this.comment.date = new Date().toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishCopy) 
      .subscribe(dish => {
          this.dish = dish;
          this.dishCopy = dish;
        },
        errmess => {
          this.dish = null;
          this.dishCopy = null;
          this.errMess = <any>errmess;
        });

    this.commentForm.reset({
      author: '' ,
      rating: 5 ,
      comment: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  
}
