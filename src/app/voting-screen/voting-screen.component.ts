import { Component, OnInit } from '@angular/core';
import {PartyDetails } from '../models/party-details.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-voting-screen',
  templateUrl: './voting-screen.component.html',
  styleUrls: ['./voting-screen.component.scss']
})
export class VotingScreenComponent implements OnInit {
  partyDetails:PartyDetails[]=[
    new PartyDetails('Modi','BJP','../../assets/1-partysymbol.jpg'),
    new PartyDetails('Gandhi','CNG','../../assets/2-partysymbol.jpg'),
    new PartyDetails('PK','JSP','../../assets/3-partysymbol.jpg'),
    new PartyDetails('NCB','TDP','../../assets/4-partysymbol.jpg'),
    new PartyDetails('YSG','YSRCP','../../assets/5-partysymbol.jpg'),
    new PartyDetails('NOTA','NOTA','../../assets/6-partysymbol.jpg')
  ];
  constructor(private router:Router) { }

  submitVote(){
    alert("Congrats your vote submitted successfully");
    this.router.navigate(['/login']);
  }
  

  ngOnInit() {
  }

}
