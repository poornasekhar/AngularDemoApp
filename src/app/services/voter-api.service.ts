import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { SignUpModel } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class VoterApiService {

  private apiURL='https://localhost:44369/api/';

  constructor(private httpclient:HttpClient) { }

  validateLogin(loginModel:LoginModel):Observable<any>{
    return this.httpclient.post(this.apiURL+'login/validateLogin',loginModel);
  }

  validateLoginOTP(loginModel:LoginModel):Observable<any>{
    return this.httpclient.post(this.apiURL+'login/validateLoginOTP',loginModel);
  }

  submitVote(aadharNumber:any,partyDetailId:any):Observable<any>{
    let urlParams = new URLSearchParams();
    urlParams.append('aadharNumber', aadharNumber);
    urlParams.append('partyDetailId', partyDetailId);
    return this.httpclient.post(this.apiURL+'login/validateLoginOTP',urlParams);
  }

  validateSignUp(signUpModel:SignUpModel):Observable<any>{
    return this.httpclient.post(this.apiURL+'signup/validateSignUp',signUpModel);
  }

  validateSignUpOTP(signUpModel:SignUpModel):Observable<any>{
    return this.httpclient.post(this.apiURL+'signup/validateSignUpOTP',signUpModel);
  }

  registerUser(signUpModel:SignUpModel):Observable<any>{
    return this.httpclient.post(this.apiURL+'signup/registerUser',signUpModel);
  }

  getPartyDetails(voterAadharNumber:any):Observable<any>{
    return this.httpclient.get(this.apiURL+'partydetail/getPartyDetails?aadharNumber='+voterAadharNumber);
  }

}
