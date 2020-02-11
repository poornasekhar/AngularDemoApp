import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  displayOTPSection=false;
  formBuilder = new FormBuilder();
  loginForm = this.formBuilder.group({
    aadhar_no: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(12)]],
    password: ['', Validators.required],
    upload_image: [,Validators.required],
    otp:['',[Validators.minLength(4),Validators.maxLength(4)]]
  });
  constructor(private router:Router) { }

  ngOnInit() {
  }

  submit() {
    
  }

  isOTPSectionShow(form:any){
    if(form.aadhar_no!=="123456123456" || form.password!=="123"){
      alert("Invalid credentails");
      return false;
    }
    else{
      this.displayOTPSection=true;      
    }
  }

  verifyOTP(form:any){
    if(form.otp!=="1234"){
      alert("Invalid OTP");
      return false;
    }
    else{
      this.router.navigate(['/voting-screen']);
    }
  }

}
