import { EmailDTO, CodeDTO } from './../models/emailDTO';
import { Router } from '@angular/router';
import { StorageService } from './storage-service.service';
import { SignUpUser } from './../models/users/signup-user';
import { LoginUser } from './../models/users/login-user';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/users/local-user';
import jwt_decode from 'jwt-decode';
import { GlobalAPI } from './api.service';
import { UpdatedUser } from '../models/updated/user-updated';

@Injectable({
  providedIn: 'root',
})
export class SignServiceService {
  apiUrl = GlobalAPI.apiUrl;
  userStorage = {} as LocalUser;
  type: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  

  constructor(
    private httpClient: HttpClient,
    private storage: StorageService,
    private router: Router,
  ) {}



  login(user: LoginUser): any {
    return this.httpClient.post(this.apiUrl + '/users/login', JSON.stringify(user), this.httpOptions);
  }

  userStorageFromToken(tokenFromRequest: string) {
    this.userStorage.token = tokenFromRequest.substring(7);
    const decodedToken = jwt_decode(this.userStorage.token);
    this.userStorage.email = decodedToken['sub'];

    this.storage.setLocalUser(this.userStorage);
    this.returnUserType();
  }


  signUpClient(client: SignUpUser) {
    return this.httpClient.post(this.apiUrl + '/users/register',JSON.stringify(client), this.httpOptions);
  }

  forgotPassword(email: EmailDTO){
    return this.httpClient.post(this.apiUrl + '/users/forgotPassword',JSON.stringify(email), this.httpOptions);
  }

  checkCodeSetByEmail(code: CodeDTO){
    return this.httpClient.post(this.apiUrl + '/users/forgotPassword/checkCode',JSON.stringify(code), this.httpOptions);
  }

  changePassword(user: LoginUser){
    return this.httpClient.put(this.apiUrl + '/users/updatePassWord', user , this.httpOptions);
  }

  returnUserType(): any {
    let type: string;
    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userStorage.token,
      }),
    };

    this.httpClient
      .get(this.apiUrl + '/user', httpAuthorization)
      .subscribe((res) => {
        type = res['type'];

        if (type === 'Client') {
          this.router.navigateByUrl('/client-page');
        } else if (type === 'Seller') {
          this.router.navigateByUrl('/seller-page');
        }
      });
  }

}
