import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VoterApiService } from '../services/voter-api.service';
import swal from 'sweetalert2';
import { SignUpModel } from '../models/signup.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formModel=new SignUpModel();
  displayOTPSection:boolean=false;
  displaySpinner:boolean=false;
  formBuilder = new FormBuilder();
  signUpForm = this.formBuilder.group({
    aadhar_no:['',[Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
    name:['',Validators.required],
    phone:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
    confirm_password:['',Validators.required],
    upload_image: [,Validators.required],
    otp:['',[Validators.minLength(4),Validators.maxLength(4)]]
  });

  constructor(private router:Router, private _voterApiService:VoterApiService) { }

  ngOnInit() {
  }

  submit(){}

  isShowOTPSection(form:any){
    if(this.signUpForm.invalid){
      this.signUpForm.get('aadhar_no').markAllAsTouched();
      this.signUpForm.get('name').markAllAsTouched();
      this.signUpForm.get('phone').markAllAsTouched();
      this.signUpForm.get('email').markAllAsTouched();
      this.signUpForm.get('password').markAllAsTouched();
      this.signUpForm.get('confirm_password').markAllAsTouched();
      this.signUpForm.get('upload_image').markAllAsTouched();
      return false;
    }
    this.formModel.AadharNumber=Number(form.aadhar_no);
    this.formModel.Name=form.name;
    this.formModel.PhoneNumber=Number(form.phone);
    this.formModel.EmailAddress=form.email;    
    this.formModel.Password=form.password;
    this.displaySpinner=true;
    this._voterApiService.validateSignUp(this.formModel)
    .subscribe(
      data=>
      {
        this.displaySpinner=false;
        if(!data.isSuccess){
         swal.fire("",data.message,"error");
          return false;
        }
        else{
          this.signUpForm.controls['aadhar_no'].disable();
          this.signUpForm.controls['name'].disable();
          this.signUpForm.controls['phone'].disable();
          this.signUpForm.controls['email'].disable();
          this.signUpForm.controls['password'].disable();
          this.signUpForm.controls['confirm_password'].disable();
          this.signUpForm.controls['upload_image'].disable();
          swal.fire("",data.message,"success");
          this.displayOTPSection=true;
        }
      }
    )
  }

  verifyOTP(form:any){
    if(this.signUpForm.invalid){
      this.signUpForm.get('otp').markAllAsTouched();
      return false;
    }
    this.formModel.Otp=Number(form.otp);
    this.displaySpinner=true;
    this._voterApiService.validateSignUpOTP(this.formModel)
    .subscribe(
      data=>
      {
        this.displaySpinner=false;
        if(!data.isSuccess){
         swal.fire("",data.message,"error");
          return false;
        }
        else{         
          swal.fire("",data.message,"success");  
          this.router.navigateByUrl('/login');
        }
      }
    )
  }

}