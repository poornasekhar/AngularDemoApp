import { Injectable } from '@angular/core';
import { PartyDetails } from './models/party-details.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private partySubject = new BehaviorSubject<any>([]);
  public parties = this.partySubject.asObservable();
  constructor() { }
  // setToken(list: Array<any>): void {
  //   this.partySubject.next(list);
  // }
  setToken(partyData:any):void{
    this.partySubject.next(partyData);
  }
  isListed(): boolean {
    return !!this.partySubject.value && this.partySubject.value.partyDetails.length > 0
  }
}
