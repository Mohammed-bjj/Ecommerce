import { Admin } from './../models/users/admin';
import { UpdatedAdresse } from './../models/updated/user-updated';
import { UpdatedUser } from '../models/updated/user-updated';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/users/local-user';
import { Client } from '../models/users/client';
import { GlobalAPI } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(
    private httpClient: HttpClient
  ) {}

  userStorage = {} as LocalUser;
  apiUrl = GlobalAPI.apiUrl;
  client = {} as Client;



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  
  async returnClient(): Promise<Client> {

    return null;
  }

   updateClientProfile(client: UpdatedUser) {
    return  this.httpClient.patch('http://localhost:3000/users/updateProfile', client, this.httpOptions);
  }


  updateClientAddress(address: UpdatedAdresse){
    return  this.httpClient.put('http://localhost:3000/users/updateAddress', address, this.httpOptions);
  }

  getAddresss(){
    return  this.httpClient.get('http://localhost:3000/users/address', this.httpOptions);
  }

  createAdmin(admin: Admin){
    console.log('ldldldldl', admin);
    return this.httpClient.post('http://localhost:3000/users/AddAdmin', admin,  this.httpOptions);
  }


  getAllUser(){
    return  this.httpClient.get('http://localhost:3000/users', this.httpOptions);
  }
  
}
