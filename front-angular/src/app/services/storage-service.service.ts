import { SignServiceService } from './sign-service.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage.config';
import { LocalUser } from '../models/users/local-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }
 
  remove(){
    localStorage.removeItem('token');
  }
  
  set(data: any){
    localStorage.setItem('token', data.access_token);
  }
  

  handle(data:any){
    this.set(data);
  }
  
  decode(payload){
    return JSON.parse(atob(payload));
  }

  payload(token){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }
  

  getInfos(){
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      return payload ? payload : null; 
    }
    return null;
  }

  isValid(){
    const token = this.getToken();
    if(token){
      const payload  = this.payload(token);
      if(payload){
          return payload.iat;
      }
    }
    return false;
  }
  
  loggeIn(){
    return this.isValid();
  }
  
  getToken(){
    return localStorage.getItem('token');
  }

  























  theresAnyUserLogged(){
    if(this.getLocalUser()===null){
      this.router.navigateByUrl('/sign-page');
    }
  }

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUser) {

    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);

    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }

  }


  logout(){
    this.setLocalUser(null);
  }

}
