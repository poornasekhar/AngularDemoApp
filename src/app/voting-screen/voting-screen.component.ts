import { Component, OnInit, AfterViewInit } from '@angular/core';
import {PartyDetails } from '../models/party-details.model';
import {Router} from '@angular/router';
import { VoterApiService } from '../services/voter-api.service';
import { TokenService } from '../token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voting-screen',
  templateUrl: './voting-screen.component.html',
  styleUrls: ['./voting-screen.component.scss']
})
export class VotingScreenComponent implements OnInit, AfterViewInit {
  voterName:string;
  voterAadharNumber:any;
  voterConstitute:string;
  partyDetails:PartyDetails[]=[
    new PartyDetails('Modi','BJP','../../assets/1-partysymbol.jpg'),
    new PartyDetails('Gandhi','CNG','../../assets/2-partysymbol.jpg'),
    new PartyDetails('PK','JSP','../../assets/3-partysymbol.jpg'),
    new PartyDetails('NCB','TDP','../../assets/4-partysymbol.jpg'),
    new PartyDetails('YSG','YSRCP','../../assets/5-partysymbol.jpg'),
    new PartyDetails('NOTA','NOTA','../../assets/6-partysymbol.jpg')
  ];
  constructor(private router:Router,private _voterApiService:VoterApiService, private tokener: TokenService) { }

  submitVote(){
    Swal.fire("","Congrats your vote submitted successfully","success");
    this.router.navigate(['/login']);
  }
  
  ngAfterViewInit() {
    this.tokener.parties.subscribe((val) => 
    {
      this.partyDetails = val.partyDetails;
      this.voterName=val.voterName;
      this.voterAadharNumber=val.aadharNumber;
      this.voterConstitute=val.constituteName;
    });
  }
  ngOnInit() {
  }

}
