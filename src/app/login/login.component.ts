import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { VoterApiService } from '../services/voter-api.service';
import { LoginModel } from '../models/login.model';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,CanActivate {
  formModel=new LoginModel();
  displayOTPSection=false;
  displaySpinner=false;
  formBuilder = new FormBuilder();
  loginForm = this.formBuilder.group({
    aadhar_no: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(12)]],
    password: ['', Validators.required],
    upload_image: [,Validators.required],
    otp:['',[Validators.minLength(4),Validators.maxLength(4)]]
  });
  constructor(private router:Router,private _voterApiService:VoterApiService, private tokener: TokenService) { }

  ngOnInit() {    
  }

  submit(form:any) {    
  }

  canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<boolean>|Promise<boolean>| boolean{
    return true;
  }

  isOTPSectionShow(form:any){
    if(this.loginForm.invalid){
      this.loginForm.get('aadhar_no').markAllAsTouched();
      this.loginForm.get('password').markAllAsTouched();
      this.loginForm.get('upload_image').markAllAsTouched();
      return false;
    }
    this.formModel.AadharNumber=Number(form.aadhar_no);
    this.formModel.Password=form.password;
    this.displaySpinner=true;
    this._voterApiService.validateLogin(this.formModel)
    .subscribe(
      data=>
      {
        this.displaySpinner=false;
        if(!data.isSuccess){
         swal.fire("",data.message,"error");
          return false;
        }
        else{
          this.loginForm.controls['aadhar_no'].disable();
          this.loginForm.controls['password'].disable();
          this.loginForm.controls['upload_image'].disable();
          swal.fire("",data.message,"success");
          this.displayOTPSection=true;
        }
      }
    )
  }

  verifyOTP(form:any){
    if(this.loginForm.invalid){
      this.loginForm.get('otp').markAllAsTouched();
      return false;
    }
    this.formModel.ValidateVotingOtp=Number(form.otp);
    this.displaySpinner=true;
    this._voterApiService.validateLoginOTP(this.formModel)
    .subscribe(
      data=>
      {
        this.displaySpinner=false;
        if(!data.isSuccess){
         swal.fire("",data.message,"error");
          return false;
        }
        else{
          this._voterApiService.getPartyDetails(Number(this.formModel.AadharNumber))
          .subscribe(
            partyData=>{
              if(!partyData.isSuccess){
                swal.fire("",data.message,"error");
                return false;
              }
              else{
                this.tokener.setToken(partyData);
                this.router.navigateByUrl('/voting-screen');
              }
            }
          )
        }
      }
    )
  }
}
