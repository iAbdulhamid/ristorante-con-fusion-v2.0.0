import { Component, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/animations';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
 
  leaders: Leader[];
  selectedLeader: Leader;
  leaderErrMess: string;

  constructor( private leaderService: LeaderService) { }

  ngOnInit(): void {
    //this.leaders = this.leaderService.getLeaders();

    //this.leaderService.getLeaders()
    //  .then( leaders => this.leaders = leaders);

    this.leaderService.getLeaders()
      .subscribe( leaders => this.leaders = leaders,
        errmess => this.leaderErrMess = errmess);
  }

  onSelect(leader: Leader) {
    this.selectedLeader = leader;
  }
}
