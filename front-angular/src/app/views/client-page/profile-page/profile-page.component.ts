import { UpdatedAdresse } from './../../../models/updated/user-updated';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../models/users/client'; //'src/app/models/users/client';
import { UpdatedUser } from '../../../models/updated/user-updated'; //'src/app/models/updated/user-updated';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

    selectedValue = 'Client';
  // hide password
  hide = true;
  isVisibleUpdateProfle= true;
  client = {} as Client;
  updatedClient = {} as UpdatedUser;
  updatedAddress = {} as UpdatedAdresse;



 
  updateAddressForme = new FormGroup({
    pays: new FormControl('', Validators.required),
    fullname: new FormControl('', [Validators.required]),
    adressPostale:  new FormControl('', Validators.required),
    ville:  new FormControl('', Validators.required),
    codePostale:  new FormControl('', [Validators.required]),
    numTel:  new FormControl('', Validators.required),

  })
  updateProfileForme = new FormGroup({
    name: new FormControl('',  ) ,
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(
     private clientService: ClientService, 
     private tokenService: StorageService,
     private _snackBar: MatSnackBar,
     private route: Router,
     ) { 
        
     

     }

  ngOnInit(): void {
    this.client = this.clientService.client;
    this._populateForm();
   
  }
  _populateForm(){
    const { name, email }=  this.tokenService.decode(this.tokenService.getToken().split('.')[1]);
    this.updateProfileForme.patchValue({
      name: name,
      email: email,
      password: this.client.password,
    })
  }
  updateProfile(){
    this.isVisibleUpdateProfle = true;
    this.updatedClient.name = this.updateProfileForme.value.name;
    this.updatedClient.email = this.updateProfileForme.value.email;
    this.updatedClient.password = this.updateProfileForme.value.password;

    this.clientService.updateClientProfile(this.updatedClient).subscribe(
              res => this.confirmationEdit(res),
              err => this.handleErrorUpdateProfile(err));
  }


  updateAddress(){
    
      this.updatedAddress.pays  = this.updateAddressForme.value.pays;
      this.updatedAddress.toClientDestination  = this.updateAddressForme.value.fullname;
      this.updatedAddress.addressPostal  = this.updateAddressForme.value.adressPostale;
      this.updatedAddress.ville  = this.updateAddressForme.value.ville;
      this.updatedAddress.codePostal  = this.updateAddressForme.value.codePostale;
      this.updatedAddress.numTel  = this.updateAddressForme.value.numTel;
      this.clientService.updateClientAddress(this.updatedAddress).subscribe(
        res => this.confirmationEditAddress(res),
        err => this.handleErrorUpdateProfile(err));



  }
  
  makeProfileVisible(){
    this.isVisibleUpdateProfle = true;
  }

  makeAddressVisible(){
    this.clientService.getAddresss().subscribe(
      res => this.updateAddressClient(res),
      err => this.handleErrorUpdateProfile(err));

    this.isVisibleUpdateProfle = false;

  }

  handleErrorUpdateProfile(status){
    switch(status){
      default : this.errorEdit(); break;
    }
  }
  
  updateAddressClient(res){
    const {pays, toClientDestination, addressPostal, ville, codePostal, numTel} = res;
 

    this.updateAddressForme.patchValue({
      pays : pays,
      fullname: toClientDestination,
      adressPostale: addressPostal,
      ville: ville,
      codePostale: codePostal,
      numTel: numTel
    })
  }
  confirmationEditAddress(res) {
    this.updateAddressClient(res);
    this._snackBar.open(
      'Your Address was edited',
      'Dismiss',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  confirmationEdit(res) {
    this.updatedClient.name = "medmed";
    this.updatedClient.email = res.email;
    this._snackBar.open(
      'Your profile was edited',
      'Dismiss',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  
  errorEdit() {
    this._snackBar.open(
      'This email is already being used',
      'Dismiss',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  
  logout() {
    this.tokenService.remove();
    this.route.navigateByUrl('/sign-page');
  }
  

 

}
