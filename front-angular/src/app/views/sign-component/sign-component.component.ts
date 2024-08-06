import { AccountServiceService } from './../../services/account-service.service';
import { Router } from '@angular/router';
import { EmailDTO,CodeDTO } from '../../models/emailDTO';
import { StorageService } from '../../services/storage-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpUser } from '../../models/users/signup-user';
import { SignServiceService } from '../../services/sign-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../../models/users/login-user';

@Component({
  selector: 'sign-page',
  templateUrl: './sign-component.component.html',
  styleUrls: ['./sign-component.component.css'],
})
export class SignComponentComponent implements OnInit {
  constructor(
    private signService: SignServiceService,
    private _snackBar: MatSnackBar,
    private storage: StorageService,
    private router: Router,
    private accounteService: AccountServiceService
  ) {}

  selectedValue: string;
  // hide password
  forgotPasswordClick = false; 
  ckeckCode = false;
  hide = true;
  check = true;
  signUpUser = {} as SignUpUser;
  isLoading = false;
  loginUser = {} as LoginUser;
  emailDTO = {} as EmailDTO;
  codeDTO = {} as CodeDTO;
  emailIsInvalid = true;
  

  checkCodeForm = new FormGroup({
    code: new FormControl('',  [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });
  
  
  
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  loginForm = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  
   changePasswordForgotForm = new FormGroup({
    pwd:  new FormControl('', [Validators.required, Validators.minLength(6)])
   })
  
  

  signUp() {
    this.isLoading = true;
    this.parseFormInfoIntoSignUpObject();
    this.signUpAsClient();
  }

  parseFormInfoIntoSignUpObject() {
    this.signUpUser.name = this.signUpForm.value.name;
    this.signUpUser.email = this.signUpForm.value.email;
    this.signUpUser.password = this.signUpForm.value.password
  }

  signUpAsClient() {
    this.signService
              .signUpClient(this.signUpUser)
              .subscribe( 
                  res => this.handleResponseSignUp(),
                  err => this.handleEror(err.status)
              );
  }
  handleEror(status){
    switch(status){
      case 409 : this.duplicateEmail();this.clearFieldsSignUp(); break;
      default:   this.errorServer();   this.clearFieldsSignUp();
    }
  }
  

  errorServer(){
    this._snackBar.open(
      'Error Server',
      'I got it',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }
  confirmationSignUp() {
    this._snackBar.open(
      'Your profile was created',
      'Dismiss',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }
  
  redirectoPage(page: string){
    this.router.navigateByUrl("/"+page);

  }
  duplicateEmail() {
    this.isLoading = true;
    this.signUpForm.controls['email'].setErrors({ incorrect: true });
    this.errorSignUp();
  }
  errorSignUp() {
    this._snackBar.open(
      'This email is being used by other user',
      'I got it',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }


  clearFieldsSignUp() {
    this.signUpForm.reset();

    Object.keys(this.signUpForm.controls).forEach(key => {
      this.signUpForm.get(key).setErrors(null) ;
    });
  }

  login() {
    this.parseFormInfoIntoLoginObject();
    this.signService.login(this.loginUser).subscribe( 
      res => this.handleResponseLogin(res));
  }

  handleResponseLogin(res){
    this.storage.handle(res);
    this.accounteService.changeStatus(true);
    const routerRole = this.storage.getInfos().role;
    switch(routerRole){
      case 'user' :  this.redirectoPage("home-user"); break;
      case 'admin':  this.redirectoPage("home-admin"); break;
    }
  }

  handleResponseSignUp(){
    this.confirmationSignUp();
    this.redirectoPage("/sign-component")
  }

  emailOrPasswordIncorrect() {
    this.loginForm.controls['email'].setErrors({ incorrect: true });
    this.loginForm.controls['password'].setErrors({ incorrect: true });
    this.snackBarErrorLogin();
  }

  snackBarErrorLogin() {
    this._snackBar.open(
      'Email or password incorrect',
      'I got it',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  snackBarErrorForgotPWD() {
    this._snackBar.open(
      'Email incorrect',
      'I got it',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }


  parseFormInfoIntoLoginObject() {
    this.loginUser.email = this.loginForm.value.email;
    this.loginUser.password = this.loginForm.value.password;
  }

 


  forgotPassword() {
    this.forgotPasswordClick = true; 
    this.ckeckCode = false;
    this.emailDTO.email = this.loginForm.value.email;
    this.signService.forgotPassword(this.emailDTO).subscribe( 
      res => this.snackBarEmailSent(),
      err => this.handleEror(err.status)
    )
  }

 checkCodeSentBy(){
   this.ckeckCode = true;
   this.forgotPasswordClick = true; 
   this.codeDTO.Iemail =this.emailDTO.email;
   this.codeDTO.IrandomeNumber = this.checkCodeForm.value.code;
   this.signService.checkCodeSetByEmail(this.codeDTO).subscribe( 
    res => this.handleResponseCheckCode(res),
    err => this.handleEror(err.status))

  }

  handleResponseCheckCode(res){
    this.ckeckCode = true;
    this.storage.handle(res);
   
    
  }
  

  changePassword(){
      this.loginUser.email = this.emailDTO.email;
      this.loginUser.password = this.changePasswordForgotForm.value.pwd;
      this.signService.changePassword(this.loginUser).subscribe( 
        res => this.handleResponseChangePassword(res),
        err => this.handleEror(err.status))
  }

  handleResponseChangePassword(res){
    this.forgotPasswordClick = false;
    this.ckeckCode = false; 
    this.accounteService.changeStatus(true);
    this.redirectoPage("home");
  }

  snackBarEmailSent() {
    this._snackBar.open(
      'A new password is being sent to your email. Please, check your mail out in a few seconds',
      'I got it',
      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  ngOnInit(): void {}
}
