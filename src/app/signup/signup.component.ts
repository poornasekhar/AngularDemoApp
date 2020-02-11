import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  displayOTPSection:boolean=false;
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

  constructor() { }

  ngOnInit() {
  }

  submit(){}

  isShowOTPSection(form:any){
    if(form.password!==form.confirm_password){
      alert("Password and confirm password are not matched");
      return false;
    }
    if(form.aadhar_no!=="123456123456" || form.name!=="sekhar" || form.phone !== "1234561234" || form.email!=="abc@xy.com"){
      alert("Provided data not matched with aadhar database");
      return false;
    }
    this.displayOTPSection=true;
  }

}